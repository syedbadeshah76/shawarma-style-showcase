import { Card, CardContent } from "@/components/ui/card";
import { Leaf, ThumbsUp, DollarSign, Sparkles } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Leaf,
      title: "100% Fresh",
      description: "We use only the freshest ingredients, prepared daily with care"
    },
    {
      icon: ThumbsUp,
      title: "Best Taste Guarantee",
      description: "Authentic flavors that keep our customers coming back for more"
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "Quality food at prices that won't break the bank"
    },
    {
      icon: Sparkles,
      title: "Clean & Hygienic",
      description: "Maintaining the highest standards of cleanliness and hygiene"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why <span className="text-gradient">Choose Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to serving you the best food experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
