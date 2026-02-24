import Footer from "@/components/footer";
import Navbar1 from "@/components/navbar1";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar1 />

        <main>{children}</main>

       <Footer />
      </body>
    </html>
  );
}
