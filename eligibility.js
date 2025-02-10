const schemes = [
    {
        name: "Pradhan Mantri Jan Dhan Yojana",
        ageMin: 18,
        ageMax: 60,
        occupation: "Unemployed",
        incomeMax: 300000,
        registrationLink: "https://www.pmjdy.gov.in/",
        instructionsLink: "https://www.pmjdy.gov.in/content/instructions"
    },
    {
        name: "PM Kisan Samman Nidhi",
        ageMin: 18,
        ageMax: 75,
        occupation: "Farmer",
        incomeMax: 250000,
        registrationLink: "https://pmkisan.gov.in/",
        instructionsLink: "https://pmkisan.gov.in/Instructions.aspx"
    },
    {
        name: "Pradhan Mantri Awas Yojana",
        ageMin: 21,
        ageMax: 55,
        occupation: "Household",
        incomeMax: 300000,
        registrationLink: "https://pmaymis.gov.in/",
        instructionsLink: "https://pmaymis.gov.in/PMAYHome.aspx"
    },
    {
        name: "Ayushman Bharat Yojana",
        ageMin: 18,
        ageMax: 65,
        occupation: "General",
        incomeMax: 500000,
        registrationLink: "https://pmjay.gov.in/",
        instructionsLink: "https://pmjay.gov.in/About/About-PMJAY"
    },
    {
        name: "Atal Pension Yojana",
        ageMin: 18,
        ageMax: 40,
        occupation: "Self-employed",
        incomeMax: 300000,
        registrationLink: "https://www.npscra.nsdl.co.in/atal-pension-yojana.html",
        instructionsLink: "https://www.npscra.nsdl.co.in/atal-pension-yojana-instructions.html"
    }
];

// Function to check eligibility based on user details
function checkEligibility(userDetails) {
    const eligibleSchemes = schemes.filter(scheme => {
        return userDetails.age >= scheme.ageMin &&
            userDetails.age <= scheme.ageMax &&
            userDetails.occupation.toLowerCase() === scheme.occupation.toLowerCase() &&
            userDetails.income <= scheme.incomeMax;
    });

    return eligibleSchemes;
}

// Function to display the results on the eligibility-result.html page
function displayEligibilityResults(userDetails) {
    const eligibleSchemes = checkEligibility(userDetails);
    const schemesList = document.getElementById("eligible-schemes-list");
    const eligibilityMessage = document.getElementById("eligibility-message");

    if (eligibleSchemes.length > 0) {
        eligibilityMessage.textContent = "You are eligible for the following schemes:";

        eligibleSchemes.forEach(scheme => {
            const listItem = document.createElement("li");
            listItem.textContent = scheme.name;

            // Create the "Go to Registration" button
            const registrationButton = document.createElement("button");
            registrationButton.classList.add("btn");
            registrationButton.textContent = "Go to Registration";
            registrationButton.onclick = () => window.open(scheme.registrationLink, "_blank");

            // Create the "View Instructions" button
            const instructionsButton = document.createElement("button");
            instructionsButton.classList.add("btn");
            instructionsButton.textContent = "View Instructions";
            instructionsButton.onclick = () => window.open(scheme.instructionsLink, "_blank");

            listItem.appendChild(registrationButton);
            listItem.appendChild(instructionsButton);
            schemesList.appendChild(listItem);
        });
    } else {
        eligibilityMessage.textContent = "Sorry, you are not eligible for any schemes based on your details.";
    }
}

// Form submission logic to collect user details and navigate to results page
document.getElementById("eligibility-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const userDetails = {
        age: parseInt(document.getElementById("age").value),
        occupation: document.getElementById("occupation").value.trim(),
        income: parseInt(document.getElementById("income").value),
    };

    // Store user details to be used in eligibility-result.html page
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Redirect to eligibility results page
    window.location.href = "eligibility-result.html";
});
