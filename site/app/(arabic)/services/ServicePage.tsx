import { ArrowIcon } from "../../PortfolioIcons";
import ServiceArea, { filmingAreas } from "../../ServiceArea";
import ProjectHighlights from "../../ProjectHighlights";
import SiteHeader from "../../SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import PrivacySettingsButton from "../../PrivacySettingsButton";
import { projectBySlug, projectPath, portfolioProjects } from "../../projectData";
import { aiVideoContent } from "../../aiVideoContent";
import AIVideoSections, { aiProductionSteps } from "../../AIVideoSections";
import KokabFodoolFeature from "../../KokabFodoolFeature";
import ServicePlanning from "../../ServicePlanning";
import ServiceProjectNotes from "../../ServiceProjectNotes";
import DigitalProjects from "../../DigitalProjects";

type Language = "ar" | "en";

export type ServiceContent = {
  slug: string;
  titleAr: string;
  titleEn: string;
  metaTitleAr?: string;
  metaTitleEn?: string;
  metaDescriptionAr?: string;
  metaDescriptionEn?: string;
  leadAr: string;
  leadEn: string;
  summaryAr: string;
  summaryEn: string;
  deliverablesAr: string[];
  deliverablesEn: string[];
  bestForAr: string[];
  bestForEn: string[];
  faqsAr: Array<[string, string]>;
  faqsEn: Array<[string, string]>;
  worksAnchor: string;
};

const serviceSocialImages: Record<string, string> = {
  "videography": "/restaurant-event-videos-cover.webp",
  "video-editing": "https://i.ytimg.com/vi/B-GSumhDcmA/hqdefault.jpg",
  "motion-graphics": "https://i.ytimg.com/vi/fBdcM8TO8YQ/hqdefault.jpg",
  "ai-video": "https://i.ytimg.com/vi/YT-rI9n1qRw/hqdefault.jpg",
  "ai-cartoon-characters": "/hassn-editor-showreel-cover.jpg",
  "content-production": "https://i.ytimg.com/vi/O6rfDBsOq5Y/hqdefault.jpg",
  "web-app-design": "/hassn-editor-showreel-cover.jpg",
};

