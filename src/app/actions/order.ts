"use server"

import { Image } from "types";
import { z } from "zod";
import { orderSchema } from "~/lib/schemas/order";
import { db } from "~/server/db";
import { orders } from "~/server/db/schema";
import { createId } from '@paralleldrive/cuid2';
import { calcImagePrice } from "~/lib/utils";
import { BASE_PRICE } from "~/lib/constants";



export async function CreateOrder(values: z.infer<typeof orderSchema>, images: Image[]) {

    const price = calcImagePrice(images) + BASE_PRICE

    const newOrder = await db.insert(orders).values({
        id: createId(),
        email: values.email,
        title: values.title,
        background: values.background,
        text_color: values.text_color,
        phone_number: values.phone_number,
        extra_details: values.details,
        price: price,
        images: images,
    })
}
