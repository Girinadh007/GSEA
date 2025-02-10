document.addEventListener("DOMContentLoaded", function () {
    const schemesListElement = document.getElementById("schemes-list");
    const languageSelector = document.getElementById("language-selector");
    const userDetails = JSON.parse(localStorage.getItem("userDetails")); // Fetch user details from local storage

    const schemes = [
        { name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)", description: "Financial inclusion scheme", registrationLink: "https://pmjdy.gov.in/", instructionsLink: "https://pmjdy.gov.in/about-us" },
        { name: "Pradhan Mantri Awas Yojana (PMAY)", description: "Affordable housing scheme", registrationLink: "https://pmaymis.gov.in/", instructionsLink: "https://pmaymis.gov.in/AboutUs.aspx" },
        { name: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)", description: "Rural employment guarantee scheme", registrationLink: "https://nrega.nic.in/", instructionsLink: "https://nrega.nic.in/netnrega/AllComponent.aspx" },
        { name: "Ayushman Bharat Yojana (PMJAY)", description: "Health insurance for poor families", registrationLink: "https://pmjay.gov.in/", instructionsLink: "https://pmjay.gov.in/about-us" },
        { name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)", description: "Income support for farmers", registrationLink: "https://pmkisan.gov.in/", instructionsLink: "https://pmkisan.gov.in/AboutPmkisan.aspx" },
        { name: "National Social Assistance Programme (NSAP)", description: "Financial support for elderly and poor", registrationLink: "https://nsap.nic.in/", instructionsLink: "https://nsap.nic.in/what-is-nsap" },
        { name: "Swachh Bharat Abhiyan", description: "Clean India mission", registrationLink: "https://swachhbharatmission.gov.in/", instructionsLink: "https://swachhbharatmission.gov.in/SBM-G/Index.htm" },
        { name: "Pradhan Mantri Mudra Yojana (PMMY)", description: "Small business loan scheme", registrationLink: "https://www.mudra.org.in/", instructionsLink: "https://www.mudra.org.in/about-mudra" },
        { name: "Skill India Mission", description: "Skills training for youth", registrationLink: "https://www.skillindia.gov.in/", instructionsLink: "https://www.skillindia.gov.in/about-skill-india" },
        { name: "Atal Pension Yojana (APY)", description: "Pension scheme for unorganized sector", registrationLink: "https://www.npscra.nsdl.co.in/", instructionsLink: "https://www.npscra.nsdl.co.in/atal-pension-yojana" }
    ];

    // Function to check if the user is eligible for the scheme
    function checkEligibility(userDetails, scheme) {
        // Eligibility conditions
        return userDetails.age >= 18 && userDetails.age <= 65 && userDetails.income <= 500000 && scheme.occupation === userDetails.occupation;
    }

    // Translate the scheme name and description based on the selected language
    function translateScheme(scheme, lang) {
        const translations = {
            en: {
                "Pradhan Mantri Jan Dhan Yojana (PMJDY)": "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
                "Financial inclusion scheme": "Financial inclusion scheme"
            },
            hi: {
                "Pradhan Mantri Jan Dhan Yojana (PMJDY)": "प्रधान मंत्री जन धन योजना (PMJDY)",
                "Financial inclusion scheme": "वित्तीय समावेशन योजना"
            },
            ta: {
                "Pradhan Mantri Jan Dhan Yojana (PMJDY)": "பிரதான் மந்திரி ஜன்தன் யோஜனா (PMJDY)",
                "Financial inclusion scheme": "நிதி சேர்க்கை திட்டம்"
            },
            te: {
                "Pradhan Mantri Jan Dhan Yojana (PMJDY)": "ప్రధాన్ మంత్రీ జన ధన్ యోజన (PMJDY)",
                "Financial inclusion scheme": "ఆర్థిక అవశేషం యోజన"
            }
        };
        return {
            name: translations[lang][scheme.name] || scheme.name,
            description: translations[lang][scheme.description] || scheme.description
        };
    }

    // Function to display eligible schemes
    function displayEligibleSchemes(userDetails) {
        const lang = languageSelector.value;
        const eligibleSchemes = schemes.filter(scheme => checkEligibility(userDetails, scheme));

        if (eligibleSchemes.length > 0) {
            eligibleSchemes.forEach(scheme => {
                const translatedScheme = translateScheme(scheme, lang);

                const schemeElement = document.createElement("div");
                schemeElement.classList.add("scheme-item");

                schemeElement.innerHTML = `
                    <h3>${translatedScheme.name}</h3>
                    <p>${translatedScheme.description}</p>
                    <a href="${scheme.registrationLink}" target="_blank"><button>Go to Registration</button></a>
                    <a href="${scheme.instructionsLink}" target="_blank"><button>View Instructions</button></a>
                `;

                schemesListElement.appendChild(schemeElement);
            });
        } else {
            schemesListElement.innerHTML = "<p>No schemes found for your profile.</p>";
        }
    }

    // Listen for language change
    languageSelector.addEventListener("change", function () {
        schemesListElement.innerHTML = "";
        displayEligibleSchemes(userDetails);
    });

    // Display the eligible schemes for the user
    displayEligibleSchemes(userDetails);
});
