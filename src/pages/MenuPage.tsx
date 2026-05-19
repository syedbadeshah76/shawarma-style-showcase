import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  ShoppingCart,
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
  ExternalLink,
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
import SwiggyButton from "@/components/SwiggyButton";
import {
  comboDeals,
  FAVORITES_STORAGE_KEY,
  menuItems,
  menuCategories,
  RECENTLY_VIEWED_STORAGE_KEY,
  SWIGGY_RESTAURANT_URL,
  type ComboDeal,
  type MenuItem,
  type MenuCategory,
} from "@/data/menuData";

const MenuPage = () => {
  const { addItem, setIsCartOpen } = useCart();
  const [showDialog, setShowDialog] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 150]);
  const [recentlyViewed, setRecentlyViewed] = useState<MenuItem[]>([]);
  const [sortOption, setSortOption] = useState<string>("default");
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [favoriteNames, setFavoriteNames] = useState<string[]>([]);

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;

    let matchesFilter = true;
    if (activeFilter === "vegetarian") matchesFilter = item.isVegetarian;
    else if (activeFilter === "spicy") matchesFilter = item.isSpicy;
    else if (activeFilter === "popular") matchesFilter = Boolean(item.featured);

    return matchesSearch && matchesPrice && matchesCategory && matchesFilter;
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

  // Group items by category for category view
  const groupedByCategory = menuCategories
    .map((cat) => ({
      ...cat,
      items: sortedItems.filter((item) => item.category === cat.id),
    }))
    .filter((group) => group.items.length > 0);

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

  const openQuickView = (item: MenuItem) => {
    setSelectedItem(item);
    trackItemView(item);
    setQuantity(1);
    setSpecialInstructions("");
  };

  const scrollToCategory = (catId: string) => {
    setActiveCategory("all");
    setTimeout(() => {
      categoryRefs.current[catId]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const showCategoryView = activeCategory === "all" && !searchQuery && activeFilter === "all" && sortOption === "default" && priceRange[0] === 0 && priceRange[1] >= maxPrice;

  const renderMenuCard = (item: MenuItem) => {
    const isFavorite = favoriteNames.includes(item.name);
    return (
      <Card
        key={item.name}
        className={`group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] ${
          item.featured ? "ring-2 ring-primary shadow-glow" : ""
        }`}
      >
        <div className="relative overflow-hidden h-40 sm:h-48 lg:h-52">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {item.featured && (
            <div className="absolute top-2 right-14 bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full text-xs font-bold shadow-lg">
              Popular
            </div>
          )}
          <button
            type="button"
            aria-label={isFavorite ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
            onClick={() => toggleFavorite(item.name)}
            className="absolute top-2 right-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition hover:bg-background active:scale-90"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current text-primary" : "text-muted-foreground"}`} />
          </button>
        </div>

        <CardContent className="p-3 sm:p-4">
          <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-1">{item.name}</h3>

          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2 sm:mb-3">
            <Timer className="h-3 w-3" />
            <span>{item.prepTime} mins</span>
            <div className="ml-auto flex gap-1">
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

          <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
            <div className="text-xl sm:text-2xl font-black text-primary">₹{item.price}</div>
            <Button variant="ghost" size="sm" onClick={() => openQuickView(item)} className="h-9 px-3">
              <Eye className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Quick View</span>
              <span className="sm:hidden">View</span>
            </Button>
          </div>

          <div className="flex gap-1.5">
            <Button
              size="sm"
              className="flex-1 h-11 sm:h-9 text-sm bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow active:scale-95 transition-transform"
              onClick={() => handleAddToCart(item)}
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              Add
            </Button>
            <SwiggyButton
              itemName={item.name}
              variant="compact"
              showIcon={false}
              label="🛵 Swiggy"
              className="flex-1 h-11 sm:h-9 text-xs sm:text-sm"
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Menu | AL-SHA SHAWARMA Hyderabad"
        description="Browse the full AL-SHA SHAWARMA menu: chicken shawarma, wraps, burgers, broasted, momos, combos & drinks. Search, filter and order online."
        path="/menu"
      />
      <Navbar />

      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Our <span className="text-gradient">Delicious Menu</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-4">
              Freshly prepared with premium ingredients and authentic flavors
            </p>
            <a
              href={SWIGGY_RESTAURANT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[hsl(24,100%,50%)] hover:bg-[hsl(24,100%,44%)] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors shadow-lg"
            >
              <span>🛵</span>
              Order on Swiggy
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Category Jump Navigation */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className="snap-start flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium text-foreground active:scale-95 min-w-fit"
                >
                  <span className="text-lg">{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-6">
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

          {/* Sticky Filters */}
          <div className="sticky top-16 z-30 bg-muted/95 backdrop-blur-md py-3 -mx-4 px-4 border-b border-border/30 mb-6">
            <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-3">
              <TabsList className="flex w-full max-w-3xl mx-auto h-auto gap-1.5 bg-card/60 p-1.5 backdrop-blur overflow-x-auto">
                <TabsTrigger value="all" className="flex-1 min-w-fit data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  All
                </TabsTrigger>
                <TabsTrigger value="popular" className="flex-1 min-w-fit data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Star className="h-3.5 w-3.5 mr-1" />
                  Popular
                </TabsTrigger>
                <TabsTrigger value="vegetarian" className="flex-1 min-w-fit data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Leaf className="h-3.5 w-3.5 mr-1" />
                  Veg
                </TabsTrigger>
                <TabsTrigger value="spicy" className="flex-1 min-w-fit data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Flame className="h-3.5 w-3.5 mr-1" />
                  Spicy
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
              <div className="flex-1 p-3 bg-card/50 backdrop-blur rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">Price</span>
                  <span className="text-xs font-bold text-primary">
                    ₹{priceRange[0]} - ₹{priceRange[1]}{priceRange[1] >= maxPrice ? "+" : ""}
                  </span>
                </div>
                <Slider value={priceRange} onValueChange={setPriceRange} min={minPrice} max={maxPrice} step={10} className="w-full" />
              </div>

              <div className="flex items-center gap-2 sm:w-48">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="bg-card/50 backdrop-blur border-border/50 h-10">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-low">Price: Low → High</SelectItem>
                    <SelectItem value="price-high">Price: High → Low</SelectItem>
                    <SelectItem value="name-az">Name: A → Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Combo Deals */}
          <div className="mb-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Combo & Meal Deals</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">Bundle favorites together and save on every order.</p>
              </div>
              <Badge variant="outline" className="w-fit border-primary/30 text-primary">
                Limited-time savings
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {comboDeals.map((deal) => {
                const savings = deal.originalPrice - deal.dealPrice;
                return (
                  <Card key={deal.name} className="overflow-hidden border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground border-0">
                        Save ₹{savings}
                      </Badge>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                        <Timer className="h-3 w-3 text-primary" />
                        {deal.prepTime} mins
                      </div>
                    </div>
                    <CardContent className="p-4 sm:p-5">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">{deal.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 mb-3 sm:mb-4">{deal.description}</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {deal.items.map((dealItem) => (
                          <Badge key={dealItem} variant="outline" className="border-border/70 text-muted-foreground text-xs">
                            {dealItem}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground line-through">₹{deal.originalPrice}</p>
                          <p className="text-xl sm:text-2xl font-black text-primary">₹{deal.dealPrice}</p>
                        </div>
                        <Button
                          className="h-11 sm:h-10 bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow active:scale-95 transition-transform"
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

          {/* Favorites */}
          {favoriteItems.length > 0 && (
            <div className="mb-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary fill-current" />
                  Your Favorites
                </h2>
                <Badge variant="outline" className="w-fit border-primary/30 text-primary">
                  {favoriteItems.length} saved
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {favoriteItems.map((item) => (
                  <Card key={item.name} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-32 sm:h-40 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      <button
                        type="button"
                        aria-label={`Remove ${item.name} from favorites`}
                        onClick={() => toggleFavorite(item.name)}
                        className="absolute top-2 right-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm transition hover:bg-background active:scale-90"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </button>
                    </div>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-foreground line-clamp-1 text-sm sm:text-base">{item.name}</h3>
                      <div className="flex items-center justify-between mt-2 sm:mt-3 gap-2">
                        <span className="font-black text-primary text-sm sm:text-base">₹{item.price}</span>
                        <Button size="sm" variant="outline" onClick={() => openQuickView(item)} className="h-9 px-2.5">
                          <Eye className="mr-1 h-3.5 w-3.5" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Recently Viewed */}
          {recentlyViewed.length > 0 && (
            <div className="mb-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recently Viewed
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentlyViewed}
                  className="w-fit text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {recentlyViewed.map((item) => (
                  <Card
                    key={item.name}
                    className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden active:scale-95"
                    onClick={() => openQuickView(item)}
                  >
                    <div className="relative h-20 sm:h-28 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-2 sm:p-3">
                      <h4 className="font-semibold text-xs sm:text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-primary font-bold text-xs sm:text-sm">₹{item.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {searchQuery && (
            <p className="text-center text-muted-foreground mb-6 text-sm sm:text-base">
              Found {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} matching "{searchQuery}"
            </p>
          )}

          {/* Menu Items - Category grouped or flat */}
          {showCategoryView ? (
            <div className="space-y-10">
              {groupedByCategory.map((group) => (
                <div key={group.id} ref={(el) => { categoryRefs.current[group.id] = el; }}>
                  <div className="flex items-center gap-2 mb-4 scroll-mt-36">
                    <span className="text-2xl">{group.emoji}</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">{group.label}</h2>
                    <Badge variant="outline" className="ml-auto border-border/50 text-muted-foreground">
                      {group.items.length} items
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                    {group.items.map(renderMenuCard)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {sortedItems.map(renderMenuCard)}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No items found matching your criteria.</p>
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
            <AlertDialogCancel>Continue Shopping</AlertDialogCancel>
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

              <div className="relative h-44 sm:h-56 rounded-lg overflow-hidden flex-shrink-0">
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
                  <div className="grid grid-cols-4 gap-2">
                    <Badge variant="secondary" className="justify-center py-2 px-1">
                      <div className="text-center">
                        <div className="font-bold text-xs sm:text-sm">{selectedItem.nutrition.calories}</div>
                        <div className="text-[10px] sm:text-xs">Cal</div>
                      </div>
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 px-1">
                      <div className="text-center">
                        <div className="font-bold text-xs sm:text-sm">{selectedItem.nutrition.protein}</div>
                        <div className="text-[10px] sm:text-xs">Protein</div>
                      </div>
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 px-1">
                      <div className="text-center">
                        <div className="font-bold text-xs sm:text-sm">{selectedItem.nutrition.carbs}</div>
                        <div className="text-[10px] sm:text-xs">Carbs</div>
                      </div>
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 px-1">
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
                      className="h-10 w-10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="text-xl sm:text-2xl font-black text-primary">₹{selectedItem.price * quantity}</div>
                  <Button
                    className="w-full sm:flex-1 bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow h-12 sm:h-11 text-base active:scale-95 transition-transform"
                    onClick={() => {
                      handleAddToCart(selectedItem, quantity, specialInstructions);
                      setSelectedItem(null);
                    }}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
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
