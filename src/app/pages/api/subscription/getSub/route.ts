import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

		if (!id) {
			return NextResponse.json(
				{message: 'getSub: id is required.'},
				{status: 400}
			)
		}

		const getSubscription = await xata.db.subscriptions.filter({
			'user.id': id,
		}).sort('next_payment_date', 'desc').getAll();

		if (!getSubscription) {
			return NextResponse.json(
				{message: 'getSub: Get subscriptions un-successful'},
				{status: 400}
			)
		}

		return NextResponse.json(
			{message: JSON.stringify(getSubscription)},
			{status: 200}
		)
  } catch (error) {
    console.error("getSub: Error submitting get sub info", error);
    return NextResponse.json(
      { message: "getSub: Internal server error." },
      { status: 500 },
    );
  }
}
