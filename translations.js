// translations.js

const translations = {
    "en": {
        "site-title": "Government Schemes Eligibility",
        "result-heading": "Please fill your details",
        "age-label": "Age",
        "occupation-label": "Occupation",
        "income-label": "Income",
        "submit-button": "Check Eligibility",
        "eligibility-message": "Eligible Government Schemes",
        "back-home": "Back to Home",
        "language-selector": "Select Language",
    },
    "hi": {
        "site-title": "सरकारी योजनाओं की पात्रता",
        "result-heading": "कृपया अपनी जानकारी भरें",
        "age-label": "उम्र",
        "occupation-label": "व्यवसाय",
        "income-label": "आय",
        "submit-button": "पात्रता जांचें",
        "eligibility-message": "पात्र सरकारी योजनाएं",
        "back-home": "होम पर वापस जाएं",
        "language-selector": "भाषा चुनें",
    },
    "ta": {
        "site-title": "அரசு திட்டத் தகுதி",
        "result-heading": "தயவு செய்து உங்கள் விவரங்களை நிரப்பவும்",
        "age-label": "வயது",
        "occupation-label": "பணி",
        "income-label": "வருமானம்",
        "submit-button": "தகுதியை சரிபார்க்கவும்",
        "eligibility-message": "தகுதியான அரசாங்கத் திட்டங்கள்",
        "back-home": "முகப்புக் பக்கத்திற்கு செல்",
        "language-selector": "மொழி தேர்வு",
    },
    "te": {
        "site-title": "ప్రభుత్వ పథకాలు అర్హత",
        "result-heading": "దయచేసి మీ వివరాలను పూరించండి",
        "age-label": "వయస్సు",
        "occupation-label": "ఉద్యోగం",
        "income-label": "ఆదాయం",
        "submit-button": "అర్హతను తనిఖీ చేయండి",
        "eligibility-message": "అర్హత గల ప్రభుత్వ పథకాలు",
        "back-home": "హోమ్ పేజీకి తిరిగెళ్లి",
        "language-selector": "భాషను ఎంచుకోండి",
    }
};

// Function to apply translations
function translatePage(language) {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach(element => {
        const translationKey = element.getAttribute("data-translate");
        if (translations[language] && translations[language][translationKey]) {
            element.innerText = translations[language][translationKey];
        }
    });
}

// On page load, apply translation based on the user's stored language preference
document.addEventListener("DOMContentLoaded", function () {
    const currentLanguage = localStorage.getItem("language") || "en"; // Default to English if no preference is set
    translatePage(currentLanguage);
});
/*https://cdn.openart.ai/uploads/image_vLHW9wFj_1739105456040_raw.jpg*/