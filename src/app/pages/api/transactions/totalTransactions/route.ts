import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, type } = await request.json();

    if (!id || !type) {
      return NextResponse.json(
        { message: "totalTransactions: id and type are required" },
        { status: 400 },
      );
    }

    const transactions = await xata.db.transactions
      .filter({
        "user.id": id,
        type,
      })
      .getMany();

    if (!transactions) {
      return NextResponse.json(
        {
          message: {
            message:
              "totalTransactions: There are no transactions for this type",
            data: 0,
          },
        },
        { status: 400 },
      );
    }

    let total = 0;
    transactions.forEach((transaction) => {
      total += transaction.amount;
    });

    return NextResponse.json(
      {
        message: {
          message:
            "totalTransactions: Successfully got transaction total by type",
          data: total,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("totalTransactions: Internal server error", error);
    return NextResponse.json(
      { message: "Unable to get total transactions" },
      { status: 500 },
    );
  }
}
