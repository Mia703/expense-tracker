import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    // get the request body (i.e. the form submission values)
    const { email, password } = await request.json();

    // check to ensure both the email and password are present
    if (!email || !password) {
      return NextResponse.json(
        {
          message:
            "login: Cannot complete request, email and password are required.",
        },
        { status: 400 },
      );
    }

    // query the DB to find the user with the same emil and password
    const user = await xata.db.users
      .filter({ email: email, password: password })
      .getFirst();

    // if user is empty, then email and/or password is not in the DB
    if (!user) {
      return NextResponse.json(
        {
          message:
            "login: Cannot complete request, authentication unsuccessful.",
        },
        { status: 401 },
      );
    }

    // else, the user was found in the database.
    return NextResponse.json(
      { message: `login: Authentication successful. User id:${user.id}` },
      { status: 200 },
    );
  } catch (error) {
    console.error("login: Internal server error.", error);
    return NextResponse.json(
      {
        message:
          "Login: Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
