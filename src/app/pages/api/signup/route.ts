import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "Signup: Full name, email, and password are required." },
        { status: 400 },
      );
    }

    const checkUser = await xata.db.users.filter({ email: email }).getFirst();

    // if the user does not exist in the database
    if (!checkUser) {
      const addUser = await xata.db.users.create({
        fullName: fullName,
        email: email,
        password: password,
      });

      if (!addUser) {
        return NextResponse.json(
          { message: "Signup: New user creation un-successful" },
          { status: 401 },
        );
      }

      return NextResponse.json(
        { message: `Signup: New user creation successful. id:${addUser.id}` },
        { status: 200 },
      );
    }

    // else, the user already exists in the database
    return NextResponse.json(
      { message: "Signup: Email already exists." },
      { status: 401 },
    );
  } catch (error) {
    console.error("Signup: Error checking full name and email", error);
    return NextResponse.json(
      {
        message:
          "Signup: Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
