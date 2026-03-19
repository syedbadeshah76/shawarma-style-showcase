import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Eye,
  Leaf,
  Flame,
  Star,
  Heart,
  Timer,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
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

type MenuItem = {
  name: string;
  price: number;
  image: string;
  featured?: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  description: string;
  ingredients: string;
  prepTime: string;
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
};

type ComboDeal = {
  name: string;
  items: string[];
  originalPrice: number;
  dealPrice: number;
  image: string;
  prepTime: string;
  description: string;
};

const FAVORITES_STORAGE_KEY = "favoriteMenuItems";

const menuItems: MenuItem[] = [
  {
    name: "Chicken Shawarma (R-Roti)",
    price: 100,
    image: shawarmaMain,
    featured: true,
    isVegetarian: false,
    isSpicy: true,
    prepTime: "10-12",
    description:
      "Authentic Middle Eastern shawarma wrapped in soft rumali roti with tender marinated chicken, fresh vegetables, and our signature sauce.",
    ingredients: "Chicken, Rumali Roti, Onions, Tomatoes, Cucumber, Lettuce, Mayonnaise, Special Sauce",
    nutrition: { calories: 450, protein: "28g", carbs: "42g", fat: "18g" },
  },
  {
    name: "Mini Chicken Shawarma (R-Roti)",
    price: 60,
    image: miniShawarma,
    isVegetarian: false,
    isSpicy: true,
    prepTime: "8-10",
    description: "A smaller portion of our classic chicken shawarma, perfect for a light meal or snack.",
    ingredients: "Chicken, Rumali Roti, Onions, Tomatoes, Cucumber, Lettuce, Mayonnaise, Special Sauce",
    nutrition: { calories: 280, protein: "18g", carbs: "26g", fat: "11g" },
  },
  {
    name: "Spl Chicken Shawarma",
    price: 120,
    image: shawarmaMain,
    featured: true,
    isVegetarian: false,
    isSpicy: true,
    prepTime: "12-15",
    description:
      "Premium shawarma loaded with extra chicken, cheese, and special toppings for an unforgettable taste experience.",
    ingredients:
      "Extra Chicken, Rumali Roti, Cheese, Onions, Tomatoes, Cucumber, Lettuce, Mayonnaise, Special Sauce, Extra Toppings",
    nutrition: { calories: 580, protein: "38g", carbs: "48g", fat: "24g" },
  },
  {
    name: "Mini Spl Chicken Shawarma",
    price: 100,
    image: miniShawarma,
    isVegetarian: false,
    isSpicy: true,
    prepTime: "10-12",
    description: "Mini version of our special shawarma with all the premium ingredients in a compact size.",
    ingredients: "Extra Chicken, Rumali Roti, Cheese, Onions, Tomatoes, Cucumber, Lettuce, Mayonnaise, Special Sauce",
    nutrition: { calories: 380, protein: "24g", carbs: "32g", fat: "16g" },
  },
  {
    name: "Chicken Wrap",
    price: 100,
    image: wrap,
    isVegetarian: false,
    isSpicy: false,
    prepTime: "8-10",
    description: "Grilled chicken pieces wrapped with fresh vegetables and creamy sauce in a soft tortilla.",
    ingredients: "Grilled Chicken, Tortilla Wrap, Lettuce, Tomatoes, Onions, Bell Peppers, Mayonnaise, Garlic Sauce",
    nutrition: { calories: 420, protein: "26g", carbs: "38g", fat: "16g" },
  },
  {
    name: "Mini Chicken Wrap",
    price: 70,
    image: wrap,
    isVegetarian: false,
    isSpicy: false,
    prepTime: "6-8",
    description: "Smaller portion of our delicious chicken wrap, ideal for a quick bite.",
    ingredients: "Grilled Chicken, Tortilla Wrap, Lettuce, Tomatoes, Onions, Bell Peppers, Mayonnaise, Garlic Sauce",
    nutrition: { calories: 260, protein: "16g", carbs: "24g", fat: "10g" },
  },
  {
    name: "Broasted Chicken (1 pc)",
    price: 60,
    image: broasted,
    featured: true,
    isVegetarian: false,
    isSpicy: false,
    prepTime: "15-18",
    description: "Crispy on the outside, juicy on the inside - our signature broasted chicken cooked to perfection.",
    ingredients: "Chicken, Special Spice Mix, Cooking Oil",
    nutrition: { calories: 320, protein: "22g", carbs: "8g", fat: "22g" },
  },
  {
    name: "Chicken Fried Momos",
    price: 90,
    image: momos,
    isVegetarian: false,
    isSpicy: true,
    prepTime: "12-15",
    description: "Steamed chicken momos pan-fried to golden perfection, served with spicy chutney.",
    ingredients: "Chicken Mince, Momos Wrapper, Garlic, Ginger, Spring Onions, Soy Sauce, Spices",
    nutrition: { calories: 340, protein: "20g", carbs: "36g", fat: "12g" },
  },
  {
    name: "Chicken Burger",
    price: 50,
    image: burger,
    isVegetarian: false,
    isSpicy: false,
    prepTime: "8-10",
    description: "Classic chicken burger with crispy patty, fresh lettuce, tomatoes, and our special sauce.",
    ingredients: "Chicken Patty, Burger Bun, Lettuce, Tomato, Onion, Cheese, Mayonnaise, Ketchup",
    nutrition: { calories: 380, protein: "22g", carbs: "42g", fat: "14g" },
  },
  {
    name: "Chicken Sandwich",
    price: 45,
    image: burger,
    isVegetarian: false,
    isSpicy: false,
    prepTime: "5-7",
    description: "Grilled chicken sandwich with fresh vegetables and creamy spread between soft bread slices.",
    ingredients: "Grilled Chicken, Bread, Lettuce, Tomato, Cucumber, Cheese, Mayonnaise",
    nutrition: { calories: 320, protein: "20g", carbs: "36g", fat: "11g" },
  },
  {
    name: "French Fries",
    price: 60,
    image: fries,
    isVegetarian: true,
    isSpicy: false,
    prepTime: "5-7",
    description: "Crispy golden french fries seasoned with our special spice blend.",
    ingredients: "Potatoes, Vegetable Oil, Salt, Seasoning",
    nutrition: { calories: 365, protein: "4g", carbs: "48g", fat: "17g" },
  },
  {
    name: "Pizza",
    price: 80,
    image: burger,
    isVegetarian: true,
    isSpicy: false,
    prepTime: "15-20",
    description: "Personal-sized pizza with your choice of toppings and gooey melted cheese.",
    ingredients: "Pizza Dough, Tomato Sauce, Mozzarella Cheese, Toppings (varies)",
    nutrition: { calories: 480, protein: "18g", carbs: "58g", fat: "18g" },
  },
  {
    name: "Chicken Nuggets",
    price: 50,
    image: broasted,
    isVegetarian: false,
    isSpicy: false,
    prepTime: "8-10",
    description: "Bite-sized chicken nuggets, crispy outside and tender inside, perfect for kids and adults.",
    ingredients: "Chicken Breast, Breadcrumbs, Flour, Eggs, Spices, Cooking Oil",
    nutrition: { calories: 290, protein: "16g", carbs: "24g", fat: "14g" },
  },
  {
    name: "Chicken Roll",
    price: 10,
    image: wrap,
    isVegetarian: false,
    isSpicy: true,
    prepTime: "3-5",
    description: "Quick snack roll filled with spiced chicken and wrapped in soft roti.",
    ingredients: "Chicken, Roti, Onions, Spices",
    nutrition: { calories: 120, protein: "8g", carbs: "14g", fat: "4g" },
  },
  {
    name: "Rumali Roti",
    price: 10,
    image: shawarmaMain,
    isVegetarian: true,
    isSpicy: false,
    prepTime: "2-3",
    description: "Thin, soft handkerchief bread perfect as a side or to wrap your favorite filling.",
    ingredients: "Wheat Flour, Water, Salt, Oil",
    nutrition: { calories: 80, protein: "2g", carbs: "16g", fat: "1g" },
  },
  {
    name: "Coffee",
    price: 20,
    image: fries,
    isVegetarian: true,
    isSpicy: false,
    prepTime: "3-5",
    description: "Freshly brewed hot coffee to energize your day.",
    ingredients: "Coffee Beans, Water, Sugar (optional), Milk (optional)",
    nutrition: { calories: 5, protein: "0g", carbs: "1g", fat: "0g" },
  },
  {
    name: "Mocktails Juice",
    price: 60,
    image: fries,
    isVegetarian: true,
    isSpicy: false,
    prepTime: "5-7",
    description: "Refreshing mocktail made with fresh fruits and premium ingredients.",
    ingredients: "Fresh Fruits, Sugar Syrup, Soda, Ice, Mint",
    nutrition: { calories: 140, protein: "1g", carbs: "35g", fat: "0g" },
  },
  {
    name: "Mayonnaise",
    price: 20,
    image: fries,
    isVegetarian: true,
    isSpicy: false,
    prepTime: "1-2",
    description: "Extra serving of our creamy mayonnaise sauce.",
    ingredients: "Eggs, Oil, Vinegar, Salt, Sugar",
    nutrition: { calories: 180, protein: "1g", carbs: "2g", fat: "20g" },
  },
];

