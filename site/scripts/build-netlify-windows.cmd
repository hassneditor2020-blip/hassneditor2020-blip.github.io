@echo off
setlocal
cd /d "%~dp0.."
where node >nul 2>&1 || (echo Node.js 22.13+ is required. & exit /b 1)
where npm >nul 2>&1 || (echo npm is required. & exit /b 1)
where py >nul 2>&1 || (echo Python 3 with the Windows py launcher is required. & exit /b 1)
node -e "const [a,b]=process.versions.node.split('.').map(Number);if(a<22||(a===22&&b<13))process.exit(1)" || (echo Node.js 22.13+ is required. & exit /b 1)
call npm ci || exit /b 1
call npm run build:netlify || exit /b 1
py -3 scripts/package-netlify.py "../Hassn-Editor-Netlify-Production-V4.zip" || exit /b 1
py -3 scripts/audit-netlify.py "../Hassn-Editor-Netlify-Production-V4.zip" --pages 114 || exit /b 1
echo Build, packaging and static audit complete. Test the export before deploying.
echo Preview: py -3 scripts/serve-netlify.py
endlocal
