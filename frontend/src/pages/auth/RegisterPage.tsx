import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useRegisterMutation } from "../../hooks/useAuth";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

type RegisterValues = z.infer<typeof schema>;

export default function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerMutation.mutateAsync(values);
      navigate("/", { replace: true });
    } catch {
      toast.error("Unable to create account");
    }
  });

  return (
    <div className="grid min-h-screen place-items-center px-4 py-12">
      <Card className="w-full max-w-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">GigFlow</p>
      <h1 className="mt-3 text-3xl font-semibold" style={{ color: "var(--text)" }}>Create your account</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>New users are created as Sales Users by default for secure onboarding.</p>
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm" style={{ color: "var(--muted)" }}>Name</span>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
              <Input {...register("name")} className="pl-11" placeholder="Full name" />
            </div>
            {errors.name ? <p className="mt-1 text-xs text-rose-300">{errors.name.message}</p> : null}
          </label>
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
              <Input {...register("password")} type="password" className="pl-11" placeholder="Minimum 8 characters" />
            </div>
            {errors.password ? <p className="mt-1 text-xs text-rose-300">{errors.password.message}</p> : null}
          </label>
          <Button className="w-full" type="submit" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-300 hover:text-cyan-200">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
