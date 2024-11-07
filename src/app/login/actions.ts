"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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
    console.log("Validation failed:", result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  console.log("Attempting login for email:", email);

  // Find user in database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log("Found user:", user ? "yes" : "no");

  // Check if user exists and password matches
  const passwordMatch = user ? await bcrypt.compare(password, user.password) : false;
  console.log("Password matches:", passwordMatch);

  if (!user || !passwordMatch) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}