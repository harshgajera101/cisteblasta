import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";

// REAL DATA FROM PDFS
const seedProducts = [
  // --- CAKES (Page 1) ---
  {
    name: "Choco Forest Cake",
    category: "CAKE",
    description: "Classic chocolate sponge with forest toppings.",
    variants: [{ name: "0.5kg", price: 380 }, { name: "1kg", price: 750 }],
    tags: ["Chocolate", "Birthday", "Classic"],
    images: ["/images/cake-choco-forest.jpg"]
  },
  {
    name: "Choco Truffle Cake",
    category: "CAKE",
    description: "Rich chocolate ganache glaze.",
    variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
    tags: ["Chocolate", "Best Seller", "Birthday"],
    isBestSeller: true,
    images: ["/images/cake-truffle.jpg"]
  },
  {
    name: "Dutch Chocolate Cake",
    category: "CAKE",
    description: "Premium Dutch cocoa for an intense flavor.",
    variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
    tags: ["Chocolate", "Premium"],
    images: ["/images/cake-dutch.jpg"]
  },
  {
    name: "Strawberry Cake",
    category: "CAKE",
    description: "Fresh strawberry flavor.",
    variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
    tags: ["Fruit", "Kids"],
    images: ["/images/cake-strawberry.jpg"]
  },
  {
    name: "Butterscotch Cake",
    category: "CAKE",
    description: "Crunchy caramel and butterscotch chips.",
    variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
    tags: ["Classic", "Crunchy"],
    images: ["/images/cake-butterscotch.jpg"]
  },
  {
    name: "White Forest Cake",
    category: "CAKE",
    description: "White chocolate shavings with cherries.",
    variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
    tags: ["White Chocolate", "Classic"],
    images: ["/images/cake-white-forest.jpg"]
  },
  {
    name: "Pineapple Cake",
    category: "CAKE",
    description: "Juicy pineapple chunks and fresh cream.",
    variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
    tags: ["Fruit", "Classic"],
    images: ["/images/cake-pineapple.jpg"]
  },
  {
    name: "Choco Ferrero Rocher Cake",
    category: "CAKE",
    description: "Loaded with Ferrero Rocher chocolates.",
    variants: [{ name: "0.5kg", price: 450 }, { name: "1kg", price: 900 }],
    tags: ["Premium", "Chocolate", "Best Seller"],
    isBestSeller: true,
    images: ["/images/cake-ferrero.jpg"]
  },
  {
    name: "Choco Mousse Cake",
    category: "CAKE",
    description: "Light and airy chocolate mousse.",
    variants: [{ name: "0.5kg", price: 450 }, { name: "1kg", price: 900 }],
    tags: ["Chocolate", "Dessert"],
    images: ["/images/cake-mousse.jpg"]
  },
  {
    name: "Choco Chips Cake",
    category: "CAKE",
    description: "Overloaded with chocolate chips.",
    variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
    tags: ["Chocolate", "Kids"],
    images: ["/images/cake-chips.jpg"]
  },
  {
    name: "Choco Kitkat Cake",
    category: "CAKE",
    description: "Surrounded by KitKat bars.",
    variants: [{ name: "0.5kg", price: 800 }, { name: "1kg", price: 1200 }],
    tags: ["Chocolate", "Kids", "Premium"],
    images: ["/images/cake-kitkat.jpg"]
  },
  {
    name: "Pull Up Cake",
    category: "CAKE",
    description: "Trending molten chocolate pull-up experience.",
    variants: [{ name: "0.5kg", price: 800 }, { name: "1kg", price: 1200 }],
    tags: ["Trending", "Custom"],
    images: ["/images/cake-pullup.jpg"]
  },
  {
    name: "Burn Away Cake",
    category: "CAKE",
    description: "Reveal a hidden message with fire.",
    variants: [{ name: "0.5kg", price: 800 }, { name: "1kg", price: 1200 }],
    tags: ["Trending", "Custom", "Surprise"],
    images: ["/images/cake-burn.jpg"]
  },

  // --- DESSERT BOXES (Page 2) ---
  {
    name: "Oreo Chocolate Box",
    category: "GIFT_BOX",
    description: "350-450gms Dessert Box.",
    basePrice: 400,
    tags: ["Dessert Box", "Gift"],
    images: ["/images/box-oreo.jpg"]
  },
  {
    name: "Nutella Chocolate Box",
    category: "GIFT_BOX",
    description: "350-450gms Dessert Box.",
    basePrice: 450,
    tags: ["Dessert Box", "Nutella"],
    images: ["/images/box-nutella.jpg"]
  },
  {
    name: "Lotus Biscoff Box",
    category: "GIFT_BOX",
    description: "350-450gms Dessert Box.",
    basePrice: 500,
    tags: ["Dessert Box", "Biscoff", "Trending"],
    images: ["/images/box-biscoff.jpg"]
  },
  {
    name: "Classic Mango Box",
    category: "GIFT_BOX",
    description: "Seasonal Special Dessert Box.",
    basePrice: 480,
    isSeasonal: true,
    tags: ["Dessert Box", "Mango", "Seasonal"],
    images: ["/images/box-mango.jpg"]
  },

  // --- CAKE JARS (Page 3) ---
  {
    name: "Rasmalai Jar",
    category: "JAR",
    description: "250ml Jar. Fusion of cake and sweets.",
    basePrice: 220,
    tags: ["Jar", "Fusion"],
    images: ["/images/jar-rasmalai.jpg"]
  },
  {
    name: "Ferrero Rocher Jar",
    category: "JAR",
    description: "250ml Jar.",
    basePrice: 240,
    tags: ["Jar", "Chocolate"],
    images: ["/images/jar-ferrero.jpg"]
  },
  {
    name: "Red Velvet Jar",
    category: "JAR",
    description: "250ml Jar.",
    basePrice: 220,
    tags: ["Jar", "Classic"],
    images: ["/images/jar-redvelvet.jpg"]
  },
  {
    name: "Nutella Jar",
    category: "JAR",
    description: "250ml Jar.",
    basePrice: 250,
    tags: ["Jar", "Chocolate"],
    images: ["/images/jar-nutella.jpg"]
  },

  // --- CHOCOLATES (Chocolate Menu PDF) ---
  {
    name: "Kunafa Pistachio Bar",
    category: "CHOCOLATE",
    description: "Viral Dubai Chocolate Bar.",
    variants: [{ name: "Standard", price: 300 }, { name: "Mini", price: 180 }, { name: "10pcs", price: 300 }, { name: "20pcs", price: 580 }],
    tags: ["Chocolate", "Viral", "Pistachio"],
    isBestSeller: true,
    images: ["/images/choco-kunafa.jpg"]
  },
  {
    name: "Dark Hazelnut & Pistachio",
    category: "CHOCOLATE",
    description: "Rich dark chocolate with nuts.",
    variants: [{ name: "Standard", price: 240 }, { name: "Mini", price: 130 }, { name: "10pcs", price: 150 }, { name: "20pcs", price: 280 }],
    tags: ["Chocolate", "Dark Chocolate"],
    images: ["/images/choco-hazelnut.jpg"]
  },
  {
    name: "Roasted Almond Bar",
    category: "CHOCOLATE",
    description: "Crunchy almond goodness.",
    variants: [{ name: "Standard", price: 200 }, { name: "Mini", price: 110 }],
    tags: ["Chocolate", "Nuts"],
    images: ["/images/choco-almond.jpg"]
  },
  {
    name: "Mix Berries Bar",
    category: "CHOCOLATE",
    description: "Tangy berries in chocolate.",
    variants: [{ name: "Standard", price: 200 }, { name: "Mini", price: 110 }],
    tags: ["Chocolate", "Fruity"],
    images: ["/images/choco-berry.jpg"]
  },
  {
    name: "Fruit White Chocolate",
    category: "CHOCOLATE",
    description: "White chocolate with dried fruits.",
    variants: [{ name: "Standard", price: 250 }, { name: "Mini", price: 180 }],
    tags: ["Chocolate", "White Chocolate"],
    images: ["/images/choco-white-fruit.jpg"]
  }
];

export async function GET() {
  try {
    await dbConnect();

    // 1. Clear existing data
    await Product.deleteMany({});

    // 2. Insert new real data
    await Product.insertMany(seedProducts);

    return NextResponse.json({ 
      message: "Database seeded successfully with Real Menu Data", 
      count: seedProducts.length 
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Error seeding database", details: error },
      { status: 500 }
    );
  }
}