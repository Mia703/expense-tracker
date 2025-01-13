import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, goal_name, goal_target, goal_current } = await request.json();

    if (!id || !goal_name || !goal_target || goal_current < 0) {
      return NextResponse.json(
        {
          message: "Id, goal name, goal target, and goal current are required",
        },
        { status: 400 },
      );
    }

    // get the user's current salary
    const getSalary = await xata.db.salary
      .filter({
        "user.id": id,
      })
      .sort("xata.createdAt", "desc")
      .getFirst();

    if (!getSalary) {
      return NextResponse.json(
        { message: "Could not user's most current salary" },
        { status: 401 },
      );
    }

    // get salary was successful
    // check that goal exists
    const checkGoal = await xata.db.goals
      .filter({
        user: id,
        goal: goal_name,
      })
      .getFirst();

    // if the goal does not exist, update the salary first
    if (!checkGoal) {
      const new_salary = getSalary.salary - goal_current;

      const setNewSalary = await xata.db.salary.update(getSalary.id, {
        salary: new_salary < 0 ? 0 : new_salary,
      });

      if (!setNewSalary) {
        return NextResponse.json(
          {
            message: "Update new salary was un-successful.",
          },
          { status: 401 },
        );
      }

      if (new_salary < 0) {
        return NextResponse.json(
          { message: "Cannot create goal because salary is zero.client:zero" },
          { status: 401 },
        );
      }

      // else, then create new goal
      const setGoal = await xata.db.goals.create({
        user: id,
        goal: goal_name,
        target_amount: goal_target,
        current_amount: goal_current,
      });

      if (!setGoal) {
        return NextResponse.json(
          { message: "Creating goal was un-successful" },
          { status: 401 },
        );
      }

      // else, goal creation was successful.
      return NextResponse.json(
        { message: "Update salary and create goal were successful" },
        { status: 200 },
      );
    }

    // else, goal does exist, update salary
    const new_salary = getSalary.salary - checkGoal.current_amount;

    const setNewSalary = await xata.db.salary.update(getSalary.id, {
      salary: new_salary < 0 ? 0 : new_salary,
    });

    if (!setNewSalary) {
      return NextResponse.json(
        {
          message: "Update salary was un-successful.",
        },
        { status: 401 },
      );
    }

    if (new_salary < 0) {
      return NextResponse.json(
        { message: "Cannot update goal because salary is zero.client:zero" },
        { status: 401 },
      );
    }

    // else update salary was successful and salary DOES NOT EQUAL zero.
    // update goal
    const updateGoal = await xata.db.goals.update(checkGoal.id, {
      target_amount: goal_target,
      current_amount: goal_current,
    });

    if (!updateGoal) {
      return NextResponse.json(
        {
          message:
            "Update salary was successful but update goal was not successful",
        },
        { status: 401 },
      );
    }

    // update goal was successful
    return NextResponse.json(
      { message: "Update salary and update goal was successful." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving user's goal:", error);
    return NextResponse.json(
      {
        message:
          "Internal server error. The server has encountered a situation it does not know how to handle.",
      },
      { status: 500 },
    );
  }
}
