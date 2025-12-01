import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, ChevronDown, ChevronUp, Eye, Leaf, Flame, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import shawarmaMain from "@/assets/shawarma-main.jpg";
import miniShawarma from "@/assets/mini-shawarma.jpg";
import burger from "@/assets/burger.jpg";
import fries from "@/assets/fries.jpg";
import wrap from "@/assets/wrap.jpg";
import broasted from "@/assets/broasted.jpg";
import momos from "@/assets/momos.jpg";

const menuItems = [
  { 
    name: "Chicken Shawarma (R-Roti)", 
    price: 100, 
    image: shawarmaMain, 
    featured: true,
    isVegetarian: false,
    isSpicy: true,
    description: "Authentic Middle Eastern shawarma wrapped in soft rumali roti with tender marinated chicken, fresh vegetables, and our signature sauce.",
    ingredients: "Chicken, Rumali Roti, Onions, Tomatoes, Cucumber, Lettuce, Mayonnaise, Special Sauce",
    nutrition: { calories: 450, protein: "28g", carbs: "42g", fat: "18g" }
  },
  { 
    name: "Mini Chicken Shawarma (R-Roti)", 
    price: 60, 
    image: miniShawarma,
    isVegetarian: false,
    isSpicy: true,
    description: "A smaller portion of our classic chicken shawarma, perfect for a light meal or snack.",
    ingredients: "Chicken, Rumali Roti, Onions, Tomatoes, Cucumber, Lettuce, Mayonnaise, Special Sauce",
    nutrition: { calories: 280, protein: "18g", carbs: "26g", fat: "11g" }
  },
  { 
    name: "Spl Chicken Shawarma", 
    price: 120, 
    image: shawarmaMain, 
    featured: true,
    isVegetarian: false,
    isSpicy: true,
    description: "Premium shawarma loaded with extra chicken, cheese, and special toppings for an unforgettable taste experience.",
    ingredients: "Extra Chicken, Rumali Roti, Cheese, Onions, Tomatoes, Cucumber, Lettuce, Mayonnaise, Special Sauce, Extra Toppings",
    nutrition: { calories: 580, protein: "38g", carbs: "48g", fat: "24g" }
  },
  { 
    name: "Mini Spl Chicken Shawarma", 
    price: 100, 
    image: miniShawarma,
    isVegetarian: false,
    isSpicy: true,
    description: "Mini version of our special shawarma with all the premium ingredients in a compact size.",
    ingredients: "Extra Chicken, Rumali Roti, Cheese, Onions, Tomatoes, Cucumber, Lettuce, Mayonnaise, Special Sauce",
    nutrition: { calories: 380, protein: "24g", carbs: "32g", fat: "16g" }
  },
  { 
    name: "Chicken Wrap", 
    price: 100, 
    image: wrap,
    isVegetarian: false,
    isSpicy: false,
    description: "Grilled chicken pieces wrapped with fresh vegetables and creamy sauce in a soft tortilla.",
    ingredients: "Grilled Chicken, Tortilla Wrap, Lettuce, Tomatoes, Onions, Bell Peppers, Mayonnaise, Garlic Sauce",
    nutrition: { calories: 420, protein: "26g", carbs: "38g", fat: "16g" }
  },
  { 
    name: "Mini Chicken Wrap", 
    price: 70, 
    image: wrap,
    isVegetarian: false,
    isSpicy: false,
    description: "Smaller portion of our delicious chicken wrap, ideal for a quick bite.",
    ingredients: "Grilled Chicken, Tortilla Wrap, Lettuce, Tomatoes, Onions, Bell Peppers, Mayonnaise, Garlic Sauce",
    nutrition: { calories: 260, protein: "16g", carbs: "24g", fat: "10g" }
  },
  { 
    name: "Broasted Chicken (1 pc)", 
    price: 60, 
    image: broasted,
    featured: true,
    isVegetarian: false,
    isSpicy: false,
    description: "Crispy on the outside, juicy on the inside - our signature broasted chicken cooked to perfection.",
    ingredients: "Chicken, Special Spice Mix, Cooking Oil",
    nutrition: { calories: 320, protein: "22g", carbs: "8g", fat: "22g" }
  },
  { 
    name: "Chicken Fried Momos", 
    price: 90, 
    image: momos,
    isVegetarian: false,
    isSpicy: true,
    description: "Steamed chicken momos pan-fried to golden perfection, served with spicy chutney.",
    ingredients: "Chicken Mince, Momos Wrapper, Garlic, Ginger, Spring Onions, Soy Sauce, Spices",
    nutrition: { calories: 340, protein: "20g", carbs: "36g", fat: "12g" }
  },
  { 
    name: "Chicken Burger", 
    price: 50, 
    image: burger,
    isVegetarian: false,
    isSpicy: false,
    description: "Classic chicken burger with crispy patty, fresh lettuce, tomatoes, and our special sauce.",
    ingredients: "Chicken Patty, Burger Bun, Lettuce, Tomato, Onion, Cheese, Mayonnaise, Ketchup",
    nutrition: { calories: 380, protein: "22g", carbs: "42g", fat: "14g" }
  },
  { 
    name: "Chicken Sandwich", 
    price: 45, 
    image: burger,
    isVegetarian: false,
    isSpicy: false,
    description: "Grilled chicken sandwich with fresh vegetables and creamy spread between soft bread slices.",
    ingredients: "Grilled Chicken, Bread, Lettuce, Tomato, Cucumber, Cheese, Mayonnaise",
    nutrition: { calories: 320, protein: "20g", carbs: "36g", fat: "11g" }
  },
  { 
    name: "French Fries", 
    price: 60, 
    image: fries,
    isVegetarian: true,
    isSpicy: false,
    description: "Crispy golden french fries seasoned with our special spice blend.",
    ingredients: "Potatoes, Vegetable Oil, Salt, Seasoning",
    nutrition: { calories: 365, protein: "4g", carbs: "48g", fat: "17g" }
  },
  { 
    name: "Pizza", 
    price: 80, 
    image: burger,
    isVegetarian: true,
    isSpicy: false,
    description: "Personal-sized pizza with your choice of toppings and gooey melted cheese.",
    ingredients: "Pizza Dough, Tomato Sauce, Mozzarella Cheese, Toppings (varies)",
    nutrition: { calories: 480, protein: "18g", carbs: "58g", fat: "18g" }
  },
  { 
    name: "Chicken Nuggets", 
    price: 50, 
    image: broasted,
    isVegetarian: false,
    isSpicy: false,
    description: "Bite-sized chicken nuggets, crispy outside and tender inside, perfect for kids and adults.",
    ingredients: "Chicken Breast, Breadcrumbs, Flour, Eggs, Spices, Cooking Oil",
    nutrition: { calories: 290, protein: "16g", carbs: "24g", fat: "14g" }
  },
  { 
    name: "Chicken Roll", 
    price: 10, 
    image: wrap,
    isVegetarian: false,
    isSpicy: true,
    description: "Quick snack roll filled with spiced chicken and wrapped in soft roti.",
    ingredients: "Chicken, Roti, Onions, Spices",
    nutrition: { calories: 120, protein: "8g", carbs: "14g", fat: "4g" }
  },
  { 
    name: "Rumali Roti", 
    price: 10, 
    image: shawarmaMain,
    isVegetarian: true,
    isSpicy: false,
    description: "Thin, soft handkerchief bread perfect as a side or to wrap your favorite filling.",
    ingredients: "Wheat Flour, Water, Salt, Oil",
    nutrition: { calories: 80, protein: "2g", carbs: "16g", fat: "1g" }
  },
  { 
    name: "Coffee", 
    price: 20, 
    image: fries,
    isVegetarian: true,
    isSpicy: false,
    description: "Freshly brewed hot coffee to energize your day.",
    ingredients: "Coffee Beans, Water, Sugar (optional), Milk (optional)",
    nutrition: { calories: 5, protein: "0g", carbs: "1g", fat: "0g" }
  },
  { 
    name: "Mocktails Juice", 
    price: 60, 
    image: fries,
    isVegetarian: true,
    isSpicy: false,
    description: "Refreshing mocktail made with fresh fruits and premium ingredients.",
    ingredients: "Fresh Fruits, Sugar Syrup, Soda, Ice, Mint",
    nutrition: { calories: 140, protein: "1g", carbs: "35g", fat: "0g" }
  },
  { 
    name: "Mayonnaise", 
    price: 20, 
    image: fries,
    isVegetarian: true,
    isSpicy: false,
    description: "Extra serving of our creamy mayonnaise sauce.",
    ingredients: "Eggs, Oil, Vinegar, Salt, Sugar",
    nutrition: { calories: 180, protein: "1g", carbs: "2g", fat: "20g" }
  },
];

