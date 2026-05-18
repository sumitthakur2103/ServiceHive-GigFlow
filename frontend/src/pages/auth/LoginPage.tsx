import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useLoginMutation } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type LoginValues = z.infer<typeof schema>;

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const login = useLoginMutation();
  const token = useAuthStore((state) => state.token);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "admin@gigflow.com", password: "Password123!" }
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login.mutateAsync(values);
      navigate("/", { replace: true });
    } catch {
      toast.error("Unable to sign in");
    }
  });

  useEffect(() => {
    if (token) {
      void navigate("/", { replace: true });
    }
  }, [navigate, token]);

  return (
    <div className="grid min-h-screen place-items-center px-4 py-12">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[32px] border p-8 shadow-soft backdrop-blur" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">GigFlow</p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-6xl" style={{ color: "var(--text)" }}>
            Sell with focus, not noise.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6" style={{ color: "var(--muted)" }}>
            A startup-grade smart leads dashboard with clean workflows, role-based access, advanced filtering, and exportable insights.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              ["Real-time filters", "Search, status, source, and sort combined"],
              ["Role-aware UX", "Admin and sales views stay appropriately scoped"],
              ["Modern stack", "Strict TypeScript, Query, Zustand, Zod, and Tailwind"],
              ["Production ready", "Dockerized, lintable, and deployment friendly"]
            ].map(([title, desc]) => (
              <Card key={title}>
                <h3 className="font-semibold" style={{ color: "var(--text)" }}>{title}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{desc}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="self-center">
          <h2 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>Sign in</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>Use your GigFlow account to access the dashboard.</p>
          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm" style={{ color: "var(--muted)" }}>Email</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <Input {...register("email")} className="pl-11" placeholder="you@company.com" />
              </div>
              {errors.email ? <p className="mt-1 text-xs text-rose-300">{errors.email.message}</p> : null}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm" style={{ color: "var(--muted)" }}>Password</span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <Input {...register("password")} type="password" className="pl-11" placeholder="Enter your password" />
              </div>
              {errors.password ? <p className="mt-1 text-xs text-rose-300">{errors.password.message}</p> : null}
            </label>
            <Button className="w-full" type="submit" disabled={login.isPending}>
              {login.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
            No account yet?{" "}
            <Link to="/register" className="text-cyan-300 hover:text-cyan-200">
              Create one
            </Link>
          </p>
          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-100">
            Demo admin: <span className="font-semibold">admin@gigflow.com</span> / <span className="font-semibold">Password123!</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
