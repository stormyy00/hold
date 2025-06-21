// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  uuid,
  integer,
  unique,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const folders = createTable("folders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 128 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// LINKS TABLE
export const links = createTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  folderId: uuid("folder_id").references(() => folders.id),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  domain: text("domain"),
  tags: text("tags"), // comma-separated or can switch to text[]
  openedCount: integer("opened_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const accounts = createTable(
  "account",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    accountId: varchar("accountId", { length: 255 }).notNull(),
    providerId: varchar("providerId", { length: 255 }).notNull(),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt", {
      mode: "date",
      withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt", {
      mode: "date",
      withTimezone: true,
    }),
    scope: varchar("scope", { length: 255 }),
    idToken: text("idToken"),
    createdAt: timestamp("createdAt", {
      mode: "date",
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", {
      mode: "date",
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (account) => ({
    userIdIdx: index("account_user_id_idx").on(account.userId),
    providerAccountUnique: unique("provider_account_unique").on(
      account.providerId,
      account.accountId,
    ),
  }),
);

// export const accountsRelations = relations(accounts, ({ one }) => ({
//   user: one(users, { fields: [accounts.userId], references: [users.id] }),
// }));

export const sessions = createTable(
  "session",
  {
    id: varchar("id", { length: 255 }).primaryKey(),

    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),

    token: varchar("token", { length: 255 }).notNull(),
    ipAddress: varchar("ipAddress", { length: 255 }),

    userAgent: varchar("userAgent", { length: 255 }),
    expiresAt: timestamp("expiresAt", {
      mode: "date",
      withTimezone: true,
    }).notNull(),

    createdAt: timestamp("createdAt", {
      mode: "date",
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updatedAt", {
      mode: "date",
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});
