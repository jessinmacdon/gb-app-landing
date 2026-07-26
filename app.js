/* ════════════════════════════════════════════════════════════════
   GLOBALBUY24 — app.js
   Shared, page-agnostic logic loaded by every page:
     • i18n  — EN/FR dictionary, system-language detection,
               persistence, live DOM updates via [data-i18n]
     • Theme — dark/light, OS preference detection, persistence
     • Nav   — scrolled state for the glass navbar
   No dependencies. ES2017+. Safe to load on any page (every
   selector is null-checked).
════════════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────────────
   1. TRANSLATION DICTIONARY
   Keys are grouped by page/section. Both locales must define the
   same keys — applyLanguage() falls back to the existing DOM text
   when a key is missing, so partial additions never break a page.
──────────────────────────────────────────────────────────────── */
const translations = {
  en: {
    /* — Shared chrome — */
    home: "Home",
    howItWorks: "How It Works",
    support: "Support",
    language: "Language",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contact: "Contact",
    copyright: "© 2026 GlobalBuy24. All rights reserved.",
    footerTagline: "Shop anywhere online. We handle purchase, shipping and local pickup in Cameroon.",

    /* — Landing: hero — */
    heroEyebrow: "Global stores · Local pickup",
    heroTitleA: "Shop the world.",
    heroTitleB: "Pick up in Cameroon.",
    heroSubtitle: "Paste any product link from Amazon, SHEIN, Zara or 200+ global stores. Get one transparent quote, pay with Mobile Money, and collect at a pickup point near you.",
    heroCtaPrimary: "Start shopping",
    heroCtaSecondary: "Talk to us",
    heroNote: "No hidden fees — the quote you see is the price you pay.",

    /* — Landing: quote-card mock — */
    qcProduct: "Product price",
    qcShipping: "International shipping",
    qcFee: "GB24 service fee",
    qcTotal: "Total — all inclusive",
    qcReady: "Ready for pickup · Douala",

    /* — Landing: stats — */
    statOrders: "Orders delivered",
    statStores: "Global stores supported",
    statDays: "Average delivery time",
    statSat: "Customer satisfaction",

    /* — Landing: process / feature grid — */
    explore: "Our process",
    stepsTitle: "From any store to your hands, in four steps.",
    featuresSubtitle: "We handle the purchase, customs and logistics. You just paste a link.",
    step1Title: "Paste a product link",
    step1Desc: "Copy any product URL from Amazon, SHEIN, Temu, Zara — any store with a link works.",
    step2Title: "Get an instant quote",
    step2Desc: "One total covering the product, shipping and our fee — nothing added later.",
    step3Title: "Pay with Mobile Money",
    step3Desc: "MTN, Orange Money and cards — confirm in seconds, we buy on your behalf.",
    step4Title: "Pick up locally",
    step4Desc: "We notify you the moment your order lands at your nearest pickup point.",

    /* — Landing: video demo — */
    demoEyebrow: "See it in action",
    demoTitle: "Watch a link become a delivery.",
    demoSubtitle: "A 20-second walkthrough of the entire GlobalBuy24 flow — from paste to pickup.",
    demoCaptionIdle: "Press play to run the walkthrough",
    demoCaptionDone: "Walkthrough complete — replay any time",
    demoStep1: "Link pasted",
    demoStep2: "Quote received",
    demoStep3: "Payment confirmed",
    demoStep4: "Ready for pickup",

    /* — Landing: testimonials — */
    testiEyebrow: "Customer stories",
    testiTitle: "Trusted across Douala and Yaoundé.",
    testi1Text: "I ordered a laptop from Amazon that simply doesn't exist in local shops. The quote matched the final price exactly, and pickup in Akwa took five minutes.",
    testi1Role: "Entrepreneur · Douala",
    testi2Text: "Paying with MTN Mobile Money made all the difference — no card, no stress. I track every order in the app and the timeline has been accurate every time.",
    testi2Role: "Software developer · Yaoundé",
    testi3Text: "I stock my boutique with pieces from SHEIN and Zara that nobody else here carries. GB24 turned a two-month shipping headache into a two-week routine.",
    testi3Role: "Boutique owner · Douala",

    /* — Landing + contact: FAQ — */
    faq: "FAQs",
    faqTitle: "Questions, answered.",
    faqDesc: "Find answers to common questions about GlobalBuy24 and our services.",
    faq1: "How does GlobalBuy24 work?",
    faq1Ans: "Copy the product link, paste it in our app, and receive a quote. After payment, we purchase the item, handle shipping and customs, and deliver it to a local pickup point near you.",
    faq2: "What payment methods do you accept?",
    faq2Ans: "We accept local Mobile Money options including MTN and Orange, plus standard bank cards — secure, instant, and confirmed in the app.",
    faq3: "Are there hidden fees?",
    faq3Ans: "No. Your quote includes the product price, international shipping and our service fee. The total you approve is the total you pay — nothing is added at pickup.",
    faq4: "How long does delivery take?",
    faq4Ans: "Most orders arrive within 10–21 days, with 14 days as our current average. You can follow every stage — purchased, shipped, in customs, ready — inside the app.",
    faq5: "Where can I pick up my order?",
    faq5Ans: "Our pickup network covers Douala and Yaoundé today, with new points opening regularly. You choose your preferred location at checkout and we notify you the moment your package arrives.",

    /* — Landing: final CTA — */
    ctaEyebrow: "Get started today",
    ctaTitle: "Ready to shop the world?",
    ctaDesc: "Join thousands of customers in Cameroon already shopping globally. Your first quote takes less than a minute.",
    ctaPrimary: "See how it works",
    ctaSecondary: "Contact support",

    /* — How It Works page — */
    howItWorksTitle: "How It Works",
    howItWorksDesc: "Experience seamless shopping from global stores to local pickup with our easy-to-follow process.",
    learnMore: "Learn More",
    getStarted: "Get Started",
    step1OverviewTitle: "Follow these simple steps to shop globally with ease.",
    step1OverviewDesc: "Start your journey by copying the product link from your favorite online store.",
    next: "Next →",
    step2OverviewTitle: "Receive Your Quote Instantly",
    step2OverviewDesc: "Paste the link in the app to get a detailed quote.",
    pay: "Pay →",
    step3OverviewTitle: "Secure Payment Made Simple",
    step3OverviewDesc: "Confirm your quote and pay using local payment methods like Mobile Money.",
    collect: "Collect →",
    step: "Step",
    step1DetailTitle: "Copy Your Product Link Effortlessly",
    step1DetailDesc: "Discover your favorite items on popular sites like Amazon, SHEIN, or Temu. Simply copy the product link to begin your shopping journey.",
    step2DetailTitle: "Paste Your Link and Get a Quote",
    step2DetailDesc: "Simply paste the product link into the GB24 app. You'll receive a detailed quote, including all costs, instantly.",
    quickQuote: "Quick Quote",
    quickQuoteDesc: "Receive a transparent quote with no hidden fees.",
    easyProcess: "Easy Process",
    easyProcessDesc: "Get started on your global shopping journey effortlessly.",
    signUp: "Sign Up →",
    secure: "Secure",
    step3DetailTitle: "Step 3: Pay Securely and Easily",
    step3DetailDesc: "Once you receive your quote, confirm it and proceed to payment. Choose from various local payment options, including Mobile Money, for a seamless transaction.",
    easyPayment: "Easy Payment",
    easyPaymentDesc: "Enjoy hassle-free payments tailored for your convenience and security.",
    trustedMethods: "Trusted Methods",
    trustedMethodsDesc: "We support popular local payment methods for your peace of mind.",
    pickup: "Pickup",
    step4DetailTitle: "Step 4: Convenient Local Pickup",
    step4DetailDesc: "Your order is delivered to a nearby pickup point, making it easy for you to collect your items. Enjoy the convenience of shopping globally without the hassle of international shipping.",

    /* — Contact page — */
    contactFAQ: "Contact & FAQs",
    contactDesc: "We're here to assist you. Find answers to common questions or reach out to us.",
    submit: "Submit",
    inquire: "Inquire",
    contactUs: "Contact Us",
    contactUsDesc: "Need assistance or have a query? Reach out!",
    email: "Email",
    emailDesc: "We're here to help!",
    phone: "Phone",
    phoneDesc: "Call us anytime!",
    office: "Office",
    officeDesc: "123 Sample St, Yaoundé, Cameroon",
    getDirections: "Get Directions →",

    /* — Legal pages — */
    effectiveDate: "Effective Date: January 1, 2025",
    introduction: "Introduction",
    introText: "At GlobalBuy24, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.",
    infoCollected: "Information We Collect",
    personalInfo: "Personal Information",
    personalInfoText: "We may collect personal information from you in various ways, including:",
    infoItem1: "Name and email address",
    infoItem2: "Phone number and physical address",
    infoItem3: "Payment and billing information",
    autoInfo: "Automatic Information",
    autoInfoText: "We automatically collect certain information about your device and how you interact with our website.",
    howWeUse: "How We Use Your Information",
    howWeUseText: "We use the information we collect for various purposes, including processing transactions, providing customer support, and improving our services.",
    acceptance: "Acceptance of Terms",
    acceptanceText: "By accessing and using GlobalBuy24's website and services, you accept and agree to be bound by and comply with these Terms of Service.",
    license: "License and Use Restrictions",
    licenseText: "GlobalBuy24 grants you a limited, non-exclusive, non-transferable license to use our services for personal, non-commercial purposes.",
    products: "Product Links and Quotes",
    productsText: "When you submit product links to GlobalBuy24, you warrant that you own or have the right to use the content and that the information is accurate and truthful.",
    payment: "Payment and Transactions",
    paymentText: "All transactions through GlobalBuy24 are binding agreements. By confirming payment, you agree to pay the quoted amount in full.",
    refunds: "Refunds and Cancellations",
    refundsText: "Refund requests must be made within 7 days of payment and will be processed within 10-15 business days.",
    delivery: "Delivery and Liability",
    deliveryText: "We are not liable for delays due to customs, shipping delays, or force majeure events.",
    disputeResolution: "Dispute Resolution",
    disputeText: "Any disputes arising from these Terms of Service shall be resolved through good faith negotiation.",
    contactUsText: "For questions, please contact us at:",

    /* — Legacy keys kept for older page revisions — */
    appPreview: "App Preview",
    whyUs: "Why Us",
    download: "Download",
    heroTitle: "Shop the World — Without the Hassle",
    features: "Features",
    appTitle: "Mobile App Features",
    appDesc: "Manage your shopping with ease using our intuitive app.",
    featureOne: "User-Friendly Design",
    featureOneDesc: "Simple interface for everyone",
    featureTwo: "Real-Time Updates",
    featureTwoDesc: "Track your orders instantly",
    benefits: "Benefits",
    whyUsTitle: "Why Choose GlobalBuy24?",
    whyUsDesc: "We make international shopping accessible to everyone in underserved markets.",
    cardOne: "Shop Globally",
    cardOneDesc: "Access products from the world's biggest stores",
    cardTwo: "We Handle Rest",
    cardTwoDesc: "Customs, logistics, and delivery taken care of",
    cardThree: "Local Pickup",
    cardThreeDesc: "Convenient collection points near you",
    exploreShops: "Explore shops →"
  },

  fr: {
    /* — Shared chrome — */
    home: "Accueil",
    howItWorks: "Comment ça marche",
    support: "Support",
    language: "Langue",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    contact: "Nous contacter",
    copyright: "© 2026 GlobalBuy24. Tous droits réservés.",
    footerTagline: "Achetez partout en ligne. Nous gérons l'achat, l'expédition et la collecte locale au Cameroun.",

    /* — Landing: hero — */
    heroEyebrow: "Boutiques mondiales · Collecte locale",
    heroTitleA: "Achetez dans le monde entier.",
    heroTitleB: "Récupérez au Cameroun.",
    heroSubtitle: "Collez n'importe quel lien produit d'Amazon, SHEIN, Zara ou de plus de 200 boutiques mondiales. Recevez un devis transparent, payez par Mobile Money et récupérez votre commande près de chez vous.",
    heroCtaPrimary: "Commencer mes achats",
    heroCtaSecondary: "Parlez-nous",
    heroNote: "Aucun frais caché — le devis affiché est le prix que vous payez.",

    /* — Landing: quote-card mock — */
    qcProduct: "Prix du produit",
    qcShipping: "Expédition internationale",
    qcFee: "Frais de service GB24",
    qcTotal: "Total — tout inclus",
    qcReady: "Prêt pour collecte · Douala",

    /* — Landing: stats — */
    statOrders: "Commandes livrées",
    statStores: "Boutiques mondiales prises en charge",
    statDays: "Délai de livraison moyen",
    statSat: "Satisfaction client",

    /* — Landing: process / feature grid — */
    explore: "Notre processus",
    stepsTitle: "De n'importe quelle boutique jusqu'à vos mains, en quatre étapes.",
    featuresSubtitle: "Nous gérons l'achat, la douane et la logistique. Vous collez simplement un lien.",
    step1Title: "Collez un lien produit",
    step1Desc: "Copiez n'importe quelle URL produit d'Amazon, SHEIN, Temu, Zara — toute boutique avec un lien fonctionne.",
    step2Title: "Recevez un devis instantané",
    step2Desc: "Un total unique couvrant le produit, l'expédition et nos frais — rien d'ajouté ensuite.",
    step3Title: "Payez par Mobile Money",
    step3Desc: "MTN, Orange Money et cartes — confirmez en quelques secondes, nous achetons pour vous.",
    step4Title: "Récupérez localement",
    step4Desc: "Nous vous prévenons dès que votre commande arrive au point de collecte le plus proche.",

    /* — Landing: video demo — */
    demoEyebrow: "Voyez-le en action",
    demoTitle: "Regardez un lien devenir une livraison.",
    demoSubtitle: "Une démonstration de 20 secondes du parcours GlobalBuy24 complet — du collage à la collecte.",
    demoCaptionIdle: "Appuyez sur lecture pour lancer la démonstration",
    demoCaptionDone: "Démonstration terminée — relancez quand vous voulez",
    demoStep1: "Lien collé",
    demoStep2: "Devis reçu",
    demoStep3: "Paiement confirmé",
    demoStep4: "Prêt pour collecte",

    /* — Landing: testimonials — */
    testiEyebrow: "Témoignages clients",
    testiTitle: "Une confiance établie à Douala et Yaoundé.",
    testi1Text: "J'ai commandé un ordinateur portable sur Amazon introuvable dans les boutiques locales. Le devis correspondait exactement au prix final, et la collecte à Akwa a pris cinq minutes.",
    testi1Role: "Entrepreneure · Douala",
    testi2Text: "Payer avec MTN Mobile Money a tout changé — pas de carte, pas de stress. Je suis chaque commande dans l'application et les délais ont toujours été exacts.",
    testi2Role: "Développeur logiciel · Yaoundé",
    testi3Text: "J'approvisionne ma boutique avec des pièces SHEIN et Zara que personne d'autre ne propose ici. GB24 a transformé deux mois de galère logistique en une routine de deux semaines.",
    testi3Role: "Gérante de boutique · Douala",

    /* — Landing + contact: FAQ — */
    faq: "FAQ",
    faqTitle: "Vos questions, nos réponses.",
    faqDesc: "Trouvez les réponses aux questions courantes sur GlobalBuy24 et nos services.",
    faq1: "Comment fonctionne GlobalBuy24 ?",
    faq1Ans: "Copiez le lien du produit, collez-le dans notre application et recevez un devis. Après le paiement, nous achetons l'article, gérons l'expédition et la douane, puis le livrons à un point de collecte près de chez vous.",
    faq2: "Quels moyens de paiement acceptez-vous ?",
    faq2Ans: "Nous acceptons les options Mobile Money locales, dont MTN et Orange, ainsi que les cartes bancaires — sécurisé, instantané et confirmé dans l'application.",
    faq3: "Y a-t-il des frais cachés ?",
    faq3Ans: "Non. Votre devis inclut le prix du produit, l'expédition internationale et nos frais de service. Le total que vous approuvez est le total que vous payez — rien n'est ajouté à la collecte.",
    faq4: "Combien de temps prend la livraison ?",
    faq4Ans: "La plupart des commandes arrivent en 10 à 21 jours, avec une moyenne actuelle de 14 jours. Vous suivez chaque étape — achetée, expédiée, en douane, prête — dans l'application.",
    faq5: "Où puis-je récupérer ma commande ?",
    faq5Ans: "Notre réseau de collecte couvre aujourd'hui Douala et Yaoundé, avec de nouveaux points ouverts régulièrement. Vous choisissez votre lieu préféré au paiement et nous vous prévenons dès l'arrivée de votre colis.",

    /* — Landing: final CTA — */
    ctaEyebrow: "Commencez aujourd'hui",
    ctaTitle: "Prêt à acheter dans le monde entier ?",
    ctaDesc: "Rejoignez des milliers de clients au Cameroun qui achètent déjà mondialement. Votre premier devis prend moins d'une minute.",
    ctaPrimary: "Voir comment ça marche",
    ctaSecondary: "Contacter le support",

    /* — How It Works page — */
    howItWorksTitle: "Comment ça marche",
    howItWorksDesc: "Vivez une expérience d'achat fluide, des boutiques mondiales à la collecte locale, grâce à notre processus simple.",
    learnMore: "En savoir plus",
    getStarted: "Commencer",
    step1OverviewTitle: "Suivez ces étapes simples pour acheter mondialement en toute simplicité.",
    step1OverviewDesc: "Commencez votre parcours en copiant le lien du produit depuis votre boutique en ligne préférée.",
    next: "Suivant →",
    step2OverviewTitle: "Recevez votre devis instantanément",
    step2OverviewDesc: "Collez le lien dans l'application pour obtenir un devis détaillé.",
    pay: "Payer →",
    step3OverviewTitle: "Le paiement sécurisé rendu simple",
    step3OverviewDesc: "Confirmez votre devis et payez avec des méthodes locales comme Mobile Money.",
    collect: "Collecter →",
    step: "Étape",
    step1DetailTitle: "Copiez votre lien produit sans effort",
    step1DetailDesc: "Découvrez vos articles préférés sur des sites populaires comme Amazon, SHEIN ou Temu. Copiez simplement le lien du produit pour commencer votre parcours d'achat.",
    step2DetailTitle: "Collez votre lien et obtenez un devis",
    step2DetailDesc: "Collez simplement le lien du produit dans l'application GB24. Vous recevrez instantanément un devis détaillé, tous frais inclus.",
    quickQuote: "Devis rapide",
    quickQuoteDesc: "Recevez un devis transparent sans frais cachés.",
    easyProcess: "Processus facile",
    easyProcessDesc: "Lancez votre parcours d'achat mondial sans effort.",
    signUp: "S'inscrire →",
    secure: "Sécurisé",
    step3DetailTitle: "Étape 3 : Payez en toute sécurité et simplicité",
    step3DetailDesc: "Une fois votre devis reçu, confirmez-le et procédez au paiement. Choisissez parmi diverses options locales, dont Mobile Money, pour une transaction fluide.",
    easyPayment: "Paiement facile",
    easyPaymentDesc: "Profitez de paiements sans tracas, pensés pour votre confort et votre sécurité.",
    trustedMethods: "Méthodes de confiance",
    trustedMethodsDesc: "Nous prenons en charge les moyens de paiement locaux populaires pour votre tranquillité d'esprit.",
    pickup: "Collecte",
    step4DetailTitle: "Étape 4 : Collecte locale pratique",
    step4DetailDesc: "Votre commande est livrée à un point de collecte proche, ce qui facilite la récupération de vos articles. Profitez des achats mondiaux sans les tracas de la livraison internationale.",

    /* — Contact page — */
    contactFAQ: "Contact et FAQ",
    contactDesc: "Nous sommes là pour vous aider. Trouvez des réponses aux questions courantes ou contactez-nous.",
    submit: "Soumettre",
    inquire: "Se renseigner",
    contactUs: "Nous contacter",
    contactUsDesc: "Besoin d'aide ou une question ? Contactez-nous !",
    email: "E-mail",
    emailDesc: "Nous sommes là pour vous aider !",
    phone: "Téléphone",
    phoneDesc: "Appelez-nous à tout moment !",
    office: "Bureau",
    officeDesc: "123 Sample St, Yaoundé, Cameroun",
    getDirections: "Obtenir l'itinéraire →",

    /* — Legal pages — */
    effectiveDate: "Date d'entrée en vigueur : 1er janvier 2025",
    introduction: "Introduction",
    introText: "Chez GlobalBuy24, nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site et utilisez nos services.",
    infoCollected: "Informations que nous collectons",
    personalInfo: "Informations personnelles",
    personalInfoText: "Nous pouvons collecter des informations personnelles de diverses manières, notamment :",
    infoItem1: "Nom et adresse e-mail",
    infoItem2: "Numéro de téléphone et adresse physique",
    infoItem3: "Informations de paiement et de facturation",
    autoInfo: "Informations automatiques",
    autoInfoText: "Nous collectons automatiquement certaines informations sur votre appareil et votre interaction avec notre site.",
    howWeUse: "Comment nous utilisons vos informations",
    howWeUseText: "Nous utilisons les informations collectées à diverses fins, notamment le traitement des transactions, le support client et l'amélioration de nos services.",
    acceptance: "Acceptation des conditions",
    acceptanceText: "En accédant au site et aux services de GlobalBuy24, vous acceptez de respecter ces Conditions d'utilisation.",
    license: "Licence et restrictions d'utilisation",
    licenseText: "GlobalBuy24 vous accorde une licence limitée, non exclusive et non transférable pour utiliser nos services à des fins personnelles et non commerciales.",
    products: "Liens produits et devis",
    productsText: "En soumettant des liens produits à GlobalBuy24, vous garantissez détenir les droits sur le contenu et que les informations fournies sont exactes.",
    payment: "Paiement et transactions",
    paymentText: "Toutes les transactions via GlobalBuy24 constituent des accords contraignants. En confirmant le paiement, vous acceptez de régler le montant indiqué en totalité.",
    refunds: "Remboursements et annulations",
    refundsText: "Les demandes de remboursement doivent être effectuées dans les 7 jours suivant le paiement et seront traitées sous 10 à 15 jours ouvrables.",
    delivery: "Livraison et responsabilité",
    deliveryText: "Nous ne sommes pas responsables des retards dus aux douanes, aux délais d'expédition ou aux cas de force majeure.",
    disputeResolution: "Résolution des litiges",
    disputeText: "Tout litige découlant de ces Conditions d'utilisation sera résolu par une négociation de bonne foi.",
    contactUsText: "Pour toute question, contactez-nous à :",

    /* — Legacy keys kept for older page revisions — */
    appPreview: "Aperçu de l'application",
    whyUs: "Pourquoi nous",
    download: "Télécharger",
    heroTitle: "Achetez dans le Monde — Sans Tracas",
    features: "Caractéristiques",
    appTitle: "Fonctionnalités de l'application mobile",
    appDesc: "Gérez vos achats facilement avec notre application intuitive.",
    featureOne: "Conception conviviale",
    featureOneDesc: "Interface simple pour tous",
    featureTwo: "Mises à jour en temps réel",
    featureTwoDesc: "Suivez vos commandes instantanément",
    benefits: "Avantages",
    whyUsTitle: "Pourquoi choisir GlobalBuy24 ?",
    whyUsDesc: "Nous rendons les achats internationaux accessibles à tous sur les marchés mal desservis.",
    cardOne: "Achetez mondialement",
    cardOneDesc: "Accédez aux produits des plus grands magasins du monde",
    cardTwo: "Nous gérons le reste",
    cardTwoDesc: "Douane, logistique et livraison prises en charge",
    cardThree: "Collecte locale",
    cardThreeDesc: "Points de collecte pratiques près de chez vous",
    exploreShops: "Explorer les boutiques →"
  }
};

