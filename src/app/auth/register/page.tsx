import { RegisterForm } from "@/components/auth/register-form";
import { BaseCard } from "@/components/cards/base-card";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <BaseCard className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Join PropertyFlow</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Create your account to get started
          </p>
        </div>
        <RegisterForm />
      </BaseCard>
    </div>
  );
} 