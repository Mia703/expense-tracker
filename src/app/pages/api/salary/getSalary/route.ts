import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "getSalary: User id is required" },
        { status: 400 },
      );
    }

    const salary = await xata.db.salary
      .filter({
        "user.id": id,
      })
      .sort("xata.createdAt", "desc") // sort by newest to oldest
      .getFirst();

    if (!salary) {
      return NextResponse.json(
        { message: "getSalary: Get salary un-successful." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: `getSalary: Get salary successful. salary:${salary.salary}` },
      { status: 200 },
    );
  } catch (error) {
    console.error("getSalary: Error getting user's current salary:", error);
    return NextResponse.json(
      {
        message: "getSalary: Internal server error.",
      },
      { status: 500 },
    );
  }
}
