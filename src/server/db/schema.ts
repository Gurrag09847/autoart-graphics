// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { InferSelectModel } from "drizzle-orm";
import {
  decimal,
  jsonb,
  pgEnum,
  pgTableCreator,
  text,
  timestamp
} from "drizzle-orm/pg-core";
import type { Image } from "types";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `autoart-graphics_${name}`);

export const orders = createTable(
  "order",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    phone_number: text("phone_number"),
    title: text("title").notNull(),
    extra_details: text("details"),
    images: jsonb("images").$type<Image[]>().default([]),
    background: text("background").default("white"),
    text_color: text("text_color").default("black"),
    created_at: timestamp("created_at").defaultNow(),
    price: decimal("price", {
      precision: 12,
      scale: 2,
    }),
  }
)

export const userRole = pgEnum('role', ["user", "admin"]);

export const users = createTable(
  "user",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    password: text("password").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    role: userRole("role").default("user")
  }
)

export type Order = InferSelectModel<typeof orders>