# Govt._Scheme_Eligibility_Assistant
🚀 Project Overview
The Government Schemes Eligibility Assistant is a web-based platform that helps users determine their eligibility for various Indian government schemes based on their details such as age, occupation, and income.

This system provides:
✔️ A user-friendly eligibility checker for government schemes
✔️ Multilingual support (English, Hindi, Telugu, Tamil)
✔️ Real-time scheme links for official application
✔️ Step-by-step application instructions
✔️ Dynamic and interactive UI with animations

📂 Project Structure
pgsql
Copy
Edit
/govt-schemes-assistant
│── index.html               (Home Page)
│── schemes.html             (Schemes List Page)
│── eligibility.html         (User Details Input Page)
│── result.html              (Eligibility Result Page)
│── instructions.html        (How to Apply Instructions Page)
│── translations.js          (Multilingual Support)
│── styles.css               (Styling & Effects)
│── scripts.js               (Main Logic for Eligibility Check)
│── package.json             (For Node.js setup, if needed)
│── /assets                  (Images, Icons)
│── /scripts
│   │── language.js          (Language Handling Script)
│   │── formHandler.js       (Handles form submissions)
│── /backend                 (For future API handling)
🎯 Features Implemented
✅ 1. User Journey
1️⃣ Home Page ➝ "Check Eligibility" button redirects to Schemes Page
2️⃣ Schemes Page ➝ Users select a scheme and click "Check My Eligibility"
3️⃣ User Details Page ➝ Users enter their details (name, age, occupation, etc.)
4️⃣ Eligibility Result Page ➝ System checks eligibility and provides options:

🟢 Eligible ➝ "Apply Now" button (redirects to official website)
🔵 How to Apply button (step-by-step guide)
🔴 Not Eligible ➝ Displays reason for ineligibility
✅ 2. Government Schemes Covered
Scheme	Eligible Users	Age Range	Annual Income	Official Website
PM-Kisan	Farmers	18-60	≤ ₹6,00,000	pmkisan.gov.in
Pradhan Mantri Awas Yojana (PMAY)	Low-income families, Unemployed	25-60	≤ ₹8,00,000	pmaymis.gov.in
MUDRA Yojana	Self-employed, Entrepreneurs	18-50	₹10,000-₹1,00,000	mudra.org.in
PMKVY (Skill India)	Students, Unemployed	18-30	₹10,000-₹1,00,000	skillindiamission.in
Atal Pension Yojana (APY)	Employed, Self-employed	28-100	₹10,000-₹1,00,000	npscra.nsdl.co.in
PM Jan Dhan Yojana (PMJDY)	All citizens	Any	No limit	pmjdy.gov.in
Stand-up India	Women, SC/ST Entrepreneurs	18-50	₹10,000-₹1,00,000	standupmitra.in
National Pension System (NPS)	Salaried individuals, Self-employed	18-60	No limit	npscra.nsdl.co.in
NAPS (Apprenticeship Scheme)	Students, Unemployed	16-40	No limit	apprenticeshipindia.gov.in
PM-SYM (Pension Scheme for Workers)	Unorganized sector workers	18-40	≤ ₹15,000	maandhan.in
🔧 Installation & Setup
✅ 1. Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-username/govt-schemes-assistant.git
cd govt-schemes-assistant
✅ 2. Run Locally
You can run the project directly in a browser. If you want to use a local server:

sh
Copy
Edit
npx serve
or

sh
python -m http.server 8000
Then open http://localhost:8000/ in your browser.

🎨 User Interface
Modern UI with CSS animations & transitions.
Buttons with hover effects and dynamic color changes.
Multilingual dropdown for switching between languages.
🌍 Multilingual Support
The project supports four languages:

🇬🇧 English
🇮🇳 Hindi (हिन्दी)
🇮🇳 Telugu (తెలుగు)
🇮🇳 Tamil (தமிழ்)
Users can select a language from the dropdown, and all text on the website changes dynamically.

🛠 Technologies Used
HTML, CSS, JavaScript - Frontend Development
JSON Storage - Local scheme data
Multilingual Support - JavaScript translations
👨‍💻 Contributing
Fork the Repository
Create a Feature Branch
sh
Copy
Edit
git checkout -b feature-branch
Commit Changes
sh
Copy
Edit
git commit -m "Added new feature"
Push to GitHub & Submit PR
sh
Copy
Edit
git push origin feature-branch
🏆 Future Enhancements
✅ Add Database support for storing user data
✅ Introduce AI-powered scheme recommendations
✅ Enable OTP-based verification for users
✅ Build Mobile App version of this project

📜 License
This project is open-source under the MIT License.

📞 Contact
📧 Email: girinadhpedapudi3@gmail.com
🌐 GitHub: @Girinadh007
🚀 LinkedIn: @girinadhpedapudi
