import { NextRequest, NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongodb";
import { ProductModel } from "@/lib/models/Product";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToMongo();
    const product = await ProductModel.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: String(product._id),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      createdAt: product.createdAt,
      user: { name: "User" }, // Since userId is string, we can't populate
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
