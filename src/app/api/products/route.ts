import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToMongo } from "@/lib/mongodb";
import { ProductModel } from "@/lib/models/Product";

export async function GET() {
  try {
    await connectToMongo();
    const products = await ProductModel.find({})
      .sort({ createdAt: -1 });

    const result = products.map((p) => ({
      id: String(p._id),
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      createdAt: p.createdAt,
      user: { name: "User" }, // Since userId is string, we can't populate
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    
    // More detailed error response
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session in POST /api/products:", session);

    if (!session?.user?.id) {
      console.log("No user ID in session");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("User ID from session:", session.user.id);

    const body = await request.json();
    const { name, description, price, image } = body;
    console.log("Product data:", { name, description, price, image });

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToMongo();
    console.log("Connected to MongoDB, creating product...");
    
    const created = await ProductModel.create({
      name,
      description,
      price: parseFloat(price),
      image,
      userId: session.user.id,
    });

    console.log("Product created successfully:", created);
    return NextResponse.json({ id: String(created._id) }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
