import { useEffect, useRef, useState } from "react";
import { applyTheme, readTheme, THEME_KEY, type ThemeChoice } from "./theme";

export function ThemeControl() {
  const [choice, setChoice] = useState(readTheme);
  const [open, setOpen] = useState(false);
  const control = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => applyTheme(choice, media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [choice]);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === THEME_KEY || event.key === null) setChoice(readTheme());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !control.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  function selectTheme(next: ThemeChoice) {
    setChoice(next);
    applyTheme(next, window.matchMedia("(prefers-color-scheme: dark)").matches);
    try {
      if (next === "system") localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, next);
    } catch {
      // The control still works for this visit when storage is unavailable.
    }
  }

  return (
    <div className="theme-control" ref={control} onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    }} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button ref={trigger} className="theme-trigger" type="button"
        aria-label={`Change color theme, ${choice} selected`}
        aria-expanded={open} aria-controls="theme-options" onClick={() => setOpen(value => !value)}>
        <svg className="theme-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </svg>
        <svg className="theme-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        </svg>
      </button>
      {open && <fieldset id="theme-options" className="theme-options">
        <legend className="sr-only">Color theme</legend>
        {(["light", "dark", "system"] as const).map(value => (
          <label key={value}>
            <input type="radio" name="theme" value={value} checked={choice === value}
              onChange={() => selectTheme(value)} />
            {value}
          </label>
        ))}
      </fieldset>}
    </div>
  );
}
