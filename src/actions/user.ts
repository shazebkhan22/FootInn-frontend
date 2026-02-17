"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001";

type UpdateProfileResult = {
  success?: boolean;
  error?: string;
};

export async function updateProfileAction(
  formData: FormData
): Promise<UpdateProfileResult> {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;

  if (!name && !email) {
    return { error: "At least one field is required." };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
      cache: "no-store",
    });

    const data = await res.json();

    if (res.status === 401) redirect("/login");
    if (res.status === 403) redirect("/unauthorized");

    if (!res.ok) {
      return { error: data?.error ?? "Profile update failed" };
    }

    return { success: true };
  } catch {
    return { error: "Server connection failed." };
  }
}

type ChangePasswordResult = {
  success?: boolean;
  error?: string;
};

export async function changePasswordAction(
  formData: FormData
): Promise<ChangePasswordResult> {
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmNewPassword = formData.get("confirmNewPassword") as string;

  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return { error: "All password fields are required." };
  }

  if (newPassword !== confirmNewPassword) {
    return { error: "New passwords do not match." };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const res = await fetch(`${BASE_URL}/users/me/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        confirmNewPassword,
      }),
      cache: "no-store",
    });

    const data = await res.json();

    if (res.status === 401) redirect("/login");
    if (res.status === 403) redirect("/unauthorized");

    if (!res.ok) {
      return { error: data?.error ?? "Password update failed" };
    }

    return { success: true };
  } catch {
    return { error: "Server connection failed." };
  }
}
