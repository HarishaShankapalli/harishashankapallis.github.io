Task2 – Purple Elegance Website

This project is a static website built with Gulp, Nunjucks, and GitHub Pages.
It includes a Home Page, About Page, and Contact Page, styled with a purple elegant theme.

📌 Features

Home Page – Hero section, features, and call-to-action buttons.

About Page – Brief personal/professional introduction.

Contact Page – Stylish form with name, email, subject, and message fields + contact info box.

Reusable Templates – Header, footer, and layout handled via Nunjucks.

Optimized Assets – Minified HTML, CSS, JS, and images.

Live Reload – BrowserSync for instant preview while developing.

Deploy Ready – Output generated in docs/ folder for GitHub Pages.

📂 Project Structure
src/
 ├─ assets/          # CSS, JS, images, static files
 ├─ data/            # JSON data (site.json)
 └─ pages/           # Nunjucks pages
     ├─ index.njk
     ├─ about.njk
     ├─ contact.njk
     └─ templates/   # Layout & partials
         ├─ layout.njk
         └─ partials/
             ├─ header.njk
             └─ footer.njk

docs/                # Production build (for GitHub Pages)
gulpfile.js          # Gulp tasks
package.json         # Project dependencies
README.md            # Project info

⚙️ Installation & Setup

Clone this repository:

git clone <your-repo-url>
cd task2


Install dependencies:

npm install


Start development server:

npm start


Runs the site locally at 👉 http://localhost:3000

Build for production:

npm run build


Outputs compiled site into docs/.

🌐 Deployment

This project is configured for GitHub Pages.
Just push your docs/ folder to the main branch and enable GitHub Pages in repo settings.

🎨 Theme

Primary Color: Purple (#6a1b9a, #8e24aa)

Typography: Clean sans-serif

Design: Minimal, modern, elegant

📧 Contact

If you’d like to connect:

Email: example@email.com

Phone: +91 98765 43210