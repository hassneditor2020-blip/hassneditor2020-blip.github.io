export const googleProfileUrl = "https://maps.app.goo.gl/nhiiiwqJzeraAcbGA";
export const googleReviewUrl = "https://g.page/r/CcLLyJ5_XNFAECE/review";
export const filmingAreas = ["Ajman", "Sharjah", "Dubai"];

export default function ServiceArea({ language }: { language: "ar" | "en" }) {
  const en = language === "en";
  return <aside className="service-area" aria-label={en ? "Filming service area" : "نطاق خدمة التصوير"}>
    <div><small>{en ? "FILMING BY APPOINTMENT" : "التصوير بموعد مسبق"}</small><strong>{en ? "Ajman · Sharjah · Dubai" : "عجمان · الشارقة · دبي"}</strong><p>{en ? "Choose the location and arrange your shoot in advance. Editing and motion graphics are available remotely." : "حدّد الموقع ونسّق جلسة التصوير مسبقًا. المونتاج والموشن جرافيك متاحان عن بُعد."}</p></div>
    <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer">{en ? "My Google profile" : "ملفي على Google"}</a>
  </aside>;
}
