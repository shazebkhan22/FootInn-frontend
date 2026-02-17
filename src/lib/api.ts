import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL: string = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:5001";

export async function getDataHelper<T>(endpoint: string): Promise<T> {
  const cookieStore = await cookies();
  const token: string | undefined = cookieStore.get("session_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response: Response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    redirect("/login");
  }

  if (response.status === 403) {
    redirect("/unauthorized");
  }

  const data: unknown = await response.json();

  if (!response.ok) {
    const errorMessage =
      typeof data === "object" && data !== null && "error" in data
        ? String((data as { error?: string }).error)
        : "Backend request failed";

    throw new Error(errorMessage);
  }

  return data as T;
}
