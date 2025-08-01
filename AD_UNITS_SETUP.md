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
4. ✅ **تم التحديث بالفعل**: `"2979454262"`

#### ب) الإعلان الجانبي (In-Article)
1. ✅ **تم الإعداد**: `"5556450486"`
2. النوع: In-Article Fluid
3. الإعدادات: `data-ad-format="fluid"` و `data-ad-layout="in-article"`

#### ج) الإعلان السفلي (Fluid Layout)
1. ✅ **تم الإعداد**: `"8300881944"`
2. النوع: Fluid Layout
3. الإعدادات: `data-ad-format="fluid"` و `data-ad-layout-key="-fb+5w+4e-db+86"`

### 3. كيفية العثور على رقم Ad Unit

من كود AdSense، ابحث عن:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4994973818889629"
     data-ad-slot="1234567890"  <-- هذا هو الرقم المطلوب
     data-ad-format="auto"></ins>
```

### 4. ✅ تم تحديث الأرقام في الكود

الكود الحالي في `client/src/components/AdSense.tsx`:

```typescript
// مكون للإعلان العلوي (Auto Format)
export function TopBannerAd() {
  return (
    <AdSense
      adSlot="2979454262" // ✅ محدث
      adFormat="auto"
      className="mx-auto block"
    />
  );
}

// مكون للإعلان الجانبي (In-Article)
export function SidebarAd() {
  return (
    <AdSense
      adSlot="5556450486" // ✅ محدث
      adFormat="fluid"
      adLayout="in-article"
      className="mx-auto block text-center"
    />
  );
}

// مكون للإعلان السفلي (Fluid Layout)
export function BottomBannerAd() {
  return (
    <AdSense
      adSlot="8300881944" // ✅ محدث
      adFormat="fluid"
      adLayoutKey="-fb+5w+4e-db+86"
      className="mx-auto block"
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