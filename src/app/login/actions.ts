"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "admin", 
  password: "admin",
};

const loginSchema = z.object({
  email: z.string({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .trim(),
});

type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export async function login(prevState: LoginState | undefined, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}