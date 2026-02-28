import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { cookies } from "next/headers";

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) return null;

  return { isAuthenticated: true };
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  return (
    <>
      <Navbar isAuthenticated={!!user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}