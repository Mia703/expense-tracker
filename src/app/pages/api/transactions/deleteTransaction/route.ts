import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "deleteTransaction: id is required" },
        { status: 400 },
      );
    }

    console.log("id of selected row", id);
    const deleteTransaction = await xata.db.transactions.delete(id);

    if (!deleteTransaction) {
      return NextResponse.json(
        { message: "deleteTransaction: Could not delete transaction" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "deleteTransaction: Transaction successfully deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("deleteTransaction: Unable to delete transaction", error);
    return NextResponse.json(
      { message: "deleteTransaction: Internal server error" },
      { status: 500 },
    );
  }
}
