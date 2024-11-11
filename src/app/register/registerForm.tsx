"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { register } from "./actions";
import Link from "next/link";

export function RegisterForm() {
  const [state, registerAction] = useActionState(register, undefined);

  return (
    <form action={registerAction} className="flex flex-col gap-4 min-w-[350px] bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Create Account</h1>

      {state?.errors?._form && (
        <div className="p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg">
          {state.errors._form}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <input 
          id="name"
          name="name"
          placeholder="Full Name"
          className="p-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
        />
        {state?.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input 
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
        />
        {state?.errors?.password && (
          <p className="text-red-500 text-sm">{state.errors.password}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="p-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
        />
        {state?.errors?.confirmPassword && (
          <p className="text-red-500 text-sm">{state.errors.confirmPassword}</p>
        )}
      </div>

      <SubmitButton />

      <p className="text-sm text-gray-600 dark:text-slate-400 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      disabled={pending} 
      type="submit" 
      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
    >
      {pending ? "Creating account..." : "Create Account"}
    </button>
  );
} 