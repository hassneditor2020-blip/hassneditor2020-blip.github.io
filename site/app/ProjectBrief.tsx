"use client";
import { useRef, useState, type FormEvent } from "react";
import { trackEvent as track } from "./analyticsEvents";

export default function ProjectBrief({ language = "ar", pageType = "home" }: { language?: "ar" | "en"; pageType?: "home" | "contact" }) {
  const lang = language;
  const en = lang === "en";
  const [brief, setBrief] = useState({ type: "", city: "remote", platform: "", materials: "", duration: "", quantity: "", revisions: "", deadline: "", details: "" });
  const briefStartedRef = useRef(false);
  const serviceLabels: Record<string, string> = {
    videography: en ? "Videography" : "تصوير فيديو",
    "content-production": en ? "Full content production" : "إنتاج محتوى متكامل",
    "video-editing": en ? "Video editing" : "مونتاج فيديو",
    "motion-graphics": en ? "Motion graphics" : "موشن جرافيك",
    "ai-cartoon-characters": en ? "AI cartoon characters" : "شخصيات كرتونية بالذكاء الاصطناعي",
    "ai-video": en ? "AI video" : "فيديو ذكاء اصطناعي",
    "web-app-design": en ? "Website & app design" : "تصميم مواقع وتطبيقات",
    "social-ad": en ? "Social media advertisement" : "إعلان للسوشيال ميديا",
  };
  const cityLabel = brief.city === "remote" ? (en ? "Remote" : "عن بُعد") : (({ Ajman: en ? "Ajman" : "عجمان", Sharjah: en ? "Sharjah" : "الشارقة", Dubai: en ? "Dubai" : "دبي" } as Record<string, string>)[brief.city] || brief.city);
  const sendBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = [
      [en ? "Service" : "الخدمة", serviceLabels[brief.type]],
      [en ? "Location" : "الموقع", cityLabel],
      [en ? "Deadline" : "موعد التسليم", brief.deadline],
      [brief.type === "web-app-design" ? (en ? "Digital product" : "نوع المشروع الرقمي") : (en ? "Platform" : "المنصة"), brief.platform],
      [en ? "Materials" : "المواد", brief.materials],
      [en ? "Video duration" : "مدة الفيديو", brief.duration],
      [en ? "Number of videos" : "عدد الفيديوهات", brief.quantity],
      [en ? "Revisions" : "التعديلات", brief.revisions],
      [en ? "Details" : "التفاصيل", brief.details],
    ];
    const greeting = en ? "Hello Hassn, I would like to start a new project." : "مرحبًا حسن، أرغب في طلب مشروع جديد.";
    const source = `${en ? "Website page" : "صفحة الموقع"}: https://hassneditor.com${window.location.pathname}`;
    const message = greeting + "\n\n" + fields.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join("\n") + "\n\n" + source;
    track("project_brief_submit", { project_type: brief.type, service: brief.type, city: brief.city, page_path: window.location.pathname });
    track("contact_intent", { method: "whatsapp", context: "project_brief", placement: "project_brief", service: brief.type, page_type: pageType, project_slug: "none", language: lang, page_path: window.location.pathname });
    window.open(`https://wa.me/971505918238?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
      <section className="brief-section" id="project-brief">
        <div className="brief-intro">
          <p className="eyebrow">START A PROJECT</p>
          <h2>{en ? "Tell me about your project" : "أخبرني عن مشروعك"}</h2>
          <p>{en ? "Three answers to start your request. Add more details whenever you’re ready." : "ثلاث إجابات لبدء الطلب، ويمكنك إضافة التفاصيل لاحقًا."}</p>
          <div className="brief-note"><span>✓</span>{en ? "No account or registration required" : "لا يحتاج إلى تسجيل أو إنشاء حساب"}</div>
        </div>
        <form id="project-brief-form" className="project-form is-open" onSubmit={sendBrief} onFocusCapture={() => { if (!briefStartedRef.current) { briefStartedRef.current = true; track("project_brief_start", { page_path: window.location.pathname }); } }}>
          <label>{en ? "1. Which service do you need?" : "1. ما الخدمة التي تحتاجها؟"}
            <select name="service" required value={brief.type} onChange={(event) => { const type = event.target.value; setBrief({ ...brief, type, city: type === "videography" && brief.city === "remote" ? "" : type === "web-app-design" ? "remote" : brief.city || "remote", platform: "", materials: "", duration: type === "web-app-design" ? "" : brief.duration, quantity: type === "web-app-design" ? "" : brief.quantity }); }}>
              <option value="">{en ? "Choose a service" : "اختر الخدمة"}</option>
              {Object.entries(serviceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <div className="form-row">
            <label>{brief.type === "web-app-design" ? (en ? "2. Work mode" : "2. طريقة العمل") : (en ? "2. Where will we work?" : "2. أين سيكون العمل؟")}
              <select name="city" required value={brief.city} onChange={(event) => setBrief({ ...brief, city: event.target.value })}>
                {brief.type !== "web-app-design" && <option value="">{en ? "Choose the filming city" : "اختر مدينة التصوير"}</option>}
                {brief.type !== "videography" && <option value="remote">{brief.type === "web-app-design" ? (en ? "Remote / online project" : "مشروع عن بُعد / أونلاين") : (en ? "Remote · editing & motion" : "عن بُعد · مونتاج وموشن")}</option>}
                {brief.type !== "web-app-design" && <><option value="Ajman">{en ? "Ajman" : "عجمان"}</option><option value="Sharjah">{en ? "Sharjah" : "الشارقة"}</option><option value="Dubai">{en ? "Dubai" : "دبي"}</option></>}
              </select>
            </label>
            <label>{en ? "3. When do you need it?" : "3. متى تحتاج التسليم؟"}
              <select name="deadline" required value={brief.deadline} onChange={(event) => setBrief({ ...brief, deadline: event.target.value })}>
                <option value="">{en ? "Choose a timeframe" : "اختر الموعد"}</option>
                <option>{en ? "Flexible · to be agreed" : "مرن · يُحدد بالاتفاق"}</option><option>{en ? "Within one week" : "خلال أسبوع"}</option><option>{en ? "Within two weeks" : "خلال أسبوعين"}</option><option>{en ? "Within one month" : "خلال شهر"}</option>
              </select>
            </label>
          </div>
          <p className="form-area-note">{brief.type === "web-app-design" ? (en ? "Website and app projects can be handled remotely from planning through launch." : "يمكن تنفيذ مشاريع المواقع والتطبيقات عن بُعد من التخطيط حتى الإطلاق.") : (en ? "Filming in Ajman, Sharjah and Dubai by prior appointment." : "التصوير في عجمان والشارقة ودبي بموعد مسبق.")}</p>
          <details className="optional-brief"><summary>{en ? "Add project details (optional)" : "أضف تفاصيل المشروع (اختياري)"}</summary><div className="optional-brief-fields">
            <div className="form-row"><label>{brief.type === "web-app-design" ? (en ? "Digital product" : "نوع المشروع الرقمي") : (en ? "Publishing platform" : "منصة النشر")}<select value={brief.platform} onChange={(event) => setBrief({ ...brief, platform: event.target.value })}><option value="">{en ? "Not decided yet" : "لم أحدد بعد"}</option>{brief.type === "web-app-design" ? <><option>{en ? "Business website" : "موقع شركة أو خدمات"}</option><option>{en ? "E-commerce store" : "متجر إلكتروني"}</option><option>{en ? "Web app / platform" : "تطبيق ويب / منصة"}</option><option>{en ? "Mobile / Android app" : "تطبيق جوال / Android"}</option></> : <><option>Instagram / Reels</option><option>TikTok</option><option>YouTube</option><option>{en ? "Website or presentation" : "موقع أو عرض تقديمي"}</option><option>{en ? "Multiple platforms" : "عدة منصات"}</option></>}</select></label>
              <label>{en ? "Available materials" : "المواد المتوفرة"}<select value={brief.materials} onChange={(event) => setBrief({ ...brief, materials: event.target.value })}><option value="">{en ? "Not decided yet" : "لم أحدد بعد"}</option>{brief.type === "web-app-design" ? <><option>{en ? "Logo and brand identity are ready" : "الشعار والهوية جاهزان"}</option><option>{en ? "Existing website / app to improve" : "لدي موقع / تطبيق قائم للتطوير"}</option><option>{en ? "Content and structure need planning" : "أحتاج تخطيط المحتوى والهيكل"}</option></> : <><option>{en ? "Ready footage is available" : "لدي فيديوهات جاهزة"}</option><option>{en ? "Filming is required" : "أحتاج إلى تصوير"}</option><option>{en ? "AI scenes are required" : "أحتاج مشاهد ذكاء اصطناعي"}</option></>}</select></label></div>
            {brief.type !== "web-app-design" && <div className="form-row"><label>{en ? "Approximate video duration" : "مدة الفيديو التقريبية"}<input maxLength={100} value={brief.duration} onChange={(event) => setBrief({ ...brief, duration: event.target.value })} placeholder={en ? "Example: 60 seconds" : "مثال: 60 ثانية"} /></label>
              <label>{en ? "Number of videos" : "عدد الفيديوهات"}<select value={brief.quantity} onChange={(event) => setBrief({ ...brief, quantity: event.target.value })}><option value="">{en ? "Not decided yet" : "لم أحدد بعد"}</option><option>1</option><option>2–5</option><option>6–10</option><option>10+</option></select></label></div>}
            <label>{en ? "Expected revisions" : "التعديلات المتوقعة"}<select value={brief.revisions} onChange={(event) => setBrief({ ...brief, revisions: event.target.value })}><option value="">{en ? "To be agreed" : "تُحدد بالاتفاق"}</option><option>{en ? "One review round" : "جولة مراجعة واحدة"}</option><option>{en ? "Two review rounds" : "جولتا مراجعة"}</option><option>{en ? "Needs discussion" : "تحتاج إلى نقاش"}</option></select></label>
            <label>{en ? "Your idea or a reference link" : "فكرة المشروع أو رابط مرجعي"}<textarea maxLength={2500} value={brief.details} onChange={(event) => setBrief({ ...brief, details: event.target.value })} placeholder={en ? "Any details you’d like to share..." : "أي تفاصيل ترغب بمشاركتها..."} rows={3} /></label>
          </div></details>
          <button className="primary-button form-submit" type="submit">{en ? "Prepare my WhatsApp request" : "تجهيز طلبي على واتساب"}</button>
          <small className="form-handoff-note">{en ? "WhatsApp opens with your request. Review it, then send it." : "يفتح واتساب بطلبك جاهزًا. راجع الرسالة ثم أرسلها."}</small>
        </form>
      </section>

  );
}
