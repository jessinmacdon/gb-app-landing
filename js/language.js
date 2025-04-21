const translations = {
    en: {
        // Navbar
        home: "Home",
        about: "About",
        feature: "Features",
        appPreview: "App Preview",
        download: "Download",
        contact: "Contact",
        downloadNow: "Download Now",

        // Hero Section
        heroTitle: "Shop Globally, Pay Locally",
        heroSubtitle: "Your Gateway to International Shopping",
        heroDescription: "Browse, save, and purchase products from any global marketplace with ease. We handle the international logistics while you enjoy local payment methods.",
        getStarted: "Get Started",
        learnMore: "Learn More",

        // About Section
        aboutTitle: "About GlobalBuy24",
        aboutSubtitle: "Your Global Shopping Companion",
        aboutDescription: "GlobalBuy24 simplifies international shopping by connecting you with global marketplaces while handling all the complexities of international shipping and payments.",

        // Features Section
        featuresTitle: "Why Choose GlobalBuy24",
        globalShopping: "Global Shopping Made Easy",
        globalShoppingDesc: "Browse and save products from any global marketplace",
        instantQuotes: "Instant Quotes",
        instantQuotesDesc: "Get real-time pricing including all costs",
        securePayments: "Secure Payments",
        securePaymentsDesc: "Pay with your preferred local payment method",
        realtimeTracking: "Real-time Tracking",
        realtimeTrackingDesc: "Monitor your order from purchase to delivery",

        // App Preview Section
        appPreviewTitle: "Simple, Secure, and User-Friendly Shopping Experience",
        appPreviewDesc: "Experience the convenience of global shopping at your fingertips. Our intuitive interface makes international shopping as easy as local shopping.",

        // Download Section
        downloadTitle: "Download Our App",
        downloadSubtitle: "Start Shopping Globally Today",
        downloadDescription: "Available for both iOS and Android devices. Download now and start your global shopping journey.",

        // Contact Section
        contactTitle: "Get In Touch",
        contactSubtitle: "Contact Us For Any Query",
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Message",
        sendMessage: "Send Message",

        // Footer
        contactUs: "Contact Us",
        quickLinks: "Quick Links",
        support: "Support",
        helpCenter: "Help Center",
        shippingPolicy: "Shipping Policy",
        paymentMethods: "Payment Methods",
        returnsRefunds: "Returns & Refunds",
        faq: "FAQ",
        copyright: "© GlobalBuy24. All Rights Reserved."
    },
    fr: {
        // Navbar
        home: "Accueil",
        about: "À propos",
        feature: "Fonctionnalités",
        appPreview: "Aperçu de l'App",
        download: "Télécharger",
        contact: "Contact",
        downloadNow: "Télécharger Maintenant",

        // Hero Section
        heroTitle: "Achetez Globalement, Payez Localement",
        heroSubtitle: "Votre Portail vers les Achats Internationaux",
        heroDescription: "Parcourez, enregistrez et achetez des produits sur n'importe quel marché mondial en toute simplicité. Nous gérons la logistique internationale pendant que vous profitez des méthodes de paiement locales.",
        getStarted: "Commencer",
        learnMore: "En Savoir Plus",

        // About Section
        aboutTitle: "À propos de GlobalBuy24",
        aboutSubtitle: "Votre Compagnon d'Achats Mondiaux",
        aboutDescription: "GlobalBuy24 simplifie les achats internationaux en vous connectant aux marchés mondiaux tout en gérant toutes les complexités de l'expédition et des paiements internationaux.",

        // Features Section
        featuresTitle: "Pourquoi Choisir GlobalBuy24",
        globalShopping: "Achats Mondiaux Simplifiés",
        globalShoppingDesc: "Parcourez et enregistrez des produits de n'importe quel marché mondial",
        instantQuotes: "Devis Instantanés",
        instantQuotesDesc: "Obtenez des prix en temps réel incluant tous les coûts",
        securePayments: "Paiements Sécurisés",
        securePaymentsDesc: "Payez avec votre méthode de paiement locale préférée",
        realtimeTracking: "Suivi en Temps Réel",
        realtimeTrackingDesc: "Surveillez votre commande de l'achat à la livraison",

        // App Preview Section
        appPreviewTitle: "Expérience d'Achat Simple, Sécurisée et Conviviale",
        appPreviewDesc: "Découvrez la commodité des achats mondiaux au bout de vos doigts. Notre interface intuitive rend les achats internationaux aussi simples que les achats locaux.",

        // Download Section
        downloadTitle: "Téléchargez Notre Application",
        downloadSubtitle: "Commencez à Acheter Globalement Aujourd'hui",
        downloadDescription: "Disponible pour les appareils iOS et Android. Téléchargez maintenant et commencez votre voyage d'achat mondial.",

        // Contact Section
        contactTitle: "Contactez-nous",
        contactSubtitle: "Contactez-nous pour toute question",
        name: "Votre Nom",
        email: "Votre Email",
        subject: "Sujet",
        message: "Message",
        sendMessage: "Envoyer le Message",

        // Footer
        contactUs: "Contactez-nous",
        quickLinks: "Liens Rapides",
        support: "Support",
        helpCenter: "Centre d'Aide",
        shippingPolicy: "Politique d'Expédition",
        paymentMethods: "Méthodes de Paiement",
        returnsRefunds: "Retours et Remboursements",
        faq: "FAQ",
        copyright: "© GlobalBuy24. Tous droits réservés."
    }
};

let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    updateTextContent();
    updateLanguageSwitcher();
    localStorage.setItem('preferredLanguage', lang);
}

function updateTextContent() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

function updateLanguageSwitcher() {
    const switcher = document.getElementById('languageSwitcher');
    if (switcher) {
        switcher.innerHTML = currentLanguage === 'en' ? 'FR' : 'EN';
    }
}

// Initialize language based on user preference or browser language
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const browserLanguage = navigator.language.split('-')[0];

    if (savedLanguage) {
        switchLanguage(savedLanguage);
    } else if (browserLanguage === 'fr') {
        switchLanguage('fr');
    }
}); 