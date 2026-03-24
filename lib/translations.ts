export type Language = "en" | "te" | "hi";

export interface TranslationDict {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations = {
  // Navigation
  dashboard: {
    en: "Dashboard",
    te: "డ్యాష్‌బోర్డ్",
    hi: "डैशबोर्ड",
  },
  analysis: {
    en: "Analysis Report",
    te: "విశ్లేషణ నివేదిక",
    hi: "विश्लेषण रिपोर्ट",
  },
  alerts: {
    en: "Health Alerts",
    te: "ఆరోగ్య హెచ్చరికలు",
    hi: "स्वास्थ्य अलर्ट",
  },
  progression: {
    en: "Disease Tracking",
    te: "వ్యాధి ట్రాకింగ్",
    hi: "रोग ट्रैकिंग",
  },
  consultation: {
    en: "Expert Help",
    te: "నిపుణుల సహాయం",
    hi: "विशेषज्ञ सहायता",
  },
  admin: {
    en: "Admin Hub",
    te: "నిర్వాహక హబ్",
    hi: "एडमिन हब",
  },
  settings: {
    en: "Settings",
    te: "సెట్టింగులు",
    hi: "सेటింగ్స్",
  },
  upload_image: {
    en: "Upload Crop Image",
    te: "పంట చిత్రాన్ని అప్‌లోడ్ చేయండి",
    hi: "फसल की छवि अपलोड करें",
  },
  main_menu: {
    en: "Main Menu",
    te: "ప్రధాన మెనూ",
    hi: "मुख्य मेनू",
  },
  sign_out: {
    en: "Sign Out",
    te: "సైన్ అవుట్",
    hi: "साइन आउट",
  },

  // General Actions
  back_to_dashboard: {
    en: "Back to Dashboard",
    te: "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్ళు",
    hi: "डैशबोर्ड पर वापस जाएं",
  },
  download_pdf: {
    en: "Download PDF",
    te: "PDFని డౌన్‌లోడ్ చేయండి",
    hi: "पीडीएफ डाउनलोड करें",
  },
  share: {
    en: "Share",
    te: "షేర్ చేయండి",
    hi: "साझा करें",
  },

  // Sidebar / Header
  welcome_back: {
    en: "Welcome back, Ravi",
    te: "తిరిగి స్వాగతం, రవి",
    hi: "वापस स्वागत है, रवि",
  },
  location_active: {
    en: "Location: Andhra Pradesh",
    te: "ప్రాంతం: ఆంధ్రప్రదేశ్",
    hi: "स्थान: आंध्र प्रदेश",
  },
  language_select: {
    en: "Select Language",
    te: "భాషను ఎంచుకోండి",
    hi: "भाषा चुनें",
  },

  // Analysis Page
  latest_scan: {
    en: "Latest Scan Results",
    te: "తాజా స్కాన్ ఫలితాలు",
    hi: "नवीनतम स्कैन परिणाम",
  },
  severity: {
    en: "Severity",
    te: "తీవ్రత",
    hi: "तीव्रता",
  },
  confidence: {
    en: "Confidence",
    te: "విశ్వాసం",
    hi: "आत्मविश्वास",
  },
  recommendations: {
    en: "Treatment Recommendations",
    te: "చికిత్స సిఫార్సులు",
    hi: "उपचार सिफारिशें",
  },
  symptoms: {
    en: "Observed Symptoms",
    te: "గమనించిన లక్షణాలు",
    hi: "देखे गए लक्षण",
  },

  // Landing Page
  hero_title: {
    en: "Smart Crop Health Management",
    te: "స్మార్ట్ పంట ఆరోగ్య నిర్వహణ",
    hi: "स्मार्ट फसल स्वास्थ्य प्रबंधन",
  },
  hero_subtitle: {
    en: "Protect your harvest with AI-powered disease detection and expert guidance.",
    te: "AI-ఆధారిత వ్యాధి గుర్తింపు మరియు నిపుణుల మార్గదర్శకత్వంతో మీ దిగుబడిని రక్షించుకోండి.",
    hi: "AI-संचालित रोग पहचान और विशेषज्ञ मार्गदर्शन के साथ अपनी फसल की रक्षा करें।",
  },
  cta_start: {
    en: "Start Monitoring",
    te: "పర్యవేక్షణ ప్రారంభించండి",
    hi: "निगरानी शुरू करें",
  },
  cta_demo: {
    en: "Watch Demo",
    te: "డెమో చూడండి",
    hi: "डेमो देखें",
  },

  // Expert Consultation
  expert_advice: {
    en: "Connect with Experts",
    te: "నిపుణులతో కనెక్ట్ అవ్వండి",
    hi: "विशेषज्ञों से जुड़ें",
  },
  type_message: {
    en: "Type your message...",
    te: "మీ సందేశాన్ని టైప్ చేయండి...",
    hi: "अपना संदेश टाइप करें...",
  },
} as const;

export type TranslationKey = keyof typeof translations;
