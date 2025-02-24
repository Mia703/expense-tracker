import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, type, category, percentage } = await request.json();

    if (!id || !type || !category || percentage < 0) {
      return NextResponse.json(
        {
          message:
            "setCategory: id, type, category, and percentage are required",
        },
        { status: 400 },
      );
    }

    const getCategory = await xata.db.budget
      .filter({
        "user.id": id,
        type, // savings, expenses, or other
        category,
      })
      .getFirst();

    const setCategory = await xata.db.budget.createOrUpdate(getCategory?.id, {
      user: id,
      type: type,
      category: category,
      percentage: percentage,
    });

    if (!setCategory) {
      return NextResponse.json(
        { message: "setCategory: Unable to create new category" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: "setCategory: New category created",
          type,
          category,
          percentage,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("setCategory: Unable to create new budget category", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
