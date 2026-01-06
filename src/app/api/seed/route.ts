import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();

    // 1. Clear existing products to avoid duplicates
    await Product.deleteMany({});

    // 2. Define the Menu Data (Extracted from your PDFs)
    const products = [
      // --- CAKES ---
      {
        name: "Choco Forest Cake",
        category: "CAKE",
        basePrice: 380,
        variants: [{ name: "0.5kg", price: 380 }, { name: "1kg", price: 750 }],
        tags: ["Chocolate", "Best Seller"],
        isBestSeller: true,
        images: ["/images/cakes/choco-forest.jpg"]
      },
      {
        name: "Choco Truffle Cake",
        category: "CAKE",
        basePrice: 400,
        variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
        tags: ["Chocolate", "Classic"],
        images: ["/images/cakes/choco-truffle.jpg"]
      },
      {
        name: "Dutch Chocolate Cake",
        category: "CAKE",
        basePrice: 400,
        variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
        tags: ["Chocolate", "Premium"],
        images: ["/images/cakes/dutch-choco.jpg"]
      },
      {
        name: "Strawberry Cake",
        category: "CAKE",
        basePrice: 400,
        variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
        tags: ["Fruit", "Fresh"],
        images: ["/images/cakes/strawberry.jpg"]
      },
      {
        name: "Butterscotch Cake",
        category: "CAKE",
        basePrice: 400,
        variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
        tags: ["Crunchy", "Classic"],
        images: ["/images/cakes/butterscotch.jpg"]
      },
      {
        name: "Pineapple Cake",
        category: "CAKE",
        basePrice: 400,
        variants: [{ name: "0.5kg", price: 400 }, { name: "1kg", price: 800 }],
        tags: ["Fruit", "Classic"],
        images: ["/images/cakes/pineapple.jpg"]
      },
      {
        name: "Rasmalai Cake",
        category: "CAKE",
        basePrice: 450,
        variants: [{ name: "0.5kg", price: 450 }, { name: "1kg", price: 900 }],
        tags: ["Fusion", "Indian", "Best Seller"],
        isBestSeller: true,
        images: ["/images/cakes/rasmalai.jpg"]
      },

      // --- DESSERT BOXES (GIFT_BOX) ---
      {
        name: "Oreo Chocolate Box",
        category: "GIFT_BOX",
        basePrice: 400,
        description: "350-450gms",
        tags: ["Dessert Box", "Chocolate"],
        images: ["/images/box/oreo.jpg"]
      },
      {
        name: "Nutella Chocolate Box",
        category: "GIFT_BOX",
        basePrice: 450,
        description: "350-450gms",
        tags: ["Dessert Box", "Hazelnut"],
        images: ["/images/box/nutella.jpg"]
      },
      {
        name: "Lotus Biscoff Box",
        category: "GIFT_BOX",
        basePrice: 500,
        description: "350-450gms",
        tags: ["Dessert Box", "Premium"],
        images: ["/images/box/lotus.jpg"]
      },

      // --- CAKE JARS ---
      {
        name: "Rasmalai Jar",
        category: "JAR",
        basePrice: 220,
        description: "250ml Jar",
        tags: ["Fusion", "Best Seller"],
        isBestSeller: true,
        images: ["/images/jars/rasmalai.jpg"]
      },
      {
        name: "Nutella Jar",
        category: "JAR",
        basePrice: 250,
        description: "250ml Jar",
        tags: ["Chocolate"],
        images: ["/images/jars/nutella.jpg"]
      },
      {
        name: "Red Velvet Jar",
        category: "JAR",
        basePrice: 220,
        description: "250ml Jar",
        tags: ["Cake"],
        images: ["/images/jars/red-velvet.jpg"]
      },

      // --- CHOCOLATES ---
      {
        name: "Kunafa Pistachio Bar",
        category: "CHOCOLATE",
        basePrice: 300,
        variants: [{ name: "Full Bar", price: 300 }, { name: "Mini Bar", price: 180 }, { name: "10 Pcs", price: 300 }],
        tags: ["Trending", "Best Seller"],
        isBestSeller: true,
        images: ["/images/chocolates/kunafa.jpg"]
      },
      {
        name: "Dark Chocolate Hazelnut Bar",
        category: "CHOCOLATE",
        basePrice: 240,
        variants: [{ name: "Full Bar", price: 240 }, { name: "Mini Bar", price: 130 }, { name: "10 Pcs", price: 150 }],
        tags: ["Premium", "Nuts"],
        images: ["/images/chocolates/hazelnut.jpg"]
      },
      {
        name: "Dry Fruit Chocolate",
        category: "CHOCOLATE",
        basePrice: 200,
        variants: [{ name: "Full Bar", price: 200 }, { name: "Mini Bar", price: 110 }, { name: "10 Pcs", price: 130 }],
        tags: ["Classic", "Healthy"],
        images: ["/images/chocolates/dryfruit.jpg"]
      },
      {
        name: "Roasted Almond Bar",
        category: "CHOCOLATE",
        basePrice: 200,
        variants: [{ name: "Full Bar", price: 200 }, { name: "Mini Bar", price: 110 }],
        tags: ["Nuts"],
        images: ["/images/chocolates/almond.jpg"]
      }
    ];

    // 3. Insert Data
    await Product.insertMany(products);

    return NextResponse.json({ 
      message: "Database seeded successfully!", 
      count: products.length 
    });
  } catch (error) {
    return NextResponse.json({ error: "Seeding failed", details: error }, { status: 500 });
  }
}