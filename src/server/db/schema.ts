// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  json,
  jsonb,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { Image } from "types";

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
    images: jsonb("images").$type<Image[]>(),
    background: text("background").default("white"),
    text_color: text("text_color").default("black")
  }
)

// export const posts = createTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date()
//     ),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );
