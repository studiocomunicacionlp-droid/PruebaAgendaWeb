import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import Booking from "@/components/sections/Booking";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <Navbar />
      <Hero />
      <Benefits />
      <Services />
      <About />
      <Team />
      <Testimonials />
      <Gallery />
      <Booking />
      <Footer />
    </main>
  );
}
