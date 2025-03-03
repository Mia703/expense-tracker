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
            "getCategory: Cannot complete request, id and type are required",
        },
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
          message: {
            message: `getCategory: Cannot complete request, categories of type ${type} do not exist.`,
          },
          data: [],
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: {
          message: `getCategory: Request completed, successfully got categories of type ${type}.`,
          data: JSON.stringify(getCategory),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "getCategory: Cannot complete request, internal server error.",
      error,
    );
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
