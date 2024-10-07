import { z } from "zod";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

export const orderSchema = z.object({
    title: z.string(),
    details: z.string().default("").optional(),
    background: z.string().default("Vit"),
    text_color: z.string().default("Svart"),
    email: z.string().email(),
    phone_number: z.string().regex(phoneRegex),
    // images: z.object({
    //   url: z.string(),
    //   key: z.string(),
    // }).array()
})