/* ────────────────────────────────────────────────────────────────
   2. LANGUAGE
──────────────────────────────────────────────────────────────── */

/** Map the browser locale to a supported language code. */
function getSystemLanguage() {
  const browserLang = navigator.language || 'en';
  return browserLang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

/**
 * Apply a language: set <html lang>, persist the choice, and swap
 * the text of every [data-i18n] element. Missing keys leave the
 * element's existing text untouched.
 */
function applyLanguage(lang) {
  document.documentElement.lang = lang;
  try { localStorage.setItem('appLanguage', lang); } catch (e) { /* storage unavailable (private mode) */ }

  const dict = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  // Reflect the active language on the navbar button (keep its caret icon)
  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    const caret = langBtn.querySelector('svg');
    langBtn.textContent = lang.toUpperCase() + ' ';
    if (caret) langBtn.appendChild(caret);
  }
}

/* ────────────────────────────────────────────────────────────────
   3. THEME
──────────────────────────────────────────────────────────────── */

/** Apply and persist a theme ("dark" | "light"). */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('appTheme', theme); } catch (e) { /* storage unavailable */ }
}

/** Flip between dark and light. Exposed for page-level toggles. */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/** Follow live OS theme changes unless the user chose manually. */
function setupThemeListener() {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e) => {
    let manual = null;
    try { manual = localStorage.getItem('appThemeManual'); } catch (err) { /* noop */ }
    if (manual !== 'true') applyTheme(e.matches ? 'dark' : 'light');
  };
  if (media.addEventListener) media.addEventListener('change', handler);
  else if (media.addListener) media.addListener(handler); // Safari < 14
}

