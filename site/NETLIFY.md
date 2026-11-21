# تشغيل Hassn Editor ونشره يدويًا على Netlify

هذا المجلد هو مصدر نسخة Netlify المبنية بـNext.js. اتبع الخطوات من داخله. يحتوي المجلد `reference/chatgpt-sites-v89/` المرفق خارج هذا المجلد على مصدر الاستضافة السابقة كما كان عند آخر إصدار، للمراجعة فقط.

## التعديل والبناء

استخدم Node.js 22.13 أو أحدث وPython 3. ثبّت الاعتمادات المقفلة ثم افتح خادم التطوير.

```sh
npm ci
npm run dev:netlify
```

افتح `http://localhost:3000` في المتصفح. أوقف خادم التطوير قبل بناء النسخة النهائية.

```sh
npm run build:netlify
python scripts/package-netlify.py ../Hassn-Editor-Netlify-Production.zip
python scripts/serve-netlify.py
```

على Windows استخدم `py -3` بدل `python` إذا كان Python Launcher هو المتاح. يمكن تشغيل خادم المعاينة من منفذ مغاير عبر `--port 8765`. يعرض الخادم ملفات `out/` ويفهم المسارات الداخلية من دون لاحقة `.html`، ويحاكي ترويسات الرفع على المضيف المحلي. اختبر أيضًا `/en` و`/works` وصفحة عمل والسيرة الإنجليزية وملفات SEO. أمر `npm test` الأصلي واختبارات `dist/server/index.js` تخص بنية Worker السابقة. اختبار WARD المستقل متاح عبر `node --test tests/ward-connection.test.mjs`.

## نشر إصدار جديد

- راجع الحزمة وأبقِ نسخة آخر نشر ناجح. ملف `index.html` وملفا `_headers` و`_redirects` يجب أن تكون في جذر ZIP.
- ارفع الحزمة عبر [Deploys للمشروع الحالي](https://app.netlify.com/projects/super-starship-575de0/deploys)، ثم اختر **browse files to upload** وتحقق من **Published** في صف الإصدار الجديد. فعّل وضع المعاينة محليًا أو استخدم نشر Netlify CLI من دون `--prod` إذا رغبت في اختبار نسخة مستضافة قبل التحديث العام.
- معرّف المشروع `6de0a217-d7a6-4541-bd6f-477c1e958c59`. الدومين مربوط بالمشروع. حافظ على سجلاته الحالية.
- تحقق من [الرئيسية](https://hassneditor.com/)، [المعرض](https://hassneditor.com/works) و[السيرة](https://hassneditor.com/hassn-editor-cv-en.pdf). اختبر فيديو محليًا وعينة YouTube وWhatsApp وتحويل `www` وفهرسة النسخة العامة.
- يمكن إنشاء ZIP للمعاينة بإضافة `--preview` إلى أمر التجميع. تضيف هذه الحزمة `X-Robots-Tag: noindex` وتعرض المحتوى على عنوان المعاينة. استخدم حزمة الإنتاج للنشر على النطاق الرئيسي.

## الرجوع

من **Deploys** افتح الإصدار الإنتاجي السابق المعروف بسلامته واستخدم **Publish deploy** إذا ظهر. إذا احتجت استعادة من ملف فحمّل ZIP الإنتاج المحفوظ إلى المشروع نفسه. الإصدار التجريبي الأول كان يحمل `noindex`. تستخدم عملية التراجع عن إصدار Netlify إعدادات الدومين وHTTPS الحالية. يتناول ملف DNS المرفق العودة إلى الاستضافة القديمة إذا استدعت المشكلة ذلك.
