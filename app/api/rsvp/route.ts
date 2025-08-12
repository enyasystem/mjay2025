import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
  const { name, email, attending, message } = body

    // Validate required fields
    if (!name || !email || attending === undefined) {
      return NextResponse.json({ error: "Name, email, and attending status are required" }, { status: 400 })
    }

    // Insert RSVP submission
    const result = await sql`
      INSERT INTO rsvp_submissions (name, email, attending, message)
      VALUES (${name}, ${email}, ${attending}, ${message || null})
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      data: result[0],
    })
  } catch (error) {
    console.error("Error submitting RSVP:", error)
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get all RSVP submissions for admin dashboard
    const submissions = await sql`
      SELECT 
        id,
        name,
        email,
        attending,
  -- dietary_restrictions removed
        message,
        created_at
      FROM rsvp_submissions
      ORDER BY created_at DESC
    `

    // Get summary statistics
    const stats = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN attending = true THEN 1 END) as attending,
        COUNT(CASE WHEN attending = false THEN 1 END) as not_attending
      FROM rsvp_submissions
    `

    return NextResponse.json({
      submissions,
      stats: stats[0],
    })
  } catch (error) {
    console.error("Error fetching RSVPs:", error)
    return NextResponse.json({ error: "Failed to fetch RSVPs" }, { status: 500 })
  }
}
