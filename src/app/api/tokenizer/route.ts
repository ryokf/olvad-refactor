
import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET ?? '',
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request: Request) {
    const {price} = await request.json()

    const id = new Date().getTime().toString()

    const parameter = {
        transaction_details: {
            order_id: id,
            gross_amount: price
        }
    }

    const token = await snap.createTransaction(parameter)
    console.log(token)
    return NextResponse.json(token)
}