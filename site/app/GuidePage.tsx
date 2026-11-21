import { ArrowIcon } from "./PortfolioIcons";
import SiteHeader from "./SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import { searchContentModified } from "./contentDates";
import PrivacySettingsButton from "./PrivacySettingsButton";
import { projectBySlug, projectPath } from "./projectData";
import { aiProductionGuideAdditions, characterGuideAdditions } from "./aiGuideAdditions";
import { reelsShootGuide } from "./reelsShootGuide";
import VideoScopeComparison from "./VideoScopeComparison";

type Language = "ar" | "en";
export type GuideSection = { headingAr: string; headingEn: string; textAr: string; textEn: string; pointsAr?: string[]; pointsEn?: string[] };
type GuideContent = {
  slug: string;
  titleAr: string;
  titleEn: string;
  metaTitleAr?: string;
  metaTitleEn?: string;
  descriptionAr: string;
  descriptionEn: string;
  introAr: string;
  introEn: string;
  sections: GuideSection[];
  serviceSlug: string;
  serviceAr: string;
  serviceEn: string;
  publishedDate?: string;
  modifiedDate?: string;
};

export const guideCatalog: Record<string, GuideContent> = {
  "prepare-reels-video-shoot": reelsShootGuide,
  "choose-video-editor-uae": {
    slug: "choose-video-editor-uae",
    titleAr: "كيف تختار مونتير فيديو مناسبًا في الإمارات؟",
    titleEn: "How to Choose a Video Editor in the UAE",
    metaTitleAr: "اختيار مونتير فيديو في الإمارات: دليل المقارنة",
    metaTitleEn: "Choosing a Video Editor in UAE: Checklist",
    descriptionAr: "كيف تختار مونتير فيديو في الإمارات؟ قارن الأعمال وعرض السعر والتعديلات وحقوق المواد، مع أمثلة فعلية وقائمة واضحة لتجهيز مشروعك قبل التنفيذ.",
    descriptionEn: "Choose a video editor in the UAE using real project examples and a practical checklist for quotes, revisions, footage, usage rights and final delivery.",
    introAr: "الاختيار الجيد لا يعتمد على فيديو جميل واحد أو أقل سعر. المونتير المناسب هو من يفهم هدف المحتوى والجمهور والمنصة، ويحوّل المواد المتاحة إلى فيديو يخدم النتيجة المطلوبة ضمن تواصل وتسليم واضحين.",
    introEn: "A good choice is not based on one attractive video or the lowest price. The right editor understands the content goal, audience and platform, then turns the available material into a focused video through a clear workflow.",
    sections: [
      { headingAr: "ابدأ بنوع العمل المشابه لمشروعك", headingEn: "Start with relevant work", textAr: "شاهد أعمالًا في مجال قريب من مشروعك: منتجات، عيادات، عقارات، محتوى شركات أو فيديوهات ذكاء اصطناعي. التشابه في الهدف أهم من التشابه في الألوان فقط.", textEn: "Review work close to your project—products, clinics, real estate, corporate content or AI video. Similarity in purpose matters more than matching colors alone." },
      { headingAr: "اسأل عن نطاق التنفيذ", headingEn: "Clarify the production scope", textAr: "حدّد هل تحتاج إلى مونتاج مواد جاهزة، أم فكرة وسكريبت وتصوير وموشن ومعالجة صوت. معرفة النطاق من البداية تمنع اختلاف التوقعات وتساعد على تسعير المشروع بدقة.", textEn: "Decide whether you need editing of supplied footage or a complete path covering concept, script, filming, motion and sound. A clear scope prevents mismatched expectations and improves pricing accuracy." },
      { headingAr: "قيّم التواصل قبل البدء", headingEn: "Evaluate communication early", textAr: "الاستجابة الواضحة، والأسئلة الصحيحة عن الجمهور والمنصة والموعد، وطريقة جمع الملاحظات مؤشرات مهمة على تجربة العمل لاحقًا.", textEn: "Clear responses, the right questions about audience, platform and deadline, and an organized review method are strong indicators of the working experience ahead." },
      { headingAr: "راجع التسليم والتعديلات", headingEn: "Confirm delivery and revisions", textAr: "اتفق على المقاسات المطلوبة وعدد النسخ وآلية التعديلات وموعد التسليم. ريلز 9:16 ويوتيوب 16:9 والإعلانات قد تحتاج نسخًا مختلفة، لا مجرد تغيير أبعاد الملف.", textEn: "Agree on formats, versions, revisions and deadline. Reels in 9:16, YouTube in 16:9 and paid ads may require different edits—not only resized files.", pointsAr: ["اطلب عرض سعر واضحًا حسب نطاق المشروع", "اختر أعمالًا مرتبطة بمجالك", "تأكد من وجود مسار مراجعة وتسليم منظم"], pointsEn: ["Request a quote based on the project scope", "Choose an editor with relevant work", "Confirm an organized review and delivery process"] },
    ],
    serviceSlug: "video-editing",
    serviceAr: "خدمة مونتاج الفيديو",
    serviceEn: "Video editing service",
  },
  "video-editing-cost-factors": {
    slug: "video-editing-cost-factors",
    titleAr: "ما الذي يحدد تكلفة مونتاج الفيديو؟",
    titleEn: "What Determines Video Editing Cost?",
    metaTitleAr: "أسعار تصميم ومونتاج الفيديو في الإمارات: دليل التكلفة",
    metaTitleEn: "Video Production & Editing Costs in UAE: Quote Guide",
    descriptionAr: "ما الذي يحدد أسعار مونتاج وتصميم الفيديو في الإمارات؟ قارن مونتاج مواد جاهزة وإعلان موشن وتصوير ريلز، واعرف المواد والنسخ والتعديلات المطلوبة لعرض سعر واضح.",
    descriptionEn: "What affects UAE video editing and production costs? Compare supplied-footage editing, motion graphics and a Reels shoot, with a checklist for a clear quote.",
    modifiedDate: "2026-11-15",
    introAr: "مدة الفيديو عامل مهم، لكنها ليست العامل الوحيد. فيديو قصير قد يحتاج إلى موشن جرافيك وتصميم مشاهد ومعالجة دقيقة أكثر من فيديو أطول يعتمد على قص بسيط، لذلك يُحدَّد السعر بعد فهم نطاق التنفيذ.",
    introEn: "Video duration matters, but it is not the only factor. A short video with custom motion, scene design and detailed finishing may require more work than a longer, simpler edit, so pricing follows the actual scope.",
    sections: [
      { headingAr: "نوع المونتاج وتعقيده", headingEn: "Editing style and complexity", textAr: "القص الأساسي يختلف عن مونتاج إعلاني سريع أو سرد قصصي أو فيديو تعليمي متعدد العناصر. كل نوع يحتاج وقتًا مختلفًا في اختيار اللقطات وبناء الإيقاع والمعالجة.", textEn: "A basic cut differs from a fast-paced ad, narrative edit or multi-layer educational video. Each requires a different amount of work in shot selection, pacing and finishing." },
      { headingAr: "المواد المتوفرة قبل البدء", headingEn: "Available source material", textAr: "ترتيب ملفات واضحة وسكريبت جاهز يقللان وقت التحضير، بينما البحث عن المواد أو إعادة تنظيمها أو معالجة صوت وصورة ضعيفين يضيف مراحل جديدة.", textEn: "Organized footage and a ready script reduce preparation time. Sourcing material, reorganizing files or repairing weak audio and visuals adds extra stages." },
      { headingAr: "الموشن والذكاء الاصطناعي", headingEn: "Motion and AI production", textAr: "تحريك النصوص والشعارات والإنفوجرافيك أو صناعة مشاهد بالذكاء الاصطناعي ليست إضافات آلية؛ فهي تحتاج إلى تطوير فكرة وتجارب واختيار ودمج داخل المونتاج.", textEn: "Animated text, logos, infographics and AI-generated scenes are not automatic additions. They require concept development, testing, selection and integration into the edit." },
      { headingAr: "التعديلات والمقاسات والموعد", headingEn: "Revisions, formats and deadline", textAr: "عدد جولات المراجعة، وتسليم أكثر من مقاس، والحاجة إلى تنفيذ عاجل تؤثر في نطاق العمل. لهذا يكون عرض السعر المخصص أكثر دقة وعدلًا للطرفين من سعر ثابت يعتمد على الثواني فقط.", textEn: "Review rounds, multiple formats and urgent delivery all affect the workload. A tailored quote is therefore more accurate and fair than a fixed price based only on seconds.", pointsAr: ["نوع الفيديو وأسلوب المونتاج", "حالة المواد والسكريبت", "الموشن والجرافيك ومشاهد AI", "عدد النسخ والتعديلات وموعد التسليم"], pointsEn: ["Video type and editing style", "Footage and script readiness", "Motion, graphics and AI scenes", "Versions, revisions and deadline"] },
      { headingAr: "مثالان يوضحان اختلاف نطاق العمل", headingEn: "Two examples of different workloads", textAr: "مثال توضيحي أول: ريلز يُبنى من لقطات مرتبة ونص جاهز ويحتاج قصًا وألوانًا وعناوين. مثال ثانٍ بالمدة نفسها: إعلان يحتاج إلى تصميم كل مشهد وتحريك عناصر المنتج وتعليق صوتي ونسختين مختلفتين. قد تكون مدة النتيجة متساوية، لكن المراحل مختلفة. هذه أمثلة لتوضيح النطاق وليست أسعارًا أو بيانات عميل.", textEn: "In one illustrative brief, a Reel uses organized footage and ready copy, needing cuts, color and titles. Another brief of the same duration requires scene design, animated product elements, voice-over and two distinct edits. The finished duration may match, but the production stages differ. These are scope examples, not price quotes or client data." },
      { headingAr: "هل يشمل السعر التصوير والموشن؟", headingEn: "Does the quote include filming and motion graphics?", textAr: "اطلب عرضًا يوضح ما إذا كان يشمل التصوير الميداني أو المونتاج فقط، وعدد ساعات التصوير والمقاسات، وتكاليف التعليق الصوتي والمشاهد المولدة عند الحاجة. لا توجد تسعيرة واحدة لكل المشاريع؛ يمكنك إرسال التفاصيل للحصول على عرض محدد.", textEn: "Ask for a quote that separates on-site filming from editing, filming hours, delivery formats, voice-over and generated scenes where required. There is no universal fixed price; share your brief for a scoped estimate." },
      { headingAr: "قائمة مختصرة لطلب عرض سعر", headingEn: "A short quote-request checklist", textAr: "أرسل المعلومات التالية مع عينة من المواد وفيديو مرجعي مناسب. يوضح العرض ما يُنفَّذ وما يوفّره العميل ونقاط الاعتماد قبل البدء.", textEn: "Send the following with a source sample and a relevant reference. The quote can then define the production work, client-supplied assets and approval points before starting.", pointsAr: ["الهدف والمنصة وعدد الفيديوهات", "مدة المواد الأصلية والمدة المستهدفة", "النص والهوية والمواد المتاحة", "الصوت والترجمة والموشن المطلوبة", "المقاسات والتعديلات وموعد التسليم"], pointsEn: ["Goal, platform and video count", "Source-footage length and target duration", "Available copy, brand assets and material", "Voice, captions and motion requirements", "Formats, revisions and delivery date"] },
    ],
    serviceSlug: "video-editing",
    serviceAr: "اطلب عرض سعر مخصص",
    serviceEn: "Request a custom quote",
  },
  "dental-video-content-guide": {
    slug: "dental-video-content-guide",
    titleAr: "كيف تصنع العيادات فيديوهات طبية جذابة وواضحة؟",
    titleEn: "How Clinics Can Create Clear, Engaging Dental Videos",
    metaTitleEn: "Dental Video Content Guide for Clinics",
    descriptionAr: "دليل للعيادات وأطباء الأسنان لصناعة فيديو طبي واضح ومهني وجذاب يناسب منصات التواصل.",
    descriptionEn: "A guide for clinics and dentists creating clear, professional and engaging medical videos for social media.",
    introAr: "الفيديو الطبي الناجح لا يكتفي بجذب الانتباه؛ بل يحافظ على وضوح المعلومة وثقة المشاهد. أفضل محتوى للعيادات يبدأ برسالة واحدة، ثم يشرحها بصريًا بلغة بسيطة ومنظمة.",
    introEn: "Successful medical video does more than attract attention—it preserves clarity and viewer trust. Strong clinic content starts with one focused message and explains it visually in a simple, organized way.",
    sections: [
      { headingAr: "اختر رسالة واحدة لكل فيديو", headingEn: "Use one message per video", textAr: "بدل جمع خدمات كثيرة في ريل واحد، ركز على سؤال شائع أو علاج أو فائدة محددة. هذا يجعل البداية أقوى ويساعد المشاهد على تذكر الرسالة.", textEn: "Instead of combining many services in one Reel, focus on a common question, one treatment or one clear benefit. This creates a stronger opening and a more memorable message." },
      { headingAr: "استخدم لغة يفهمها المريض", headingEn: "Use patient-friendly language", textAr: "المصطلح الطبي يمكن أن يظهر عند الحاجة، لكن الشرح يجب أن يبقى بسيطًا. العناوين القصيرة والرسومات المتحركة تساعد على توضيح الفكرة من دون إغراق الشاشة بالمعلومات.", textEn: "Medical terms can be included when needed, but the explanation should remain simple. Short titles and motion graphics clarify the idea without crowding the screen." },
      { headingAr: "احترم هوية العيادة", headingEn: "Protect the clinic identity", textAr: "ثبات الألوان والخطوط وطريقة ظهور الشعار ونبرة المحتوى يجعل سلسلة الفيديوهات تبدو احترافية ومترابطة، ويقوي تميّز العيادة مع تكرار النشر.", textEn: "Consistent colors, typography, logo use and tone make a video series feel professional and connected, strengthening clinic recognition over time." },
      { headingAr: "جهّز الفيديو للمشاهدة على الهاتف", headingEn: "Design for mobile viewing", textAr: "معظم محتوى العيادات يُشاهد عموديًا وعلى شاشة صغيرة. يجب أن تكون النصوص مقروءة، واللقطات واضحة، والمعلومة المهمة ظاهرة مبكرًا، مع دعوة بسيطة للحجز أو الاستفسار.", textEn: "Most clinic content is viewed vertically on a small screen. Text must be readable, visuals clear, the key message visible early, and the booking or enquiry action simple.", pointsAr: ["رسالة واحدة وواضحة", "شرح بسيط دون مبالغة", "هوية بصرية ثابتة", "نصوص مقروءة ومقاس 9:16"], pointsEn: ["One clear message", "Simple, responsible explanation", "Consistent visual identity", "Readable text and a 9:16 format"] },
    ],
    serviceSlug: "motion-graphics",
    serviceAr: "موشن جرافيك لعيادات الأسنان",
    serviceEn: "Dental motion graphics",
  },
  "ai-video-production-uae-guide": {
    slug: "ai-video-production-uae-guide",
    titleAr: "كيف يُنتج فيديو ذكاء اصطناعي احترافي للشركات في الإمارات؟",
    titleEn: "How to Produce a Professional AI Video for UAE Businesses",
    metaTitleAr: "دليل إنتاج فيديو AI للشركات في الإمارات",
    metaTitleEn: "AI Video Production Guide for UAE Businesses",
    descriptionAr: "دليل عملي يشرح مراحل إنتاج فيديو AI احترافي للشركات في الإمارات، من الهدف والاتجاه البصري إلى المونتاج والمعالجة والتسليم.",
    descriptionEn: "A practical guide to producing professional AI video for UAE businesses, from the goal and visual direction to editing, finishing and delivery.",
    introAr: "الفيديو الاحترافي بالذكاء الاصطناعي لا يبدأ من كتابة أمر توليد عشوائي، ولا ينتهي عند الحصول على لقطة جميلة. النتيجة المتماسكة تحتاج إلى هدف واضح واتجاه بصري ثابت واختيار دقيق للمشاهد، ثم مونتاج ومعالجة تجعل اللقطات تعمل كفيديو واحد يخدم العلامة التجارية.",
    introEn: "Professional AI video does not begin with a random generation prompt or end with one attractive shot. A cohesive result needs a clear goal, consistent visual direction, careful scene selection, and editing that turns separate generations into one brand-ready video.",
    sections: [
      { headingAr: "ابدأ بهدف تجاري واضح", headingEn: "Start with a clear business goal", textAr: "حدّد ما الذي يجب أن يفعله الفيديو: تقديم خدمة، شرح فكرة، إطلاق منتج أو جذب استفسارات. الهدف يحدد طول الفيديو ونبرة الرسالة والمنصة ونوع المشاهد المطلوبة، ويمنع إنتاج صور جميلة بلا وظيفة واضحة.", textEn: "Define what the video must achieve: present a service, explain an idea, launch a product or generate enquiries. The goal shapes duration, message, platform and scene choices, preventing visually attractive but unfocused output." },
      { headingAr: "ثبّت الاتجاه البصري قبل التوليد", headingEn: "Set the visual direction before generation", textAr: "يجب تحديد البيئة والألوان والإضاءة ونوع العدسات وحركة الكاميرا ونسبة الأبعاد قبل صناعة المشاهد. هذا المرجع يقلل اختلاف الشخصيات والعناصر بين اللقطات ويساعد على بقاء هوية العلامة واضحة.", textEn: "Define environment, palette, lighting, lens language, camera movement and aspect ratio before creating scenes. This reference reduces visual drift between shots and keeps the brand identity recognizable." },
      { headingAr: "تعامل مع التوليد كمرحلة اختيار", headingEn: "Treat generation as a selection process", textAr: "لا تُستخدم كل نتيجة يتم توليدها. تُراجع اللقطات من حيث التكوين والحركة واستمرارية العناصر وسلامة التفاصيل، ثم تُختار المشاهد التي يمكن دمجها فعلًا ضمن تسلسل متماسك.", textEn: "Not every generated result belongs in the final edit. Shots are reviewed for composition, movement, continuity and detail, then only the scenes that can work together are selected." },
      { headingAr: "ابنِ الفيديو في المونتاج", headingEn: "Build the video in the edit", textAr: "المونتاج هو المرحلة التي تتحول فيها اللقطات المنفصلة إلى قصة. يتم ضبط الإيقاع والانتقالات والموشن والألوان والصوت والتعليق، ومعالجة الفروق بين المشاهد للوصول إلى تجربة واحدة متكاملة.", textEn: "Editing is where separate shots become a story. Pacing, transitions, motion graphics, color, sound and narration are shaped together, while differences between generated scenes are refined into one experience." },
      { headingAr: "جهّز نسخة مناسبة لكل منصة", headingEn: "Prepare the right version for each platform", textAr: "قد يحتاج المشروع نسخة عمودية للريلز ونسخة أفقية للموقع أو YouTube ونسخًا مختصرة للإعلانات. التخطيط لهذه المقاسات منذ البداية يحافظ على التكوين ويمنع قص العناصر المهمة بعد انتهاء الإنتاج.", textEn: "A project may need a vertical Reel, a horizontal website or YouTube version, and shorter ad cuts. Planning these formats early protects composition and avoids losing important elements during final resizing.", pointsAr: ["هدف ورسالة محددان", "مرجع بصري ثابت", "اختيار ومراجعة دقيقة للمشاهد", "مونتاج ومعالجة احترافية", "نسخ جاهزة لكل منصة"], pointsEn: ["A defined goal and message", "Consistent visual direction", "Careful shot review and selection", "Professional editing and finishing", "Platform-ready versions"] },
    ],
    serviceSlug: "ai-video",
    serviceAr: "خدمة إنتاج فيديوهات الذكاء الاصطناعي",
    serviceEn: "AI video production service",
    publishedDate: "2026-08-27",
    modifiedDate: "2026-08-27",
  },
  "industrial-video-production-guide": {
    slug: "industrial-video-production-guide",
    titleAr: "كيف تحوّل عملية صناعية معقدة إلى فيديو واضح؟",
    titleEn: "How to Turn a Complex Industrial Process into a Clear Video",
    metaTitleEn: "Industrial Video Production Guide",
    descriptionAr: "دليل عملي لصناعة فيديو صناعي أو فيديو شركات يشرح العمليات التقنية بوضوح من خلال السرد والمونتاج والموشن والمشاهد المدعومة بالذكاء الاصطناعي.",
    descriptionEn: "A practical guide to creating clear industrial and corporate videos through visual storytelling, editing, motion graphics and AI-assisted production.",
    introAr: "الفيديو الصناعي الجيد لا يعرض الآلات والمصطلحات فقط؛ بل يرتب العملية في قصة يفهمها المستثمر أو العميل أو الشريك من دون فقدان الدقة. يبدأ العمل بتحديد الرسالة الأساسية، ثم اختيار ما يجب شرحه وما يمكن اختصاره بصريًا.",
    introEn: "A strong industrial video does more than show machinery and terminology. It structures the process into a story that clients, investors and partners can understand without losing accuracy. The work starts by defining the core message and deciding what must be explained visually.",
    sections: [
      { headingAr: "حدّد الجمهور قبل كتابة المشاهد", headingEn: "Define the audience before the scenes", textAr: "يختلف الفيديو الموجّه إلى مستثمر عن فيديو تدريب الموظفين أو تقديم مصنع لعميل محتمل. تحديد الجمهور يضبط مستوى التفاصيل والمصطلحات وطول الفيديو والدعوة النهائية.", textEn: "A film for investors differs from employee training or a factory introduction for prospective clients. The audience determines the detail level, terminology, duration and final call to action." },
      { headingAr: "حوّل العملية إلى مراحل قابلة للفهم", headingEn: "Break the process into understandable stages", textAr: "تُرتب الرحلة من المدخلات إلى المعالجة والمراقبة والمنتج النهائي. يساعد هذا التسلسل المشاهد على معرفة أين تبدأ القيمة وكيف تتطور بدل تلقي معلومات صناعية منفصلة.", textEn: "Structure the journey from inputs through processing, monitoring and final output. This lets viewers understand where value begins and how it develops instead of receiving disconnected technical facts." },
      { headingAr: "اختر المصدر البصري المناسب لكل معلومة", headingEn: "Match each message with the right visual source", textAr: "يمكن استخدام التصوير الحقيقي والرسومات الهندسية والإنفوجرافيك والموشن والمشاهد المدعومة بالذكاء الاصطناعي ضمن مشروع واحد. الاختيار يعتمد على ما يشرح الفكرة بدقة، لا على استخدام مؤثرات أكثر.", textEn: "Real footage, technical graphics, infographics, motion and AI-assisted visuals can work together. The right choice is the one that explains each point accurately—not the option with the most effects." },
      { headingAr: "اجعل النص والموشن جزءًا من الشرح", headingEn: "Use text and motion as explanation", textAr: "العناوين القصيرة والمؤشرات والخرائط والمقارنات تساعد على توضيح الأرقام والمراحل، بشرط أن تظهر بتوقيت مقروء وبترتيب بصري يمنع ازدحام الشاشة.", textEn: "Concise titles, indicators, maps and comparisons can clarify figures and stages when they appear with readable timing and a visual hierarchy that avoids clutter." },
      { headingAr: "جهّز نسخة تناسب مكان العرض", headingEn: "Prepare the video for its viewing context", textAr: "قد يُعرض الفيديو في اجتماع أو معرض أو موقع إلكتروني أو منصة اجتماعية. لذلك يجب تحديد المقاس والمدة ومستوى الصوت والترجمة منذ البداية، ثم تسليم نسخ تناسب كل استخدام.", textEn: "The film may appear in a meeting, exhibition, website or social feed. Format, duration, sound and captions should be planned early, followed by versions prepared for each use.", pointsAr: ["رسالة واحدة واضحة", "مراحل صناعية مرتبة", "مزيج بصري يخدم الدقة", "نصوص وموشن مقروءان", "نسخ مناسبة لكل منصة"], pointsEn: ["One clear message", "A structured industrial journey", "Visuals chosen for accuracy", "Readable text and motion", "Versions for each platform"] },
    ],
    serviceSlug: "ai-video",
    serviceAr: "إنتاج فيديو صناعي في الإمارات",
    serviceEn: "Industrial video production in the UAE",
    publishedDate: "2026-09-12",
    modifiedDate: "2026-09-12",
  },
  "real-estate-video-marketing-guide": {
    slug: "real-estate-video-marketing-guide",
    titleAr: "كيف تصنع فيديو عقاريًا واضحًا وجذابًا؟",
    titleEn: "How to Create a Clear, Engaging Real Estate Video",
    descriptionAr: "دليل عملي لتنظيم معلومات العقار أو الأرض داخل فيديو قصير باستخدام المونتاج والموشن والخرائط والعناوين المقروءة.",
    descriptionEn: "A practical guide to structuring property and land information in short-form video through editing, motion, maps and readable titles.",
    introAr: "الفيديو العقاري الفعّال لا يجمع لقطات جميلة فقط؛ بل يساعد المشاهد على فهم الموقع ونوع الفرصة والمزايا والخطوة التالية بسرعة. قوة الفيديو تبدأ من ترتيب المعلومات قبل اختيار الانتقالات والمؤثرات.",
    introEn: "An effective real-estate video does more than combine attractive shots. It helps viewers quickly understand the location, opportunity, benefits and next step. Its strength begins with information structure before transitions and effects.",
    sections: [
      { headingAr: "ابدأ بالمعلومة التي تحدد قيمة الفرصة", headingEn: "Lead with the information that defines value", textAr: "قد تكون المعلومة الأقوى هي الموقع أو نوع التملك أو استخدام الأرض أو ميزة المشروع. وضعها في البداية يجعل المشاهد يعرف سبب متابعة الفيديو منذ الثواني الأولى.", textEn: "The strongest point may be location, ownership type, land use or a project benefit. Placing it early gives viewers a clear reason to continue watching." },
      { headingAr: "رتّب التفاصيل بحسب قرار المشاهد", headingEn: "Organize details around the viewer’s decision", textAr: "بعد تقديم الفرصة، تظهر المعلومات التي تساعد على التقييم: المنطقة، المساحة أو الاستخدام، المزايا، الخيارات المتاحة ثم وسيلة طلب التفاصيل. هذا التسلسل أسهل من عرض جميع البيانات في وقت واحد.", textEn: "After introducing the opportunity, present the information needed to evaluate it: area, size or use, benefits, available options and the contact step. This sequence is clearer than showing everything at once." },
      { headingAr: "استخدم الخرائط والعناوين بوظيفة واضحة", headingEn: "Give maps and titles a clear purpose", textAr: "الخريطة تشرح العلاقة بين الموقع والطرق أو المناطق المهمة، بينما تؤكد العناوين على البيانات الأساسية. يجب أن تكون العناصر مقروءة على الهاتف وألا تحجب صورة العقار.", textEn: "Maps show how the location connects to roads or important areas, while titles reinforce essential facts. Every element must remain readable on mobile without hiding the property." },
      { headingAr: "وازن بين سرعة الريلز ووضوح المعلومات", headingEn: "Balance Reel pacing with clarity", textAr: "الإيقاع السريع مفيد لجذب الانتباه، لكنه لا يعني تبديل اللقطات قبل قراءة المعلومات. يجب منح كل معلومة وقتًا كافيًا مع الحفاظ على حركة مستمرة ومنظمة.", textEn: "Fast pacing can attract attention, but information still needs enough screen time to be understood. The edit should stay active while preserving readable timing." },
      { headingAr: "اختم بخطوة واحدة مباشرة", headingEn: "Finish with one direct next step", textAr: "ينتهي الفيديو بطلب واضح مثل التواصل للحصول على التفاصيل أو حجز معاينة. تعدد الأرقام والروابط والطلبات في الشاشة الأخيرة يضعف وضوح الخطوة المطلوبة.", textEn: "End with one clear action, such as requesting details or arranging a viewing. Multiple numbers, links and requests on the final screen weaken the next step.", pointsAr: ["ميزة أساسية في البداية", "معلومات مرتبة", "خرائط وعناوين مقروءة", "إيقاع سريع دون استعجال", "دعوة واحدة للتواصل"], pointsEn: ["A strong opening benefit", "Structured information", "Readable maps and titles", "Fast but clear pacing", "One contact action"] },
    ],
    serviceSlug: "motion-graphics",
    serviceAr: "خدمة مونتاج الفيديو العقاري",
    serviceEn: "Real-estate video editing service",
    publishedDate: "2026-09-12",
    modifiedDate: "2026-09-12",
  },
  "restaurant-video-marketing-guide": {
    slug: "restaurant-video-marketing-guide",
    titleAr: "كيف تصنع فيديو مطعم يجذب الزوار ويعرض التجربة بوضوح؟",
    titleEn: "How to Create Restaurant Videos That Attract Guests",
    metaTitleAr: "دليل تصوير ومونتاج فيديوهات المطاعم",
    metaTitleEn: "Restaurant Video Marketing Guide",
    descriptionAr: "دليل عملي لتصوير ومونتاج فيديو مطعم أو كافيه يعرض المكان والمنتج والأجواء بوضوح ويقود المشاهد إلى الحجز أو الزيارة.",
    descriptionEn: "A practical guide to restaurant and cafe video that presents the venue, food, drinks and atmosphere clearly while supporting visits and bookings.",
    introAr: "فيديو المطعم الناجح لا يعرض طبقًا جميلًا فقط؛ بل ينقل تجربة الزائر من لحظة الوصول إلى تفاصيل المكان والمنتج والخدمة والأجواء. يبدأ التنفيذ بتحديد الرسالة واللقطات المطلوبة، ثم بناء تسلسل قصير يناسب الهاتف ويقود إلى خطوة واضحة.",
    introEn: "A strong restaurant video does more than show an attractive dish. It communicates the guest experience from arrival to venue details, products, service and atmosphere. The process begins with one message and a purposeful shot list, then builds a mobile-first sequence with a clear next step.",
    sections: [
      { headingAr: "اعرض التجربة لا الأطباق فقط", headingEn: "Show the experience, not only the food", textAr: "اجمع بين الواجهة والمكان وتفاصيل الطاولة وتحضير المنتج وتفاعل الزوار أو أجواء الفعالية. هذا يمنح المشاهد سببًا لتخيّل الزيارة بدل مشاهدة لقطات منتج منفصلة.", textEn: "Combine the exterior, venue, table details, product preparation and guest or event atmosphere. This helps viewers imagine the visit instead of seeing disconnected product shots." },
      { headingAr: "خطط رحلة بصرية واضحة", headingEn: "Plan a clear visual journey", textAr: "يمكن أن يبدأ الفيديو بخطاف بصري، ثم يثبت المكان ويعرض المنتج والتفاصيل وينتهي بالأجواء أو الدعوة للحجز. ترتيب اللقطات قبل التصوير يقلل التكرار ويجعل المونتاج أكثر تماسكًا.", textEn: "The video can open with a visual hook, establish the venue, present products and details, then finish with atmosphere or a booking action. Planning the sequence before filming reduces repetition and creates a more cohesive edit." },
      { headingAr: "حافظ على لون وصوت يعبّران عن المكان", headingEn: "Use color and sound that match the venue", textAr: "تُعالج الإضاءة والألوان بما يحافظ على شكل الطعام والديكور، ويُبنى الصوت من الموسيقى وأصوات المكان والتفاصيل بدل رفع الموسيقى وحدها. النتيجة يجب أن تنقل الطابع الحقيقي للمطعم.", textEn: "Color should preserve the appearance of food and interior design, while sound combines music, venue atmosphere and detail instead of relying on a loud track alone. The finished video should reflect the restaurant's real character." },
      { headingAr: "صمّم للمشاهدة العمودية من البداية", headingEn: "Design for vertical viewing from the start", textAr: "في الريلز يجب أن يظهر العنصر المهم داخل مساحة آمنة، وأن تكون اللقطات والنصوص واضحة على شاشة صغيرة. ويجب أن تمنح الثواني الأولى المشاهد سببًا للاستمرار.", textEn: "For Reels, important subjects should remain inside a safe vertical frame and any text must stay readable on a small screen. The opening seconds need a clear reason to continue watching." },
      { headingAr: "اختم بدعوة واحدة واضحة", headingEn: "Finish with one clear action", textAr: "اختر خطوة واحدة: الحجز، معرفة الموقع، مشاهدة القائمة أو التواصل. وجود عنوان واضح ووسيلة تواصل واحدة في النهاية أقوى من شاشة مزدحمة بعدة طلبات.", textEn: "Choose one next step: reserve, find the location, view the menu or contact the venue. One clear action at the end is stronger than a crowded screen with competing requests.", pointsAr: ["خطاف بصري مبكر", "رحلة من المكان إلى المنتج", "لون وصوت متناسقان", "تكوين عمودي واضح", "دعوة واحدة للحجز أو التواصل"], pointsEn: ["An early visual hook", "A venue-to-product journey", "Consistent color and sound", "Clear vertical composition", "One booking or contact action"] },
    ],
    serviceSlug: "content-production",
    serviceAr: "خدمة تصوير ومونتاج المطاعم",
    serviceEn: "Restaurant videography service",
    publishedDate: "2026-09-23",
    modifiedDate: "2026-09-23",
  },
  "ai-cartoon-character-video-guide": {
    slug: "ai-cartoon-character-video-guide",
    titleAr: "كيف تحافظ على ثبات الشخصيات الكرتونية في فيديو AI؟",
    titleEn: "How to Keep AI Cartoon Characters Consistent in Video",
    metaTitleEn: "AI Cartoon Character Video Consistency",
    descriptionAr: "دليل يشرح تخطيط هوية الشخصية الكرتونية واستمرارية الملامح والملابس والبيئة والصوت بين مشاهد فيديو الذكاء الاصطناعي.",
    descriptionEn: "A guide to planning cartoon-character identity and maintaining facial, clothing, environment and voice continuity across AI video scenes.",
    introAr: "التحدي الحقيقي في قصة الشخصيات بالذكاء الاصطناعي ليس توليد لقطة جميلة، بل الحفاظ على الشخصية نفسها طوال الفيديو. لذلك تُبنى هوية واضحة للشخصية والبيئة والصوت قبل التحريك، ثم تُراجع الاستمرارية بين كل مشهد والذي يليه.",
    introEn: "The real challenge in AI character storytelling is not generating one attractive shot; it is keeping the same character throughout the video. A clear identity for the character, setting and voice is established before animation, then continuity is reviewed from scene to scene.",
    sections: [
      { headingAr: "أنشئ مرجعًا ثابتًا للشخصية", headingEn: "Create a fixed character reference", textAr: "يحدد المرجع شكل الوجه والعمر والشعر والملابس والألوان والإكسسوارات ونسب الجسم. كلما كان المرجع واضحًا، أصبح اكتشاف التغييرات غير المقصودة أسهل أثناء الإنتاج.", textEn: "The reference defines face, age, hair, clothing, colors, accessories and body proportions. A clear reference makes unintended changes easier to identify during production." },
      { headingAr: "خطط انتقال المشاهد قبل التحريك", headingEn: "Plan scene transitions before animation", textAr: "يُحدد مكان الشخصية واتجاه النظر والحركة وحالة الإضاءة في نهاية كل مشهد وبداية المشهد التالي. استخدام آخر إطار كمرجع يساعد على جعل الانتقال أكثر ترابطًا.", textEn: "Define position, eye line, movement and lighting at the end of one scene and the start of the next. Using the final frame as a reference can help create a more connected transition." },
      { headingAr: "ثبّت الصوت واللهجة وطريقة الكلام", headingEn: "Keep voice and speaking style consistent", textAr: "العمر والنبرة واللهجة وسرعة الكلام جزء من هوية الشخصية مثل الملابس تمامًا. تُختبر الجمل القصيرة أولًا، ثم يُحافظ على الإعدادات نفسها عبر بقية المشاهد.", textEn: "Age, tone, accent and speaking pace are as important to identity as clothing. Test short lines first, then preserve the same voice direction across the remaining scenes." },
      { headingAr: "راجع التفاصيل الثقافية والبصرية", headingEn: "Review cultural and visual details", textAr: "في القصص الإماراتية أو التعليمية يجب الحفاظ على دقة الملابس والبيئة وطريقة التحية والتصرفات المناسبة للسياق، مع تجنب ظهور نصوص أو شعارات أو عناصر لم يطلبها المشروع.", textEn: "Emirati and educational stories require careful treatment of clothing, setting, greetings and context-appropriate behavior, while avoiding unrequested text, logos or objects." },
      { headingAr: "اعرض نماذج تحمي خصوصية العميل", headingEn: "Use portfolio excerpts that protect client privacy", textAr: "عندما يحتوي المشروع على معلومات خاصة، يمكن تجهيز مقتطف قصير أو مشهد افتتاحي بعد موافقة العميل، بحيث يوضح جودة الحركة والثبات من دون نشر القصة كاملة أو بيانات حساسة.", textEn: "When a project contains private information, a short excerpt or opening scene can be prepared with client permission to demonstrate animation and continuity without publishing the full story or sensitive details.", pointsAr: ["مرجع ثابت للشخصية", "استمرارية بين اللقطات", "صوت ولهجة موحدان", "تفاصيل ثقافية دقيقة", "عرض يحترم الخصوصية"], pointsEn: ["A fixed character reference", "Continuity between shots", "Consistent voice and accent", "Accurate cultural details", "Privacy-safe portfolio presentation"] },
    ],
    serviceSlug: "ai-cartoon-characters",
    serviceAr: "خدمة فيديوهات الشخصيات الكرتونية",
    serviceEn: "AI cartoon character video service",
    publishedDate: "2026-09-12",
    modifiedDate: "2026-09-12",
  },
};

