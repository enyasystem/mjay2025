import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const sql = neon(process.env.DATABASE_URL!)

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    const { currentPassword, newEmail, newPassword } = await request.json()

    // Verify current password
    const result = await sql`
      SELECT password_hash FROM admin_users WHERE id = ${decoded.adminId}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 })
    }

    const isValidPassword = await bcrypt.compare(currentPassword, result[0].password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }


    // Build update query explicitly
    let updateFields = []
    let updateValues: any[] = []
    if (newEmail && newEmail !== decoded.email) {
      updateFields.push('email')
      updateValues.push(newEmail)
    }
    if (newPassword) {
      updateFields.push('password_hash')
      updateValues.push(await bcrypt.hash(newPassword, 12))
    }
    updateFields.push('updated_at')
    updateValues.push(new Date())

    if (updateFields.length > 0) {
      const setClause = updateFields.map((field, i) => `${field} = $${i + 1}`).join(', ')
      await sql.query(
        `UPDATE admin_users SET ${setClause} WHERE id = $${updateFields.length + 1}`,
        [...updateValues, decoded.adminId]
      )
    }

    return NextResponse.json({ message: "Credentials updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Change credentials error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
