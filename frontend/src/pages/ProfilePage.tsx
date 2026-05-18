import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useAuthStore } from "../store/authStore";

export default function ProfilePage(): JSX.Element {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Card className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Profile</p>
      <h1 className="mt-2 text-3xl font-semibold" style={{ color: "var(--text)" }}>{user?.name}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge tone="info">{user?.role ?? "Unknown role"}</Badge>
        <Badge tone="neutral">{user?.email ?? "No email"}</Badge>
      </div>
      <div className="mt-8 flex gap-3">
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>
    </Card>
  );
}