// Practical preparation and workflow notes, linked to published project examples.
const practicalGuideSections: Record<string, GuideSection> = {
  "choose-video-editor-uae": {
    headingAr: "ماذا تجهز قبل إرسال المواد للمونتاج؟", headingEn: "What to prepare before sending footage for editing",
    textAr: "أرسل الملفات الأصلية عبر مجلد واحد منظم، مع الشعار والخطوط والألوان المعتمدة. وضّح الهدف ومنصة النشر والمدة المطلوبة، وأرفق رابطًا مرجعيًا مع شرح ما يعجبك فيه. عند المراجعة، اجمع ملاحظات الفريق في قائمة واحدة واستخدم توقيت اللقطة لتحديد التعديل بدقة.",
    textEn: "Share original files in one organized folder, together with the approved logo, fonts and colors. Specify the goal, platform and intended duration. Add a reference link and explain what you like about it. During review, combine team feedback into one list and use timecodes to identify each requested change.",
    pointsAr: ["ملفات أصلية بأسماء واضحة", "هوية بصرية وهدف محددان", "مقاس ومدة وموعد تسليم", "ملاحظات موحدة مع توقيت اللقطات"],
    pointsEn: ["Original files with clear names", "Brand assets and a defined goal", "Format, duration and deadline", "Consolidated feedback with timecodes"]
  },
  "dental-video-content-guide": {
    headingAr: "من رسالة العيادة إلى فيديو دينتال قصير", headingEn: "From a clinic message to a short dental video",
    textAr: "في مشروع «دينتال موشن 2026» المعروض في الأعمال، بُني فيديو عمودي مدته 28 ثانية حول رسالة محددة، مع توزيع المعلومات وتحريك العناصر لخدمة الشرح. ابدأ بنص معتمد من العيادة، ثم اتفق على تسلسل الفكرة والهوية قبل التحريك؛ راجع وضوح المصطلحات والنصوص على الهاتف قبل النشر.",
    textEn: "The published Dental Motion 2026 project uses a 28-second vertical format built around a focused message, with information and animation arranged to support the explanation. Start with clinic-approved copy, agree on the sequence and identity before animation, then review terminology and mobile text readability before publishing."
  },
  "ai-video-production-uae-guide": {
    headingAr: "المشاهد المولدة تحتاج مونتاجًا ومعالجة", headingEn: "Generated scenes still need editing and finishing",
    textAr: "يوضح مشروع «فيديو AI وبرامج أدوبي» المعروض في الأعمال كيف تُختار اللقطات وتُجمع في فيديو مدته 30 ثانية بدل استخدامها كلقطات منفصلة. ثبّت الاتجاه البصري، وراجع استمرارية العناصر، ثم اضبط الإيقاع والألوان والصوت والموشن داخل المونتاج. اعتمد النسخة النهائية كفيديو واحد، لا كل لقطة على حدة.",
    textEn: "The published AI and Adobe project shows how selected shots are assembled into a 30-second video rather than left as separate clips. Establish the visual direction, check continuity, then refine pacing, color, sound and motion in the edit. Review the final output as one video, not only as individual shots."
  }
};
for (const [slug, section] of Object.entries(practicalGuideSections)) {
  guideCatalog[slug].sections.push(section);
  guideCatalog[slug].modifiedDate = "2026-10-06";
}

