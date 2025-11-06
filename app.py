from flask import Flask, render_template, request
import json

app = Flask(__name__)

# Load schemes file
with open("scheme.json", "r", encoding="utf-8") as f:
    schemes = json.load(f)

# Employment → domain mapping
employment_domains = {
    "farmer": ["agriculture", "rural development"],
    "employed": ["employment", "insurance", "pension"],
    "self-employed/entrepreneur": ["msme", "startup", "finance"],
    "unemployed": ["employment", "skill development", "welfare"],
    "wage labourer": ["labour", "social security", "welfare"],
    "retired": ["pension", "senior citizen"],
    "housewife": ["women", "family welfare"],
    "artisan": ["skill", "handicraft"],
    "others": ["general"]
}


def is_eligible(user, scheme):
    e = scheme.get("eligibility", {})
    domain = scheme.get("domain", "").lower()

    # --- Gender ---
    if "gender" in e:
        user_gender = user["gender"].capitalize()
        allowed_genders = [g.capitalize() for g in e["gender"]]
        if user_gender not in allowed_genders:
            return False

    # --- Age ---
    if "min_age" in e and user["age"] < e["min_age"]:
        return False
    if "max_age" in e and user["age"] > e["max_age"]:
        return False

    # --- Area ---
    if "area" in e and user["area"].capitalize() not in e["area"]:
        return False

    # --- Caste ---
    if "caste" in e and user["caste"].upper() not in [c.upper() for c in e["caste"]]:
        return False

    # --- Differently abled ---
    if e.get("differently_abled_required", False) and user["differently_abled"] != "yes":
        return False

    # --- Minority ---
    if e.get("minority_required", False) and user["minority"] != "yes":
        return False

    # --- Student ---
    if e.get("student_required", False) and user["student"] != "yes":
        return False

    # --- Income ---
    if "max_income" in e and user["income"] > e["max_income"]:
        return False

    # --- BPL ---
    if e.get("bpl_required", False) and user["bpl"] != "yes":
        return False

    # --- Employment (for non-students) ---
    if user["student"] == "no" and "employment" in e:
        if user["employment"].lower() not in [emp.lower() for emp in e["employment"]]:
            return False

    # --- Special Handling for Transgender / Other gender ---
    if user["gender"].lower() in ["transgender", "other"]:
        # Only show schemes specifically for transgender or gender-neutral welfare
        if "transgender" not in [g.lower() for g in e.get("gender", [])]:
            if "transgender" not in domain and "welfare" not in domain and "social" not in domain:
                return False

    # --- Student domain logic ---
    if user["student"] == "yes" and user["gender"].lower() not in ["transgender", "other"]:
        allowed_student_domains = ["education", "scholarship", "skill development", "sports"]
        if not any(d in domain for d in allowed_student_domains):
            return False

    # --- Employment-based domain logic ---
    if user["student"] == "no" and user["gender"].lower() not in ["transgender", "other"]:
        emp = user.get("employment", "others").lower()
        allowed_domains = employment_domains.get(emp, ["general"])
        if domain not in [d.lower() for d in allowed_domains]:
            return False

    return True


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/check", methods=["POST"])
def check():
    try:
        # Safely parse integers (handle empty input)
        def safe_int(value, default=0):
            try:
                return int(value)
            except (ValueError, TypeError):
                return default

        user = {
            "gender": request.form.get("gender", "").strip(),
            "age": safe_int(request.form.get("age", 0)),
            "area": request.form.get("area", "").strip(),
            "caste": request.form.get("caste", "").strip(),
            "differently_abled": request.form.get("differently_abled", "no").strip(),
            "minority": request.form.get("minority", "no").strip(),
            "student": request.form.get("student", "no").strip(),
            "employment": request.form.get("employment", "others").strip(),
            "bpl": request.form.get("bpl", "no").strip(),
            "income": safe_int(request.form.get("annual_income", 0))
        }

        eligible = [s for s in schemes if is_eligible(user, s)]
        return render_template("results.html", eligible_schemes=eligible, count=len(eligible))

    except Exception as e:
        print("Error:", e)
        return render_template("results.html", eligible_schemes=[], count=0)



if __name__ == "__main__":
    app.run(debug=True)
