
import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 DEBUG: Login API route hit")

    const { email, password } = await request.json()
    console.log("🔍 DEBUG: Received credentials:", { email, password: "***" })

    // Test database connection first
    console.log("🔍 DEBUG: Testing database connection...")
    const adminUsers = await sql`
      SELECT id, email, password_hash 
      FROM admin_users 
      WHERE email = ${email}
    `

    if (adminUsers.length === 0) {
      console.log("🔍 DEBUG: No admin user found with email:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const admin = adminUsers[0]
    console.log("🔍 DEBUG: Admin user found:", { id: admin.id, email: admin.email })


    // Compare provided password with stored password hash
    const passwordMatch = await bcrypt.compare(password, admin.password_hash)
    if (!passwordMatch) {
      console.log("🔍 DEBUG: Invalid password")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("🔍 DEBUG: Password verified successfully")

    const token = jwt.sign({ adminId: admin.id, email: admin.email }, process.env.JWT_SECRET || "fallback-secret", {
      expiresIn: "7d",
    })

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin.id,
        email: admin.email,
      },
    })

    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    console.log("🔍 DEBUG: Login successful, JWT token cookie set")
    return response
  } catch (error) {
    console.error("💥 DEBUG: Login error:", error)
    console.error("💥 DEBUG: Error stack:", error instanceof Error ? error.stack : "No stack")

    return NextResponse.json(
      {
        error: "Login failed",
        message: error instanceof Error ? error.message : "Unknown error",
        details: error instanceof Error ? error.stack : "No details",
      },
      { status: 500 },
    )
  }
}
