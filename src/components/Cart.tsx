import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount, notes, setNotes, isCartOpen, setIsCartOpen } = useCart();

  const handleOrderNow = () => {
    if (items.length === 0) return;

    const orderMessage = items
      .map((item) => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`)
      .join("%0A");
    
    const totalMessage = `%0A%0ATotal: ₹${total}`;
    const notesMessage = notes.trim() ? `%0A%0ASpecial Instructions:%0A${encodeURIComponent(notes)}` : "";
    const whatsappUrl = `https://wa.me/918855888965?text=Hi!%20I%20want%20to%20order:%0A%0A${orderMessage}${totalMessage}${notesMessage}`;
    
    window.open(whatsappUrl, "_blank");
    clearCart();
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCart className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex gap-4 p-4 bg-muted rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{item.name}</h3>
                    <p className="text-primary font-bold">₹{item.price}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.name, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8 ml-auto"
                        onClick={() => removeItem(item.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
            <div className="mb-4">
              <Label htmlFor="special-notes" className="text-sm font-medium mb-2 block">
                Special Instructions (Optional)
              </Label>
              <Textarea
                id="special-notes"
                placeholder="Any special requests? (e.g., extra spicy, no onions, etc.)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[60px] resize-none"
                maxLength={200}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-black text-primary">₹{total}</span>
            </div>
            <Button
              className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow-yellow"
              size="lg"
              onClick={handleOrderNow}
            >
              Order Now via WhatsApp
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
