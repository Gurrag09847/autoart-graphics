
import { createTRPCRouter, protectedAdminProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";


export const orderRouter = createTRPCRouter({
    getOrders: protectedAdminProcedure.query(async() => {
        const orders = await db.query.orders.findMany();

        return orders
    })
});