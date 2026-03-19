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
import { comboDeals, FAVORITES_STORAGE_KEY, menuItems, type ComboDeal, type MenuItem } from "@/data/menuData";

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

  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 4);

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

  return (
    <section id="menu" className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Delicious Menu</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Freshly prepared with premium ingredients and authentic flavors
          </p>
        </div>

        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-8 md:mb-10">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 sm:grid-cols-4 h-auto gap-2 bg-card/60 p-2 backdrop-blur">
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Combo / Meal Deals</h3>
              <p className="text-muted-foreground mt-1">Discounted bundles for bigger cravings.</p>
            </div>
            <Badge variant="outline" className="w-fit border-primary/30 text-primary">
              Save more
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {comboDeals.map((deal) => {
              const savings = deal.originalPrice - deal.dealPrice;
              return (
                <Card key={deal.name} className="overflow-hidden border-primary/20 hover:shadow-lg transition-all duration-300">
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" loading="lazy" />
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
                    <div className="flex items-end justify-between gap-3">
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary fill-current" />
                Favorite Items
              </h3>
              <Badge variant="outline" className="w-fit border-primary/30 text-primary">
                {favoriteItems.length} saved
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {favoriteItems.map((item) => (
                <Card key={item.name} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
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
                    <div className="mt-3 flex items-center justify-between gap-2">
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
                className={`group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  item.featured ? "ring-2 ring-primary shadow-glow" : ""
                }`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
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
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
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

                  <div className="flex items-center justify-between mb-3 gap-2">
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

        {filteredItems.length > 4 && (
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

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="w-[95vw] max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3 pr-8">
                  <div>
                    <DialogTitle className="text-xl sm:text-2xl">{selectedItem.name}</DialogTitle>
                    <DialogDescription className="text-sm sm:text-base mt-2">{selectedItem.description}</DialogDescription>
                  </div>
                  <Button variant="outline" size="icon" onClick={() => toggleFavorite(selectedItem.name)}>
                    <Heart
                      className={`h-4 w-4 ${favoriteNames.includes(selectedItem.name) ? "fill-current text-primary" : "text-muted-foreground"}`}
                    />
                  </Button>
                </div>
              </DialogHeader>

              <div className="grid gap-4 mt-4">
                <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
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
                    <p className="text-sm text-muted-foreground">{selectedItem.ingredients}</p>
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

                <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-3xl font-black text-primary">₹{selectedItem.price}</div>
                  <Button
                    className="w-full sm:w-auto sm:min-w-48 bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow"
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
  )
}

export default Menu;
