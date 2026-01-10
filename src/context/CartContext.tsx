// "use client";

// import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// // Types
// export interface CartItem {
//   productId: string;
//   name: string;
//   price: number;
//   image?: string;
//   variant?: string; // e.g., "0.5kg" or "Mini Bar"
//   quantity: number;
//   category: string;
// }

// interface CartContextType {
//   items: CartItem[];
//   addToCart: (product: any, variantIdx?: number) => void;
//   removeFromCart: (productId: string, variant?: string) => void;
//   updateQuantity: (productId: string, variant: string | undefined, delta: number) => void;
//   clearCart: () => void;
//   cartTotal: number;
//   cartCount: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([]);

//   // 1. Load Cart from LocalStorage on mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem("ciste-cart");
//     if (savedCart) {
//       setItems(JSON.parse(savedCart));
//     }
//   }, []);

//   // 2. Save Cart to LocalStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("ciste-cart", JSON.stringify(items));
//   }, [items]);

//   // --- Actions ---

//   const addToCart = (product: any, variantIdx: number = 0) => {
//     setItems((prev) => {
//       // Determine Price & Variant Name
//       const hasVariants = product.variants && product.variants.length > 0;
//       const price = hasVariants ? product.variants[variantIdx].price : product.basePrice;
//       const variantName = hasVariants ? product.variants[variantIdx].name : undefined;
//       const image = product.images?.[0] || "";

//       // Check if item already exists (Same ID + Same Variant)
//       const existingItem = prev.find(
//         (item) => item.productId === product._id && item.variant === variantName
//       );

//       if (existingItem) {
//         // Just increase quantity
//         return prev.map((item) =>
//           item.productId === product._id && item.variant === variantName
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }

//       // Add new item
//       return [
//         ...prev,
//         {
//           productId: product._id,
//           name: product.name,
//           price,
//           variant: variantName,
//           image,
//           category: product.category,
//           quantity: 1,
//         },
//       ];
//     });
//   };

//   const removeFromCart = (productId: string, variant?: string) => {
//     setItems((prev) => prev.filter((item) => !(item.productId === productId && item.variant === variant)));
//   };

//   const updateQuantity = (productId: string, variant: string | undefined, delta: number) => {
//     setItems((prev) =>
//       prev.map((item) => {
//         if (item.productId === productId && item.variant === variant) {
//           const newQty = item.quantity + delta;
//           return newQty > 0 ? { ...item, quantity: newQty } : item;
//         }
//         return item;
//       })
//     );
//   };

//   const clearCart = () => setItems([]);

//   // Calculate Totals
//   const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
//   const cartCount = items.reduce((count, item) => count + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// // Custom Hook to use the Cart easily
// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }








"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Types
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image?: string;
  variant?: string; // e.g., "0.5kg" or "Mini Bar"
  quantity: number;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, variantIdx?: number) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, variant: string | undefined, delta: number) => void;
  getItemQuantity: (productId: string, variant?: string) => number; // ADDED THIS
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // 1. Load Cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ciste-cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // 2. Save Cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ciste-cart", JSON.stringify(items));
  }, [items]);

  // --- Actions ---

  const addToCart = (product: any, variantIdx: number = 0) => {
    setItems((prev) => {
      // Determine Price & Variant Name
      const hasVariants = product.variants && product.variants.length > 0;
      const price = hasVariants ? product.variants[variantIdx].price : product.basePrice;
      const variantName = hasVariants ? product.variants[variantIdx].name : undefined;
      const image = product.images?.[0] || "";

      // Check if item already exists (Same ID + Same Variant)
      const existingItem = prev.find(
        (item) => item.productId === product._id && item.variant === variantName
      );

      if (existingItem) {
        // Just increase quantity
        return prev.map((item) =>
          item.productId === product._id && item.variant === variantName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new item
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price,
          variant: variantName,
          image,
          category: product.category,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId: string, variant?: string) => {
    setItems((prev) => prev.filter((item) => !(item.productId === productId && item.variant === variant)));
  };

  const updateQuantity = (productId: string, variant: string | undefined, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.variant === variant) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  // NEW: Helper to get quantity of a specific item variant
  const getItemQuantity = (productId: string, variant?: string) => {
    const item = items.find((i) => i.productId === productId && i.variant === variant);
    return item ? item.quantity : 0;
  };

  const clearCart = () => setItems([]);

  // Calculate Totals
  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, getItemQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook to use the Cart easily
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}