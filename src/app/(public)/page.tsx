import Image from "next/image";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import InfiniteMovingCardsDemo from "@/components/infinite-moving-cards-demo";
export default function Home() {
  return (
    <section className=" min-h-screen ">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[radial-gradient(ellipse_at_top,_#ccfbf1,_#14b8a6,_#0f766e)] py-20 sm:py-24 md:py-28 min-h-[calc(100vh_-_1.5rem)] flex items-center mx-3 sm:mx-5">
        <Container>
          <div className="relative text-center space-y-8">
            <Image
              src="/logo.svg"
              alt=""
              width={30}
              height={30}
              className="pointer-events-none absolute -left-24 top-10 w-24 sm:w-32 md:w-32 rotate-[-15deg] hidden sm:block animate-float"
            />

            <Image
              src="/logo.svg"
              alt=""
              width={30}
              height={30}
              className="pointer-events-none absolute -right-16 bottom-10 w-24 sm:w-32 md:w-32 rotate-[32deg] hidden sm:block animate-float-delayed"
            />

            <h1 className="relative z-10 mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground font-semibold tracking-tight max-w-3xl">
              Secure Your Game Slot Before It’s Gone{" "}
            </h1>

            <p className="relative z-10 mx-auto max-w-2xl sm:max-w-3xl text-base sm:text-lg md:text-xl text-accent-foreground opacity-90">
              Find available slots in real time, choose your preferred sport and
              timing, and confirm your booking instantly with secure online
              payment — all in just a few clicks.
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto">
                Book Now
              </Button>

              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <InfiniteMovingCardsDemo />
    </section>
  );
}