guideCatalog["choose-video-editor-uae"].sections.push(
  {
    headingAr: "قارن عروض السعر على الطلب نفسه", headingEn: "Compare quotes for the same brief",
    textAr: "مثال: تحتاج إلى ريل مدته 30 ثانية من لقطات جاهزة. أرسل إلى كل مونتير المواد والهدف والمرجع نفسيهما، واسأل عمّا يشمله السعر: اختيار اللقطات، المونتاج، الألوان، تنظيف الصوت، العناوين، المقاسات وجولات المراجعة. عرض يشمل موشن مخصصًا ونسختين للنشر يختلف عن قص بسيط بمقاس واحد؛ المقارنة المفيدة تكون بين مخرجات واضحة ومتطابقة.",
    textEn: "For example, you need a 30-second Reel from existing footage. Give each editor the same source material, goal and reference. Ask whether the quote includes shot selection, editing, color, audio cleanup, titles, formats and review rounds. Custom motion and two delivery versions are a different scope from a simple single-format cut; compare clearly defined, equivalent deliverables.",
    pointsAr: ["مدة الفيديو والمنصة والمقاس", "الخدمات المشمولة والمواد التي توفرها", "عدد النسخ وجولات التعديل", "موعد النسخة الأولى والتسليم النهائي"],
    pointsEn: ["Video duration, platform and format", "Included work and client-supplied assets", "Delivery versions and review rounds", "First-draft and final-delivery dates"],
  },
  {
    headingAr: "اطلب تفسيرًا لعمل قريب من هدفك", headingEn: "Ask how a relevant project was built",
    textAr: "لا تكتفِ بسرعة الانتقالات أو جمال الألوان. في فيديو مطعم FM المنشور هنا، يرتبط الإيقاع بجو الفعالية والموسيقى الحية؛ وفي دينتال موشن 2026 تساعد الحركة على شرح رسالة قصيرة؛ أما إعلان المنتج فيستخدم الموشن لإبراز العرض. اسأل المونتير عن دوره الفعلي في الفكرة والتصوير والتحريك والصوت، ولماذا اختار هذا الأسلوب للمشاهد المستهدف.",
    textEn: "Look beyond transitions and color. In the published FM Restaurant video, pacing supports the live-event atmosphere; in Dental Motion 2026, animation explains a focused message; the product ad uses motion to present the offer. Ask about the editor’s actual role in the concept, filming, animation and sound, and why those decisions suited the intended viewer.",
  },
  {
    headingAr: "اتفق على المواد وحقوق الاستخدام قبل البدء", headingEn: "Agree on assets and usage before production",
    textAr: "حدّد من يوفّر الموسيقى والخطوط والتعليق والصور، وما الاستخدام المتفق عليه للفيديو: نشر عضوي أم إعلان ممول أم عرض على شاشات. اتفق أيضًا على طريقة حفظ الملفات، وما إذا كان تسليم ملف المشروع أو نشر العمل في المعرض مشمولًا. هذه نقاط تواصل ونطاق عمل يجب توضيحها بينك وبين منفذ الفيديو قبل تأكيد الطلب.",
    textEn: "Clarify who supplies music, fonts, voice-over and images, and whether the video is intended for organic posts, paid ads or screens. Agree how files will be stored and whether project-file delivery or portfolio publication is included. These are practical scope and communication questions to settle with the editor before confirming the brief.",
  }
);
guideCatalog["choose-video-editor-uae"].modifiedDate = searchContentModified;

