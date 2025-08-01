# نشر الموقع على Vercel

## إعداد قاعدة البيانات

الموقع يستخدم Supabase كقاعدة بيانات ويمكن نشره على Vercel بسهولة.

### خطوات النشر:

1. **إنشاء مشروع جديد في Vercel**
   - اربط مستودع GitHub الخاص بك
   - اختر إعدادات Next.js/React

2. **إضافة متغيرات البيئة في Vercel**
   ```
   DATABASE_URL=postgresql://postgres:Qwer%4004034550590103321153201551978306%23@db.ptiwmmowijyhxdjnewel.supabase.co:5432/postgres
   ```

3. **إعدادات البناء**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### ملاحظات مهمة:

- قاعدة البيانات ستعمل على Supabase أولاً، وإذا فشلت ستستخدم قاعدة بيانات Replit كبديل
- البيانات محفوظة في Supabase وستكون متاحة من أي منصة نشر
- الجداول تُنشأ تلقائياً عند أول اتصال

### اختبار الاتصال

يمكنك اختبار اتصال قاعدة البيانات من خلال:
```bash
npm run dev
```

وستظهر رسالة "Supabase database connection successful" في السجلات.