import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        {
          message:
            "signup: Cannot complete request, full name, email, and password are required.",
        },
        { status: 400 },
      );
    }

    const checkUser = await xata.db.users.filter({ email: email }).getFirst();

    const addUser = await xata.db.users.createOrUpdate(checkUser?.id, {
      fullName,
      email,
      password,
    });

    if (!addUser) {
      return NextResponse.json(
        {
          message:
            "signup: Cannot complete request, new user creation unsuccessful.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: `signup: New user creation successful. User id:${addUser.id}`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("signup: Internal server error.", error);
    return NextResponse.json(
      {
        message:
          "signup: Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
