const { neon } = require('@neondatabase/serverless');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, seatNumber } = req.body;

    if (!fullName || !seatNumber) {
      return res.status(400).json({ error: 'اسم كامل ورقم الجلوس مطلوبان' });
    }

    // Try to connect to Supabase database
    let result = null;
    
    try {
      const sql = neon(process.env.DATABASE_URL);
      
      // Check if result exists
      const existingResults = await sql`
        SELECT * FROM exam_results 
        WHERE full_name = ${fullName} AND seat_number = ${seatNumber}
      `;

      if (existingResults.length > 0) {
        result = existingResults[0];
      } else {
        // Generate new random score
        const score = parseFloat((Math.random() * 45 + 50).toFixed(2));
        
        // Insert new result
        const newResults = await sql`
          INSERT INTO exam_results (full_name, seat_number, score)
          VALUES (${fullName}, ${seatNumber}, ${score})
          RETURNING *
        `;
        
        result = newResults[0];
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Fallback to generating random score without database
      result = {
        id: Math.random().toString(36).substr(2, 9),
        full_name: fullName,
        seat_number: seatNumber,
        score: parseFloat((Math.random() * 45 + 50).toFixed(2)),
        created_at: new Date().toISOString()
      };
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};