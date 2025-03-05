import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, category } = await request.json();

    if (!id || !category) {
      return NextResponse.json(
        {
          message:
            "totalByCategory: Cannot complete request, id and category are required.",
        },
        { status: 400 },
      );
    }

    const getTotalByCategory = await xata.db.transactions
      .filter({
        "user.id": id,
        category,
      })
      .getMany();

    if (!getTotalByCategory) {
      return NextResponse.json(
        {
          message: {
            message:
              "totalByCategory: Cannot complete request, there are no transactions for this category.",
            data: 0,
          },
        },
        { status: 400 },
      );
    }

    let total = 0;
    getTotalByCategory.forEach((item) => {
      total += item.amount;
    });

    return NextResponse.json(
      {
        message: {
          message: `totalByCategory: Request completed, got the total sum of transactions of the category ${category}.`,
          data: total,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("totalByCategory: Internal server error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
