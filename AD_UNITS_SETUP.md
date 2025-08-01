# دليل إنشاء وحدات الإعلانات في Google AdSense

## الخطوات السريعة لإنشاء ad units:

### 1. الدخول إلى حساب AdSense
1. اذهب إلى [Google AdSense](https://www.google.com/adsense/)
2. سجل دخولك بالحساب المرتبط برقم: `ca-pub-4994973818889629`

### 2. إنشاء وحدات الإعلانات

#### أ) الإعلان العلوي (Top Banner)
1. اختر **Ads** > **By ad unit** > **Display ads**
2. أدخل:
   - **Name**: "Egyptian Exam Results - Top Banner"
   - **Size**: 728 x 90 (Leaderboard)
   - **Ad type**: Display ads
3. اضغط **Create**
4. انسخ الرقم من الكود واستبدل `"1234567890"` في AdSense.tsx

#### ب) الإعلان الجانبي (Sidebar)
1. اختر **Ads** > **By ad unit** > **Display ads**
2. أدخل:
   - **Name**: "Egyptian Exam Results - Sidebar"
   - **Size**: 300 x 250 (Medium Rectangle)
   - **Ad type**: Display ads
3. اضغط **Create**
4. انسخ الرقم من الكود واستبدل `"2345678901"` في AdSense.tsx

#### ج) الإعلان السفلي (Bottom Banner)
1. اختر **Ads** > **By ad unit** > **Display ads**
2. أدخل:
   - **Name**: "Egyptian Exam Results - Bottom Banner"
   - **Size**: 728 x 90 (Leaderboard)
   - **Ad type**: Display ads
3. اضغط **Create**
4. انسخ الرقم من الكود واستبدل `"3456789012"` في AdSense.tsx

### 3. كيفية العثور على رقم Ad Unit

من كود AdSense، ابحث عن:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4994973818889629"
     data-ad-slot="1234567890"  <-- هذا هو الرقم المطلوب
     data-ad-format="auto"></ins>
```

### 4. تحديث الأرقام في الكود

في ملف `client/src/components/AdSense.tsx`:

```typescript
// مكون للإعلان البانر العلوي (728x90)
export function TopBannerAd() {
  return (
    <AdSense
      adSlot="رقم_الإعلان_العلوي_هنا" // استبدل هذا
      width={728}
      height={90}
      className="mx-auto"
    />
  );
}

// مكون للإعلان الجانبي (300x250)
export function SidebarAd() {
  return (
    <AdSense
      adSlot="رقم_الإعلان_الجانبي_هنا" // استبدل هذا
      width={300}
      height={250}
      className="mx-auto"
    />
  );
}

// مكون للإعلان السفلي (728x90)
export function BottomBannerAd() {
  return (
    <AdSense
      adSlot="رقم_الإعلان_السفلي_هنا" // استبدل هذا
      width={728}
      height={90}
      className="mx-auto"
    />
  );
}
```

### 5. نصائح مهمة:

- **التفعيل**: قد تحتاج الإعلانات 24-48 ساعة لتظهر
- **الموافقة**: تأكد من أن موقعك معتمد في AdSense
- **المحتوى**: احرص على وجود محتوى كافي وأصلي
- **Traffic**: كلما زاد عدد الزوار، زادت الأرباح

### 6. اختبار الإعلانات:

بعد التحديث:
1. ارفع التغييرات على GitHub
2. أعد النشر على Vercel
3. تفقد الموقع للتأكد من ظهور الإعلانات
4. استخدم أدوات مطور المتصفح للتحقق من تحميل AdSense

### 7. مراقبة الأرباح:

- راقب الأداء من لوحة تحكم AdSense
- تحقق من معدل النقر (CTR) والأرباح
- جرب مواضع مختلفة للإعلانات لتحسين الأداء