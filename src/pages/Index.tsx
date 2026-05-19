import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Offers from "@/components/Offers";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="AL-SHA SHAWARMA | Best Shawarma in Hyderabad"
        description="Fresh, juicy chicken shawarma, wraps, burgers, broasted & more in Hyderabad. Order via WhatsApp, phone or Swiggy from AL-SHA SHAWARMA."
        path="/"
      />
      <Navbar />
      <Hero />
      <Menu />
      <Offers />
      <Gallery />
      <WhyChooseUs />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