/* ────────────────────────────────────────────────────────────────
   4. NAVBAR & LANGUAGE DROPDOWN WIRING
──────────────────────────────────────────────────────────────── */

function setupLanguageDropdown() {
  const langBtn = document.getElementById('langBtn');
  const dropdown = document.getElementById('langDropdown');
  if (!langBtn || !dropdown) return;

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = dropdown.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(open));
  });

  const choose = (lang) => {
    applyLanguage(lang);
    dropdown.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  };
  const en = document.getElementById('langEn');
  const fr = document.getElementById('langFr');
  if (en) en.addEventListener('click', () => choose('en'));
  if (fr) fr.addEventListener('click', () => choose('fr'));

  // Close when clicking anywhere else, or pressing Escape
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !langBtn.contains(e.target)) {
      dropdown.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

function setupNavigation() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // sync initial state (e.g. reload mid-page)
}

/* ────────────────────────────────────────────────────────────────
   5. BOOTSTRAP
   Order matters: theme first (avoid flash), then language, then
   interactive wiring.
──────────────────────────────────────────────────────────────── */
function initApp() {
  // Theme: saved choice > OS preference > dark
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('appTheme'); } catch (e) { /* noop */ }
  const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (osDark ? 'dark' : 'light'));
  setupThemeListener();

  // Language: saved choice > browser locale > English
  let savedLang = null;
  try { savedLang = localStorage.getItem('appLanguage'); } catch (e) { /* noop */ }
  applyLanguage(savedLang || getSystemLanguage());

  setupLanguageDropdown();
  setupNavigation();
}

// Track manual theme choices so the OS listener stops overriding them.
const _applyTheme = applyTheme;
toggleTheme = function () {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  _applyTheme(current === 'dark' ? 'light' : 'dark');
  try { localStorage.setItem('appThemeManual', 'true'); } catch (e) { /* noop */ }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
