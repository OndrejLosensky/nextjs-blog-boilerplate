"use server";

import { getSession } from "@/lib/sessions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";

type ActionResponse = {
  success?: boolean;
  error?: string;
};

async function checkAdminPermission() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
}

export async function createUser(formData: FormData): Promise<ActionResponse> {
  await checkAdminPermission();

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as "ADMIN" | "USER";
  const password = formData.get("password") as string;

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      name,
      role,
      password: hashedPassword,
    },
  });

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function updateUser(formData: FormData): Promise<ActionResponse> {
  await checkAdminPermission();

  const userId = formData.get("id") as string;
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as "ADMIN" | "USER";

  await prisma.user.update({
    where: { id: userId },
    data: {
      email,
      name,
      role,
    },
  });

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function deleteUser(formData: FormData): Promise<ActionResponse> {
  await checkAdminPermission();

  const userId = formData.get("id") as string;

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/dashboard/users");
  return { success: true };
}
