import { RegisterForm } from "./registerForm";
import { getSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
} 