const comboDeals: ComboDeal[] = [
  {
    name: "Shawarma Feast",
    items: ["Chicken Shawarma (R-Roti)", "French Fries", "Mocktails Juice"],
    originalPrice: 220,
    dealPrice: 189,
    image: shawarmaMain,
    prepTime: "15-18",
    description: "Classic shawarma meal with fries and a cool drink at a discounted price.",
  },
  {
    name: "Burger Buddy Meal",
    items: ["Chicken Burger", "Chicken Nuggets", "Coffee"],
    originalPrice: 120,
    dealPrice: 99,
    image: burger,
    prepTime: "12-15",
    description: "A quick burger combo made for snack cravings and coffee breaks.",
  },
  {
    name: "Wrap & Crunch Combo",
    items: ["Chicken Wrap", "Broasted Chicken (1 pc)", "Mayonnaise"],
    originalPrice: 180,
    dealPrice: 149,
    image: wrap,
    prepTime: "14-17",
    description: "Wrap, crunch, and dip together in one value-packed combo.",
  },
];

const Menu = () => {
  const { addItem, setIsCartOpen } = useCart();
  const [showAll, setShowAll] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [favoriteNames, setFavoriteNames] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      try {
        setFavoriteNames(JSON.parse(storedFavorites) as string[]);
      } catch (error) {
        console.error("Error parsing favorite items", error);
      }
    }
  }, []);

  const toggleFavorite = (itemName: string) => {
    setFavoriteNames((prev) => {
      const updated = prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const favoriteItems = menuItems.filter((item) => favoriteNames.includes(item.name));

  const filteredItems = menuItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "vegetarian") return item.isVegetarian;
    if (activeFilter === "spicy") return item.isSpicy;
    if (activeFilter === "popular") return Boolean(item.featured);
    return true;
  });

  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 3);

  const handleAddToCart = (item: Pick<MenuItem, "name" | "price" | "image">) => {
    addItem(item);
    setAddedItemName(item.name);
    setShowDialog(true);
  };

  const handleAddComboToCart = (deal: ComboDeal) => {
    handleAddToCart({ name: deal.name, price: deal.dealPrice, image: deal.image });
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

        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-10">
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

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Combo / Meal Deals</h3>
              <p className="text-muted-foreground mt-1">Discounted bundles for bigger cravings.</p>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Save more
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comboDeals.map((deal) => {
              const savings = deal.originalPrice - deal.dealPrice;
              return (
                <Card key={deal.name} className="overflow-hidden border-primary/20 hover:shadow-lg transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
                    <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground border-0">
                      Save ₹{savings}
                    </Badge>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                      <Timer className="h-3 w-3 text-primary" />
                      {deal.prepTime} mins
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h4 className="text-xl font-bold text-foreground mb-1">{deal.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{deal.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {deal.items.map((dealItem) => (
                        <Badge key={dealItem} variant="outline" className="border-border/70 text-muted-foreground">
                          {dealItem}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground line-through">₹{deal.originalPrice}</p>
                        <p className="text-2xl font-black text-primary">₹{deal.dealPrice}</p>
                      </div>
                      <Button
                        className="bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow"
                        onClick={() => handleAddComboToCart(deal)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add Deal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {favoriteItems.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary fill-current" />
                Favorite Items
              </h3>
              <Badge variant="outline" className="border-primary/30 text-primary">
                {favoriteItems.length} saved
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteItems.map((item) => (
                <Card key={item.name} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from favorites`}
                      onClick={() => toggleFavorite(item.name)}
                      className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm transition hover:bg-background"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-foreground line-clamp-1">{item.name}</h4>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-primary font-black">₹{item.price}</span>
                      <Button size="sm" variant="outline" onClick={() => setSelectedItem(item)}>
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleItems.map((item) => {
            const isFavorite = favoriteNames.includes(item.name);
            return (
              <Card
                key={item.name}
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
                    <div className="absolute top-2 right-14 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      Popular
                    </div>
                  )}
                  <button
                    type="button"
                    aria-label={isFavorite ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
                    onClick={() => toggleFavorite(item.name)}
                    className="absolute top-2 right-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition hover:bg-background"
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-current text-primary" : "text-muted-foreground"}`} />
                  </button>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Timer className="h-3 w-3" />
                    <span>{item.prepTime} mins</span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-black text-primary">₹{item.price}</div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedItem(item)}>
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
            );
          })}
        </div>

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
            <AlertDialogCancel onClick={handleContinueShopping}>Continue Shopping</AlertDialogCancel>
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
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <DialogTitle className="text-2xl">{selectedItem.name}</DialogTitle>
                    <DialogDescription className="text-base mt-2">{selectedItem.description}</DialogDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFavorite(selectedItem.name)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favoriteNames.includes(selectedItem.name) ? "fill-current text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </div>
              </DialogHeader>

              <div className="grid gap-4 mt-4">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                    <Timer className="h-3 w-3 text-primary" />
                    {selectedItem.prepTime} mins
                  </div>
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
