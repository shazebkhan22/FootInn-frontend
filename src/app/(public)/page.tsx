import { LogoutButton } from "@/components/ui/logoutButton";
export default function Home() {
  return (
    <section className="font-sans tracking-tight bg-[radial-gradient(800px_circle_at_bottom,_#f5f5f5,_#6ee7b7,_#34d399)] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <LogoutButton/>
    </section>
  );
}
