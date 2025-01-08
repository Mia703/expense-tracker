import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { message: "Email and new password are required." },
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
        { message: "Authentication un-successful." },
        { status: 401 },
      );
    }

    // else, the user is in the database. Update password.
    const updatePassword = user.update({ password: newPassword });

    if (!updatePassword) {
      return NextResponse.json(
        { message: "update password un-successful" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "update password successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
