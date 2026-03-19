import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Eye,
  Leaf,
  Flame,
  Star,
  Search,
  Clock,
  X,
  ArrowUpDown,
  Minus,
  Plus,
  Timer,
  Heart,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  prepTime: string;
  description: string;
  ingredients: string;
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
const RECENTLY_VIEWED_STORAGE_KEY = "recentlyViewedItems";

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
    description: "Best-selling shawarma combo with fries and a chilled drink at a bundle discount.",
  },
  {
    name: "Burger Buddy Meal",
    items: ["Chicken Burger", "Chicken Nuggets", "Coffee"],
    originalPrice: 120,
    dealPrice: 99,
    image: burger,
    prepTime: "12-15",
    description: "A quick comfort meal with burger, nuggets, and a hot coffee.",
  },
  {
    name: "Wrap & Crunch Combo",
    items: ["Chicken Wrap", "Broasted Chicken (1 pc)", "Mayonnaise"],
    originalPrice: 180,
    dealPrice: 149,
    image: wrap,
    prepTime: "14-17",
    description: "A filling combo for wrap lovers with extra crunch and dip on the side.",
  },
];

const MenuPage = () => {
  const { addItem, setIsCartOpen } = useCart();
  const [showAll, setShowAll] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 150]);
  const [recentlyViewed, setRecentlyViewed] = useState<MenuItem[]>([]);
  const [sortOption, setSortOption] = useState<string>("default");
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [favoriteNames, setFavoriteNames] = useState<string[]>([]);

  const minPrice = 0;
  const maxPrice = 150;

  useEffect(() => {
    const storedRecentlyViewed = localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
    if (storedRecentlyViewed) {
      try {
        const parsedNames = JSON.parse(storedRecentlyViewed) as string[];
        const items = parsedNames
          .map((name) => menuItems.find((item) => item.name === name))
          .filter(Boolean) as MenuItem[];
        setRecentlyViewed(items);
      } catch (error) {
        console.error("Error parsing recently viewed items", error);
      }
    }

    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      try {
        setFavoriteNames(JSON.parse(storedFavorites) as string[]);
      } catch (error) {
        console.error("Error parsing favorite items", error);
      }
    }
  }, []);

  const favoriteItems = menuItems.filter((item) => favoriteNames.includes(item.name));

  const toggleFavorite = (itemName: string) => {
    setFavoriteNames((prev) => {
      const updated = prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const trackItemView = (item: MenuItem) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((viewedItem) => viewedItem.name !== item.name);
      const updated = [item, ...filtered].slice(0, 6);
      localStorage.setItem(
        RECENTLY_VIEWED_STORAGE_KEY,
        JSON.stringify(updated.map((viewedItem) => viewedItem.name)),
      );
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(RECENTLY_VIEWED_STORAGE_KEY);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

    if (activeFilter === "all") return matchesSearch && matchesPrice;
    if (activeFilter === "vegetarian") return matchesSearch && matchesPrice && item.isVegetarian;
    if (activeFilter === "spicy") return matchesSearch && matchesPrice && item.isSpicy;
    if (activeFilter === "popular") return matchesSearch && matchesPrice && Boolean(item.featured);
    return matchesSearch && matchesPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-az":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const visibleItems = showAll ? sortedItems : sortedItems.slice(0, 12);

  const handleAddToCart = (item: Pick<MenuItem, "name" | "price" | "image">, qty: number = 1, instructions: string = "") => {
    addItem(item, qty, instructions || undefined);
    setAddedItemName(item.name);
    setShowDialog(true);
    setQuantity(1);
    setSpecialInstructions("");
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

  const openQuickView = (item: MenuItem) => {
    setSelectedItem(item);
    trackItemView(item);
    setQuantity(1);
    setSpecialInstructions("");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-gradient">Delicious Menu</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Freshly prepared with premium ingredients and authentic flavors
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base bg-background/50 backdrop-blur border-border/50"
              />
            </div>
          </div>

          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-6">
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

          <div className="max-w-md mx-auto mb-8 p-4 bg-card/50 backdrop-blur rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Price Range</span>
              <span className="text-sm font-bold text-primary">
                ₹{priceRange[0]} - ₹{priceRange[1]}
                {priceRange[1] >= maxPrice ? "+" : ""}
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={minPrice}
              max={maxPrice}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>₹{minPrice}</span>
              <span>₹50</span>
              <span>₹100</span>
              <span>₹{maxPrice}+</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-10">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Sort by:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-48 bg-card/50 backdrop-blur border-border/50">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-az">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Combo & Meal Deals</h2>
                <p className="text-muted-foreground mt-1">Bundle favorites together and save on every order.</p>
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary">
                Limited-time savings
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {comboDeals.map((deal) => {
                const savings = deal.originalPrice - deal.dealPrice;
                return (
                  <Card key={deal.name} className="overflow-hidden border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground border-0">
                        Save ₹{savings}
                      </Badge>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                        <Timer className="h-3 w-3 text-primary" />
                        {deal.prepTime} mins
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{deal.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{deal.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {deal.items.map((dealItem) => (
                          <Badge key={dealItem} variant="outline" className="border-border/70 text-muted-foreground">
                            {dealItem}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-4">
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
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary fill-current" />
                  Your Favorites
                </h2>
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {favoriteItems.length} saved
                </Badge>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {favoriteItems.map((item) => (
                  <Card
                    key={item.name}
                    className="flex-shrink-0 w-52 group hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
                      <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-black text-primary">₹{item.price}</span>
                        <Button size="sm" variant="outline" onClick={() => openQuickView(item)}>
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

          {recentlyViewed.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recently Viewed
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentlyViewed}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {recentlyViewed.map((item) => (
                  <Card
                    key={item.name}
                    className="flex-shrink-0 w-48 group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                    onClick={() => openQuickView(item)}
                  >
                    <div className="relative h-28 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-primary font-bold">₹{item.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {searchQuery && (
            <p className="text-center text-muted-foreground mb-6">
              Found {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} matching "{searchQuery}"
            </p>
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
                    <div className="absolute top-2 left-2 flex gap-1">
                      {item.isVegetarian && (
                        <Badge variant="outline" className="border-secondary/40 bg-background/90 text-secondary">
                          <Leaf className="h-3 w-3" />
                        </Badge>
                      )}
                      {item.isSpicy && (
                        <Badge variant="outline" className="border-primary/40 bg-background/90 text-primary">
                          <Flame className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Timer className="h-3 w-3" />
                      <span>{item.prepTime} mins</span>
                    </div>

                    <div className="flex items-center justify-between mb-2 gap-2">
                      <div className="text-2xl font-black text-primary">₹{item.price}</div>
                      <Button variant="ghost" size="sm" onClick={() => openQuickView(item)}>
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

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No items found matching your search.</p>
            </div>
          )}

          {filteredItems.length > 12 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/80 transition"
              >
                {showAll ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
              </button>
            </div>
          )}
        </div>
      </section>

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

      <Dialog
        open={!!selectedItem}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedItem(null);
            setQuantity(1);
            setSpecialInstructions("");
          }
        }}
      >
        <DialogContent className="w-[95vw] max-w-2xl mx-auto p-4 sm:p-6">
          {selectedItem && (
            <div className="flex flex-col gap-4">
              <DialogHeader className="pr-8">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <DialogTitle className="text-xl sm:text-2xl">{selectedItem.name}</DialogTitle>
                    <DialogDescription className="text-sm sm:text-base mt-2">
                      {selectedItem.description}
                    </DialogDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
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

              <div className="relative h-40 sm:h-56 rounded-lg overflow-hidden flex-shrink-0">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                  <Timer className="h-3 w-3 text-primary" />
                  <span>{selectedItem.prepTime} mins</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-base sm:text-lg mb-1 flex items-center gap-2">
                    <span className="text-primary">🥘</span> Ingredients
                  </h4>
                  <p className="text-muted-foreground text-xs sm:text-sm">{selectedItem.ingredients}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                    <span className="text-primary">📊</span> Nutrition
                  </h4>
                  <div className="grid grid-cols-4 gap-1 sm:gap-2">
                    <Badge variant="secondary" className="justify-center py-1.5 sm:py-2 px-1">
                      <div className="text-center">
                        <div className="font-bold text-xs sm:text-sm">{selectedItem.nutrition.calories}</div>
                        <div className="text-[10px] sm:text-xs">Cal</div>
                      </div>
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-1.5 sm:py-2 px-1">
                      <div className="text-center">
                        <div className="font-bold text-xs sm:text-sm">{selectedItem.nutrition.protein}</div>
                        <div className="text-[10px] sm:text-xs">Protein</div>
                      </div>
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-1.5 sm:py-2 px-1">
                      <div className="text-center">
                        <div className="font-bold text-xs sm:text-sm">{selectedItem.nutrition.carbs}</div>
                        <div className="text-[10px] sm:text-xs">Carbs</div>
                      </div>
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-1.5 sm:py-2 px-1">
                      <div className="text-center">
                        <div className="font-bold text-xs sm:text-sm">{selectedItem.nutrition.fat}</div>
                        <div className="text-[10px] sm:text-xs">Fat</div>
                      </div>
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-3 border-t mt-2">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Special Instructions (optional)
                  </label>
                  <Textarea
                    placeholder="E.g., No onions, extra spicy, allergies..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="resize-none h-16 text-sm bg-background/50"
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">{specialInstructions.length}/200</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Quantity</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xl sm:text-2xl font-black text-primary">₹{selectedItem.price * quantity}</div>
                  <Button
                    className="flex-1 bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow h-10 sm:h-11"
                    onClick={() => {
                      handleAddToCart(selectedItem, quantity, specialInstructions);
                      setSelectedItem(null);
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add {quantity > 1 ? `${quantity} items` : "to Cart"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default MenuPage;
