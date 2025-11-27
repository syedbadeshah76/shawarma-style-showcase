import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
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
  const { addItem } = useCart();
  const { toast } = useToast();
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? menuItems : menuItems.slice(0, 3);

  const handleAddToCart = (item) => {
    addItem(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

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

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleItems.map((item, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                item.featured ? "ring-2 ring-primary shadow-glow" : ""
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
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-black text-primary">
                    ₹{item.price}
                  </div>
                  <Button
                    size="sm"
                    className="bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ARROW BUTTON */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/80 transition"
          >
            {showAll ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
        