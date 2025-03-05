import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "deleteCategory: Cannot complete request, id is required.",
        },
        { status: 400 },
      );
    }

    const deleteCategory = await xata.db.budget.delete(id);

    if (!deleteCategory) {
      return NextResponse.json(
        {
          message: `deleteCategory: Cannot complete request, unable to find category with id: ${id}.`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message:
          "deleteCategory: Request completed, category successfully deleted.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "deleteCategory: Cannot complete request, internal server error.",
      error,
    );
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
