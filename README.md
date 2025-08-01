# موقع نتيجة الثانوية العامة المصرية

موقع ساخر لنتائج الثانوية العامة المصرية مع واجهة عربية كاملة وإعلانات Google AdSense.

## المميزات

- 🎓 واجهة عربية كاملة وسهلة الاستخدام
- 📱 متوافق مع الجوال (Responsive Design)
- 🎯 إعلانات Google AdSense في أماكن استراتيجية
- 🗄️ قاعدة بيانات Supabase للحفظ الدائم
- ⚡ نشر سريع على Vercel

## التقنيات المستخدمة

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- TanStack Query

### Backend
- Express.js (Serverless Functions)
- PostgreSQL (Supabase)
- Drizzle ORM
- Zod للتحقق من البيانات

## التشغيل المحلي

1. **تنزيل المشروع**
   ```bash
   git clone <your-repo-url>
   cd egyptian-exam-results
   ```

2. **تثبيت الحزم**
   ```bash
   npm install
   ```

3. **تشغيل المشروع**
   ```bash
   npm run dev
   ```

4. **فتح المتصفح**
   ```
   http://localhost:5000
   ```

## النشر على Vercel

### الخطوة 1: رفع على GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### الخطوة 2: ربط مع Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. اختر "New Project"
3. اربط GitHub repository
4. اضغط "Deploy"

### الخطوة 3: إضافة متغيرات البيئة
في إعدادات المشروع في Vercel أضف:
```
DATABASE_URL = postgresql://postgres:your-password@your-db-host:5432/postgres
NODE_ENV = production
```

## إعداد Google AdSense

1. **إنشاء حساب AdSense**
   - اذهب إلى [Google AdSense](https://www.google.com/adsense/)
   - قدم طلب للموافقة على موقعك

2. **تحديث رموز الإعلانات**
   - في `client/index.html`: استبدل `ca-pub-XXXXXXXXXX`
   - في `client/src/components/AdSense.tsx`: استبدل أرقام الإعلانات

3. **أماكن الإعلانات**
   - إعلان بانر علوي: 728x90
   - إعلان جانبي: 300x250  
   - إعلان بانر سفلي: 728x90

## هيكل المشروع

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── pages/         # App Pages
│   │   └── lib/           # Utilities
│   └── dist/              # Built files
├── api/                   # Vercel Serverless Functions
│   ├── index.js          # Main API handler
│   └── package.json      # API dependencies
├── server/               # Development server (Replit)
├── shared/               # Shared types/schemas
├── vercel.json          # Vercel configuration
└── ADSENSE_SETUP.md     # دليل إعداد الإعلانات
```

## المساهمة

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للـ branch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## الترخيص

MIT License - يمكنك استخدام المشروع كما تشاء.

## الدعم

للأسئلة والمساعدة، يمكنك فتح Issue في GitHub.

---

تم تطوير المشروع باستخدام Replit و Vercel ❤️