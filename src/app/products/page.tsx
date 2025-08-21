"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Loader2, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  user?: {
    name?: string | null;
  } | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading products...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover our amazing collection of products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No products available
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Be the first to add a product to our collection!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
