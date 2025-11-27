import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import shawarmaMain from "@/assets/shawarma-main.jpg";
import miniShawarma from "@/assets/mini-shawarma.jpg";
import burger from "@/assets/burger.jpg";
import fries from "@/assets/fries.jpg";
import wrap from "@/assets/wrap.jpg";
import broasted from "@/assets/broasted.jpg";
import momos from "@/assets/momos.jpg";

const menuItems = [
  { name: "Chicken Shawarma (R-Roti)", price: 100, image: shawarmaMain, featured: true },
  { name: "Mini Chicken Shawarma (R-Roti)", price: 60, image: miniShawarma },
  { name: "Spl Chicken Shawarma", price: 120, image: shawarmaMain, featured: true },
  { name: "Mini Spl Chicken Shawarma", price: 100, image: miniShawarma },
  { name: "Chicken Wrap", price: 100, image: wrap },
  { name: "Mini Chicken Wrap", price: 70, image: wrap },
  { name: "Broasted Chicken (1 pc)", price: 60, image: broasted },
  { name: "Chicken Fried Momos", price: 90, image: momos },
  { name: "Chicken Burger", price: 50, image: burger },
  { name: "Chicken Sandwich", price: 45, image: burger },
  { name: "French Fries", price: 60, image: fries },
  { name: "Pizza", price: 80, image: burger },
  { name: "Chicken Nuggets", price: 50, image: broasted },
  { name: "Chicken Roll", price: 10, image: wrap },
  { name: "Rumali Roti", price: 10, image: shawarmaMain },
  { name: "Coffee", price: 20, image: fries },
  { name: "Mocktails Juice", price: 60, image: fries },
  { name: "Mayonnaise", price: 20, image: fries },
];

const Menu = () => {
  return (
    <section id="menu" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Delicious Menu</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Freshly prepared with premium ingredients and authentic flavors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                item.featured ? 'ring-2 ring-primary shadow-glow' : ''
              }`}
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.featured && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Popular
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-black text-primary">
                    ₹{item.price}
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow"
                    asChild
                  >
                    <a href={`https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20${encodeURIComponent(item.name)}%20-%20₹${item.price}`} target="_blank" rel="noopener noreferrer">
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      Add
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
