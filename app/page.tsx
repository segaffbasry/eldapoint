import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import { Collaborate } from "@/components/home/Collaborate";
import { Explore } from "@/components/home/Explore";
import { Footer } from "@/components/home/Footer";
import { Greener } from "@/components/home/Greener";
import { Group } from "@/components/home/Group";
import { Hero } from "@/components/home/Hero";
import { Projects } from "@/components/home/Projects";
import { Range } from "@/components/home/Range";

/* The single route. Seven chapters and the footer; see README for the order and why. */
export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Group />
        <Explore />
        <Range />
        <Projects />
        <Greener />
        <Collaborate />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
