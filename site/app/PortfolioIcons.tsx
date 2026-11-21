export function ArrowIcon({ down = false }: { down?: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={down ? "M12 4v16m-6-6 6 6 6-6" : "M5 19 19 5M5 5h14v14"} /></svg>;
}

export function PlayIcon() {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M7 4.8a1 1 0 0 1 1.5-.86l12 6.9a1.33 1.33 0 0 1 0 2.32l-12 6.9A1 1 0 0 1 7 19.2Z" /></svg>;
}

export function FullscreenIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5" /></svg>;
}

export function SocialProfileIcon({ name }: { name: string }) {
  const marks: Record<string, React.ReactNode> = {
    Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    YouTube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 8 6 4-6 4z" fill="currentColor" stroke="none" /></>,
    LinkedIn: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7m0-10v.5M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
    Behance: <text x="2" y="17" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="currentColor" stroke="none">Bē</text>,
    Facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1 .3-1 1-1h3V3h-3c-4 0-5 2-5 5v1H7v4h3v8z" fill="currentColor" stroke="none" />,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{marks[name]}</svg>;
}
