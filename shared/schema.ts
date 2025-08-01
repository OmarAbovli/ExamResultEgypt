import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const examResults = pgTable("exam_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  seatNumber: text("seat_number").notNull(),
  score: decimal("score", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertExamResultSchema = createInsertSchema(examResults).pick({
  fullName: true,
  seatNumber: true,
  score: true,
});

export type InsertExamResult = z.infer<typeof insertExamResultSchema>;
export type ExamResult = typeof examResults.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