export const serviceCatalog: Record<string, ServiceContent> = {
  "videography": {
    slug: "videography",
    titleAr: "تصوير فيديو وريلز احترافي",
    titleEn: "Professional Videography & Reels",
    metaTitleAr: "تصوير فيديو وريلز في عجمان والشارقة ودبي",
    metaTitleEn: "Videographer & Reels: Ajman, Sharjah, Dubai",
    metaDescriptionAr: "مصور فيديو وريلز في عجمان والشارقة ودبي بموعد مسبق. تخطيط وتصوير ومونتاج ومقاسات جاهزة للنشر للشركات والمنتجات والفعاليات. شاهد الأعمال وناقش مشروعك.",
    metaDescriptionEn: "Videography and Reels in Ajman, Sharjah and Dubai by appointment. Shot planning, filming, editing and platform formats for businesses, products and events.",
    leadAr: "تصوير احترافي للمطاعم والفعاليات والمنتجات والشركات في عجمان والشارقة ودبي بموعد مسبق، بخطة لقطات واضحة ومحتوى جاهز للنشر.",
    leadEn: "Videography for restaurants, events, products and businesses in Ajman, Sharjah and Dubai by appointment, with editing and platform-ready delivery.",
    summaryAr: "أخطط التصوير انطلاقًا من هدف الفيديو والمنصة والجمهور، ثم أنفذ اللقطات والإضاءة والحركة بما يبرز المكان أو المنتج أو الفعالية. بعد ذلك أستكمل المونتاج ومعالجة الألوان والصوت لتسليم فيديو متكامل بدل لقطات منفصلة.",
    summaryEn: "I plan each shoot around the video goal, platform and audience, then capture the venue, product or event through purposeful framing, lighting and movement. Editing, color and sound complete the work as one finished video rather than a collection of disconnected shots.",
    deliverablesAr: ["تخطيط الفكرة وقائمة اللقطات", "تصوير في عجمان والشارقة ودبي بموعد مسبق", "إضاءة وحركة كاميرا مناسبة للمكان", "مونتاج ومعالجة ألوان وتصميم صوت", "نسخ عمودية وأفقية جاهزة للنشر"],
    deliverablesEn: ["Concept and shot-list planning", "Filming in Ajman, Sharjah and Dubai by appointment", "Location-appropriate lighting and camera movement", "Editing, color grading and sound design", "Vertical and horizontal publish-ready versions"],
    bestForAr: ["المطاعم والكافيهات", "الحفلات والفعاليات", "إعلانات المنتجات", "فيديوهات الشركات والعقارات"],
    bestForEn: ["Restaurants and cafes", "Live events and celebrations", "Product advertising", "Corporate and real-estate video"],
    faqsAr: [
      ["كم تكلفة تصوير ريلز؟", "يعتمد عرض السعر على وقت التصوير والموقع وتجهيزاته وعدد الفيديوهات والمونتاج والموشن والصوت والمقاسات. أرسل هدفك والمدينة وعدد النسخ والموعد المقترح لتحديد نطاق واضح قبل الحجز."],
      ["أين تتوفر خدمة التصوير؟", "التصوير متاح في عجمان والشارقة ودبي بموعد مسبق، بعد الاتفاق على الموقع والموعد ونطاق المشروع."],
      ["هل تشمل الخدمة المونتاج بعد التصوير؟", "نعم. يمكن تنفيذ التصوير والمونتاج ومعالجة الألوان والصوت وتسليم المقاسات المطلوبة ضمن مسار واحد."],
      ["هل يمكن تجهيز الفيديو للريلز ويوتيوب؟", "نعم. تُخطط اللقطات منذ البداية للمقاسات المطلوبة، مثل 9:16 للريلز و16:9 للموقع ويوتيوب."],
    ],
    faqsEn: [
      ["How much does a Reels shoot cost?", "The quote depends on filming time, location preparation, video count, editing, motion, sound and formats. Share your goal, city, versions and proposed appointment to agree the scope before booking."],
      ["Where is videography available?", "Filming is available in Ajman, Sharjah and Dubai by prior appointment, after agreeing on the location, schedule and project scope."],
      ["Does the service include editing after the shoot?", "Yes. Filming, editing, color grading, sound finishing and the required delivery formats can be handled through one workflow."],
      ["Can the video be prepared for Reels and YouTube?", "Yes. The shoot is planned around the required formats, including vertical 9:16 for Reels and horizontal 16:9 for websites and YouTube."],
    ],
    worksAnchor: "restaurant-events",
  },
  "video-editing": {
    slug: "video-editing",
    titleAr: "مونتاج فيديو احترافي",
    titleEn: "Professional Video Editing",
    metaTitleAr: "مونتاج فيديو وريلز في الإمارات | حسن حسن",
    metaTitleEn: "Video Editing & Reels in UAE | Hassn Hassn",
    metaDescriptionAr: "مونتاج فيديو وريلز في الإمارات مع حسن حسن: إعلانات وشركات ومحتوى تعليمي، Premiere Pro وAfter Effects وألوان وصوت وترجمة. شاهد نماذج واطلب عرضًا حسب مشروعك.",
    metaDescriptionEn: "Video editing and Reels for UAE businesses and creators. Premiere Pro, After Effects, color, sound and captions. View real projects and request a tailored quote.",
    leadAr: "مونتاج فيديو احترافي للإعلانات والشركات والريلز، باستخدام Premiere Pro وAfter Effects ومعالجة الألوان والصوت. أعمل من عجمان وعن بُعد داخل الإمارات وخارجها.",
    leadEn: "Professional video editing for ads, corporate content and Reels, with Premiere Pro, After Effects, color and sound. Available remotely across the UAE.",
    summaryAr: "أراجع المواد الأصلية والنص والهدف، وأختار اللقطات لبناء بداية واضحة وتسلسل يحافظ على إيقاع الرسالة. أنفذ المونتاج في Premiere Pro وأضيف الموشن والعناوين في After Effects عند الحاجة، ثم أراجع الألوان والصوت والترجمة ووضوح المحتوى على الهاتف. يمكن إرسال المواد عن بُعد من داخل الإمارات وخارجها، مع اتفاق مسبق على النسخ والمراجعة والتسليم.",
    summaryEn: "I review the source material, copy and goal, then select shots for a clear opening and purposeful sequence. Editing in Premiere Pro can be combined with After Effects motion and titles, followed by color, sound, captions and mobile-readability checks. Footage can be supplied remotely from the UAE or internationally, with versions, review and delivery agreed in advance.",
    deliverablesAr: ["مونتاج وإيقاع بصري", "معالجة ألوان وصوت", "عناوين وترجمة عند الحاجة", "مقاسات متعددة للمنصات", "نسخة نهائية منظمة وجاهزة للنشر"],
    deliverablesEn: ["Editing and visual pacing", "Color and sound finishing", "Titles and captions when needed", "Multiple platform formats", "Organized final delivery"],
    bestForAr: ["إعلانات المنتجات", "ريلز ومحتوى اجتماعي", "فيديوهات الشركات", "المحتوى التعليمي واليوتيوب"],
    bestForEn: ["Product advertising", "Reels and social content", "Corporate video", "Educational and YouTube content"],
    faqsAr: [
      ["كيف تُحدَّد تكلفة مونتاج الفيديو؟", "تؤثر مدة المواد الأصلية وتنظيمها، وأسلوب المونتاج، والموشن والترجمة والصوت وعدد النسخ والتعديلات في السعر. نحدد هذه التفاصيل قبل عرض السعر، لأن مدة الفيديو النهائي وحدها لا تعبّر عن حجم العمل."],
      ["ما المواد المطلوبة لبدء المونتاج؟", "أحتاج إلى اللقطات والشعار والنصوص وأي مرجع بصري متاح، مع توضيح هدف الفيديو والمنصة والموعد المطلوب."],
      ["هل يمكن تسليم الفيديو بأكثر من مقاس؟", "نعم، يمكن تجهيز نسخ أفقية وعمودية ومربعة بحسب المنصات المتفق عليها ضمن نطاق المشروع."],
      ["كيف تتم مراجعة الفيديو؟", "تُجمع الملاحظات في جولة منظمة حتى تكون التعديلات واضحة ولا تتعارض الملاحظات مع بعضها."],
    ],
    faqsEn: [
      ["How is video editing priced?", "Source-footage duration and organization, editing style, motion, captions, sound, versions and revisions affect the quote. We define these before pricing because finished video duration alone does not describe the workload."],
      ["What do you need to start editing?", "I need the footage, logo, copy and any available visual references, together with the goal, platform and required deadline."],
      ["Can the video be delivered in multiple formats?", "Yes. Horizontal, vertical and square versions can be prepared for the agreed platforms within the project scope."],
      ["How are video revisions handled?", "Feedback is collected in an organized review round so the requested changes remain clear and consistent."],
    ],
    worksAnchor: "ads",
  },
  "motion-graphics": {
    slug: "motion-graphics",
    titleAr: "تصميم فيديو موشن جرافيك",
    titleEn: "Motion Graphics Video Design",
    metaTitleAr: "تصميم فيديو موشن جرافيك في الإمارات للشركات والإعلانات",
    metaTitleEn: "Motion Graphics Video Production UAE",
    metaDescriptionAr: "تصميم فيديو موشن جرافيك في الإمارات للعيادات والمنتجات والشركات. شاهد نماذج فعلية، مع تحريك After Effects ومونتاج ومقاسات للريلز ويوتيوب. اطلب عرضًا لمشروعك.",
    metaDescriptionEn: "Motion graphics video design in the UAE for dental clinics, products and businesses. Explore real projects and request a quote for your animation and editing.",
    leadAr: "أصمّم فيديوهات موشن جرافيك تشرح خدمتك وتبرز منتجك، من النص والاتجاه البصري إلى التحريك والمونتاج والصوت. أعمل من عجمان وعن بُعد داخل الإمارات وخارجها.",
    leadEn: "Motion graphics that explain your service and showcase your product, from copy and visual direction to animation, editing and sound. Based in Ajman and available remotely in the UAE and worldwide.",
    summaryAr: "أبدأ بتحديد الرسالة والجمهور، ثم أبني تسلسلًا بصريًا من هوية العلامة والنص المعتمد. أحرّك النصوص والرسوم والعناصر في After Effects وأدمجها مع المونتاج والصوت. قبل التسليم أراجع وضوح المعلومة والنصوص على الهاتف، وأجهّز المقاسات المتفق عليها مثل 9:16 للريلز و16:9 ليوتيوب والشاشات.",
    summaryEn: "I define the message and audience, then build a visual sequence from your brand identity and approved copy. Text, graphics and elements are animated in After Effects and combined with editing and sound. Before delivery, I check mobile readability and prepare the agreed formats, such as 9:16 for Reels and 16:9 for YouTube and screens.",
    deliverablesAr: ["تطوير الاتجاه البصري", "تحريك النصوص والعناصر", "إنفوجرافيك بصري", "مؤثرات وانتقالات مدروسة", "تسليم مناسب لكل منصة"],
    deliverablesEn: ["Visual direction", "Text and element animation", "Animated infographics", "Purposeful transitions", "Platform-ready delivery"],
    bestForAr: ["الخدمات الطبية والدينتال", "العقارات", "الشروحات التعليمية", "حملات الشركات"],
    bestForEn: ["Medical and dental services", "Real estate", "Educational explainers", "Corporate campaigns"],
    faqsAr: [
      ["ما تكلفة تصميم فيديو موشن جرافيك؟", "أحدد عرض السعر بعد مراجعة النص والمدة وعدد المشاهد وتعقيد التحريك والصوت والمقاسات وجولات التعديل. أرسل فكرتك والهوية البصرية ومرجعًا مناسبًا والموعد المطلوب، لأحدد نطاقًا واضحًا قبل التنفيذ."],
      ["ما الفرق بين مونتاج الفيديو والموشن جرافيك؟", "المونتاج ينظم اللقطات والصوت لبناء الفيديو؛ أما الموشن جرافيك فيضيف تحريكًا مصممًا للنصوص والرسوم والعناصر لشرح الفكرة. يمكن الجمع بينهما عندما يحتاج المشروع إلى لقطات حقيقية وشرح بصري."],
      ["هل يمكن تنفيذ الموشن من هوية العلامة الحالية؟", "نعم. يمكن بناء الحركة من الشعار والألوان والخطوط والعناصر المتوفرة مع الحفاظ على أسلوب العلامة."],
      ["هل يشمل المشروع التعليق الصوتي؟", "يمكن دمج تعليق صوتي يقدمه العميل أو تنسيق الصوت المناسب ضمن نطاق المشروع المتفق عليه."],
      ["هل يصلح الموشن جرافيك للريلز؟", "نعم، تُرتب النصوص والحركة للمشاهدة على الهاتف ويمكن تجهيز المقاس العمودي 9:16 عند الحاجة."],
    ],
    faqsEn: [
      ["How much does a motion graphics video cost?", "The quote depends on the copy, duration, scene count, animation complexity, sound, formats and review rounds. Share your idea, brand assets, a relevant reference and deadline so I can agree a clear scope before production."],
      ["What is the difference between video editing and motion graphics?", "Editing arranges footage and sound into a video. Motion graphics adds purpose-built animation of text, graphics and elements to explain the idea. Both can be combined when a project needs real footage and a visual explanation."],
      ["Can motion graphics follow an existing brand identity?", "Yes. The animation can be built from your logo, colors, type and available assets while preserving the brand style."],
      ["Can the project include voice-over?", "A client-supplied voice-over can be integrated, or suitable voice production can be coordinated within the agreed scope."],
      ["Does motion graphics work for Reels?", "Yes. Titles and movement can be designed for mobile viewing, including a vertical 9:16 format when required."],
    ],
    worksAnchor: "medical",
  },
  "ai-video": aiVideoContent,
  "ai-cartoon-characters": {
    slug: "ai-cartoon-characters",
    titleAr: "فيديوهات الشخصيات الكرتونية بالذكاء الاصطناعي",
    titleEn: "AI Cartoon Character Animation",
    metaTitleAr: "فيديو شخصيات كرتونية بالذكاء الاصطناعي",
    metaTitleEn: "AI Cartoon Character Animation in UAE",
    leadAr: "تصميم شخصيات كرتونية متناسقة وتحويلها إلى قصص تعليمية وتوعوية ومحتوى بصري جاهز للنشر.",
    leadEn: "AI cartoon character animation for educational stories, awareness and branded content. Character references, scene continuity, voice and Adobe editing in the UAE.",
    summaryAr: "أبني هوية الشخصية وملامحها وملابسها وبيئتها، ثم أخطط تسلسل المشاهد وأحافظ على الاستمرارية البصرية قبل التحريك والمونتاج وإضافة الصوت. ويمكن تجهيز نماذج عرض مختصرة تحمي خصوصية العميل وتوضح مستوى التنفيذ.",
    summaryEn: "I define the character identity, facial features, clothing and environment, then plan the scene sequence and preserve visual continuity before animation, editing and sound. Privacy-safe excerpts can be prepared to demonstrate the work without exposing client-sensitive material.",
    deliverablesAr: ["تطوير الفكرة والسكريبت", "تصميم هوية الشخصية", "ثبات الملامح والملابس بين المشاهد", "تحريك ومزامنة صوت عند الحاجة", "مونتاج وصوت ونسخ جاهزة للنشر"],
    deliverablesEn: ["Concept and script development", "Character identity design", "Consistent features and clothing across scenes", "Animation and voice sync when required", "Editing, sound and publish-ready versions"],
    bestForAr: ["القصص التعليمية للأطفال", "الشخصيات والتمائم الرقمية", "المحتوى الإماراتي التوعوي", "قصص العلامات التجارية والحملات الاجتماعية"],
    bestForEn: ["Educational children’s stories", "Digital characters and mascots", "Emirati awareness content", "Brand stories and social campaigns"],
    faqsAr: [
      ["كيف يتم الحفاظ على ثبات الشخصية؟", "يتم إعداد مرجع واضح للملامح والملابس والألوان والبيئة، ثم مراجعة كل مشهد قبل التحريك والمونتاج."],
      ["هل يمكن إضافة صوت ومزامنة شفاه؟", "نعم، يمكن دمج الصوت ومزامنة الحركة مع الحوار عندما يناسب أسلوب القصة ونطاق المشروع."],
      ["هل يمكن عرض مقتطفات تحافظ على خصوصية العميل؟", "نعم، يمكن تجهيز مقتطفات قصيرة توضح جودة التنفيذ من دون كشف القصة الكاملة أو المواد الحساسة."],
    ],
    faqsEn: [
      ["How is character consistency maintained?", "A clear reference for facial features, clothing, colors and environment is prepared, then each scene is reviewed before animation and editing."],
      ["Can voice and lip-sync be included?", "Yes. Voice and dialogue synchronization can be integrated when they suit the story style and agreed project scope."],
      ["Can you show privacy-safe portfolio excerpts?", "Yes. Short excerpts can demonstrate the production quality without revealing the full story or client-sensitive material."],
    ],
    worksAnchor: "ai",
  },
  "web-app-design": {
    slug: "web-app-design",
    titleAr: "تصميم المواقع والتطبيقات",
    titleEn: "Website & App Design",
    metaTitleAr: "تصميم مواقع وتطبيقات للشركات والمشاريع | حسن إيديتور",
    metaTitleEn: "Website & App Design for Businesses | Hassn Editor",
    metaDescriptionAr: "تصميم وتطوير مواقع أعمال ومتاجر ومنصات وتجارب تطبيق مهيأة للجوال، مع SEO واختبارات قبل الإطلاق. خدمة رقمية مكملة لتخصص حسن إيديتور الأساسي في الفيديو.",
    metaDescriptionEn: "Business websites, e-commerce experiences and app interfaces built mobile-first with SEO and launch testing. A complementary digital service alongside Hassn Editor's core video work.",
    leadAr: "تصميم وتطوير مواقع وتجارب تطبيق حديثة ومهيأة للجوال للشركات والمشاريع، مع بنية واضحة وSEO واختبارات قبل الإطلاق—كخدمة رقمية مكملة لتخصصي الأساسي في صناعة الفيديو.",
    leadEn: "Modern, mobile-first websites and app experiences for businesses and projects, with clear structure, SEO and launch testing—offered as a complementary digital service alongside my core video work.",
    summaryAr: "أحوّل فكرة المشروع إلى تجربة رقمية واضحة تبدأ من هيكل المحتوى والواجهة، ثم بناء الصفحات والوظائف الأساسية وتحسين تجربة الهاتف والأداء وتهيئة محركات البحث. أركز على المواقع العملية التي تخدم هدفًا واضحًا: عرض الخدمات، استقبال الطلبات، البيع، التعليم أو تقديم مشروع رقمي متكامل.",
    summaryEn: "I turn the project goal into a clear digital experience, starting with content structure and interface direction, then building pages and core functionality, improving mobile usability and performance, and preparing the site for search. The focus is practical digital products that support a real goal: services, orders, commerce, learning or a connected platform experience.",
    deliverablesAr: ["تخطيط هيكل الموقع وتجربة المستخدم", "تصميم واجهات متجاوبة للجوال والحاسب", "تطوير الصفحات والوظائف الأساسية", "تهيئة SEO والأداء قبل الإطلاق", "اختبار الروابط والنماذج والتنقل وتسليم جاهز للنشر"],
    deliverablesEn: ["Site structure and UX planning", "Responsive mobile and desktop interface design", "Core page and feature development", "SEO and performance preparation before launch", "Navigation, forms and link testing with launch-ready delivery"],
    bestForAr: ["مواقع الشركات والخدمات", "المتاجر الإلكترونية", "المنصات والمشاريع التعليمية", "صفحات الهبوط وتجارب التطبيقات"],
    bestForEn: ["Business and service websites", "E-commerce stores", "Educational platforms and digital projects", "Landing pages and app experiences"],
    faqsAr: [
      ["هل تصميم المواقع والتطبيقات أصبح الخدمة الأساسية؟", "لا. تصوير الفيديو والمونتاج وصناعة المحتوى تبقى تخصصي الأساسي، بينما أقدم تصميم المواقع والتطبيقات كخدمة رقمية مكملة للمشاريع التي تحتاج حضورًا متكاملًا."],
      ["ما نوع المواقع التي يمكن تنفيذها؟", "يمكن تنفيذ مواقع شركات وخدمات، صفحات هبوط، متاجر وتجارب منصات رقمية، بعد تحديد الوظائف المطلوبة والتقنية الأنسب لكل مشروع."],
      ["هل يتم تصميم الموقع للجوال أيضًا؟", "نعم. أتعامل مع تجربة الجوال كجزء أساسي من التصميم، مع مراجعة التنقل والمقاسات والقراءة والسرعة قبل الإطلاق."],
      ["هل تشمل الخدمة SEO؟", "تشمل التهيئة التقنية الأساسية لمحركات البحث مثل بنية الصفحات والبيانات الوصفية والروابط والفهرسة، بينما الحملات والمحتوى المستمر يمكن تحديدهما كنطاق منفصل."],
      ["هل لديك مشاريع حقيقية يمكن مشاهدتها؟", "نعم. يعرض الموقع مشروع Syria Store كمتجر إلكتروني، ومشروع كوكب فضول كمنصة تعليمية تشمل موقعًا وتطبيق Android وألعابًا ومحتوى تعليميًا."],
    ],
    faqsEn: [
      ["Is website and app design now your main service?", "No. Videography, video editing and content production remain my core specialty. Web and app design is a complementary digital service for projects that need a more complete presence."],
      ["What kinds of websites can you build?", "Business and service websites, landing pages, e-commerce experiences and digital platforms can be planned after defining the required functionality and the right technical approach."],
      ["Is the website designed for mobile too?", "Yes. Mobile experience is treated as a core part of the design, including navigation, spacing, readability and performance checks before launch."],
      ["Does the service include SEO?", "It includes core technical SEO preparation such as page structure, metadata, links and indexing readiness. Ongoing content and campaigns can be scoped separately."],
      ["Can I see real digital projects?", "Yes. Syria Store is shown as an e-commerce project, and Kokab Fodool as an educational platform combining a website, Android app, games and learning content."],
    ],
    worksAnchor: "digital-projects",
  },
  "content-production": {
    slug: "content-production",
    titleAr: "إنتاج المحتوى المتكامل",
    titleEn: "Full Content Production",
    metaTitleAr: "إنتاج محتوى فيديو وريلز للشركات في الإمارات",
    metaTitleEn: "Business Video & Reels Production in UAE",
    metaDescriptionAr: "إنتاج فيديو وريلز للشركات من الفكرة والسكريبت إلى التصوير والمونتاج والموشن. تصوير في عجمان والشارقة ودبي بموعد مسبق وتسليم بالمقاسات المطلوبة.",
    metaDescriptionEn: "Business video and Reels from concept and script to filming, editing and motion. Location filming in Ajman, Sharjah and Dubai by appointment.",
    leadAr: "مسار واحد يبدأ من الفكرة والسكريبت ويصل إلى التصوير والمونتاج والتسليم.",
    leadEn: "One organized workflow from concept and script through filming, editing and final delivery.",
    summaryAr: "أدير مراحل الفيديو ضمن رؤية واحدة: فهم الهدف، بناء الفكرة، تجهيز التصوير، التنفيذ، المونتاج، المراجعة وتجهيز النسخ النهائية للمنصات.",
    summaryEn: "I manage the full video journey under one direction: goals, concept, pre-production, filming, editing, review and platform-specific final versions.",
    deliverablesAr: ["فكرة واتجاه إبداعي", "سكريبت وخطة تصوير", "تصوير احترافي داخل الإمارات", "مونتاج وموشن وألوان وصوت", "تسليم متعدد المقاسات"],
    deliverablesEn: ["Concept and creative direction", "Script and filming plan", "Professional filming in the UAE", "Editing, motion, color and sound", "Multi-format delivery"],
    bestForAr: ["الشركات والعلامات التجارية", "حملات المنتجات", "صناع المحتوى", "المشاريع التي تبدأ من الصفر"],
    bestForEn: ["Companies and brands", "Product campaigns", "Content creators", "Projects starting from zero"],
    faqsAr: [
      ["ما المعلومات المطلوبة لبدء الإنتاج؟", "يكفي في البداية توضيح الهدف والجمهور والمنصة والموعد والمواد المتاحة، ثم يتم تحديد المسار المناسب."],
      ["هل التصوير متاح داخل الإمارات؟", "نعم، يمكن تنسيق التصوير داخل الإمارات بحسب موقع المشروع ومتطلبات الإنتاج المتفق عليها."],
      ["ما الذي يشمله التسليم النهائي؟", "يشمل الملفات النهائية بالمقاسات المتفق عليها، مع تجهيز الصورة والصوت والعناوين بصورة مناسبة للنشر."],
    ],
    faqsEn: [
      ["What information is needed to start production?", "A clear goal, audience, platform, deadline and list of available assets are enough to define the right workflow."],
      ["Is filming available in the UAE?", "Yes. Filming can be coordinated in the UAE according to the project location and agreed production requirements."],
      ["What is included in final delivery?", "Final files are supplied in the agreed formats with finished visuals, sound and titles ready for publishing."],
    ],
    worksAnchor: "ads",
  },
};

