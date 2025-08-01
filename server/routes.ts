import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertExamResultSchema } from "@shared/schema";
import { z } from "zod";

const examQuerySchema = z.object({
  fullName: z.string().min(1, "الاسم الرباعي مطلوب"),
  seatNumber: z.string().min(1, "رقم الجلوس مطلوب").regex(/^\d+$/, "رقم الجلوس يجب أن يحتوي على أرقام فقط"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get or create exam result
  app.post("/api/exam-results", async (req, res) => {
    try {
      console.log("Received exam query request:", req.body);
      const { fullName, seatNumber } = examQuerySchema.parse(req.body);
      console.log("Validated data:", { fullName, seatNumber });

      // Check if result already exists
      const existingResult = await storage.getExamResult(fullName, seatNumber);
      console.log("Existing result found:", existingResult ? "Yes" : "No");
      
      if (existingResult) {
        console.log("Returning existing result:", existingResult);
        return res.json(existingResult);
      }

      // Generate random score between 50.00 and 95.00
      const score = (Math.random() * (95 - 50) + 50).toFixed(2);
      console.log("Generated new score:", score);

      // Create new result
      const newResult = await storage.createExamResult({
        fullName,
        seatNumber,
        score,
      });
      console.log("Created new result:", newResult);

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

  const httpServer = createServer(app);
  return httpServer;
}
