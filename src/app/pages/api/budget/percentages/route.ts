import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, type } = await request.json();

    if (!id || !type) {
      return NextResponse.json(
        { message: "percentages: id and type is required" },
        { status: 400 },
      );
    }

    const getPercentages = await xata.db.budget
      .filter({
        "user.id": id,
        type,
      })
      .getMany();

    let total = 0;
    if (!getPercentages) {
      return NextResponse.json({
        message: {
          message: "getPercentages: Unable to get percentages",
          total,
        },
      });
    }

    getPercentages.forEach((item) => {
      total += item.percentage;
    });

    return NextResponse.json({
      message: {
        message: "getPercentages: Get percentage total successful",
        total,
      },
    });
  } catch (error) {
    console.error("percentages: Error getting total budget percentages", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
