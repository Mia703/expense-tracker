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

    const getExpense = await xata.db.expenses
      .filter({
        "user.id": id,
      })
      .sort("expense_name", "asc")
      .getAll();

    if (!getExpense) {
      return NextResponse.json(
        { message: "Unable to get fixed expenses" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: JSON.stringify(getExpense) },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error set fixed expenses.", error);
    return NextResponse.json(
      {
        message:
          "Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
