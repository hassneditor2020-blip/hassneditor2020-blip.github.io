# Hassn Editor — GitHub Pages only

**Live domain after DNS migration:** https://hassneditor.com  
**Canonical source:** `site/` (Next.js app, Arabic + English)  
**Published static website:** `docs/`  
**Publishing service:** GitHub Pages via GitHub Actions (`.github/workflows/deploy-pages.yml`)  
**Version:** V5 (2026-11-18 source + static production fallback).

No Netlify connection, API token, deployment, or account is required. The earlier Netlify deployment is not touched by this repository.

## Start a new user GitHub Pages repository

1. Sign into the personal GitHub account `hassneditor2020-blip`.
2. Create a **public** repository exactly named `hassneditor2020-blip.github.io` (GitHub Free requires public repos for Pages).
3. Using GitHub Desktop, clone this empty repository, copy **all contents of this archive** into the repo root, commit and push to `main`. Do not upload this ZIP as one file.
4. In the repository, open **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. Open **Actions → Deploy Hassn Editor to GitHub Pages**; confirm successful publish; run manually if necessary.
6. Check `https://hassneditor2020-blip.github.io` on mobile and desktop, including nested Arabic and English routes, before changing DNS.
7. In **Settings → Pages → Custom domain**, enter `hassneditor.com`, save it, and then update DNS at the domain registrar. Set four A records for `@` to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; set `www` CNAME to `hassneditor2020-blip.github.io`. Remove conflicting old web A/AAAA/CNAME records only when ready to switch. Do not change MX/TXT email records.
8. When the domain resolves to GitHub Pages, enable **Enforce HTTPS** in Settings → Pages, if available.

Important: The static site contains absolute URLs and asset paths for `hassneditor.com`. Using the username.github.io repository makes it load at the root even before DNS changes; a project repo such as `hassn-editor-website` would use a subpath and need additional Next.js base-path handling for previews.

## Future changes by Manus, ChatGPT Work or Codex

- Connect only this GitHub repository. Create a separate branch (`experiment/manus-homepage` for Manus) and PR for any new work.
- Edit `site/` for maintainable changes; avoid editing compiled artifacts in `docs/` as the long-term source.
- Rebuild **without any Netlify service**:

```bash
cd site
npm ci
npm run build:github
cd ..
python scripts/sync-pages.py
```

- Inspect/test the updated `docs/`; commit `site/` and `docs/` to a feature branch; open a PR; merge only when approved. A push modifying `docs/` on `main` runs GitHub Actions and updates the public website.
- A local build requires internet access for npm. The provided `docs/` folder is a ready-to-publish static fallback, so initial hosting does not depend on a fresh build.
- GitHub Pages is **static** hosting: features requiring server-side functions, private APIs, or persistent backend databases must use another backend or be adapted. This portfolio's static HTML/JS pages are intended to work here; verify contact and external integrations after migration.

## Provenance and status

- `site/` comes from `Hassn-Editor-Source-V5-Web-App-Design.zip` (Nov 18 2026).
- `docs/` comes from `Hassn-Editor-Netlify-Production-V5-Web-App-Design.zip`, converted to clean-URL directory pages with `index.html` and `.nojekyll`. The ZIP name describes its historic packaging, **not a Netlify requirement**.
- Previous release metadata states the V5 source and static fallback were assembled while npm registry was unreachable. We did not run a full fresh Next.js build in this migration step. The static bundle should be tested on GitHub Pages before DNS changes.
- Legacy files under `site/` may mention earlier deployment infrastructure; they are not used by the new hosting workflow.
