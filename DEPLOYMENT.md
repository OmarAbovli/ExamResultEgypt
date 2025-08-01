# نشر الموقع على Vercel

## إعداد قاعدة البيانات

الموقع يستخدم Supabase كقاعدة بيانات ويمكن نشره على Vercel بسهولة باستخدام Serverless Functions.

### خطوات النشر المُحدثة:

1. **رفع الملفات الجديدة على GitHub**
   ```bash
   git add .
   git commit -m "Added Vercel deployment configuration"
   git push origin main
   ```

2. **إنشاء مشروع جديد في Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - اختر "New Project"
   - اربط GitHub repository الخاص بك
   - اختر المشروع واضغط "Import"

3. **إعدادات النشر (تلقائية)**
   Vercel سيقرأ إعدادات vercel.json تلقائياً:
   ```
   Framework Preset: Other
   Build Command: cd client && npm install && npm run build
   Output Directory: client/dist
   Install Command: npm install && cd api && npm install
   ```

4. **إضافة متغيرات البيئة**
   في Project Settings > Environment Variables أضف:
   ```
   DATABASE_URL = postgresql://postgres:Qwer%4004034550590103321153201551978306%23@db.ptiwmmowijyhxdjnewel.supabase.co:5432/postgres
   NODE_ENV = production
   ```

5. **إعادة النشر**
   - اضغط "Redeploy" إذا لزم الأمر
   - انتظر اكتمال البناء

### الملفات المضافة للنشر:

- `vercel.json`: إعدادات Vercel الجديدة للبناء والنشر
- `api/index.js`: Serverless Function للـ backend API
- `api/package.json`: Dependencies خاصة بالـ API
- `client/package.json`: Dependencies خاصة بالـ frontend
- `client/vite.config.ts`: إعدادات Vite للبناء
- `client/tailwind.config.ts`: إعدادات Tailwind CSS
- `client/tsconfig.json`: إعدادات TypeScript

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