guideCatalog["ai-video-production-uae-guide"].sections.push(...aiProductionGuideAdditions);
guideCatalog["ai-cartoon-character-video-guide"].sections.push(...characterGuideAdditions);
guideCatalog["ai-video-production-uae-guide"].modifiedDate = "2026-10-15";
guideCatalog["ai-cartoon-character-video-guide"].modifiedDate = "2026-11-07";

const guideProjectSlugs: Record<string, string[]> = {
  "prepare-reels-video-shoot": ["beauty-product-social-ad", "fm-restaurant-ajman-live-event-video"],
  "choose-video-editor-uae": ["fm-restaurant-ajman-live-event-video", "hair-removal-spray-product-ad", "dental-motion-2026-explainer"],
  "video-editing-cost-factors": ["beauty-product-social-ad", "professional-ai-adobe-video-production"],
  "dental-video-content-guide": ["dental-motion-2026-explainer", "dental-awareness-motion-graphics"],
  "ai-video-production-uae-guide": ["from-vision-to-ai-visuals", "professional-ai-adobe-video-production"],
  "industrial-video-production-guide": ["ggbs-smart-factory-industrial-promo", "professional-ai-adobe-video-production"],
  "real-estate-video-marketing-guide": ["al-sajaa-industrial-land-promo", "al-qasimia-cinematic-real-estate-promo"],
  "restaurant-video-marketing-guide": ["fm-restaurant-ajman-live-event-video", "fm-restaurant-cinematic-coffee-promo"],
  "ai-cartoon-character-video-guide": ["kokab-fodool-mishaal-environment", "kokab-fodool-arabic-letter-baa"],
};

