import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { message: "Password Reset: Email and new password are required." },
        { status: 400 },
      );
    }

    // query DB to find existing user
    const user = await xata.db.users
      .filter({
        email: email,
      })
      .getFirst();

    // if the user is not in the database
    if (!user) {
      return NextResponse.json(
        { message: "Password Reset: Authentication un-successful." },
        { status: 401 },
      );
    }

    // else, the user is in the database. Update password.
    const updatePassword = await user.update({ password: newPassword });

    if (!updatePassword) {
      return NextResponse.json(
        { message: "Password Reset: Update password un-successful." },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "Password Rest: Update password successful." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Password Reset: Error checking email:", error);
    return NextResponse.json(
      { message: "Password Reset: Internal server error." },
      { status: 500 },
    );
  }
}
