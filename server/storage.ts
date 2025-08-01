import { type ExamResult, type InsertExamResult, examResults } from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, or } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getExamResult(fullName: string, seatNumber: string): Promise<ExamResult | undefined>;
  createExamResult(result: InsertExamResult): Promise<ExamResult>;
}

// Database connection with error handling
let db: any = null;
let sql: any = null;

async function initializeDatabase() {
  try {
    if (process.env.DATABASE_URL) {
      // Manually construct the correct database URL with encoded password
      const password = "Qwer@04034550590103321153201551978306#";
      const encodedPassword = encodeURIComponent(password);
      const cleanUrl = `postgresql://postgres:${encodedPassword}@db.ptiwmmowijyhxdjnewel.supabase.co:5432/postgres`;
      
      console.log("Connecting to database...");
      sql = neon(cleanUrl);
      db = drizzle(sql);
      console.log("Database connection successful");
      
      // Create tables if they don't exist
      await sql`CREATE TABLE IF NOT EXISTS exam_results (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name TEXT NOT NULL,
        seat_number TEXT NOT NULL,
        score DECIMAL(5,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );`;
      console.log("Database tables initialized");
    }
  } catch (error) {
    console.error("Database connection failed, falling back to in-memory storage:", error);
  }
}

// Initialize database connection
initializeDatabase();

export class DatabaseStorage implements IStorage {
  async getExamResult(fullName: string, seatNumber: string): Promise<ExamResult | undefined> {
    if (!db) throw new Error("Database not connected");
    
    const results = await db
      .select()
      .from(examResults)
      .where(
        or(
          eq(examResults.fullName, fullName),
          eq(examResults.seatNumber, seatNumber)
        )
      )
      .limit(1);
    
    return results[0];
  }

  async createExamResult(insertResult: InsertExamResult): Promise<ExamResult> {
    if (!db) throw new Error("Database not connected");
    
    const results = await db
      .insert(examResults)
      .values(insertResult)
      .returning();
    
    return results[0];
  }
}

export class MemStorage implements IStorage {
  private examResults: Map<string, ExamResult>;

  constructor() {
    this.examResults = new Map();
  }

  async getExamResult(fullName: string, seatNumber: string): Promise<ExamResult | undefined> {
    return Array.from(this.examResults.values()).find(
      (result) => result.fullName === fullName || result.seatNumber === seatNumber,
    );
  }

  async createExamResult(insertResult: InsertExamResult): Promise<ExamResult> {
    const id = randomUUID();
    const result: ExamResult = { 
      ...insertResult, 
      id,
      createdAt: new Date()
    };
    this.examResults.set(id, result);
    return result;
  }
}

// Use database storage if available, otherwise fallback to memory storage
export const storage = db ? new DatabaseStorage() : new MemStorage();
