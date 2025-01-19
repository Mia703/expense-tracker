import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  try {
    const { id, sub_name, sub_frequency, sub_date, sub_amount } =
      await request.json();

    if (!id || !sub_name || !sub_frequency || !sub_date || sub_amount < 0) {
      return NextResponse.json(
        {
          message:
            "addSub: id, name, frequency, date, and amount are required.",
        },
        { status: 400 },
      );
    }

    const getSubscription = await xata.db.subscriptions
      .filter({
        "user.id": id,
        subscription_name: sub_name,
      })
      .getFirst();

    if (!getSubscription) {
      const addSubscription = await xata.db.subscriptions.create({
        user: id,
        subscription_name: sub_name,
        subscription_frequency: sub_frequency,
        next_payment_date: sub_date,
        subscription_amount: sub_amount,
      });

      if (!addSubscription) {
        return NextResponse.json(
          { message: "addSub: Add subscription un-successful." },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { message: "addSub: Add subscription successful" },
        { status: 200 },
      );
    }

    const updateSubscription = await getSubscription.update({
      subscription_frequency: sub_frequency,
      next_payment_date: sub_date,
      subscription_amount: sub_amount,
    });

    if (!updateSubscription) {
      return NextResponse.json(
        { message: "addSub: Update subscription un-successful." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "addSub: Add subscription successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("addSub: Error submitting subscription info", error);
    return NextResponse.json(
      {
        message: "addSub: Internal server error.",
      },
      { status: 500 },
    );
  }
}
