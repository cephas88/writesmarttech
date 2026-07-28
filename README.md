WriteSmartTechnologies

Marketing and distribution site for two Chrome extensions (Writedom Bot and WritersHub Bot). Built with vanilla HTML, CSS, and JavaScript, with a Firebase/Firestore backend powering a live, genuine customer-review system.

🔗 Live: https://writesmarttech.com/

Features
- Responsive single-page site with product details, installation guide, and FAQ
- **Genuine reviews only** — reviews load live from Firestore as real customers submit them, update in real time via `onSnapshot`, and show an empty state until the first real review arrives. No seeded or template reviews.
- Aggregate ratings computed from real reviews
- SEO-ready: sitemap, robots.txt, and valid JSON-LD structured data

Tech Stack
HTML5 · CSS3 · JavaScript (ES6+) · Firebase / Firestore · Netlify

Reviews Setup (Firestore)
Reviews require a Firebase project. Config lives in `index.html` (`window.WRITE_SMART_FIREBASE_CONFIG`).
1. Create a Firebase project and enable Firestore.
2. Deploy the security rules: `firebase deploy --only firestore:rules`
3. Reviews are stored in the `reviews` collection; the rules validate name, text, platform, and rating on submit.


Author
Cephas Nyamai Mutisya — Software Developer
Portfolio: https://cephasmutisyaportfolio.netlify.app/ · GitHub: https://github.com/cephas88
