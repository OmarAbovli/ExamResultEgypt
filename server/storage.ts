import { type ExamResult, type InsertExamResult, examResults } from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, or } from "drizzle-orm";
import { randomUUID } from "crypto";
import pg from "pg";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";

export interface IStorage {
  getExamResult(fullName: string, seatNumber: string): Promise<ExamResult | undefined>;
  createExamResult(result: InsertExamResult): Promise<ExamResult>;
}

// Database connection with error handling
let db: any = null;
let pool: pg.Pool | null = null;

async function initializeDatabase() {
  try {
    if (process.env.DATABASE_URL) {
      console.log("Connecting to database with pg...");
      
      // Parse the DATABASE_URL to create proper connection config
      const connectionString = process.env.DATABASE_URL;
      pool = new pg.Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
      });
      
      db = drizzlePg(pool);
      console.log("Database connection successful");
      
      // Test the connection and create tables if they don't exist
      await pool.query(`CREATE TABLE IF NOT EXISTS exam_results (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name TEXT NOT NULL,
        seat_number TEXT NOT NULL,
        score DECIMAL(5,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );`);
      console.log("Database tables initialized");
    }
  } catch (error) {
    console.error("Database connection failed:", error);
    db = null;
    pool = null;
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
    console.log("MemStorage initialized");
  }

  async getExamResult(fullName: string, seatNumber: string): Promise<ExamResult | undefined> {
    const found = Array.from(this.examResults.values()).find(
      (result) => result.fullName === fullName || result.seatNumber === seatNumber,
    );
    console.log(`MemStorage: Searching for ${fullName} or ${seatNumber}, found:`, found ? "Yes" : "No");
    console.log("MemStorage: Current stored results:", this.examResults.size);
    return found;
  }

  async createExamResult(insertResult: InsertExamResult): Promise<ExamResult> {
    const id = randomUUID();
    const result: ExamResult = { 
      ...insertResult, 
      id,
      createdAt: new Date()
    };
    this.examResults.set(id, result);
    console.log(`MemStorage: Created new result for ${result.fullName} with score ${result.score}`);
    console.log("MemStorage: Total stored results:", this.examResults.size);
    return result;
  }
}

// Create a hybrid storage that handles database connection issues gracefully
class HybridStorage implements IStorage {
  private memStorage = new MemStorage();
  private dbStorage = new DatabaseStorage();

  async getExamResult(fullName: string, seatNumber: string): Promise<ExamResult | undefined> {
    try {
      if (db) {
        return await this.dbStorage.getExamResult(fullName, seatNumber);
      }
    } catch (error) {
      console.log("Database query failed, using memory storage");
    }
    return await this.memStorage.getExamResult(fullName, seatNumber);
  }

  async createExamResult(result: InsertExamResult): Promise<ExamResult> {
    try {
      if (db) {
        return await this.dbStorage.createExamResult(result);
      }
    } catch (error) {
      console.log("Database insert failed, using memory storage");
    }
    return await this.memStorage.createExamResult(result);
  }
}

export const storage = new HybridStorage();
console.log("Using HybridStorage (database preferred, memory fallback)");
