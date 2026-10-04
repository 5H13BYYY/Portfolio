# Nak — Portfolio

A personal portfolio website for **PHAUT Sovannvatanak**, an AI student and developer based in Phnom Penh, Cambodia. The site introduces me, highlights selected projects and skills, and provides ways to get in touch.

**Built with:** HTML, CSS, and vanilla JavaScript. There is no build step or framework dependency.

## Features

- Responsive layout with a collapsible mobile navigation menu
- Dark and light themes, with the selected theme saved in the browser
- Animated hero text and particle background
- Scroll based section reveals and active navigation state
- Project filters for analytics and machine learning work
- Clickable project screenshots with an enlarged preview
- Contact links and a link to my CV
- Reduced motion support for visitors who prefer less animation

## Projects

- **Power BI Dashboard** — Sales analytics dashboard with interactive slicers, charts, and trend analysis.
- **Excel Dashboard** — Interactive sales dashboard with KPI cards, monthly trends, category breakdowns, performance views, and a geographic profit map.
- **Diabetes Risk Predictor** — R Shiny app that estimates diabetes risk from health metrics using a random forest model.

Project links open the hosted project or app. Some Microsoft projects may ask visitors to sign in, depending on their sharing permissions.

## Run locally

Clone or download this repository, then open `index.html` in a browser. No dependencies need to be installed.

Alternatively, from the repository folder, start a simple local server:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish with GitHub Pages

1. Push these site files to a GitHub repository. Keep `index.html`, `style.css`, `script.js`, and the image assets together in the publishing folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select the branch and the `/ (root)` folder. Save the settings.
4. After GitHub finishes deploying, the site URL will appear in the Pages settings. A project site is usually available at `https://<username>.github.io/<repository>/`.

GitHub's instructions: [Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Repository files

```text
.
├── index.html       # Portfolio content and page structure
├── style.css        # Themes, layout, animation, and responsive styles
├── script.js        # Navigation, theme, typing, filters, and interactions
├── image.png        # Hero photo
├── power_bi.png     # Power BI project screenshot
├── excel.png        # Excel project screenshot
├── r.png            # R Shiny project screenshot
└── favicon.svg      # Browser tab icon
```

## Customize

- Edit the text, project links, and contact details in `index.html`.
- Update colors and layout in `style.css`.
- Change the animated phrases and interactive behavior in `script.js`.
- Replace the image assets with your own, keeping the filenames or updating their references in `index.html`.
