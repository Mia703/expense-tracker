import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, salary, frequency, date } = await request.json();

    if (!id || salary < 0 || !frequency || !date) {
      return NextResponse.json(
        { message: "id, salary, frequency, and date are required" },
        { status: 400 },
      );
    }

    const addSalary = await xata.db.salary.create({
      salary: salary,
      start_date: date,
      user: id,
      frequency: frequency,
    });

    if (!addSalary) {
      return NextResponse.json(
        { message: "New salary creation un-successful" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "New salary creation successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting init salary info", error);
  }
}
