import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, salary, payday } = await request.json();

    if (!id || salary < 0 || !payday) {
      return NextResponse.json(
        {
          message:
            "setSalary: Cannot complete request, id, salary, and payday are required.",
        },
        { status: 400 },
      );
    }

    const findSalary = await xata.db.salary
      .filter({
        "user.id": id,
        payday,
      })
      .getFirst();

    const setSalary = await xata.db.salary.createOrUpdate(findSalary?.id, {
      salary,
      user: id,
      payday,
    });

    if (!setSalary) {
      return NextResponse.json(
        {
          message:
            "setSalary: Cannot complete request, cannot find current salary record.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message:
            "setSalary: Request completed, set or update salary successful.",
          id: setSalary.id,
          salary: setSalary.salary,
          payday: setSalary.payday,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "setSalary: Cannot complete request, internal server error.",
      error,
    );
    return NextResponse.json(
      {
        message: "setSalary: Internal server error.",
      },
      { status: 500 },
    );
  }
}
