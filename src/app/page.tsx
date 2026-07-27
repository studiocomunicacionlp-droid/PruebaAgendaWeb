import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InstagramFloat from "@/components/ui/InstagramFloat";
import Hero from "@/components/sections/01-Hero";
import TrustedBrands from "@/components/sections/01a-TrustedBrands";
import ProblemPointA from "@/components/sections/02-ProblemPointA";
import WhyNotWorked from "@/components/sections/03-WhyNotWorked";
import PointB from "@/components/sections/04-PointB";
import Method from "@/components/sections/05-Method";
import Results from "@/components/sections/06-Results";
import Program from "@/components/sections/07-Program";
import Bonus from "@/components/sections/08-Bonus";
import SocialProof from "@/components/sections/09-SocialProof";
import About from "@/components/sections/10-About";
import GuaranteeUrgency from "@/components/sections/11-GuaranteeUrgency";
import FinalCTA from "@/components/sections/12-FinalCTA";
import OfferSummary from "@/components/sections/13-OfferSummary";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <TrustedBrands />
      <ProblemPointA />
      <WhyNotWorked />
      <PointB />
      <Method />
      <Results />
      <Program />
      <Bonus />
      <SocialProof />
      <About />
      <GuaranteeUrgency />
      <FinalCTA />
      <OfferSummary />
      <Footer />
      <InstagramFloat />
    </main>
  );
}
