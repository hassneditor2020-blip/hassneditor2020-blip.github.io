import ServiceArea, { filmingAreas } from "./ServiceArea";
import ProjectHighlights from "./ProjectHighlights";
import SiteHeader from "./SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import PrivacySettingsButton from "./PrivacySettingsButton";
import { projectBySlug, projectPath } from "./projectData";

type Language = "ar" | "en";

type LandingContent = {
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
  benefitsAr: string[];
  benefitsEn: string[];
  idealAr: string[];
  idealEn: string[];
  serviceSlug: string;
  worksAnchor: string;
  area: string;
  guideSlug?: string;
  relatedProjectSlugs?: string[];
  faqsAr?: Array<[string, string]>;
  faqsEn?: Array<[string, string]>;
};

export const localLandingCatalog: Record<string, LandingContent> = {
  "videographer-ajman": {
    slug: "videographer-ajman",
    titleAr: "مصور فيديو في عجمان",
    titleEn: "Videographer in Ajman",
    leadAr: "تصوير فيديو وريلز للشركات والمنتجات والفعاليات في عجمان بموعد مسبق، من خطة اللقطات إلى المونتاج والألوان والصوت ونسخ جاهزة للنشر.",
    leadEn: "Video and Reels filming for businesses, products and events in Ajman by appointment, from shot planning to editing, color, sound and publish-ready delivery.",
    summaryAr: "أخطط كل جلسة تصوير بحسب هدف الفيديو والمنصة والجمهور، ثم أصور المكان أو المنتج أو الفعالية ضمن قائمة لقطات واضحة. يكتمل العمل بالمونتاج والمعالجة اللونية وتصميم الصوت حتى تحصل على فيديو متكامل بدل لقطات منفصلة.",
    summaryEn: "Every shoot is planned around the video goal, platform and audience, then captured through a purposeful shot list. Editing, color grading and sound design complete the work as one finished video rather than a collection of disconnected shots.",
    benefitsAr: ["تصوير احترافي داخل عجمان", "خطة لقطات تناسب هدف المشروع", "مونتاج ومعالجة ألوان وتصميم صوت", "نسخ عمودية وأفقية جاهزة للنشر"],
    benefitsEn: ["Professional filming in Ajman", "A shot plan shaped around the project goal", "Editing, color grading and sound design", "Vertical and horizontal publish-ready versions"],
    idealAr: ["المطاعم والكافيهات", "الحفلات والفعاليات", "إعلانات المنتجات", "فيديوهات الشركات والعقارات"],
    idealEn: ["Restaurants and cafes", "Live events and celebrations", "Product advertising", "Corporate and real-estate video"],
    serviceSlug: "videography",
    worksAnchor: "restaurant-events",
    area: "Ajman",
    guideSlug: "prepare-reels-video-shoot",
    relatedProjectSlugs: ["fm-restaurant-ajman-live-event-video", "cinematic-food-videography-restaurant-ad", "fm-restaurant-live-music-videography", "fm-restaurant-fajita-food-videography"],
    faqsAr: [
      ["هل تتوفر خدمة التصوير داخل عجمان؟", "نعم. يمكن تنسيق تصوير المطاعم والفعاليات والمنتجات وفيديوهات الشركات داخل عجمان، مع الاتفاق مسبقًا على الموقع ونطاق التنفيذ."],
      ["هل تشمل الخدمة المونتاج بعد التصوير؟", "نعم. يمكن تنفيذ التصوير والمونتاج ومعالجة الألوان والصوت وتسليم المقاسات المطلوبة ضمن مسار واحد."],
      ["هل يمكن تجهيز الفيديو للريلز والموقع؟", "نعم. تُخطط اللقطات للمقاسات المطلوبة، مثل 9:16 للريلز و16:9 للموقع ويوتيوب."],
    ],
    faqsEn: [
      ["Is videography available in Ajman?", "Yes. Restaurant, event, product and business filming can be coordinated in Ajman according to the location and agreed scope."],
      ["Does the service include editing after filming?", "Yes. Filming, editing, color grading, sound finishing and the required delivery formats can be handled through one workflow."],
      ["Can the video be prepared for Reels and websites?", "Yes. Shots are planned for the required formats, including 9:16 for Reels and 16:9 for websites and YouTube."],
    ],
  },
  "videographer-sharjah": {
  "slug": "videographer-sharjah",
  "titleAr": "مصور فيديو في الشارقة",
  "titleEn": "Videographer in Sharjah",
  "leadAr": "تصوير ريلز وفيديو للشركات والمنتجات والفعاليات في الشارقة بموعد مسبق، مع المونتاج وتجهيز المحتوى للنشر.",
  "leadEn": "On-location Reels and video filming for businesses, products and events in Sharjah by appointment, with editing and publish-ready delivery.",
  "summaryAr": "للمشاريع التجارية والصناعية في الشارقة، يبدأ التخطيط بتحديد الرسالة والموقع واللقطات المطلوبة. يمكن الجمع بين تصوير الموقع أو المنتج والموشن جرافيك لتوضيح الخدمات أو مراحل العمل.",
  "summaryEn": "For commercial and industrial projects in Sharjah, planning starts with the message, location and required shots. Location or product footage can be combined with motion graphics to explain services or production steps.",
  "benefitsAr": [
    "تنسيق التصوير في الشارقة مسبقًا",
    "فيديو تعريفي للشركات والمنتجات",
    "ريلز ومقاطع عمودية",
    "دمج المونتاج والموشن عند الحاجة"
  ],
  "benefitsEn": [
    "Scheduled filming in Sharjah",
    "Business and product introduction videos",
    "Reels and vertical clips",
    "Editing and motion graphics where useful"
  ],
  "idealAr": [
    "الشركات والمصانع",
    "المتاجر والعلامات التجارية",
    "الفعاليات والمشاريع العقارية"
  ],
  "idealEn": [
    "Businesses and factories",
    "Retailers and brands",
    "Events and real estate projects"
  ],
  "serviceSlug": "videography",
  "worksAnchor": "restaurant-events",
  "area": "Sharjah",
  "relatedProjectSlugs": ["al-sajaa-industrial-land-promo", "al-qasimia-cinematic-real-estate-promo"],
  "guideSlug": "prepare-reels-video-shoot",
  "faqsAr": [
    [
      "هل التصوير متاح في الشارقة؟",
      "نعم، بموعد مسبق وبعد الاتفاق على موقع التصوير ونطاق العمل."
    ],
    [
      "هل يمكن تسليم ريلز جاهزة للنشر؟",
      "نعم، يمكن الاتفاق على المقاسات والمدة وعدد النسخ قبل التنفيذ."
    ]
  ],
  "faqsEn": [
    [
      "Is filming available in Sharjah?",
      "Yes, by appointment after agreeing on the location and scope."
    ],
    [
      "Can you deliver publish-ready Reels?",
      "Yes, formats, duration and deliverables can be agreed before production."
    ]
  ]
},
  "videographer-dubai": {
  "slug": "videographer-dubai",
  "titleAr": "مصور فيديو في دبي",
  "titleEn": "Videographer in Dubai",
  "leadAr": "تصوير فيديو وريلز في دبي بموعد مسبق للعلامات التجارية والمنتجات والفعاليات، مع مونتاج يناسب منصات النشر.",
  "leadEn": "Scheduled video and Reels filming in Dubai for brands, products and events, with editing suited to each publishing platform.",
  "summaryAr": "للحملات والمحتوى التجاري في دبي، يمكن الاتفاق على قائمة لقطات ومقاسات متعددة قبل التصوير، ثم تجهيز نسخ مختصرة للإعلانات والريلز ونسخ عرضية للموقع عند الحاجة. يُنسّق الموقع والموعد وأي متطلبات تصوير قبل التنفيذ.",
  "summaryEn": "For campaigns and commercial content in Dubai, agree on a shot list and delivery formats before filming, then prepare short versions for ads and Reels and landscape versions for websites where needed. Location, timing and filming requirements are coordinated before production.",
  "benefitsAr": [
    "تنسيق جلسة التصوير في دبي بموعد مسبق",
    "تصوير منتجات ومحتوى تجاري",
    "مقاسات متعددة للحملات الرقمية",
    "معالجة اللون والصوت والمونتاج"
  ],
  "benefitsEn": [
    "Dubai shoots by prior appointment",
    "Product and commercial content filming",
    "Multiple formats for digital campaigns",
    "Editing, color and sound finishing"
  ],
  "idealAr": [
    "العلامات التجارية والمتاجر",
    "الفعاليات والشركات",
    "صناع المحتوى"
  ],
  "idealEn": [
    "Brands and retailers",
    "Events and businesses",
    "Content creators"
  ],
  "serviceSlug": "videography",
  "worksAnchor": "restaurant-events",
  "area": "Dubai",
  "relatedProjectSlugs": ["fm-restaurant-ajman-live-event-video", "swiss-product-story-ad"],
  "guideSlug": "prepare-reels-video-shoot",
  "faqsAr": [
    [
      "هل التصوير متاح في دبي؟",
      "نعم، بموعد مسبق وبعد الاتفاق على موقع التصوير ونطاق العمل."
    ],
    [
      "هل يمكن تسليم ريلز جاهزة للنشر؟",
      "نعم، يمكن الاتفاق على المقاسات والمدة وعدد النسخ قبل التنفيذ."
    ]
  ],
  "faqsEn": [
    [
      "Is filming available in Dubai?",
      "Yes, by appointment after agreeing on the location and scope."
    ],
    [
      "Can you deliver publish-ready Reels?",
      "Yes, formats, duration and deliverables can be agreed before production."
    ]
  ]
},
  "video-editor-ajman": {
    slug: "video-editor-ajman",
    titleAr: "مونتير فيديو في عجمان",
    titleEn: "Video Editor in Ajman",
    leadAr: "مونتاج وتصوير وصناعة محتوى للشركات والعيادات وصنّاع المحتوى في عجمان، من الفكرة حتى فيديو جاهز للنشر.",
    leadEn: "Video editing, filming and content production for businesses, clinics and creators in Ajman—from concept to publish-ready delivery.",
    summaryAr: "وجودي في عجمان يجعل تنسيق التصوير والاجتماعات ومراجعة تفاصيل المشروع أكثر مرونة. ويمكن تنفيذ المونتاج عن بُعد أو ترتيب إنتاج متكامل داخل الإمارة بحسب احتياج المشروع.",
    summaryEn: "Being based in Ajman makes filming, meetings and project coordination more flexible. Editing can be completed remotely, or arranged as a full local production when required.",
    benefitsAr: ["تصوير متاح داخل عجمان", "مونتاج وموشن ومعالجة صوت ولون", "تسليم لمقاسات ريلز ويوتيوب والإعلانات", "تواصل مباشر عبر واتساب"],
    benefitsEn: ["Filming available in Ajman", "Editing, motion, color and sound", "Delivery for Reels, YouTube and ads", "Direct communication via WhatsApp"],
    idealAr: ["الشركات المحلية", "العيادات والمراكز الطبية", "المطاعم والمتاجر", "صنّاع المحتوى"],
    idealEn: ["Local businesses", "Clinics and medical centers", "Restaurants and retailers", "Content creators"],
    serviceSlug: "content-production",
    worksAnchor: "ads",
    area: "Ajman",
  },
  "video-editing-uae": {
    slug: "video-editing-uae",
    titleAr: "مونتاج فيديو في الإمارات",
    titleEn: "Video Editing in the UAE",
    leadAr: "خدمة مونتاج احترافية للعملاء في جميع الإمارات، تشمل بناء الإيقاع ومعالجة الصورة والصوت وتجهيز الفيديو لكل منصة.",
    leadEn: "Professional video editing for clients across the UAE, including pacing, visual and sound finishing, and platform-specific delivery.",
    summaryAr: "أستقبل المواد المصورة من أي إمارة وأحوّلها إلى فيديو منظم يخدم هدف الحملة والجمهور. وعندما يحتاج المشروع إلى تصوير، يمكن تنسيقه في عجمان والشارقة ودبي بموعد مسبق.",
    summaryEn: "Footage can be supplied from anywhere in the Emirates and shaped into a focused video for your campaign and audience. Filming can also be coordinated in Ajman, Sharjah or Dubai by appointment when required.",
    benefitsAr: ["تنفيذ عن بُعد لجميع الإمارات", "قص وإيقاع وسرد بصري", "ألوان وصوت وعناوين", "نسخ طولي وعرضي ومربع"],
    benefitsEn: ["Remote delivery across the UAE", "Editing, pacing and visual storytelling", "Color, sound and titles", "Vertical, horizontal and square formats"],
    idealAr: ["إعلانات المنتجات", "محتوى الشركات", "ريلز السوشيال ميديا", "الفيديوهات التعليمية"],
    idealEn: ["Product ads", "Corporate content", "Social media Reels", "Educational videos"],
    serviceSlug: "video-editing",
    worksAnchor: "ads",
    area: "United Arab Emirates",
    guideSlug: "video-editing-cost-factors",
    relatedProjectSlugs: ["swiss-product-story-ad", "hair-removal-spray-product-ad"],
    faqsAr: [
      ["هل يمكن إرسال المواد من أي إمارة؟", "نعم. يمكن تنفيذ المونتاج والموشن عن بُعد من مواد يرسلها العميل، مع الاتفاق على طريقة نقل الملفات ومراجعة النسخ والمقاسات قبل البدء."],
      ["كيف أقارن عروض أسعار المونتاج؟", "قارن مدة المواد الأصلية وما يشمله العمل من بناء تسلسل وألوان وصوت وترجمة وموشن وعدد النسخ والتعديلات. اعتمد نطاقًا متطابقًا للمقارنة، لا مدة الفيديو النهائي وحدها."],
    ],
    faqsEn: [
      ["Can I send footage from any emirate?", "Yes. Editing and motion can be completed remotely from client-supplied material. File transfer, review, versions and formats are agreed before production."],
      ["How should I compare editing quotes?", "Compare source-footage duration, sequence development, color, sound, captions, motion, versions and revisions. Use the same scope for each comparison rather than finished duration alone."],
    ],
  },
  "dental-motion-graphics": {
    slug: "dental-motion-graphics",
    titleAr: "موشن جرافيك لعيادات الأسنان",
    titleEn: "Dental Motion Graphics",
    leadAr: "فيديوهات دينتال تشرح الخدمات والعلاجات بصورة واضحة وجذابة وتحافظ على الطابع المهني للعيادة.",
    leadEn: "Dental videos that explain services and treatments clearly while preserving a professional clinic identity.",
    summaryAr: "أحوّل المعلومة الطبية أو العرض التسويقي إلى تسلسل بصري سهل المتابعة، مع عناوين وتحريك للعناصر ومونتاج مناسب للمشاهدة على الهاتف ومنصات التواصل.",
    summaryEn: "I turn a medical message or promotion into an easy-to-follow visual sequence with animated titles, graphics and mobile-first editing.",
    benefitsAr: ["تبسيط المعلومة الطبية بصريًا", "تحريك متناسق مع هوية العيادة", "مقاسات مناسبة للريلز والمنصات", "إمكانية العمل بمواد العميل أو تصميم المشاهد"],
    benefitsEn: ["Clear visual explanation", "Animation aligned with clinic branding", "Formats for Reels and social media", "Work from supplied footage or designed scenes"],
    idealAr: ["عيادات الأسنان", "أطباء الأسنان", "مراكز التجميل الطبي", "حملات التوعية والعروض"],
    idealEn: ["Dental clinics", "Dentists", "Aesthetic medical centers", "Awareness and promotional campaigns"],
    serviceSlug: "motion-graphics",
    worksAnchor: "medical",
    area: "United Arab Emirates",
    guideSlug: "dental-video-content-guide",
    relatedProjectSlugs: ["dental-motion-2026-explainer", "dental-awareness-motion-graphics"],
    faqsAr: [
      ["ماذا أرسل لإنتاج فيديو للعيادة؟", "أرسل هوية العيادة ورسالة واحدة والنص المعتمد والصور أو الرسومات المتاحة والمنصة والموعد. تُراجع العيادة المعلومات الطبية وتعتمدها قبل تحويلها إلى مشاهد وعناوين."],
      ["هل يمكن تنفيذ الفيديو من دون تصوير المرضى؟", "نعم. يمكن استخدام موشن جرافيك ورسومات ومواد معتمدة تشرح الخدمة بصريًا، مع مراعاة أن أسلوب العرض يناسب الرسالة والهوية."],
      ["كيف يُحدَّد سعر فيديو الدينتال؟", "يتحدد النطاق بحسب المدة وعدد المشاهد والرسوم والتحريك والتعليق والترجمة والمقاسات والتعديلات. السعر بعد مراجعة النص والمواد المطلوبة."],
    ],
    faqsEn: [
      ["What should I send for a clinic video?", "Share the clinic branding, one message, approved copy, available images or diagrams, platform and deadline. The clinic reviews and approves medical information before it becomes scenes and titles."],
      ["Can it be produced without filming patients?", "Yes. Motion graphics, illustrations and approved assets can explain the service visually using an approach appropriate to the message and brand."],
      ["How is dental video production priced?", "Duration, scene count, graphics, animation, narration, captions, formats and revisions define the scope. Pricing follows a review of the approved copy and required assets."],
    ],
  },
  "product-video-ads": {
    slug: "product-video-ads",
    titleAr: "تصوير ومونتاج إعلانات المنتجات",
    titleEn: "Product Video Ads",
    leadAr: "إعلانات قصيرة تعرض المنتج ومزاياه بوضوح، من التصوير وترتيب اللقطات إلى المونتاج والنسخ الجاهزة للنشر.",
    leadEn: "Short-form ads that present your product and its value clearly—from filming and shot planning to editing and final platform formats.",
    summaryAr: "أبني الإعلان حول نقطة البيع الأساسية للمنتج بدل عرض لقطات منفصلة فقط، مع إيقاع سريع وعناوين واضحة ومعالجة للصورة والصوت تساعد المشاهد على فهم العرض واتخاذ خطوة.",
    summaryEn: "Each ad is built around the product's main selling point, using purposeful pacing, clear titles and polished visuals and sound to help viewers understand the offer and act.",
    benefitsAr: ["فكرة وترتيب لقطات المنتج", "تصوير في عجمان والشارقة ودبي بموعد مسبق", "مونتاج سريع وعناوين واضحة", "تسليم مناسب للإعلانات والريلز"],
    benefitsEn: ["Concept and product shot planning", "Filming in Ajman, Sharjah and Dubai by appointment", "Fast-paced editing and clear titles", "Delivery for ads and Reels"],
    idealAr: ["المتاجر الإلكترونية", "منتجات العناية والجمال", "العروض والتخفيضات", "إطلاق المنتجات الجديدة"],
    idealEn: ["Online stores", "Beauty and care products", "Sales and promotions", "New product launches"],
    serviceSlug: "content-production",
    worksAnchor: "ads",
    area: "United Arab Emirates",
    relatedProjectSlugs: ["hair-removal-spray-product-ad", "beauty-product-social-ad", "swiss-product-story-ad"],
    faqsAr: [
      ["هل أحتاج إلى تصوير المنتج أم يكفي الموشن؟", "إذا كان الهدف إظهار شكل المنتج أو استخدامه بدقة، نراجع التصوير الحقيقي أو صور المنتج المعتمدة أولًا. يمكن بناء الإعلان بالموشن أو دمج الأسلوبين بحسب المواد والرسالة."],
      ["ما المواد المطلوبة قبل بدء الإعلان؟", "أرسل الشعار وصور المنتج أو المنتج للتصوير، والميزة الأساسية، والنص والعرض المعتمدين، والمنصة وعدد النسخ والموعد المطلوب."],
      ["هل يمكن تجهيز عدة نسخ إعلانية؟", "يمكن الاتفاق على افتتاحيات أو مدد أو مقاسات مختلفة، مع تحديد ما إذا كانت كل نسخة تحتاج مونتاجًا منفصلًا أم إعادة توزيع العناصر فقط. تُدرج النسخ والتعديلات في عرض العمل."],
    ],
    faqsEn: [
      ["Does the product need filming or can we use motion graphics?", "When the exact product appearance or usage matters, we first review real filming or approved product photography. Motion graphics or a combined approach can then be selected for the message and available assets."],
      ["What is needed before the ad starts?", "Share the logo, product images or the product for filming, its main benefit, approved copy and offer, platform, version count and deadline."],
      ["Can you prepare multiple ad versions?", "Different openings, durations and formats can be agreed. We define whether each version needs a separate edit or a layout adjustment and include versions and revisions in the quote."],
    ],
  },
  "industrial-video-production-uae": {
    slug: "industrial-video-production-uae",
    titleAr: "إنتاج فيديو صناعي للشركات في الإمارات",
    titleEn: "Industrial Video Production in the UAE",
    metaTitleAr: "إنتاج فيديو صناعي وفيديوهات السلامة HSE في الإمارات",
    metaTitleEn: "Industrial & HSE Video Production UAE",
    metaDescriptionAr: "إنتاج فيديو صناعي للمصانع والشركات في الإمارات، وفيديوهات توعية الصحة والسلامة والبيئة HSE وفق محتوى معتمد. شاهد مشروع GGBS واطلب عرضًا.",
    metaDescriptionEn: "Industrial and HSE video production for UAE businesses: process explainers, safety awareness, motion graphics and editing. Watch GGBS and request a quote.",
    leadAr: "فيديوهات صناعية وفيديوهات شركات تحوّل العمليات والمفاهيم التقنية إلى قصة بصرية واضحة ومهنية وجاهزة للنشر.",
    leadEn: "Industrial and corporate videos that turn complex processes and technical concepts into clear, professional, publish-ready visual stories.",
    summaryAr: "أبدأ من فهم العملية الصناعية والجمهور والرسالة، ثم أبني تسلسل المشاهد والمونتاج والموشن والصوت بما يشرح الفكرة من دون تبسيط مخل أو ازدحام بصري. ويمكن دمج التصوير والمواد الهندسية والمشاهد المدعومة بالذكاء الاصطناعي بحسب طبيعة المشروع.",
    summaryEn: "I begin by understanding the industrial process, audience and message, then shape the scene sequence, editing, motion and sound so the idea remains accurate without becoming visually dense. Filming, technical assets and AI-assisted visuals can be combined when the project requires them.",
    benefitsAr: ["تبسيط العمليات والمفاهيم التقنية", "مونتاج وموشن جرافيك للشركات", "مشاهد مدعومة بالذكاء الاصطناعي عند الحاجة", "تصميم صوت ونسخ جاهزة للعروض والمنصات"],
    benefitsEn: ["Clear explanation of technical processes", "Corporate editing and motion graphics", "AI-assisted visuals when appropriate", "Sound design and formats for presentations and platforms"],
    idealAr: ["المصانع والمنشآت الصناعية", "الشركات الهندسية والاستشارية", "مشاريع الاستدامة والتقنيات الحديثة", "العروض التعريفية والترويجية للشركات"],
    idealEn: ["Factories and industrial facilities", "Engineering and consulting companies", "Sustainability and technology projects", "Corporate explainers and promotional films"],
    serviceSlug: "ai-video",
    worksAnchor: "ai",
    area: "United Arab Emirates",
    guideSlug: "industrial-video-production-guide",
    relatedProjectSlugs: ["ggbs-smart-factory-industrial-promo", "professional-ai-adobe-video-production"],
    faqsAr: [
      ["هل يمكن تنفيذ فيديوهات التوعية بالسلامة المهنية؟", "يمكنني تحويل محتوى السلامة المعتمد واللقطات المتاحة إلى فيديوهات توعوية أو تعريفية مع الموشن والترجمة. يعتمد فريق السلامة المختص لديكم المحتوى الفني قبل نشره."],
      ["هل يمكن تنفيذ الفيديو الصناعي من مواد موجودة؟", "نعم. يمكن بناء الفيديو من لقطات وملفات تقنية يرسلها العميل، مع إضافة الموشن أو المشاهد المدعومة بالذكاء الاصطناعي عندما تخدم الشرح."],
      ["هل يجب تصوير المصنع؟", "يعتمد ذلك على الرسالة والمواد المتاحة. يمكن الاعتماد على تصوير العميل، أو تنسيق تصوير مناسب، أو دمج مواد هندسية ومشاهد AI ضمن نطاق العمل المتفق عليه."],
      ["ما مقاسات الفيديو الصناعي المتاحة؟", "يمكن تجهيز نسخة أفقية 16:9 للعروض والموقع ويوتيوب، ونسخة عمودية 9:16 للريلز والمنصات، بحسب احتياج المشروع."],
    ],
    faqsEn: [
      ["Can you produce HSE awareness videos?", "I can edit approved safety content and supplied footage into induction or awareness videos, with motion graphics and captions. Your qualified HSE team approves all technical content before publication."],
      ["Can an industrial video be created from existing material?", "Yes. The video can be built from supplied footage and technical files, with motion graphics or AI-assisted visuals added when they improve the explanation."],
      ["Does the factory need to be filmed?", "That depends on the message and available assets. We can use client footage, coordinate suitable filming, or combine technical material and AI visuals within the agreed scope."],
      ["Which industrial video formats are available?", "A 16:9 version can be prepared for presentations, websites and YouTube, with a 9:16 version for Reels and social platforms when required."],
    ],
  },
  "real-estate-video-editing-uae": {
    slug: "real-estate-video-editing-uae",
    titleAr: "مونتاج فيديو عقاري في الإمارات",
    titleEn: "Real Estate Video Editing in the UAE",
    leadAr: "مونتاج وموشن جرافيك للفيديوهات العقارية يبرز الموقع والمزايا والفرصة الاستثمارية ضمن محتوى واضح ومناسب للهاتف.",
    leadEn: "Real-estate editing and motion graphics that highlight location, benefits and investment value in clear, mobile-first video content.",
    summaryAr: "يحتاج الفيديو العقاري إلى ترتيب المعلومات بحسب ما يهم المشتري أو المستثمر: الموقع، نوع العقار، المزايا وطريقة التواصل. أبني هذا التسلسل بإيقاع مناسب وعناوين مقروءة وموشن وصوت يساعدان على إبراز الفرصة من دون إغراق المشاهد بالتفاصيل.",
    summaryEn: "A real-estate video should prioritize what buyers and investors need: location, property type, benefits and the next contact step. I structure these details through purposeful pacing, readable titles, motion and sound without overwhelming the viewer.",
    benefitsAr: ["ترتيب معلومات العقار والأرض بوضوح", "عناوين وخرائط وموشن جرافيك", "مقاس عمودي للريلز والإعلانات", "مونتاج مناسب للعروض العقارية والاستثمارية"],
    benefitsEn: ["Clear property and land information", "Titles, maps and motion graphics", "Vertical formats for Reels and ads", "Editing for property and investment offers"],
    idealAr: ["المطورون والمسوقون العقاريون", "الأراضي الصناعية والاستثمارية", "الوسطاء وأصحاب العقارات", "حملات البيع والتعريف بالمشاريع"],
    idealEn: ["Developers and property marketers", "Industrial and investment land", "Brokers and property owners", "Sales and project-awareness campaigns"],
    serviceSlug: "motion-graphics",
    worksAnchor: "realestate",
    area: "United Arab Emirates",
    guideSlug: "real-estate-video-marketing-guide",
    relatedProjectSlugs: ["al-sajaa-industrial-land-promo", "al-qasimia-cinematic-real-estate-promo"],
    faqsAr: [
      ["هل يمكن تنفيذ فيديو عقاري من صور ومخططات فقط؟", "نعم. يمكن تنظيم الصور والمخططات والخرائط ضمن مونتاج وموشن واضح، مع استخدام مشاهد مدعومة بالذكاء الاصطناعي فقط عندما تكون مناسبة للمشروع."],
      ["هل الفيديو مناسب للإعلانات والريلز؟", "يمكن تجهيز نسخة عمودية 9:16 للريلز والإعلانات، إلى جانب المقاسات الأخرى المطلوبة ضمن نطاق التسليم."],
      ["كيف نحافظ على وضوح بيانات العقار؟", "نرتب الفيديو حول رسالة واحدة، ونستخدم عناوين مقروءة وإيقاعًا مناسبًا ودعوة تواصل واضحة دون ازدحام المشهد بالتفاصيل."],
    ],
    faqsEn: [
      ["Can a real-estate video be produced from photos and plans only?", "Yes. Photos, plans and maps can be shaped through clear editing and motion, with AI-assisted scenes used only when appropriate for the project."],
      ["Will the video work for ads and Reels?", "A vertical 9:16 version can be prepared for Reels and advertising, together with any other agreed delivery formats."],
      ["How do you keep property information clear?", "The video is organized around one message, with readable titles, purposeful pacing and a clear contact step instead of overcrowded frames."],
    ],
  },
  "restaurant-videography-uae": {
    slug: "restaurant-videography-uae",
    titleAr: "تصوير ومونتاج فيديوهات المطاعم في الإمارات",
    titleEn: "Restaurant Videography in the UAE",
    leadAr: "تصوير ومونتاج فيديوهات للمطاعم والكافيهات والفعاليات تعرض المكان والمنتج والأجواء ضمن محتوى قصير وجاهز للنشر.",
    leadEn: "Restaurant, cafe and event videography that presents the venue, product and atmosphere through polished, social-ready video.",
    summaryAr: "أبني الفيديو كرحلة بصرية تبدأ من الواجهة والمكان، ثم تنتقل إلى تفاصيل الأطباق والمشروبات والخدمة والأجواء الحية. ويُخطط التصوير والمونتاج منذ البداية للمشاهدة على الهاتف، مع معالجة ألوان وصوت تحافظ على هوية المكان وتجربة الزائر.",
    summaryEn: "I shape each video as a visual guest journey—from the exterior and venue to food, drinks, service and live atmosphere. Filming and editing are planned for mobile viewing, with color and sound finishing that preserves the venue identity and visitor experience.",
    benefitsAr: ["تخطيط وتصوير داخل عجمان والإمارات", "مونتاج إعلانات المطاعم والكافيهات", "معالجة ألوان وصوت تُبرز أجواء المكان", "نسخ عمودية 9:16 وأفقية 16:9 عند الحاجة"],
    benefitsEn: ["Planning and filming in Ajman and the UAE", "Restaurant and cafe promotional editing", "Color and sound finishing for venue atmosphere", "Vertical 9:16 and horizontal 16:9 versions when required"],
    idealAr: ["المطاعم والكافيهات", "حفلات الموسيقى الحية", "الافتتاحات والفعاليات", "إعلانات الأطباق والمشروبات"],
    idealEn: ["Restaurants and cafes", "Live music nights", "Openings and events", "Food and beverage promotions"],
    serviceSlug: "videography",
    worksAnchor: "restaurant-events",
    area: "United Arab Emirates",
    guideSlug: "restaurant-video-marketing-guide",
    relatedProjectSlugs: ["fm-restaurant-ajman-live-event-video", "fm-restaurant-cinematic-coffee-promo"],
    faqsAr: [
      ["هل التصوير متاح داخل المطعم؟", "نعم. يمكن تنسيق التصوير داخل المطعم أو الكافيه في عجمان والشارقة ودبي بموعد مسبق، حسب نطاق المشروع المتفق عليه."],
      ["هل يمكن تصوير الطعام والمكان والفعالية في فيديو واحد؟", "نعم، بشرط ترتيب المشاهد حول تجربة واضحة تبدأ بالمكان ثم التفاصيل والمنتج والأجواء، بدل جمع لقطات منفصلة من دون تسلسل."],
      ["ما المقاس المناسب لفيديو المطعم؟", "غالبًا تكون النسخة العمودية 9:16 مناسبة للريلز والإعلانات، ويمكن تجهيز نسخة أفقية للموقع ويوتيوب عند الحاجة."],
    ],
    faqsEn: [
      ["Is on-location restaurant filming available?", "Yes. Filming can be coordinated at restaurants and cafes in Ajman, Sharjah and Dubai by prior appointment and within the agreed project scope."],
      ["Can the venue, food and event appear in one video?", "Yes, when the sequence follows a clear guest journey from the venue to details, products and atmosphere instead of presenting disconnected shots."],
      ["Which format works best for restaurant video?", "A vertical 9:16 version usually works well for Reels and advertising, with a horizontal version available for websites and YouTube when required."],
    ],
  },
};

