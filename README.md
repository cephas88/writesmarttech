# WriteSmartTechnologies Website

A professional website showcasing Writedom Bidding Bot and WritersHub Bidding Bot Chrome extensions.

## Overview

This website is designed to present and distribute Chrome extension bots for freelance writers. It features a modern, responsive design with detailed installation instructions for the extensions.

## Contents

- `index.html` - Main HTML structure
- `styles.css` - CSS styling
- `script.js` - JavaScript functionality
- `images/` - Directory containing website images (needs to be created)
- `downloads/` - Directory for extension ZIP files (needs to be created)

## Setup Instructions

1. **Create required directories:**
   ```
   mkdir -p images downloads
   ```

2. **Add images:**
   You'll need to add the following images to the `images` folder:
   - `hero-bg.jpg` - Background image for the hero section
   - `extract.jpg` - Screenshot showing how to extract ZIP files
   - `chrome-extensions.jpg` - Screenshot of Chrome extensions page
   - `developer-mode.jpg` - Screenshot showing developer mode toggle
   - `load-unpacked.jpg` - Screenshot showing load unpacked button
   - `pin-extension.jpg` - Screenshot showing how to pin extensions

3. **Prepare extension ZIP files:**
   - Create ZIP files of your Chrome extensions
   - Place them in the `downloads` folder:
     - `writedom-bidding-bot.zip`
     - `writershub-bidding-bot.zip`

## Running Locally

You can run this website locally using any web server. For a simple option:

1. Using Python:
   ```
   python -m http.server
   ```
   Then open `http://localhost:8000` in your browser.

2. Using Node.js (with http-server):
   ```
   npx http-server
   ```
   Then open `http://localhost:8080` in your browser.

## Deployment

To deploy this website to a hosting service:

1. **Shared Hosting:**
   - Upload all files to your web hosting via FTP or their control panel
   - Ensure file permissions are set correctly

2. **GitHub Pages:**
   - Create a GitHub repository
   - Push your website files to the repository
   - Enable GitHub Pages in the repository settings

3. **Netlify/Vercel:**
   - Connect your GitHub repository to Netlify or Vercel
   - Configure build settings if needed
   - Deploy automatically from your Git repository

## Customization

- Update the website content in `index.html`
- Modify colors and styling in `styles.css`
- Add more functionality in `script.js`
- Replace placeholder images with your own screenshots and images

## Support

For any questions or assistance with this website, please contact support@writesmarttechnologies.com (replace with your actual contact email).

## License

All rights reserved. This website and its content are proprietary and may not be reproduced without permission. 