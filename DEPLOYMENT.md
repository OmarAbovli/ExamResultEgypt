# نشر الموقع على Vercel

## إعداد قاعدة البيانات

الموقع يستخدم Supabase كقاعدة بيانات ويمكن نشره على Vercel بسهولة باستخدام Serverless Functions.

### خطوات النشر السريع:

1. **رفع المشروع على GitHub**
   - اربط الـ repository مع GitHub
   - تأكد من وجود جميع الملفات الجديدة

2. **إنشاء مشروع جديد في Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - اختر "Import Project" 
   - اربط مستودع GitHub الخاص بك

3. **إعدادات النشر التلقائي**
   ```
   Framework Preset: Other
   Build Command: npm run build (سيتم تحديده تلقائياً)
   Output Directory: client/dist (سيتم تحديده تلقائياً)
   Install Command: npm install
   ```

4. **إضافة متغيرات البيئة**
   في قسم Environment Variables أضف:
   ```
   DATABASE_URL = postgresql://postgres:Qwer%4004034550590103321153201551978306%23@db.ptiwmmowijyhxdjnewel.supabase.co:5432/postgres
   NODE_ENV = production
   ```

### الملفات المضافة للنشر:

- `vercel.json`: إعدادات Vercel للـ routing والبناء
- `api/index.js`: Serverless Function للـ backend
- `api/package.json`: dependencies خاصة بالـ API

### كيف يعمل النشر:

1. **Frontend**: يتم بناؤه كـ static files في `client/dist`
2. **Backend**: يعمل كـ Serverless Function في `/api/index.js`
3. **Database**: يتصل بـ Supabase تلقائياً (مع memory fallback)
4. **Routing**: يتم توجيه `/api/*` للـ backend و باقي الطلبات للـ frontend

### استكشاف الأخطاء:

إذا واجهت مشاكل في النشر:

1. **مشكلة في البناء**: تأكد من أن `client/package.json` به script للـ build
2. **مشكلة في قاعدة البيانات**: تأكد من إضافة `DATABASE_URL` في Environment Variables
3. **مشكلة في API**: تحقق من logs في Vercel Dashboard

### اختبار المشروع محلياً:

```bash
# تشغيل المشروع للتطوير
npm run dev

# بناء المشروع للإنتاج (اختياري)
npm run build
```

### بعد النشر:

- الموقع سيكون متاح على رابط `.vercel.app`
- يمكنك ربط domain مخصص من إعدادات Vercel
- البيانات محفوظة في Supabase وتعمل عبر جميع المنصات