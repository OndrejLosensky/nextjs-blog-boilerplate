"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/login/actions";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form action={loginAction} className="flex flex-col gap-4 min-w-[350px] bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Login</h1>
      <p>  </p>
      <div className="flex flex-col gap-2">
        <input id="email" name="email" placeholder="Email" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      {state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <div className="flex flex-col gap-2">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}
      <SubmitButton />
    </form>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
