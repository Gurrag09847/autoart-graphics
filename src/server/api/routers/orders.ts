
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { z } from "zod";
import { createTRPCRouter, protectedAdminProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { orders } from "~/server/db/schema";

const utapi = new UTApi();

export const orderRouter = createTRPCRouter({
    getOrders: protectedAdminProcedure.query(async() => {
        const orderss = await db.query.orders.findMany();

        return orderss
    }),
    deleteOrder: protectedAdminProcedure.input(z.object({
        orderId: z.string()
    })).mutation(async({ input }) => {
        const { orderId } = input;

        const deletedOrder = await db.delete(orders).where(eq(orders.id, orderId)).returning();
        const imageKeys = deletedOrder[0]?.images?.map(img => img.key)
        if (imageKeys && imageKeys.length > 0) {
            await utapi.deleteFiles(imageKeys)
        }
    })
});