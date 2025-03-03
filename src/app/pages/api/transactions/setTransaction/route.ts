import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, date, type, category, description, amount } =
      await request.json();

    if (!id || !date || !type || !category || !description || amount < 0) {
      return NextResponse.json(
        {
          message:
            "setTransaction: Cannot complete request, id, date, type, description, and amount are required.",
        },
        { status: 400 },
      );
    }

    const getTransaction = await xata.db.transactions
      .filter({
        "user.id": id,
        type,
        category,
        description,
      })
      .getFirst();

    const setTransaction = await xata.db.transactions.createOrUpdate(
      getTransaction?.id,
      {
        user: id,
        date,
        type,
        category,
        description,
        amount,
      },
    );

    if (!setTransaction) {
      const item = {
        user_id: id,
        date,
        type,
        category,
        description,
        amount,
      };
      return NextResponse.json(
        {
          message: `setTransaction: Cannot complete request, unable to set or update transaction. ${item}`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message:
          "setTransaction: Request completed, set or updated transaction.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("setTransaction: Internal server error.", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 400 },
    );
  }
}
