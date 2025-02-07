import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getMyOrders } from "@/sanity/helpers";

export async function GET() {
    try {
        const user = await currentUser();
        const { userId } = await auth();
        let orders = [];

        if (userId) {
            orders = await getMyOrders(userId);
        }

        return NextResponse.json({ user, orders });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
}
