// Note: We're not using @supabase/supabase-js as per blueprint guidelines
// Instead, we'll use the backend API endpoints for database operations

export const SUPABASE_TOKEN = "sbp_7c41e8dbc23169c2762b100643110a526562e74b";

// Database operations will be handled through our Express API
export const submitExamQuery = async (fullName: string, seatNumber: string) => {
  const response = await fetch("/api/exam-results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, seatNumber }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "حدث خطأ غير متوقع");
  }

  return response.json();
};
