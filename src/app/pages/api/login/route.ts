import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

// Handle GET requests
// export async function GET(request: Request) {
//   return NextResponse.json({ message: "Hello, this is a GET request!" });
// }

// Handle POST requests
// export async function POST(request: Request) {
//   const body = await request.json();
//   return NextResponse.json({
//     message: "Hello, this is a POST request!",
//     data: body,
//   });
// }

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    // get the request body (i.e. the form submission values)
    const { email, password } = await request.json();

    // check to ensure both the email and password are present
    if (!email || !password) {
      return NextResponse.json(
        {message: "Email and password are required."},
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
            "Authentication un-successful.",
        },
        { status: 401 },
      );
    }

    // else, the user was found in the database.
    return NextResponse.json(
      { message: "Authentication successful." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error checking email and password:", error);
    return NextResponse.json(
      {
        message:
          "Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
