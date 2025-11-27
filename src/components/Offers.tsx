import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Sparkles, Tag } from "lucide-react";
import shawarmaMain from "@/assets/shawarma-main.jpg";
import wrap from "@/assets/wrap.jpg";
import combo from "@/assets/burger.jpg";

const Offers = () => {
  const offers = [
    {
      title: "Special Shawarma Deal",
      description: "Get our signature Spl Chicken Shawarma at a special price!",
      originalPrice: 120,
      offerPrice: 100,
      image: shawarmaMain,
      icon: Flame,
      badge: "Hot Deal"
    },
    {
      title: "Wrap Combo",
      description: "Chicken Wrap + French Fries + Drink",
      originalPrice: 180,
      offerPrice: 150,
      image: wrap,
      icon: Sparkles,
      badge: "Combo"
    },
    {
      title: "Value Meal",
      description: "Burger + Fries + Coffee",
      originalPrice: 130,
      offerPrice: 100,
      image: combo,
      icon: Tag,
      badge: "Best Value"
    }
  ];

  return (
    <section id="offers" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Today's <span className="text-gradient">Special Offers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Limited time deals you don't want to miss!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <Card 
                key={index}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-pulse">
                  <Icon size={16} />
                  {offer.badge}
                </div>

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent via-transparent to-transparent"></div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {offer.description}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-black text-primary">
                      ₹{offer.offerPrice}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{offer.originalPrice}
                    </span>
                    <span className="ml-auto bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-bold">
                      Save ₹{offer.originalPrice - offer.offerPrice}
                    </span>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow"
                    asChild
                  >
                    <a href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20the%20{offer.title}" target="_blank" rel="noopener noreferrer">
                      Order Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Offers;
