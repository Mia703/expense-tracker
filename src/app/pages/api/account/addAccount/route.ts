import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, name, type, number } = await request.json();

    if (!id || !name || !type || !number) {
      return NextResponse.json(
        { message: "Name, type, and number are required." },
        { status: 401 },
      );
    }

    const checkAccount = await xata.db.accounts
      .filter({
        user: id,
        acct_name: name,
        acct_type: type,
      })
      .getFirst();

    // if the account does not exist, create the account
    if (!checkAccount) {
      const addAccount = await xata.db.accounts.create({
        user: id,
        acct_name: name,
        acct_type: type,
        current_balance: number,
      });

      if (!addAccount) {
        return NextResponse.json(
          { message: "New account creation un-successful" },
          { status: 401 },
        );
      }

      return NextResponse.json(
        { message: "New account creation successful" },
        { status: 200 },
      );
    }

    // else, the account exists. update the account.
    const updateAccount = await xata.db.accounts.update(checkAccount.id, {
      current_balance: number,
    });

    if (!updateAccount) {
      return NextResponse.json(
        { message: "Update account un-successful" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "Update account successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error adding account information", error);
    return NextResponse.json(
      {
        message:
          "Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
