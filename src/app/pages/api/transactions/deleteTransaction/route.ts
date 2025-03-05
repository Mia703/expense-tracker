import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "deleteTransaction: Cannot complete request, id is required." },
        { status: 400 },
      );
    }

    const deleteTransaction = await xata.db.transactions.delete(id);

    if (!deleteTransaction) {
      return NextResponse.json(
        { message: `deleteTransaction: Cannot complete request, could not delete transaction with id ${id}.` },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "deleteTransaction: Request completed, transaction successfully deleted." },
      { status: 200 },
    );
  } catch (error) {
    console.error("deleteTransaction: Internal server error.", error);
    return NextResponse.json(
      { message: "deleteTransaction: Internal server error" },
      { status: 500 },
    );
  }
}
