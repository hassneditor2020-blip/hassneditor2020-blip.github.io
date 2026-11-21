# Hassn Editor — GitHub Pages

**Website:** https://hassneditor.com  
**GitHub account:** [hassneditor2020-blip](https://github.com/hassneditor2020-blip)  
**Deployment:** GitHub Pages only — no Netlify.

## Source and deployment structure

The complete website release is provided separately as **Hassn-Editor-GitHub-Pages-V5-hassneditor2020-blip.zip**, prepared from Hassn Editor V5 (2026-11-18).

After extracting the ZIP, the repository must contain the following folders at the **root**:

- `site/` — editable source for the portfolio website (Next.js; Arabic and English)
- `docs/` — prebuilt static website for GitHub Pages
- `scripts/` — scripts for synchronizing output
- `.github/workflows/deploy-pages.yml` — deployment workflow
- `README.md` — project instructions

**Important:** Do not upload the ZIP as a single file. Extract it locally and commit its *contents* via GitHub Desktop; the archive contains over 1,800 files including videos and images.

## First upload

1. Clone this repository in GitHub Desktop.
2. Extract the V5 ZIP to a temporary folder.
3. Copy all contents of the extracted ZIP to the repository root (including hidden `.github` directory), overwriting this introductory README when prompted.
4. Commit all added files and push to `main`.
5. In GitHub → Settings → Pages, set Build and deployment Source to **GitHub Actions**.
6. Verify that `https://hassneditor2020-blip.github.io` works before switching domain DNS.

## Domain migration

Keep `hassneditor.com` configured inside `docs/CNAME` (included in the release). Once the GitHub Pages site is verified, set the custom domain in GitHub Pages, then change only web-related DNS records at the domain registrar. Do **not** alter MX or other email records. Do not switch DNS until Pages serves and validates the new release.

## Future editing: Manus / ChatGPT Work

Use **feature branches and pull requests** for every change. For the homepage redesign create `experiment/manus-homepage`. Do not edit the published website directly. The canonical editable source is `site/`, while `docs/` is the deployable static build. After a source change, rebuild and sync `docs/` before merging.

## Current status

Repository connection verified. Full static site and source **not uploaded yet**. This README is a handover marker, not an announcement of deployment.
