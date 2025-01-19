import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "getGoal: Id is required." },
        { status: 400 },
      );
    }

    const getGoals = await xata.db.goals
      .filter({
        "user.id": id,
      })
      .sort("xata.createdAt", "asc")
      .getAll();

    if (!getGoals) {
      return NextResponse.json(
        { message: "getGoal: Could not get goals" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: JSON.stringify(getGoals) },
      { status: 200 },
    );
  } catch (error) {
    console.error("", error);
    return NextResponse.json(
      {
        message: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