export function getServiceMetadata(slug: string, language: Language): Metadata {
  const service = serviceCatalog[slug];
  const en = language === "en";
  const path = `${en ? "/en" : ""}/services/${slug}`;
  const alternatePath = `${en ? "" : "/en"}/services/${slug}`;
  const title = en
    ? (service.metaTitleEn || `${service.titleEn} in the UAE`)
    : (service.metaTitleAr || `${service.titleAr} في الإمارات`);
  const description = en ? (service.metaDescriptionEn || service.leadEn) : (service.metaDescriptionAr || service.leadAr);
  const socialImage = serviceSocialImages[slug];
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { ar: en ? alternatePath : path, en: en ? path : alternatePath, "x-default": en ? alternatePath : path },
    },
    openGraph: {
      title: `${en ? service.titleEn : service.titleAr} | HASSN EDITOR`,
      description,
      url: `https://hassneditor.com${path}`,
      images: [socialImage],
      locale: en ? "en_AE" : "ar_AE",
    },
    twitter: { card: "summary_large_image", title: `${title} | HASSN EDITOR`, description, images: [socialImage] },
  };
}

export default function ServicePage({ slug, language = "ar" }: { slug: string; language?: Language }) {
  const service = serviceCatalog[slug];
  const en = language === "en";
  const title = en ? service.titleEn : service.titleAr;
  const lead = en ? service.leadEn : service.leadAr;
  const summary = en ? service.summaryEn : service.summaryAr;
  const deliverables = en ? service.deliverablesEn : service.deliverablesAr;
  const bestFor = en ? service.bestForEn : service.bestForAr;
  const faqs = en ? service.faqsEn : service.faqsAr;
  const characterFeatures = en
    ? [
        ["01", "Consistent character identity", "Facial features, clothing, colors and accessories remain recognizable throughout the story."],
        ["02", "Continuity across scenes", "Character, setting and visual direction are carried carefully from one shot to the next."],
        ["03", "Story, motion and voice", "Scene scripts, controlled animation, Arabic lip-sync when required, editing and sound form one finished video."],
      ]
    : [
        ["01", "هوية ثابتة للشخصية", "الحفاظ على الملامح والملابس والألوان والإكسسوارات بصورة يمكن تمييزها طوال القصة."],
        ["02", "استمرارية بين المشاهد", "نقل الشخصية والبيئة والاتجاه البصري بعناية من لقطة إلى أخرى دون فقدان الهوية."],
        ["03", "قصة وحركة وصوت", "سكريبت للمشاهد وتحريك مضبوط ومزامنة شفاه عربية عند الحاجة، ثم مونتاج وصوت لفيديو مكتمل."],
      ];
  const localLinks: Record<string, Array<[string, string, string]>> = {
    "videography": [["videographer-ajman", "مصور فيديو في عجمان", "Videographer in Ajman"], ["videographer-sharjah", "مصور فيديو في الشارقة", "Videographer in Sharjah"], ["videographer-dubai", "مصور فيديو في دبي", "Videographer in Dubai"], ["restaurant-videography-uae", "تصوير فيديوهات المطاعم والفعاليات", "Restaurant and event videography"], ["product-video-ads", "تصوير ومونتاج إعلانات المنتجات", "Product video ads"], ["video-editor-ajman", "مصور ومونتير فيديو في عجمان", "Videographer and video editor in Ajman"]],
    "video-editing": [["video-editing-uae", "مونتاج فيديو في الإمارات", "Video editing in the UAE"], ["industrial-video-production-uae", "إنتاج فيديو صناعي في الإمارات", "Industrial video production in the UAE"], ["real-estate-video-editing-uae", "مونتاج فيديو عقاري في الإمارات", "Real-estate video editing in the UAE"], ["restaurant-videography-uae", "مونتاج فيديوهات المطاعم", "Restaurant video editing"]],
    "motion-graphics": [["dental-motion-graphics", "موشن جرافيك لعيادات الأسنان", "Dental motion graphics"], ["real-estate-video-editing-uae", "مونتاج فيديو عقاري في الإمارات", "Real-estate video editing in the UAE"]],
    "ai-video": [["industrial-video-production-uae", "إنتاج فيديو صناعي في الإمارات", "Industrial video production in the UAE"], ["video-editing-uae", "مونتاج فيديو في الإمارات", "Video editing in the UAE"]],
    "ai-cartoon-characters": [["video-editing-uae", "مونتاج فيديو في الإمارات", "Video editing in the UAE"], ["video-editor-ajman", "مونتير فيديو في عجمان", "Video editor in Ajman"]],
    "content-production": [["product-video-ads", "تصوير ومونتاج إعلانات المنتجات", "Product video ads"], ["restaurant-videography-uae", "تصوير ومونتاج المطاعم والفعاليات", "Restaurant and event videography"], ["industrial-video-production-uae", "إنتاج فيديو صناعي في الإمارات", "Industrial video production in the UAE"]],
    "web-app-design": [],
  };
  const guideLinks: Record<string, [string, string, string]> = {
    "videography": ["prepare-reels-video-shoot", "دليل تجهيز جلسة تصوير ريلز", "Reels shoot preparation guide"],
    "video-editing": ["choose-video-editor-uae", "دليل اختيار مونتير فيديو في الإمارات", "Guide to choosing a video editor in the UAE"],
    "motion-graphics": ["dental-video-content-guide", "دليل صناعة فيديوهات طبية واضحة", "Guide to clear, engaging dental videos"],
    "ai-video": ["ai-video-production-uae-guide", "دليل إنتاج فيديو AI احترافي", "Professional AI video production guide"],
    "ai-cartoon-characters": ["ai-cartoon-character-video-guide", "دليل ثبات الشخصيات الكرتونية في فيديو AI", "AI cartoon character consistency guide"],
    "content-production": ["video-editing-cost-factors", "دليل عوامل تكلفة إنتاج ومونتاج الفيديو", "Guide to video editing and production cost factors"],
  };
  const projectLinks: Record<string, Array<[string, string, string]>> = {
    "videography": [["cinematic-food-videography-restaurant-ad", "مشروع تصوير طعام سينمائي", "Cinematic food videography project"], ["fm-restaurant-live-music-videography", "مشروع تصوير حفلة موسيقية", "Live music videography project"], ["fm-restaurant-fajita-food-videography", "مشروع تصوير طبق فاهيتا", "Fajita food videography project"], ["fm-restaurant-ajman-live-event-video", "مشروع تصوير مطعم وفعالية موسيقية", "Restaurant and live-event videography project"], ["fm-restaurant-cinematic-coffee-promo", "مشروع تصوير إعلان قهوة سينمائي", "Cinematic coffee promo project"]],
    "video-editing": [["swiss-product-story-ad", "مشروع مونتاج إعلان منتج بأسلوب قصصي", "Story-led product editing project"]],
    "motion-graphics": [["dental-awareness-motion-graphics", "مشروع فيديو توعوي للأسنان بالموشن جرافيك", "Dental awareness motion graphics project"]],
    "ai-video": [["from-vision-to-ai-visuals", "مشروع فيديو AI من الفكرة إلى الصورة", "AI video project from concept to visuals"]],
    "ai-cartoon-characters": [],
    "content-production": [["beauty-product-social-ad", "مشروع تصوير ومونتاج إعلان منتج", "Product filming and social ad project"]],
    "web-app-design": [],
  };
  const prefix = en ? "/en" : "";
  const alternatePrefix = en ? "" : "/en";
  const whatsappText = slug === "ai-video"
    ? (en ? "Hello Hassn, I would like to discuss an AI video.\nGoal:\nPlatform:\nApproximate duration:\nDeadline:" : "مرحبًا حسن، أرغب في مناقشة فيديو بالذكاء الاصطناعي.\nالهدف:\nالمنصة:\nالمدة التقريبية:\nموعد التسليم:")
    : en ? `Hello Hassn, I would like to discuss your ${service.titleEn} service.` : `مرحبًا حسن، أرغب في مناقشة خدمة ${service.titleAr}.`;
  const whatsappUrl = `https://wa.me/971505918238?text=${encodeURIComponent(whatsappText)}`;
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://hassneditor.com${prefix}/services/${slug}#service`,
    name: title,
    description: lead,
    url: `https://hassneditor.com${prefix}/services/${slug}`,
    areaServed: slug === "videography" ? filmingAreas.map((name) => ({ "@type": "City", name })) : [{ "@type": "Country", name: "United Arab Emirates" }],
    provider: { "@type": "ProfessionalService", "@id": "https://hassneditor.com/#business", name: "HASSN EDITOR", url: "https://hassneditor.com" },
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: en ? "Home" : "الرئيسية", item: `https://hassneditor.com${prefix || "/"}` },
      { "@type": "ListItem", position: 2, name: en ? "Services" : "الخدمات", item: `https://hassneditor.com${prefix}/services` },
      { "@type": "ListItem", position: 3, name: title, item: `https://hassneditor.com${prefix}/services/${slug}` },
    ],
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://hassneditor.com${prefix}/services/${slug}#faq`,
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main data-contact-page="service" data-contact-service={slug} className={`site service-page ${en ? "en" : "ar"}`} lang={en ? "en" : "ar"} dir={en ? "ltr" : "rtl"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceStructuredData, breadcrumbStructuredData, faqStructuredData]) }} />
      <a className="skip-link" href="#service-content">{en ? "Skip to content" : "انتقل إلى المحتوى"}</a>
      <div className="noise" aria-hidden="true" />
      <SiteHeader language={language} alternatePath={`${alternatePrefix}/services/${slug}`} />

      <section className="service-hero" id="service-content">
        <nav className="breadcrumbs" aria-label={en ? "Breadcrumb" : "مسار الصفحة"}><Link prefetch={false} href={prefix || "/"}>{en ? "Home" : "الرئيسية"}</Link><span>/</span><Link prefetch={false} href={`${prefix || ""}/services`}>{en ? "Services" : "الخدمات"}</Link><span>/</span><b>{title}</b></nav>
        <p className="eyebrow">HASSN EDITOR / SERVICE</p>
        <h1>{title}</h1>
        <p className="service-lead">{lead}</p>
        {(slug === "videography" || slug === "content-production") && <ServiceArea language={language} />}
        <div className="service-hero-actions"><a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Discuss your project" : "ناقش مشروعك معي"} <span><ArrowIcon /></span></a><Link prefetch={false} className="secondary-button" href={slug === "web-app-design" ? "#digital-projects" : slug === "ai-video" ? "#real-ai-projects" : slug === "video-editing" ? "#editing-examples" : slug === "motion-graphics" ? "#motion-examples" : `${prefix}/works#${service.worksAnchor}`}>{en ? "View related work" : "شاهد أعمالًا مرتبطة"} <span><ArrowIcon /></span></Link></div>
        {slug === "ai-video" && <nav className="ai-page-nav" aria-label={en ? "AI production page sections" : "أقسام خدمة فيديو AI"}><a href="#real-ai-projects">{en ? "Projects" : "الأعمال"}</a><a href="#ai-applications">{en ? "Applications" : "الاستخدامات"}</a><a href="#ai-production-process">{en ? "Process" : "المراحل"}</a><a href="#faq">{en ? "Questions" : "الأسئلة"}</a></nav>}
      </section>

      {slug === "web-app-design" && <DigitalProjects language={language} compact />}
      {slug === "videography" && <ProjectHighlights language={language} projects={portfolioProjects.filter((project) => ["nAamGmPPysI", "WKUJDv4LZMs"].includes(project.videoId)).sort((a) => a.videoId === "nAamGmPPysI" ? -1 : 1)} />}
      {slug === "motion-graphics" && <div id="motion-examples" className="motion-service-proof"><ProjectHighlights language={language} heading={en ? "Motion graphics for clinics, products and real estate" : "نماذج موشن للعيادات والمنتجات والعقارات"} projects={["dental-motion-2026-explainer", "hair-removal-spray-product-ad", "al-qasimia-cinematic-real-estate-promo", "dental-awareness-motion-graphics"].flatMap(projectSlug => { const project = projectBySlug(projectSlug); return project ? [project] : []; })} showDetails /></div>}
      {(slug === "video-editing" || slug === "content-production") && <div id={slug === "video-editing" ? "editing-examples" : undefined}><ProjectHighlights language={language} showDetails projects={(slug === "video-editing" ? ["swiss-product-story-ad", "hair-removal-spray-product-ad", "dental-motion-2026-explainer"] : ["beauty-product-social-ad", "professional-ai-adobe-video-production"]).flatMap(projectSlug => { const project = projectBySlug(projectSlug); return project ? [project] : []; })} /></div>}

      {slug === "ai-video" && <AIVideoSections language={language} whatsappUrl={whatsappUrl} />}
      {(slug === "ai-video" || slug === "ai-cartoon-characters") && <KokabFodoolFeature language={language} />}

      <section className="service-overview">
        <div><p className="eyebrow">THE SERVICE</p><h2>{slug === "web-app-design" ? (en ? "Digital experiences built for real business goals" : "تجارب رقمية مبنية لهدف عملي واضح") : slug === "ai-video" ? (en ? "AI generation, Adobe editing and motion graphics" : "توليد المشاهد ومونتاج Adobe والموشن غرافيك") : (en ? "A focused workflow—not isolated edits" : "مسار متكامل وليس تعديلات منفصلة")}</h2><p className="service-summary">{summary}</p></div>
        {slug === "web-app-design" ? <div className="service-facts"><span><strong>Mobile First</strong><small>{en ? "Responsive UX" : "تجربة متجاوبة"}</small></span><span><strong>SEO</strong><small>{en ? "Search-ready structure" : "بنية جاهزة للبحث"}</small></span><span><strong>QA</strong><small>{en ? "Launch testing" : "اختبارات قبل الإطلاق"}</small></span></div> : <div className="service-facts"><span><strong>UAE</strong><small>{en ? "Based in Ajman" : "مقيم في عجمان"}</small></span><span><strong>9:16 · 16:9</strong><small>{en ? "Platform formats" : "مقاسات المنصات"}</small></span><span><strong>2020</strong><small>{en ? "Experience since" : "خبرة منذ"}</small></span></div>}
      </section>

      <ServiceProjectNotes slug={slug} language={language} />

      {slug === "ai-cartoon-characters" && (
        <section className="character-specialty" id="ai-cartoon-characters">
          <div className="character-specialty-intro">
            <p className="eyebrow">AI CHARACTER STORIES</p>
            <h2>{en ? "AI cartoon characters built to stay consistent" : "شخصيات كرتونية بالذكاء الاصطناعي تحافظ على هويتها"}</h2>
            <p>{en ? "I create child-friendly 3D cartoon characters and develop them into connected educational, awareness or branded stories. This work includes projects such as the educational character Mishaal and the Emirati characters Rashid and Maryam, with careful attention to cultural details and continuity from scene to scene." : "أصمم شخصيات كرتونية ثلاثية الأبعاد مناسبة للأطفال، ثم أطوّرها إلى قصص تعليمية أو توعوية أو محتوى للعلامات التجارية. تشمل نماذج هذا التخصص شخصية «المفكر مشعال» التعليمية، وشخصيتي «راشد ومريم» الإماراتيتين، مع الاهتمام بالتفاصيل الثقافية وثبات الهوية من مشهد إلى آخر."}</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Discuss your character project" : "ناقش مشروع شخصيتك معي"} <span><ArrowIcon /></span></a>
          </div>
          <div className="character-specialty-grid">
            {characterFeatures.map(([number, heading, text]) => <article key={number}><span>{number}</span><div><h3>{heading}</h3><p>{text}</p></div></article>)}
          </div>
        </section>
      )}

      <section className="service-detail-grid">
        <article><p className="eyebrow">DELIVERABLES</p><h2>{en ? "What you receive" : "ماذا تستلم؟"}</h2><ul>{deliverables.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></article>
        <article><p className="eyebrow">BEST FOR</p><h2>{en ? "A strong fit for" : "مناسبة خصوصًا لـ"}</h2><ul>{bestFor.map((item) => <li key={item}><span><ArrowIcon /></span>{item}</li>)}</ul></article>
      </section>

      <ServicePlanning slug={slug} language={language} />

      <section className="service-process" id={slug === "ai-video" ? "ai-production-process" : undefined}>
        <div className="section-heading"><p className="eyebrow">PROCESS</p><h2>{en ? "Clear from the first message" : "واضحة منذ الرسالة الأولى"}</h2></div>
        {slug === "web-app-design" ? <div className="process-grid"><article className="process-card"><span>01</span><div><h3>{en ? "Goal & structure" : "الهدف والهيكل"}</h3><p>{en ? "Define the business goal, audience, pages and required features." : "تحديد هدف المشروع والجمهور والصفحات والوظائف المطلوبة."}</p></div></article><article className="process-card"><span>02</span><div><h3>{en ? "UX & interface" : "التجربة والواجهة"}</h3><p>{en ? "Build the mobile-first layout, content hierarchy and visual direction." : "بناء تجربة مهيأة للجوال وتسلسل المحتوى والاتجاه البصري."}</p></div></article><article className="process-card"><span>03</span><div><h3>{en ? "Build & integrate" : "البناء والربط"}</h3><p>{en ? "Develop pages and core features, then connect the required flows." : "تطوير الصفحات والوظائف الأساسية وربط مسارات الاستخدام المطلوبة."}</p></div></article><article className="process-card"><span>04</span><div><h3>{en ? "QA & launch" : "الاختبار والإطلاق"}</h3><p>{en ? "Test mobile and desktop, navigation, forms, performance and search readiness before launch." : "اختبار الجوال والحاسب والتنقل والنماذج والأداء والجاهزية لمحركات البحث قبل الإطلاق."}</p></div></article></div> : slug === "ai-video" ? <div className="process-grid">{aiProductionSteps.map((step, index) => <article className="process-card" key={step.en[0]}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{en ? step.en[0] : step.ar[0]}</h3><p>{en ? step.en[1] : step.ar[1]}</p></div></article>)}</div> : <div className="process-grid"><article className="process-card"><span>01</span><div><h3>{en ? "Brief" : "فهم الطلب"}</h3><p>{en ? "Goal, audience, platform, materials and timeline." : "الهدف والجمهور والمنصة والمواد والموعد المطلوب."}</p></div></article><article className="process-card"><span>02</span><div><h3>{en ? "Plan & production" : "الخطة والتنفيذ"}</h3><p>{en ? "A clear visual direction followed by focused production." : "اتجاه بصري واضح ثم تنفيذ مركز ومنظم."}</p></div></article><article className="process-card"><span>03</span><div><h3>{en ? "Review" : "المراجعة"}</h3><p>{en ? "Feedback is collected and applied through an organized review." : "تجميع الملاحظات وتطبيقها ضمن مراجعة منظمة."}</p></div></article><article className="process-card"><span>04</span><div><h3>{en ? "Delivery" : "التسليم"}</h3><p>{en ? "Final files prepared for every agreed platform." : "ملفات نهائية جاهزة لجميع المنصات المتفق عليها."}</p></div></article></div>}
      </section>

      <section className="local-faq-section service-faq-section" id="faq">
        <div className="section-heading"><p className="eyebrow">FAQ</p><h2>{en ? "Questions before starting the project" : "أسئلة قبل بدء المشروع"}</h2></div>
        <div className="local-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="works-cta"><p className="eyebrow">START A PROJECT</p><h2>{slug === "web-app-design" ? (en ? "Ready to turn the idea into a useful website or app experience?" : "جاهز لتحويل الفكرة إلى موقع أو تجربة تطبيق عملية؟") : (en ? "Ready to turn the idea into a finished video?" : "جاهز لتحويل الفكرة إلى فيديو مكتمل؟")}</h2><a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Send your brief" : "أرسل تفاصيل مشروعك"} <span><ArrowIcon /></span></a></section>

      <section className="service-directory"><p className="eyebrow">RELATED SERVICES & RESOURCES</p><div>{slug !== "web-app-design" && <Link prefetch={false} href={`${prefix}/industries`}><span>{en ? "Browse video production industries" : "استعرض قطاعات صناعة الفيديو"}</span><b><ArrowIcon /></b></Link>}{Object.values(serviceCatalog).filter((item) => item.slug !== slug).map((item) => <Link prefetch={false} key={item.slug} href={`${prefix}/services/${item.slug}`}><span>{en ? item.titleEn : item.titleAr}</span><b><ArrowIcon /></b></Link>)}{(localLinks[slug] || []).map(([localSlug, ar, english]) => <Link prefetch={false} key={localSlug} href={`${prefix}/${localSlug}`}><span>{en ? english : ar}</span><b><ArrowIcon /></b></Link>)}{guideLinks[slug] && <Link prefetch={false} href={`${prefix}/guides/${guideLinks[slug][0]}`}><span>{en ? guideLinks[slug][2] : guideLinks[slug][1]}</span><b><ArrowIcon /></b></Link>}{(projectLinks[slug] || []).map(([projectSlug, ar, english]) => { const project = projectBySlug(projectSlug); return project ? <Link prefetch={false} key={projectSlug} href={projectPath(project, en ? "en" : "ar")}><span>{en ? english : ar}</span><b><ArrowIcon /></b></Link> : null; })}</div></section>
      <footer><span>© 2026 HASSN EDITOR</span><Link prefetch={false} href={`${prefix || ""}/works`}>{en ? "Portfolio" : "الأعمال"}</Link><Link prefetch={false} href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</Link><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /><span>VIDEO EDITOR · UNITED ARAB EMIRATES</span></footer>
    </main>
  );
}
