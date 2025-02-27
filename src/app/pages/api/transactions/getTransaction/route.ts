import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "getTransaction: id is required" },
        { status: 400 },
      );
    }

    const getTransaction = await xata.db.transactions
      .filter({
        "user.id": id,
      }).sort('date', 'desc')
      .getMany();

    if (!getTransaction) {
      return NextResponse.json(
        {
          message: {
            message: "No transactions",
            data: [],
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: "getTransaction: Got transactions",
          data: JSON.stringify(getTransaction),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("getTransaction: Unable to get transactions", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
