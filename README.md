# Violet Evergarden Biography & Contact Website

A beautiful, single-page static biography website themed with the visual identity of **Violet Evergarden**. Features deep navy tones, gold accents, floating bokeh particles, and a downloadable typewriter-style contact card rendered directly into a high-DPI PNG.

---

## 🎨 Theme Details
- **Background**: Deep Navy & Indigo with animated floating bokeh light particles.
- **Accents**: Lavender highlights, subtle warm roses, and elegant gold borders.
- **Ornaments**: A custom-designed SVG representation of Violet's gold emerald brooch, vintage letter corner patterns, and an authentic red wax seal stamp.
- **Typography**: Playfair Display (headings) & Lora (body) for a rich, classical European handwritten vibe.

---

## 📂 File Structure
```
├── index.html          # Main HTML structure (SEO, Fonts, Layout, Card)
├── photo.png           # Your profile photo (pre-processed and optimized)
├── css/
│   └── style.css       # Layout, animations, colors, responsive adjustments
├── js/
│   └── main.js         # Bokeh particles, scroll reveals, PNG export engine
└── assets/
    └── brooch.svg      # Violet Evergarden custom gold brooch divider
```

---

## ✏️ How to Edit Your About Me Text
Open `index.html` in any text editor, locate the `<section class="glass-card" id="about-card">` area, and edit or replace the `<p class="about-text">...</p>` tags with your own paragraphs. The system will automatically apply the elegant, drop-cap style to your first paragraph.

---

## 💻 Running Locally
Since this is a fully static site with no complex JavaScript build systems, you can open and run it instantly:
1. Locate `index.html` in your file explorer.
2. Double-click it or drag it into any modern web browser (Chrome, Firefox, Safari, Edge).
3. Alternatively, if you have VS Code, you can use the **Live Server** extension to host it locally.

---

## 🚀 Deploying to GitHub Pages
To publish your biography to the world for free, follow these simple steps:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click **New** to create a new repository.
3. Choose a name:
   - For a custom subdomain (e.g., `https://Joeva712.github.io/`), name your repository exactly: **`Joeva712.github.io`**
   - For a project directory path (e.g., `https://Joeva712.github.io/biography/`), name your repository: **`biography`**
4. Set the repository to **Public**.
5. Leave "Add a README" unchecked, then click **Create repository**.

### Step 2: Upload Files
Using Git in your terminal (or using GitHub's drag-and-drop web uploader):
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial release of Violet Evergarden themed biography"

# Link to your new repository
git remote add origin https://github.com/Joeva712/biography.git

# Rename main branch and push
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. On your GitHub repository page, click the **Settings** tab (gear icon at the top).
2. On the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Under **Branch**, select **`main`** and **`/ (root)`**, then click **Save**.
5. Give it 1–2 minutes. GitHub will compile the page and display your live URL at the top of the page!