const guideSocialImages: Record<string, string> = {
  "prepare-reels-video-shoot": "/restaurant-event-videos-cover.webp",
  "choose-video-editor-uae": "/hassn-editor-showreel-cover.jpg",
  "video-editing-cost-factors": "https://i.ytimg.com/vi/vv0wjZ2EU3c/hqdefault.jpg",
  "dental-video-content-guide": "https://i.ytimg.com/vi/fBdcM8TO8YQ/hqdefault.jpg",
  "ai-video-production-uae-guide": "https://i.ytimg.com/vi/YT-rI9n1qRw/hqdefault.jpg",
  "industrial-video-production-guide": "https://i.ytimg.com/vi/fEfr2kHqQ8o/hqdefault.jpg",
  "real-estate-video-marketing-guide": "https://i.ytimg.com/vi/NCmGTgBdbhg/hqdefault.jpg",
  "restaurant-video-marketing-guide": "/restaurant-event-videos-cover.webp",
  "ai-cartoon-character-video-guide": "/hassn-editor-showreel-cover.jpg",
};

export function getGuideMetadata(slug: string, language: Language): Metadata {
  const guide = guideCatalog[slug];
  const en = language === "en";
  const path = `${en ? "/en" : ""}/guides/${slug}`;
  const alternatePath = `${en ? "" : "/en"}/guides/${slug}`;
  const title = en ? (guide.metaTitleEn || guide.titleEn) : (guide.metaTitleAr || guide.titleAr);
  const description = en ? guide.descriptionEn : guide.descriptionAr;
  const socialImage = guideSocialImages[slug];
  return {
    title,
    description,
    alternates: { canonical: path, languages: { ar: en ? alternatePath : path, en: en ? path : alternatePath, "x-default": en ? alternatePath : path } },
    openGraph: { title: `${title} | HASSN EDITOR`, description, url: `https://hassneditor.com${path}`, type: "article", images: [socialImage], locale: en ? "en_AE" : "ar_AE" },
    twitter: { card: "summary_large_image", title: `${title} | HASSN EDITOR`, description, images: [socialImage] },
  };
}

