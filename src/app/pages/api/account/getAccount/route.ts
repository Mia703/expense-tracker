import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "User id is required." },
        { status: 401 },
      );
    }

    const getAccount = await xata.db.accounts
      .filter({
        "user.id": id,
      })
      .sort("acct_name", "asc")
      .getAll();

    if (!getAccount) {
      return NextResponse.json(
        { message: "Get account un-successful" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: JSON.stringify(getAccount) },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error getting account information", error);
    return NextResponse.json(
      {
        message:
          "Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
