import shawarmaMain from "@/assets/shawarma-main.jpg";
import miniShawarma from "@/assets/mini-shawarma.jpg";
import burger from "@/assets/burger.jpg";
import fries from "@/assets/fries.jpg";
import wrap from "@/assets/wrap.jpg";
import broasted from "@/assets/broasted.jpg";
import momos from "@/assets/momos.jpg";

export type MenuItem = {
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

export type ComboDeal = {
  name: string;
  items: string[];
  originalPrice: number;
  dealPrice: number;
  image: string;
  prepTime: string;
  description: string;
};

export const FAVORITES_STORAGE_KEY = "favoriteMenuItems";
export const RECENTLY_VIEWED_STORAGE_KEY = "recentlyViewedItems";

export const menuItems: MenuItem[] = [
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
].map((item) => {
  let image = item.image;
  const lowerName = item.name.toLowerCase();

  if (lowerName.includes("shawarma") || lowerName.includes("rumali roti")) image = shawarmaMain;
  else if (lowerName.includes("mini") && lowerName.includes("shawarma")) image = miniShawarma;
  else if (lowerName.includes("wrap") || lowerName.includes("roll")) image = wrap;
  else if (lowerName.includes("burger") || lowerName.includes("sandwich")) image = burger;
  else if (lowerName.includes("fries") || lowerName.includes("coffee") || lowerName.includes("mocktails") || lowerName.includes("mayonnaise")) image = fries;
  else if (lowerName.includes("broasted") || lowerName.includes("nuggets")) image = broasted;
  else if (lowerName.includes("momos")) image = momos;

  return { ...item, image };
});

export const comboDeals: ComboDeal[] = [
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
