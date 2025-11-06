from flask import Flask, render_template, request
import json

app = Flask(__name__)

# Load schemes
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


def safe_int(value, default=0):
    """Safely convert a value to int or return default."""
    try:
        return int(value)
    except (ValueError, TypeError):
        return default


def is_eligible(user, scheme):
    e = scheme.get("eligibility", {})
    domain = scheme.get("domain", "").lower()

    # Gender
    if "gender" in e and user["gender"].capitalize() not in e["gender"]:
        return False

    # --- If transgender (Other) ---
    if user["gender"].lower() == "other":
        # Only filter by age, area, differently_abled for 'Other'
        if "min_age" in e and user["age"] < e["min_age"]:
            return False
        if "max_age" in e and user["age"] > e["max_age"]:
            return False
        if "area" in e and user["area"].capitalize() not in e["area"]:
            return False
        if e.get("differently_abled_required", False) and user["differently_abled"] != "yes":
            return False
        return True  # Show all matching transgender schemes

    # --- Generic filters for all other users ---
    if "min_age" in e and user["age"] < e["min_age"]:
        return False
    if "max_age" in e and user["age"] > e["max_age"]:
        return False

    if "area" in e and user["area"].capitalize() not in e["area"]:
        return False

    if "caste" in e and user["caste"].upper() not in [c.upper() for c in e["caste"]]:
        return False

    if e.get("differently_abled_required", False) and user["differently_abled"] != "yes":
        return False

    if e.get("minority_required", False) and user["minority"] != "yes":
        return False

    if "max_income" in e and user["income"] > e["max_income"]:
        return False

    if e.get("bpl_required", False) and user["bpl"] != "yes":
        return False

    # Student filter
    if e.get("student_required", False) and user["student"] != "yes":
        return False

    # --- Student domain logic ---
    if user["student"] == "yes":
        student_domains = ["education", "scholarship", "skill", "sports"]
        if any(d in domain for d in student_domains):
            return True
        return False

    # --- Employment-based domain logic ---
    emp = user.get("employment", "others").lower()
    allowed_domains = employment_domains.get(emp, ["general"])

    # Match if the scheme domain contains ANY allowed domain keyword
    if any(d in domain for d in allowed_domains):
        return True

    # If no domain info, allow general schemes
    if not domain.strip():
        return True

    return False


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/check", methods=["POST"])
def check():
    try:
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

        # Always show something
        if not eligible:
            print("⚠️ No eligible schemes found for user:", user)

        return render_template("results.html", eligible_schemes=eligible, count=len(eligible))

    except Exception as e:
        print("❌ Error:", e)
        return render_template("results.html", eligible_schemes=[], count=0)


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

