import { LoginForm } from "@/components/auth/login-form";
import { BaseCard } from "@/components/cards/base-card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <BaseCard className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome back to PropertyFlow</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Sign in to manage your properties
          </p>
        </div>
        <LoginForm />
      </BaseCard>
    </div>
  );
} 