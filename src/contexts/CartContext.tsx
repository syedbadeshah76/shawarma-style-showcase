import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  specialInstructions?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number, specialInstructions?: string) => void;
  removeItem: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  notes: string;
  setNotes: (notes: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1, specialInstructions?: string) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.name === item.name && i.specialInstructions === specialInstructions);
      if (existingItem) {
        return prev.map((i) =>
          i.name === item.name && i.specialInstructions === specialInstructions 
            ? { ...i, quantity: i.quantity + quantity } 
            : i
        );
      }
      return [...prev, { ...item, quantity, specialInstructions }];
    });
  };

  const removeItem = (name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  };

  const updateQuantity = (name: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(name);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setNotes("");
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        notes,
        setNotes,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
