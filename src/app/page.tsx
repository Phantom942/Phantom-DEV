import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MouseGlow } from "@/components/MouseGlow";
import { CustomCursor } from "@/components/CustomCursor";
import { Sections } from "@/components/Sections";

export default function Home() {
  return (
    <div className="relative min-h-screen max-w-full overflow-x-hidden bg-[#000000]" id="home">
      <CustomCursor />
      <MouseGlow />
      <Navbar />
      <main role="main">
        <HeroSection />
        <Sections />
      </main>
    </div>
  );
}
