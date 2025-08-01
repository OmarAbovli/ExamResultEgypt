// Vercel Serverless Function
import express from "express";
import { z } from "zod";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, text, varchar, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { eq, or, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

// Schema
const examResults = pgTable("exam_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  seatNumber: text("seat_number").notNull(),
  score: decimal("score", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

const insertExamResultSchema = createInsertSchema(examResults).pick({
  fullName: true,
  seatNumber: true,
  score: true
});

const examQuerySchema = z.object({
  fullName: z.string().min(1, "الاسم الرباعي مطلوب"),
  seatNumber: z.string().min(1, "رقم الجلوس مطلوب").regex(/^\d+$/, "رقم الجلوس يجب أن يحتوي على أرقام فقط")
});

// Database connection
let db = null;
let pool = null;

async function initializeDatabase() {
  if (db) return db;
  
  try {
    // Use DATABASE_URL from environment
    const connectionString = process.env.DATABASE_URL || "postgresql://postgres:Qwer%4004034550590103321153201551978306%23@db.ptiwmmowijyhxdjnewel.supabase.co:5432/postgres";
    
    pool = new pg.Pool({
      connectionString,
      ssl: { rejectUnauthorized: false }
    });
    
    db = drizzle(pool);
    
    // Create table if not exists
    await pool.query(`CREATE TABLE IF NOT EXISTS exam_results (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      full_name TEXT NOT NULL,
      seat_number TEXT NOT NULL,
      score DECIMAL(5,2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );`);
    
    console.log("Database connection successful");
    return db;
  } catch (error) {
    console.error("Database connection failed:", error);
    return null;
  }
}

// Storage classes
class DatabaseStorage {
  async getExamResult(fullName, seatNumber) {
    const database = await initializeDatabase();
    if (!database) throw new Error("Database not connected");
    
    const results = await database.select().from(examResults).where(
      or(
        eq(examResults.fullName, fullName),
        eq(examResults.seatNumber, seatNumber)
      )
    ).limit(1);
    
    return results[0];
  }

  async createExamResult(insertResult) {
    const database = await initializeDatabase();
    if (!database) throw new Error("Database not connected");
    
    const results = await database.insert(examResults).values(insertResult).returning();
    return results[0];
  }
}

class MemStorage {
  constructor() {
    this.examResults = new Map();
  }

  async getExamResult(fullName, seatNumber) {
    const found = Array.from(this.examResults.values()).find(
      (result) => result.fullName === fullName || result.seatNumber === seatNumber
    );
    return found;
  }

  async createExamResult(insertResult) {
    const id = randomUUID();
    const result = {
      ...insertResult,
      id,
      createdAt: new Date()
    };
    this.examResults.set(id, result);
    return result;
  }
}

class HybridStorage {
  constructor() {
    this.memStorage = new MemStorage();
    this.dbStorage = new DatabaseStorage();
  }

  async getExamResult(fullName, seatNumber) {
    try {
      return await this.dbStorage.getExamResult(fullName, seatNumber);
    } catch (error) {
      console.log("Database query failed, using memory storage");
      return await this.memStorage.getExamResult(fullName, seatNumber);
    }
  }

  async createExamResult(result) {
    try {
      return await this.dbStorage.createExamResult(result);
    } catch (error) {
      console.log("Database insert failed, using memory storage");
      return await this.memStorage.createExamResult(result);
    }
  }
}

const storage = new HybridStorage();

// Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API route
app.post("/api/exam-results", async (req, res) => {
  try {
    const { fullName, seatNumber } = examQuerySchema.parse(req.body);
    
    const existingResult = await storage.getExamResult(fullName, seatNumber);
    
    if (existingResult) {
      return res.json(existingResult);
    }

    const score = (Math.random() * (95 - 50) + 50).toFixed(2);
    
    const newResult = await storage.createExamResult({
      fullName,
      seatNumber,
      score
    });
    
    res.json(newResult);
  } catch (error) {
    console.error("Error in exam-results endpoint:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0]?.message || "بيانات غير صحيحة"
      });
    }
    res.status(500).json({ message: "حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى." });
  }
});

// For other routes, serve static files or handle SPA routing
app.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;