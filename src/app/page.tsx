import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import TrendingSection from "@/components/TrendingSection";
import NikeFootballSection from "@/components/NikeFootballSection";
import ShopClassicsSection from "@/components/ShopClassicsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductShowcase />
      <TrendingSection />
      <NikeFootballSection />
      <ShopClassicsSection />
      <Footer />
    </main>
  );
}
