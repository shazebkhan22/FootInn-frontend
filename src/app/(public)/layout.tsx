import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getAuthUser } from "@/actions/auth";

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