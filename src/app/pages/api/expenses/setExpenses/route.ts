import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, expense_name, expense_budgeted, expense_actual } =
      await request.json();

    if (!id || !expense_name || expense_budgeted < 0 || expense_actual < 0) {
      return NextResponse.json(
        {
          message:
            "User id, expense name, expense budgeted, and expense actual are required.",
        },
        { status: 401 },
      );
    }

    const getExpense = await xata.db.expenses
      .filter({
        "user.id": id,
        expense_name: expense_name,
      })
      .sort("xata.createdAt", "desc")
      .getFirst();

    console.log("getExpense", getExpense);
    if (!getExpense) {
      // fixed expense does not exist, create expense

      const createExpense = await xata.db.expenses.create({
        user: id,
        expense_name: expense_name,
        expense_budgeted: expense_budgeted,
        expense_actual: expense_actual,
      });

      if (!createExpense) {
        return NextResponse.json(
          { message: "Unable to create fixed expense" },
          { status: 401 },
        );
      }

      return NextResponse.json(
        { message: "Created fixed expense" },
        { status: 200 },
      );
    }

    // const updateExpense = await xata.db.expenses.update(getExpense.id, {
    // 	expense_budgeted: expense_budgeted,
    //   expense_actual: expense_actual,
    // });

    const updateExpense = await getExpense.update({
      expense_budgeted: expense_budgeted,
      expense_actual: expense_actual,
    });

    if (!updateExpense) {
      return NextResponse.json(
        { message: "Unable to update fixed expense" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "Updated fixed expense" },
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
