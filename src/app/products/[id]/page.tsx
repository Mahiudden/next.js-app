"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Loader2, ShoppingCart, User, Calendar } from "lucide-react";
import ProgressiveImage from "../../components/ProgressiveImage";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  createdAt: string;
  user?: {
    name?: string | null;
  } | null;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading product details...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Product not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The product you&apos;re looking for doesn&apos;t exist.
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-96 lg:h-full bg-gray-200 dark:bg-gray-700">
              {product.image ? (
                <ProgressiveImage
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ShoppingCart className="h-32 w-32 text-gray-400" />
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {product.user?.name && (
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Added by <span className="font-medium">{product.user.name}</span>
                    </span>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Added on {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
