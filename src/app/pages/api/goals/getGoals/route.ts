import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Id is required to get goal." },
        { status: 400 },
      );
    }

    const getGoals = await xata.db.goals
      .filter({
        "user.id": id,
      })
      .sort("goal", "asc")
      .getAll();

    if (!getGoals) {
      return NextResponse.json(
        { message: "Get goals was un-successful" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: JSON.stringify(getGoals) },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error getting user's goal:", error);
    return NextResponse.json(
      {
        message:
          "Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
