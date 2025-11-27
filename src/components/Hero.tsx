import { Button } from "@/components/ui/button";
import { Award, Leaf, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 via-accent/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Best Shawarma <br />
            <span className="text-gradient">in Town!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Fresh • Juicy • Loaded with Flavour — <br className="hidden md:block" />
            Taste the Difference!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground text-lg px-8 py-6 shadow-glow hover:shadow-glow transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="tel:+919876543210">
                Order Now
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-accent text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="#menu">
                View Menu
              </a>
            </Button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Shield className="text-secondary" size={20} />
              <span className="text-white font-medium">100% Halal</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Leaf className="text-secondary" size={20} />
              <span className="text-white font-medium">Fresh Daily</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Award className="text-secondary" size={20} />
              <span className="text-white font-medium">Hygienic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
