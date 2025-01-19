import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, goal_name, goal_target, goal_contribution } =
      await request.json();

    if (!id || !goal_name || goal_target < 0 || goal_contribution < 0) {
      return NextResponse.json(
        {
          message:
            "setGoal: Id, goal name, goal target, and goal contribution are required. error:error",
        },
        { status: 400 },
      );
    }

    // get the user's current salary
    const getSalary = await xata.db.salary
      .filter({
        "user.id": id,
      })
      .sort("xata.createdAt", "desc") // sort by newest to oldest
      .getFirst();

    // if user does not have salary, exit
    if (!getSalary) {
      return NextResponse.json(
        {
          message:
            "setGoal: Cannot update goal because user does not have salary. error:no-salary",
        },
        { status: 400 },
      );
    }

    // else, user has salary
    // calculate new salary
    const newSalary = getSalary.salary - goal_contribution;

    // if new salary is less than zero, exit
    if (newSalary < 0) {
      return NextResponse.json(
        {
          message:
            "setGoal: Cannot update or create goal because salary is zero. error:zero-salary",
        },
        { status: 400 },
      );
    }

    // get the user's goal
    const getGoal = await xata.db.goals
      .filter({
        "user.id": id,
        goal: goal_name,
      })
      .getFirst();

    // if user's goal does not exist,
    // create goal
    if (!getGoal) {
      const setGoal = await xata.db.goals.create({
        user: id,
        goal: goal_name,
        goal_target: goal_target,
        goal_contribution: goal_contribution,
      });

      if (!setGoal) {
        return NextResponse.json(
          { message: "setGoal: Could not create goal. error:error" },
          { status: 400 },
        );
      }

      // update user's salary
      const updateSalary = getSalary.update({
        salary: newSalary,
      });

      if (!updateSalary) {
        return NextResponse.json(
          {
            message:
              "setGoal: Goal was created but salary could not be updated. error:error",
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { message: "setGoal: Goal created and salary updated." },
        { status: 200 },
      );
    }

    const updateGoal = getGoal.update({
      goal_target: goal_target,
      goal_contribution: goal_contribution,
    });

    if (!updateGoal) {
      return NextResponse.json(
        {
          message: "setGoal: Could not update goal. error:error",
        },
        { status: 400 },
      );
    }

    // update user's salary
    const updateSalary = getSalary.update({
      salary: newSalary,
    });

    if (!updateSalary) {
      return NextResponse.json(
        {
          message:
            "setGoal: Goal updated but could not update salary. error:error",
        },
        { status: 400 },
      );
    }

    // else goal and salary are updated
    return NextResponse.json(
      { message: "setGoal: Salary update and goal update successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("", error);
    return NextResponse.json(
      {
        message: "Internal server error. error:error",
      },
      { status: 500 },
    );
  }
}
