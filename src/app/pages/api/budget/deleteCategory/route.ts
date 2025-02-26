import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "deleteCategory: id is required",
        },
        { status: 400 },
      );
    }

    const deleteCategory = await xata.db.budget.delete(id);
    console.log('deleteCategory', deleteCategory);
    
    if (!deleteCategory) {
      return NextResponse.json(
        {message: 'deleteCategory: Unable to delete category'},
        {status: 400}
      )
    }

    return NextResponse.json(
      { message: "deleteCategory: Category successfully deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("deleteCategory: Unable to delete category", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
