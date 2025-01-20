import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

// ------- HELPER FUNCTIONS -------
async function fetchSalary(id: string) {
  return xata.db.salary
    .filter({
      "user.id": id,
    })
    .sort("xata.createdAt", "desc")
    .getFirst();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateSalary(salaryRecord: any, newSalary: number) {
  return salaryRecord.update({
    salary: newSalary,
  });
}

async function fetchGoal(id: string, goal_name: string) {
  return xata.db.goals
    .filter({
      "user.id": id,
      goal: goal_name,
    })
    .getFirst();
}

async function createGoal(
  id: string,
  goal_name: string,
  goal_target: number,
  goal_contribution: number,
) {
  return xata.db.goals.create({
    user: id,
    goal: goal_name,
    goal_target: goal_target,
    goal_contribution: goal_contribution,
  });
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ message, status });
}

export async function POST(request: Request) {
  try {
    const { id, goal_name, goal_target, goal_contribution } =
      await request.json();

    if (!id || !goal_name || goal_target < 0 || goal_contribution < 0) {
      return errorResponse(
        "setGoal: Id, goal, goal target, and goal contribution are required",
        400,
      );
    }

    // fetch current salary
    const currentSalary = await fetchSalary(id);
    if (!currentSalary) {
      return errorResponse(
        "setGoal: Salary does not exist. error:no-salary",
        400,
      );
    }

    // fetch goal
    const currentGoal = await fetchGoal(id, goal_name);

    // if current goal does not exist
    if (!currentGoal) {
      // create new goal
      const newGoal = await createGoal(
        id,
        goal_name,
        goal_target,
        goal_contribution,
      );

      if (!newGoal) {
        return errorResponse(
          "setGoal: Unable to create goal. error:error",
          400,
        );
      }

      // else, goal creation was successful
      // calculate the new salary
      const newSalary = currentSalary.salary - goal_contribution;

      // if the new salary less than zero
      if (newSalary < 0) {
        return errorResponse(
          "setGoal: Salary is less than zero. error:zero-salary",
          400,
        );
      }

      // else, the salary is zero or greater
      // update the salary
      const salaryUpdate = await updateSalary(currentSalary, newSalary);

      if (!salaryUpdate) {
        return errorResponse(
          "setGoal: Goal created, but salary could not be updated. error:error",
          400,
        );
      }

      return NextResponse.json(
        { message: "setGoal: Goal created and salary updated successfully" },
        { status: 200 },
      );
    }

    // else, current goal does exist
    // determine if goal contribution is the same, if so, just update the target
    if (currentGoal.goal_contribution === goal_contribution) {
      const goalUpdate = await currentGoal.update({
        goal_target: goal_target,
      });

      if (!goalUpdate) {
        return errorResponse(
          "setGoal: Unable to update goal. error:error",
          400,
        );
      }

      return NextResponse.json(
        { message: "Goal and salary updated successfully" },
        { status: 200 },
      );
    }

    const difference = currentGoal.goal_contribution - goal_contribution;
    const newSalary = currentSalary.salary + difference;

    // update goal
    const goalUpdate = await currentGoal.update({
      goal_target: goal_target,
      goal_contribution: goal_contribution,
    });

    if (!goalUpdate) {
      return errorResponse("setGoal: Unable to update goal. error:error", 400);
    }

    // then update salary
    const salaryUpdate = await updateSalary(currentSalary, newSalary);

    if (!salaryUpdate) {
      return errorResponse(
        "setGoal: Goal updated, but salary could not be updated. error:error",
        400,
      );
    }

    return NextResponse.json(
      { message: "Goal and salary updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error ig setGoal POST", error);
    return errorResponse("Internal server error", 500);
  }
}
