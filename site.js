const EMAIL = "cephasmutisya02@gmail.com";
document.getElementById("menu-btn")?.addEventListener("click", () => {
  const nav = document.getElementById("mobile-nav");
  if (!nav) return;
  nav.classList.toggle("hidden");
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
  const when = [calendar ? calendar + (tz ? " (" + tz + ")" : "") : "", val("deadlineNote") ? "as typed: " + val("deadlineNote") : ""].filter(Boolean).join(" · ") || "—";
  return [
    "Name: " + val("name"),
    "Student email: " + val("fromEmail"),
    "Country: " + pick(val("country"), val("countryOther")),
    "Level: " + val("level"),
    "How I can help: " + val("service"),
    "Work type: " + pick(val("workType"), val("workOther")),
    "Field: " + pick(val("field"), val("fieldOther")),
    "Course / module: " + (val("course") || "—"),
    "Citation style: " + pick(val("citation"), val("citationOther")),
    "Deadline: " + when,
    "Word count: " + (val("words") || "—"),
    "",
    "Brief:",
    val("message"),
    "",
    "— sent from The Desk at WriteSmart Technologies",
  ].join("\n");
}
function subjectLine() {
  return "WriteSmart Desk — " + pick(val("workType"), val("workOther")) + " — " + pick(val("country"), val("countryOther"));
}
function mailto(attach) {
  const extra = attach ? "\n\nI will attach files in this email (rubric, draft, guidelines, or notes). The website cannot hold files — attaching happens here in mail." : "";
  return "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subjectLine()) + "&body=" + encodeURIComponent(compile() + extra);
}
function showOther() {
  [["country","countryOther"],["workType","workOther"],["field","fieldOther"],["citation","citationOther"],["timezone","timezoneOther"]].forEach(([sel, wrap]) => {
    const el = document.getElementById(sel);
    const box = document.getElementById("wrap-" + wrap);
    if (!el || !box) return;
    box.classList.toggle("hidden", !isOther(el.value));
  });
}
["country","workType","field","citation","timezone"].forEach((id) => {
  document.getElementById(id)?.addEventListener("change", showOther);
});
showOther();
const form = document.getElementById("brief-form");
if (form) {
  function validate() {
    const err = document.getElementById("brief-error");
    if (!val("name") || !val("fromEmail") || !val("message")) {
      err.textContent = "Name, your email, and a short brief are required.";
      err.classList.remove("hidden");
      return false;
    }
    err.classList.add("hidden");
    return true;
  }
  function openMail(href) {
    const packet = document.getElementById("packet");
    const wrap = document.getElementById("wrap-packet");
    const status = document.getElementById("brief-status");
    packet.value = "To: " + EMAIL + "\n\n" + compile();
    wrap.classList.remove("hidden");
    status.textContent = "If your mail app did not open, copy the brief or write to " + EMAIL + ". Attach files after it opens.";
    status.classList.remove("hidden");
    window.location.href = href;
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    openMail(mailto(false));
  });
  document.getElementById("attach-btn")?.addEventListener("click", () => {
    if (!validate()) return;
    openMail(mailto(true));
  });
  document.getElementById("copy-btn")?.addEventListener("click", async () => {
    const text = "To: " + EMAIL + "\n\n" + compile();
    const packet = document.getElementById("packet");
    const wrap = document.getElementById("wrap-packet");
    packet.value = text;
    wrap.classList.remove("hidden");
    try {
      await navigator.clipboard.writeText(text);
      document.getElementById("copy-btn").textContent = "Copied";
      setTimeout(() => { document.getElementById("copy-btn").textContent = "Copy brief"; }, 2000);
    } catch {
      document.getElementById("brief-error").textContent = "Clipboard is blocked here. Select the prepared message below and paste it into email.";
      document.getElementById("brief-error").classList.remove("hidden");
    }
  });
}
