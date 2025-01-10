import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "Full name, email, and password is required." },
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
          { message: "New user creation un-successful" },
          { status: 401 },
        );
      }

      return NextResponse.json(
        { message: `New user creation successful. id:${addUser.id}` },
        { status: 200 },
      );
    }

    // else, the user already exists in the database
    return NextResponse.json(
      { message: "Email already exists in DB." },
      { status: 401 },
    );
  } catch (error) {
    console.error("Error checking full name and email", error);
  }
}