export default function GuidePage({ slug, language = "ar" }: { slug: string; language?: Language }) {
  const guide = guideCatalog[slug];
  const en = language === "en";
  const prefix = en ? "/en" : "";
  const path = `${prefix}/guides/${slug}`;
  const canonicalUrl = `https://hassneditor.com${path}`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const relatedProjects = (guideProjectSlugs[slug] || []).flatMap((projectSlug) => {
    const project = projectBySlug(projectSlug);
    return project ? [project] : [];
  });
  const whatsappText = en ? `Hello Hassn, I read your guide “${guide.titleEn}” and would like to discuss your ${guide.serviceEn} service.` : `مرحبًا حسن، قرأت دليل «${guide.titleAr}» وأرغب في مناقشة خدمة ${guide.serviceAr}.`;
  const relatedGuides = slug === "ai-video-production-uae-guide" ? ["ai-cartoon-character-video-guide", "industrial-video-production-guide", "video-editing-cost-factors"] : slug === "ai-cartoon-character-video-guide" ? ["ai-video-production-uae-guide", "video-editing-cost-factors"] : slug === "prepare-reels-video-shoot" ? ["video-editing-cost-factors", "choose-video-editor-uae"] : slug === "video-editing-cost-factors" ? ["prepare-reels-video-shoot", "choose-video-editor-uae"] : [];
  const wordCount = [en ? guide.introEn : guide.introAr, ...guide.sections.flatMap((section) => [en ? section.textEn : section.textAr, ...(en ? section.pointsEn || [] : section.pointsAr || [])])].join(" ").trim().split(/\s+/u).length;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 180));
  const modifiedDate = guide.modifiedDate || "2026-08-27";
  const displayedDate = new Intl.DateTimeFormat(en ? "en-GB" : "ar-AE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${modifiedDate}T00:00:00Z`));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: en ? guide.titleEn : guide.titleAr,
        description: en ? guide.descriptionEn : guide.descriptionAr,
        datePublished: guide.publishedDate || "2026-08-26",
        dateModified: guide.modifiedDate || "2026-08-27",
        inLanguage: en ? "en" : "ar",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        author: { "@type": "Person", "@id": "https://hassneditor.com/#hassn-editor", name: "Hassn Hassn", url: "https://hassneditor.com/about-hassn-editor" },
        publisher: { "@type": "ProfessionalService", "@id": "https://hassneditor.com/#business", name: "HASSN EDITOR", logo: { "@type": "ImageObject", url: "https://hassneditor.com/hassn-logo.png" } },
        isPartOf: { "@id": "https://hassneditor.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: en ? "Home" : "الرئيسية", item: `https://hassneditor.com${prefix || "/"}` },
          { "@type": "ListItem", position: 2, name: en ? "Guides" : "دليل الفيديو", item: `https://hassneditor.com${prefix}/guides` },
          { "@type": "ListItem", position: 3, name: en ? guide.titleEn : guide.titleAr, item: canonicalUrl },
        ],
      },
    ],
  };
  return (
    <main data-guide={slug} data-contact-page="guide" data-contact-service={guide.serviceSlug} className={`site guide-page ${en ? "en" : "ar"}`} lang={en ? "en" : "ar"} dir={en ? "ltr" : "rtl"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#guide-content">{en ? "Skip to article" : "انتقل إلى المقال"}</a><div className="noise" aria-hidden="true" />
      <SiteHeader language={language} alternatePath={`${en ? "" : "/en"}/guides/${slug}`} />
      <article id="guide-content">
        <header className="guide-hero"><nav className="breadcrumbs"><Link prefetch={false} href={prefix || "/"}>{en ? "Home" : "الرئيسية"}</Link><span>/</span><Link prefetch={false} href={`${prefix}/guides`}>{en ? "Guides" : "دليل الفيديو"}</Link></nav><p className="eyebrow">HASSN EDITOR / GUIDE</p><h1>{en ? guide.titleEn : guide.titleAr}</h1><p>{en ? guide.introEn : guide.introAr}</p><small>{en ? `Updated ${displayedDate} · ${readingMinutes} min read · ` : `آخر تحديث ${displayedDate} · قراءة تقريبية: ${readingMinutes} د · `}<Link prefetch={false} href={`${prefix}/about-hassn-editor`}>{en ? "By Hassn Hassn — HASSN EDITOR" : "بقلم حسن حسن — HASSN EDITOR"}</Link></small></header>
        {relatedGuides.length > 0 && <aside className="guide-service-note"><p>{en ? "Planning a finished video for your business? Review the production service, published projects and deliverables." : "تخطط لفيديو مكتمل لمشروعك؟ اطّلع على الخدمة والأعمال المنشورة والمخرجات قبل بدء التنفيذ."}</p><Link prefetch={false} href={`${prefix}/services/${guide.serviceSlug}`}>{en ? guide.serviceEn : guide.serviceAr} <ArrowIcon /></Link></aside>}
        <div className="guide-body">{guide.sections.map((section, index) => <section key={section.headingAr}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{en ? section.headingEn : section.headingAr}</h2><p>{en ? section.textEn : section.textAr}</p>{(en ? section.pointsEn : section.pointsAr)?.length ? <ul>{(en ? section.pointsEn : section.pointsAr)?.map((point) => <li key={point}>✓ {point}</li>)}</ul> : null}</div></section>)}</div>
        {slug === "video-editing-cost-factors" && <VideoScopeComparison language={language} />}
      </article>
      {relatedProjects.length > 0 && <section className="guide-related-projects"><div><p className="eyebrow">RELATED PROJECTS</p><h2>{en ? "See the process in real projects" : "شاهد تطبيق الفكرة في مشاريع فعلية"}</h2></div><nav aria-label={en ? "Projects related to this guide" : "مشاريع مرتبطة بهذا الدليل"}>{relatedProjects.map((project) => <Link prefetch={false} key={project.slug} href={projectPath(project, language)}><span><small>{en ? project.categoryEn : project.categoryAr}</small><strong>{en ? project.titleEn : project.titleAr}</strong></span><b><ArrowIcon /></b></Link>)}</nav></section>}
      {relatedGuides.length > 0 && <nav className="guide-related-resources" aria-label={en ? "Related practical guides" : "أدلة عملية مرتبطة"}>{relatedGuides.map((relatedSlug) => <Link prefetch={false} key={relatedSlug} href={`${prefix}/guides/${relatedSlug}`}>{en ? guideCatalog[relatedSlug].titleEn : guideCatalog[relatedSlug].titleAr} <ArrowIcon /></Link>)}</nav>}
      <section className="guide-cta"><p className="eyebrow">NEXT STEP</p><h2>{en ? "Need a video built around a clear goal?" : "تحتاج إلى فيديو مبني حول هدف واضح؟"}</h2><div><Link prefetch={false} className="secondary-button" href={`${prefix}/services/${guide.serviceSlug}`}>{en ? guide.serviceEn : guide.serviceAr} <span><ArrowIcon /></span></Link><a className="primary-button" href={`https://wa.me/971505918238?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer">{en ? "Discuss your project" : "ناقش مشروعك معي"} <span><ArrowIcon /></span></a></div></section>
      <footer><span>© 2026 HASSN EDITOR</span><Link prefetch={false} href={`${prefix}/industries`}>{en ? "Industries" : "القطاعات"}</Link><Link prefetch={false} href={`${prefix}/guides`}>{en ? "Guides" : "دليل الفيديو"}</Link><Link prefetch={false} href={`${prefix}/works`}>{en ? "Portfolio" : "الأعمال"}</Link><Link prefetch={false} href={en ? "/en/privacy" : "/privacy"}>{en ? "Privacy policy" : "سياسة الخصوصية"}</Link><PrivacySettingsButton label={en ? "Privacy settings" : "إعدادات الخصوصية"} /></footer>
    </main>
  );
}
