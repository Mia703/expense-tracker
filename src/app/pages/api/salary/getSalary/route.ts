import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 },
      );
    }

    const salary = await xata.db.salary
      .filter({
        "user.id": id,
      })
      .sort("xata.createdAt", "desc")
      .getFirst();

    if (!salary) {
      return NextResponse.json(
        { message: "Get salary un-successful." },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: `Get salary successful. salary:${salary.salary},frequency:${salary.frequency},date:${salary.start_date}` },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error getting user's current salary:", error);
    return NextResponse.json(
      {
        message:
          "Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