const Menu = () => {
  const { addItem, setIsCartOpen } = useCart();
  const { toast } = useToast();
  const [showAll, setShowAll] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredItems = menuItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "vegetarian") return item.isVegetarian;
    if (activeFilter === "spicy") return item.isSpicy;
    if (activeFilter === "popular") return item.featured;
    return true;
  });

  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 3);

  const handleAddToCart = (item) => {
    addItem(item);
    setAddedItemName(item.name);
    setShowDialog(true);
  };

  const handleViewCart = () => {
    setShowDialog(false);
    setIsCartOpen(true);
  };

  const handleContinueShopping = () => {
    setShowDialog(false);
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

        {/* FILTER TABS */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-card/50 backdrop-blur">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All Items
            </TabsTrigger>
            <TabsTrigger value="popular" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Star className="h-4 w-4 mr-1" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="vegetarian" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Leaf className="h-4 w-4 mr-1" />
              Vegetarian
            </TabsTrigger>
            <TabsTrigger value="spicy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Flame className="h-4 w-4 mr-1" />
              Spicy
            </TabsTrigger>
          </TabsList>
        </Tabs>

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

                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-black text-primary">
                    ₹{item.price}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedItem(item)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Quick View
                  </Button>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  Add to Cart
                </Button>
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

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Item Added to Cart! 🎉</AlertDialogTitle>
            <AlertDialogDescription>
              {addedItemName} has been added to your cart. Would you like to proceed to cart or continue shopping?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleContinueShopping}>
              Continue Shopping
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleViewCart} className="bg-primary hover:bg-primary/90">
              View Cart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedItem.name}</DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 mt-4">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <span className="text-primary">🥘</span> Ingredients
                    </h4>
                    <p className="text-muted-foreground">{selectedItem.ingredients}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <span className="text-primary">📊</span> Nutritional Information
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <Badge variant="secondary" className="justify-center py-2">
                        <div className="text-center">
                          <div className="font-bold">{selectedItem.nutrition.calories}</div>
                          <div className="text-xs">Calories</div>
                        </div>
                      </Badge>
                      <Badge variant="secondary" className="justify-center py-2">
                        <div className="text-center">
                          <div className="font-bold">{selectedItem.nutrition.protein}</div>
                          <div className="text-xs">Protein</div>
                        </div>
                      </Badge>
                      <Badge variant="secondary" className="justify-center py-2">
                        <div className="text-center">
                          <div className="font-bold">{selectedItem.nutrition.carbs}</div>
                          <div className="text-xs">Carbs</div>
                        </div>
                      </Badge>
                      <Badge variant="secondary" className="justify-center py-2">
                        <div className="text-center">
                          <div className="font-bold">{selectedItem.nutrition.fat}</div>
                          <div className="text-xs">Fat</div>
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <div className="text-3xl font-black text-primary">₹{selectedItem.price}</div>
                  <Button
                    className="flex-1 bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow"
                    onClick={() => {
                      handleAddToCart(selectedItem);
                      setSelectedItem(null);
                    }}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Menu;
        