import z from "zod";

export const userZodSchema = z.object({
  phoneNumber: z.string().min(10),
  blanace: z.number(),
  role: z.string(),
});

export const intiateOrderZodSchema = z.object({
  event_id: z.number(),
  l1_expected_price: z.number().min(0.1, {
    message: "Order quantity must be a positive integer",
  }),
  l1_order_quantity: z.number().min(0.1, {
    message: "Order quantity must be a positive integer",
  }),
  offer_type: z.enum(["buy", "sell"]),
  order_type: z.enum(["LO", "MO"]),
});

export const orderbookZodSchema = z.object({});
