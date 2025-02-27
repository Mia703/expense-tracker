import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, date, type, description, amount } = await request.json();

    if (!id || !date || !type || !description || amount < 0) {
      return NextResponse.json(
        {
          message:
            "setTransaction: id, date, type, description, and amount are required",
        },
        { status: 400 },
      );
    }

    const getTransaction = await xata.db.transactions
      .filter({
        "user.id": id,
        type,
        description,
      })
      .getFirst();

    const setTransaction = await xata.db.transactions.createOrUpdate(
      getTransaction?.id,
      {
        user: id,
        date,
        type,
        description,
        amount,
      },
    );

    if (!setTransaction) {
      return NextResponse.json(
        { message: "setTransaction: Unable to create or update transaction" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "setTransaction: Created or updated transaction" },
      { status: 200 },
    );
  } catch (error) {
    console.error("setTransaction: Could not set transaction", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 400 },
    );
  }
}
