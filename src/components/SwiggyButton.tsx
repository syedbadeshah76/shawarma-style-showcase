import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SWIGGY_RESTAURANT_URL, swiggySearchUrl } from "@/data/menuData";

interface SwiggyButtonProps {
  /** If provided, links to a Swiggy search for that item, else to the main restaurant page */
  itemName?: string;
  label?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "solid" | "outline" | "compact";
  className?: string;
  showIcon?: boolean;
}

const SwiggyButton = ({
  itemName,
  label = "Swiggy",
  size = "sm",
  variant = "solid",
  className,
  showIcon = true,
}: SwiggyButtonProps) => {
  const href = itemName ? swiggySearchUrl(itemName) : SWIGGY_RESTAURANT_URL;

  const baseStyles =
    variant === "outline"
      ? "border border-[#fc8019] bg-transparent text-[#fc8019] hover:bg-[#fc8019] hover:text-white"
      : variant === "compact"
        ? "bg-[#fc8019] hover:bg-[#e87011] text-white"
        : "bg-[#fc8019] hover:bg-[#e87011] text-white shadow-md";

  return (
    <Button
      asChild
      size={size}
      className={cn(baseStyles, "font-semibold transition-colors active:scale-95", className)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={itemName ? `Order ${itemName} on Swiggy` : "Order on Swiggy"}
      >
        {showIcon && <span className="mr-1 text-base leading-none">🛵</span>}
        {label}
        {variant !== "compact" && <ExternalLink className="ml-1 h-3.5 w-3.5" />}
      </a>
    </Button>
  );
};

export default SwiggyButton;
