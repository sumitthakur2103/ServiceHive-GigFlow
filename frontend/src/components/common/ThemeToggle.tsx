import { MoonStar, SunMedium } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export const ThemeToggle = (): JSX.Element => {
  const theme = useAuthStore((state) => state.theme);
  const toggleTheme = useAuthStore((state) => state.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--text)" }}
    >
      {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};
