import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, type } = await request.json();

    if (!id || !type) {
      return NextResponse.json(
        {
          message:
            "getPercentages: Cannot complete request, id and type are required.",
        },
        { status: 400 },
      );
    }

    const getPercentages = await xata.db.budget
      .filter({
        "user.id": id,
        type,
      })
      .getMany();

    if (!getPercentages) {
      return NextResponse.json(
        {
          message: {
            message: `getPercentages: Cannot complete request, unable to get percentages of type ${type}.`,
            total: 0,
          },
        },
        { status: 404 },
      );
    }

    let total = 0;
    getPercentages.forEach((item) => {
      total += item.percentage;
    });

    return NextResponse.json(
      {
        message: {
          message: `getPercentages: Request completed, total percentage of type ${type} successfully calculated.`,
          total,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "getPercentages: Cannot complete request, internal server error.",
      error,
    );
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
