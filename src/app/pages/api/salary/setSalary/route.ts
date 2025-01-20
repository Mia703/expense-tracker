import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, salary, payday } = await request.json();

    if (!id || salary < 0 || !payday) {
      return NextResponse.json(
        { message: "addSalary: id and payday are required" },
        { status: 400 },
      );
    }

    const addSalary = await xata.db.salary.create({
      salary: salary,
      user: id,
      payday: payday,
    });

    if (!addSalary) {
      return NextResponse.json(
        { message: "addSalary: New salary creation un-successful" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "addSalary: New salary creation successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("addSalary: Error submitting init salary info", error);
    return NextResponse.json(
      {
        message: "addSalary: Internal server error.",
      },
      { status: 500 },
    );
  }
}
