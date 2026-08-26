const EMAIL = "cephasmutisya02@gmail.com";
document.getElementById("menu-btn")?.addEventListener("click", () => {
  document.getElementById("mobile-nav")?.classList.toggle("hidden");
});
function isOther(v) {
  const s = (v || "").toLowerCase();
  return s.startsWith("other") || s.includes("not listed") || s.includes("not sure") || s.includes("type it") || s.includes("own guide");
}
function pick(value, other) {
  if (isOther(value)) return other.trim() ? value + " — " + other.trim() : value;
  return value;
}
function val(id) { return document.getElementById(id)?.value?.trim() || ""; }
function compile() {
  const tz = pick(val("timezone"), val("timezoneOther"));
  const calendar = [val("deadlineDate"), val("deadlineTime")].filter(Boolean).join(" ");
  const when = calendar ? calendar + (tz ? " (" + tz + ")" : "") : "—";
  return [
    "Name: " + val("name"),
    "Student email: " + val("fromEmail"),
    "Country: " + pick(val("country"), val("countryOther")),
    "Level: " + val("level"),
    "How I can help: " + val("service"),
    "Work type: " + pick(val("workType"), val("workOther")),
    "Field: " + pick(val("field"), val("fieldOther")),
    "Course / module: " + (val("course") || "—"),
    "Citation style: " + pick(val("citation"), val("citationOther") || ""),
    "Deadline: " + when,
    "Word count: " + (val("words") || "—"),
    "",
    "Brief:",
    val("message"),
    "",
    "Add extra details or attachments in this draft before you send.",
    "",
    "— opened from The Desk at WriteSmart Technologies",
  ].join("\n");
}
function showOther() {
  [["country","countryOther"],["workType","workOther"],["field","fieldOther"],["timezone","timezoneOther"]].forEach(([sel, wrap]) => {
    const el = document.getElementById(sel);
    const box = document.getElementById("wrap-" + wrap);
    if (!el || !box) return;
    box.classList.toggle("hidden", !isOther(el.value));
  });
}
["country","workType","field","timezone"].forEach((id) => document.getElementById(id)?.addEventListener("change", showOther));
showOther();
const form = document.getElementById("brief-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = document.getElementById("brief-error");
    if (!val("name") || !val("fromEmail") || !val("message")) {
      err.textContent = "Name, your email, and a short brief are required.";
      err.classList.remove("hidden");
      return;
    }
    err.classList.add("hidden");
    const subject = "WriteSmart Desk — " + pick(val("workType"), val("workOther")) + " — " + pick(val("country"), val("countryOther"));
    window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(compile());
    const st = document.getElementById("brief-status");
    st.textContent = "If a draft did not open, write to " + EMAIL + " and attach files there.";
    st.classList.remove("hidden");
  });
}
