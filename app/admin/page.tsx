"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminAuthWrapper from "../../components/admin-auth-wrapper"
import { XCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, UsersIcon, CheckCircleIcon, XCircleIcon as XCircleSolidIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"

// ... existing interfaces ...



function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<{ total: number; attending: number; not_attending: number } | null>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/rsvp")
        if (!res.ok) throw new Error("Failed to fetch RSVP data.")
        const data = await res.json()
        setStats(data.stats)
        setSubmissions(data.submissions)
        setLoading(false)
      } catch (err) {
        setError("Failed to load dashboard data.")
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading RSVP data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircleIcon className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <header className="bg-gradient-to-r from-green-100 to-orange-100 shadow-sm border-b border-gray-200 rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">Wedding Admin Dashboard</h1>
            <p className="text-base text-gray-600 font-serif">Mary Barovbe & Jideofor Osu</p>
          </div>
          <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center px-4 py-2 text-green-700 bg-white/80 hover:bg-green-50 border border-green-200 rounded-lg shadow-sm transition-colors font-medium"
              >
                <span className="mr-2">←</span> Home
              </Link>
            <button
              onClick={() => router.push("/admin/settings")}
              className="flex items-center px-4 py-2 text-gray-700 bg-white/80 hover:bg-gray-100 border border-gray-200 rounded-lg shadow-sm transition-colors"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-2" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card className="transition-transform hover:scale-105 hover:shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Responses</CardTitle>
              <UsersIcon className="h-8 w-8 text-blue-500" />
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-extrabold text-blue-900">{stats?.total ?? 0}</span>
            </CardContent>
          </Card>
          <Card className="transition-transform hover:scale-105 hover:shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Attending</CardTitle>
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-extrabold text-green-900">{stats?.attending ?? 0}</span>
            </CardContent>
          </Card>
          <Card className="transition-transform hover:scale-105 hover:shadow-lg bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Not Attending</CardTitle>
              <XCircleSolidIcon className="h-8 w-8 text-red-500" />
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-extrabold text-red-900">{stats?.not_attending ?? 0}</span>
            </CardContent>
          </Card>
        </div>

        {/* RSVP List */}
        <div className="bg-white/90 rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">RSVP Responses</h2>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gradient-to-r from-green-50 to-orange-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Attending</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">{s.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{s.email}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {s.attending ? (
                        <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">Yes</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{s.message || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-500">{new Date(s.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}




export default function AdminPage() {
  return (
    <AdminAuthWrapper>
      <AdminDashboard />
    </AdminAuthWrapper>
  )
}
