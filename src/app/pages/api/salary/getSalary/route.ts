import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "getSalary: Cannot complete request, id is required." },
        { status: 400 },
      );
    }

    const getSalary = await xata.db.salary
      .filter({
        "user.id": id,
      })
      .sort("xata.createdAt", "desc") // sort by newest to oldest
      .getFirst();

    if (!getSalary) {
      return NextResponse.json(
        {
          message:
            "getSalary: Cannot complete request, cannot find most recent salary record.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: "getSalary: Request completed, get salary successful.",
          id: getSalary.id,
          salary: getSalary.salary,
          payday: getSalary.payday,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "getSalary: Cannot complete request, internal server error.",
      error,
    );
    return NextResponse.json(
      { message: "getSalary: Internal server error." },
      { status: 500 },
    );
  }
}
