export type ThemeChoice = "light" | "dark" | "system";
export const THEME_KEY = "mars-theme-v1";

export function readTheme(): ThemeChoice {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

export function applyTheme(choice: ThemeChoice, systemDark: boolean) {
  const theme = choice === "system" ? (systemDark ? "dark" : "light") : choice;
  const background = theme === "dark" ? "#141413" : "#ffffff";
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.documentElement.style.backgroundColor = background;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", background);
}
