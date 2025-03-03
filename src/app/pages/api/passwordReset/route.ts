import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        {
          message:
            "passwordReset: Cannot complete request, email, and new password are required.",
        },
        { status: 400 },
      );
    }

    // query DB to find existing user
    const user = await xata.db.users
      .filter({
        email,
      })
      .getFirst();

    // if the user is not in the database
    if (!user) {
      return NextResponse.json(
        {
          message:
            "passwordReset: Cannot complete request, authentication unsuccessful.",
        },
        { status: 401 },
      );
    }

    // else, the user is in the database. Update password.
    const updatePassword = await user.update({ password: newPassword });

    if (!updatePassword) {
      return NextResponse.json(
        {
          message:
            "passwordReset: Cannot complete request, cannot find current record.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message:
          "passwordReset: Request completed, update password successful.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "passwordReset: Cannot complete request, internal server error.",
      error,
    );

    return NextResponse.json(
      { message: "passwordReset: Internal server error." },
      { status: 500 },
    );
  }
}
