import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MouseGlow } from "@/components/MouseGlow";
import { CustomCursor } from "@/components/CustomCursor";
import { Sections } from "@/components/Sections";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="relative min-h-screen min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#000000]"
      id="home"
    >
      <CustomCursor />
      <MouseGlow />
      <Navbar />
      <main role="main" className="w-full max-w-[100vw] overflow-x-hidden">
        <HeroSection />
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