const localLandingSocialImages: Record<string, string> = {
  "videographer-ajman": "/restaurant-event-videos-cover.webp",
  "video-editor-ajman": "/hassn-editor-showreel-cover.jpg",
  "video-editing-uae": "https://i.ytimg.com/vi/B-GSumhDcmA/hqdefault.jpg",
  "dental-motion-graphics": "https://i.ytimg.com/vi/fBdcM8TO8YQ/hqdefault.jpg",
  "product-video-ads": "https://i.ytimg.com/vi/vv0wjZ2EU3c/hqdefault.jpg",
  "industrial-video-production-uae": "https://i.ytimg.com/vi/fEfr2kHqQ8o/hqdefault.jpg",
  "real-estate-video-editing-uae": "https://i.ytimg.com/vi/NCmGTgBdbhg/hqdefault.jpg",
  "restaurant-videography-uae": "/restaurant-event-videos-cover.webp",
};

export function getLocalLandingMetadata(slug: string, language: Language): Metadata {
  const content = localLandingCatalog[slug];
  const en = language === "en";
  const path = `${en ? "/en" : ""}/${slug}`;
  const alternatePath = `${en ? "" : "/en"}/${slug}`;
  const title = en ? (content.metaTitleEn || content.titleEn) : (content.metaTitleAr || content.titleAr);
  const description = en ? (content.metaDescriptionEn || content.leadEn) : (content.metaDescriptionAr || content.leadAr);
  const socialImage = localLandingSocialImages[slug] || localLandingSocialImages["videographer-ajman"];
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { ar: en ? alternatePath : path, en: en ? path : alternatePath, "x-default": en ? alternatePath : path },
    },
    openGraph: { title: `${title} | HASSN EDITOR`, description, url: `https://hassneditor.com${path}`, images: [socialImage], locale: en ? "en_AE" : "ar_AE" },
    twitter: { card: "summary_large_image", title: `${title} | HASSN EDITOR`, description, images: [socialImage] },
  };
}

