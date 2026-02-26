
import Footer from "@/components/footer";
import Navbar1 from "@/components/navbar1";
import { cookies } from "next/headers";

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) return null;

  return { isAuthenticated: true };
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  return (
    <html lang="en">
      <body>
        <Navbar1 isAuthenticated={!!user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}