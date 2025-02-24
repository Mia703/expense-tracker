import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, type } = await request.json();

    if (!id || !type) {
      return NextResponse.json(
        { message: "getCategory: id and type are required" },
        { status: 400 },
      );
    }

    const getCategory = await xata.db.budget
      .filter({
        "user.id": id,
        type,
      })
      .getMany();

    if (!getCategory) {
      return NextResponse.json(
        {
          message: { message: `getCategory: No categories of type ${type}` },
          data: [],
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: "getCategory: Successfully got categories",
          data: JSON.stringify(getCategory),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "getCategory: Unable to get category from budget table",
      error,
    );
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