export default function LocalLandingPage({ slug, language = "ar" }: { slug: string; language?: Language }) {
  const content = localLandingCatalog[slug];
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const alternatePrefix = en ? "" : "/en";
  const title = en ? content.titleEn : content.titleAr;
  const lead = en ? content.leadEn : content.leadAr;
  const summary = en ? content.summaryEn : content.summaryAr;
  const benefits = en ? content.benefitsEn : content.benefitsAr;
  const ideal = en ? content.idealEn : content.idealAr;
  const faqs = (en ? content.faqsEn : content.faqsAr) || [];
  const canonicalUrl = `https://hassneditor.com${prefix}/${slug}`;
  const guideLinks: Record<string, [string, string, string]> = {
    "videography": ["restaurant-video-marketing-guide", "دليل صناعة فيديو مطعم يجذب الزوار", "Restaurant video marketing guide"],
    "video-editing": ["choose-video-editor-uae", "دليل اختيار مونتير فيديو في الإمارات", "Guide to choosing a video editor in the UAE"],
    "motion-graphics": ["dental-video-content-guide", "دليل صناعة فيديوهات طبية واضحة", "Guide to clear, engaging dental videos"],
    "ai-video": ["ai-video-production-uae-guide", "دليل إنتاج فيديو AI احترافي", "Professional AI video production guide"],
    "content-production": ["video-editing-cost-factors", "دليل عوامل تكلفة إنتاج ومونتاج الفيديو", "Guide to video editing and production cost factors"],
  };
  const guideSlug = content.guideSlug || guideLinks[content.serviceSlug][0];
  const guide = guideLinks[content.serviceSlug];
  const guideLabel = content.guideSlug === "industrial-video-production-guide"
    ? ["دليل صناعة فيديو صناعي واضح", "Industrial video production guide"]
    : content.guideSlug === "real-estate-video-marketing-guide"
      ? ["دليل صناعة فيديو عقاري فعّال", "Real-estate video marketing guide"]
      : content.guideSlug === "restaurant-video-marketing-guide"
        ? ["دليل صناعة فيديو مطعم يجذب الزوار", "Restaurant video marketing guide"]
      : content.guideSlug === "prepare-reels-video-shoot"
        ? ["دليل تجهيز جلسة تصوير ريلز", "Reels shoot preparation guide"]
        : content.guideSlug === "video-editing-cost-factors"
          ? ["دليل تكلفة ونطاق تنفيذ الفيديو", "Video production scope and cost guide"]
          : [guide[1], guide[2]];
  const relatedProjects = (content.relatedProjectSlugs || []).flatMap((projectSlug) => {
    const project = projectBySlug(projectSlug);
    return project ? [project] : [];
  });
  const whatsappText = en ? `Hello Hassn, I found your ${content.titleEn} page and would like to discuss a project.` : `مرحبًا حسن، شاهدت صفحة ${content.titleAr} وأرغب في مناقشة مشروع.`;
  const whatsappUrl = `https://wa.me/971505918238?text=${encodeURIComponent(whatsappText)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: title,
        description: lead,
        url: canonicalUrl,
        inLanguage: en ? "en" : "ar",
        areaServed: content.area !== "United Arab Emirates" ? { "@type": "City", name: content.area } : content.serviceSlug === "videography" ? filmingAreas.map((name) => ({ "@type": "City", name })) : { "@type": "Country", name: content.area },
        provider: { "@type": "ProfessionalService", "@id": "https://hassneditor.com/#business", name: "HASSN EDITOR", url: "https://hassneditor.com", telephone: "+971505918238" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: en ? "Home" : "الرئيسية", item: `https://hassneditor.com${prefix || "/"}` },
          { "@type": "ListItem", position: 2, name: en ? "Services" : "الخدمات", item: `https://hassneditor.com${prefix}/services` },
          { "@type": "ListItem", position: 3, name: title, item: canonicalUrl },
        ],
      },
      ...(faqs.length ? [{
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }] : []),
    ],
  };

  return (
    <main data-contact-page="local_service" data-contact-service={content.serviceSlug} className={`site service-page ${en ? "en" : "ar"}`} lang={en ? "en" : "ar"} dir={en ? "ltr" : "rtl"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#local-content">{en ? "Skip to content" : "انتقل إلى المحتوى"}</a>
      <div className="noise" aria-hidden="true" />
      <SiteHeader language={language} alternatePath={`${alternatePrefix}/${slug}`} />

      <section className="service-hero" id="local-content">
        <nav className="breadcrumbs" aria-label={en ? "Breadcrumb" : "مسار الصفحة"}><Link prefetch={false} href={prefix || "/"}>{en ? "Home" : "الرئيسية"}</Link><span>/</span><Link prefetch={false} href={`${prefix || ""}/services`}>{en ? "Services" : "الخدمات"}</Link><span>/</span><b>{title}</b></nav>
        <p className="eyebrow">HASSN EDITOR / UAE</p>
        <h1>{title}</h1>
        <p className="service-lead">{lead}</p>
        <ServiceArea language={language} />
        <div className="service-hero-actions"><a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Request a custom quote" : "اطلب عرض سعر مخصص"}</a><Link prefetch={false} className="secondary-button" href={`${prefix}/works#${content.worksAnchor}`}>{en ? "View related work" : "شاهد أعمالًا مرتبطة"}</Link>{content.serviceSlug === "videography" && <a className="secondary-button" href="tel:+971505918238">{en ? "Call to discuss filming" : "اتصل لمناقشة التصوير"}</a>}</div>
      </section>

      {relatedProjects.length > 0 && <ProjectHighlights projects={relatedProjects} language={language} showDetails={content.serviceSlug !== "videography" || content.area === "Sharjah" || content.area === "Dubai"} heading={content.area === "Sharjah" || content.area === "Dubai" ? (en ? "Relevant examples from my portfolio" : "نماذج مرتبطة من معرض أعمالي") : undefined} />}

      <section className="service-overview">
        <div><p className="eyebrow">LOCAL SERVICE</p><h2>{en ? "A service shaped around your project" : "خدمة مبنية حول احتياج مشروعك"}</h2><p className="service-summary">{summary}</p></div>
        <div className="service-facts"><span><strong>{content.area === "United Arab Emirates" ? "UAE" : content.area.toUpperCase()}</strong><small>{en ? "Service area" : "نطاق الخدمة"}</small></span><span><strong>+500</strong><small>{en ? "Projects completed" : "عمل منجز"}</small></span><span><strong>2020</strong><small>{en ? "Experience since" : "خبرة منذ"}</small></span></div>
      </section>

      {slug === "industrial-video-production-uae" && <section className="service-detail-grid" id="hse-video-production">
        <article><p className="eyebrow">HSE VIDEO PRODUCTION / UAE</p><h2>{en ? "Health, safety and environment videos" : "إنتاج فيديوهات الصحة والسلامة والبيئة (HSE)"}</h2><p>{en ? "Turn your approved safety procedures into clear video communications for staff, contractors and visitors. I can edit supplied site footage, create motion graphics, add captions and prepare induction or awareness clips in the agreed languages." : "حوّل إجراءات السلامة المعتمدة لديك إلى فيديوهات واضحة للموظفين والمقاولين والزوار. يمكنني مونتاج لقطات الموقع التي توفرها، وتصميم الموشن والعناوين والترجمة وتجهيز مقاطع التهيئة والتوعية باللغات المتفق عليها."}</p><ul>{(en ? ["Safety induction and orientation", "PPE awareness and approved site procedures", "Environmental awareness and industrial process explainers"] : ["فيديوهات التهيئة والتعريف بإجراءات السلامة", "التوعية بمعدات الوقاية وإجراءات الموقع المعتمدة", "التوعية البيئية وشرح العمليات الصناعية"]).map(item => <li key={item}><span>✓</span>{item}</li>)}</ul></article>
        <article><p className="eyebrow">TECHNICAL REVIEW</p><h2>{en ? "What to send for an HSE video quote" : "ماذا ترسل لطلب عرض سعر لفيديو السلامة؟"}</h2><p>{en ? "Share the approved script or procedures, audience, permitted footage, required languages and target length. Your qualified HSE team must review technical accuracy before release; illustrative AI scenes are not a substitute for verified safety instructions. The GGBS example above demonstrates industrial visual production, not an HSE certification or a completed safety training project." : "أرسل النص أو الإجراءات المعتمدة والجمهور واللقطات المصرح باستخدامها واللغات والمدة المطلوبة. يراجع فريق السلامة المختص لديكم الدقة الفنية قبل النشر؛ فالمشاهد التوضيحية بالذكاء الاصطناعي لا تحل محل تعليمات السلامة المعتمدة. نموذج GGBS أعلاه يوضح الإنتاج البصري الصناعي، ولا يمثل شهادة HSE أو مشروع تدريب سلامة منفذًا."}</p><Link prefetch={false} href={`${prefix}/guides/video-editing-cost-factors`}>{en ? "Video production cost guide" : "دليل تكلفة إنتاج الفيديو"} ↗</Link></article>
      </section>}
      <section className="service-detail-grid">
        <article><p className="eyebrow">WHAT YOU GET</p><h2>{en ? "Included in the service" : "ما تتضمنه الخدمة"}</h2><ul>{benefits.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></article>
        <article><p className="eyebrow">BEST FOR</p><h2>{en ? "A strong fit for" : "مناسبة خصوصًا لـ"}</h2><ul>{ideal.map((item) => <li key={item}><span>↗</span>{item}</li>)}</ul></article>
      </section>

      <section className="service-process">
        <div className="section-heading"><p className="eyebrow">HOW IT WORKS</p><h2>{en ? "Clear from brief to delivery" : "مسار واضح من الطلب حتى التسليم"}</h2></div>
        <div className="process-grid"><article className="process-card"><span>01</span><div><h3>{en ? "Project brief" : "تفاصيل المشروع"}</h3><p>{en ? "Goal, audience, platform, footage and deadline." : "الهدف والجمهور والمنصة والمواد والموعد المطلوب."}</p></div></article><article className="process-card"><span>02</span><div><h3>{en ? "Direction" : "الاتجاه البصري"}</h3><p>{en ? "The editing or production approach is agreed before work begins." : "نتفق على أسلوب المونتاج أو الإنتاج قبل بدء التنفيذ."}</p></div></article><article className="process-card"><span>03</span><div><h3>{en ? "Production" : "التنفيذ"}</h3><p>{en ? "Focused production with organized communication and review." : "تنفيذ مركز مع تواصل ومراجعة منظمين."}</p></div></article><article className="process-card"><span>04</span><div><h3>{en ? "Delivery" : "التسليم"}</h3><p>{en ? "Final versions prepared for the agreed platforms." : "نسخ نهائية مجهزة للمنصات المتفق عليها."}</p></div></article></div>
      </section>

      {faqs.length > 0 && <section className="local-faq-section" id="faq"><div className="section-heading"><p className="eyebrow">FAQ</p><h2>{en ? "Common questions before production" : "أسئلة شائعة قبل بدء التنفيذ"}</h2></div><div className="local-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>}

      <section className="works-cta"><p className="eyebrow">START A PROJECT</p><h2>{en ? "Tell me what you need and receive a tailored quote" : "أرسل تفاصيل مشروعك لتحصل على عرض مناسب له"}</h2><a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">{en ? "Message me on WhatsApp" : "تواصل معي عبر واتساب"} <span>↗</span></a></section>

      <section className="service-directory"><p className="eyebrow">RELATED PAGES</p><div><Link prefetch={false} href={`${prefix}/industries`}><span>{en ? "Browse video production industries" : "استعرض قطاعات صناعة الفيديو"}</span><b>↗</b></Link><Link prefetch={false} href={`${prefix}/services/${content.serviceSlug}`}><span>{en ? "Service details" : "تفاصيل الخدمة"}</span><b>↗</b></Link><Link prefetch={false} href={`${prefix}/works#${content.worksAnchor}`}><span>{en ? "Related portfolio" : "الأعمال المرتبطة"}</span><b>↗</b></Link><Link prefetch={false} href={`${prefix}/guides/${guideSlug}`}><span>{en ? guideLabel[1] : guideLabel[0]}</span><b>↗</b></Link>{relatedProjects.map((project) => <Link prefetch={false} key={project.slug} href={projectPath(project, language)}><span>{en ? project.titleEn : project.titleAr}</span><b>↗</b></Link>)}{Object.values(localLandingCatalog).filter((item) => item.slug !== slug).slice(0, 2).map((item) => <Link prefetch={false} key={item.slug} href={`${prefix}/${item.slug}`}><span>{en ? item.titleEn : item.titleAr}</span><b>↗</b></Link>)}</div></section>
      <footer><span>© 2026 HASSN EDITOR</span><Link prefetch={false} href={`${prefix || ""}/works`}>{en ? "Portfolio" : "الأعمال"}</Link><Link prefetch={false} href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</Link><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /><span>VIDEO EDITOR · UNITED ARAB EMIRATES</span></footer>
    </main>
  );
}
