import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, salary, payday } = await request.json();

		if (!id || salary <= 0 || !payday) {
      return NextResponse.json(
        { message: "setSalary: id, salary, payday are required" },
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
        { message: "setSalary: Set salary un-successful" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "setSalary: Set salary successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("setSalary: Error setting salary:", error);
    return NextResponse.json(
      {
        message: "setSalary: Internal server error.",
      },
      { status: 500 },
    );
  }
}
