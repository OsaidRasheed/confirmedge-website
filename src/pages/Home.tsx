import { Nav } from "@/sections/Nav";
import { Hero } from "@/sections/Hero";
import { TechMarquee } from "@/sections/TechMarquee";
import { Product } from "@/sections/Product";
import { Capabilities } from "@/sections/Capabilities";
import { Process } from "@/sections/Process";
import { Results } from "@/sections/Results";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TechMarquee />
        <Product />
        <Capabilities />
        <Process />
        <Results />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
