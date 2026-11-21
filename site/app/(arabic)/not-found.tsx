import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site not-found-page" dir="rtl">
      <div className="noise" aria-hidden="true" />
      <section className="not-found-card">
        <span className="not-found-code">404</span>
        <span className="brand-mark not-found-logo"><img src="/hassn-logo.png" alt="HASSN EDITOR" width="92" height="72" /></span>
        <p className="eyebrow">PAGE NOT FOUND</p>
        <h1>هذه اللقطة غير موجودة</h1>
        <p>قد يكون الرابط قد تغيّر أو تمت كتابة العنوان بصورة غير صحيحة. يمكنك العودة للرئيسية أو مشاهدة الأعمال.</p>
        <div className="not-found-actions">
          <Link prefetch={false} className="primary-button" href="/">العودة للرئيسية <span>↗</span></Link>
          <Link prefetch={false} className="secondary-button" href="/works">مشاهدة أعمالي <span>↗</span></Link>
        </div>
      </section>
    </main>
  );
}
