import { Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  price: string;
  category: string;
  image?: string;
  className?: string;
}

export default function ProductCard({ title, price, category, className }: ProductCardProps) {
  return (
    <div className={cn(
      "group relative rounded-2xl bg-white border border-muted shadow-sm transition-all duration-500", // bg-white is key here
      "hover:shadow-lg hover:-translate-y-1 hover:border-primary/30",
      className
    )}>
      
      {/* Image Area - Soft Beige Placeholder */}
      <div className="aspect-[4/5] w-full overflow-hidden rounded-t-2xl bg-[#FAF5F0] relative">
        <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 font-playfair italic">
          [Delicious Image]
        </div>
        
        {/* Category Badge - Minimalist */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary rounded-full shadow-sm">
          {category}
        </span>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-primary hover:text-white text-foreground/60 transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
            <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Details */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-playfair text-lg font-bold text-foreground truncate">{title}</h3>
          <p className="text-sm font-medium text-primary mt-1">{price}</p>
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-muted/30 py-3 text-xs font-bold text-foreground uppercase tracking-wider transition-all hover:bg-primary hover:text-white">
          <ShoppingBag className="h-3 w-3" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}