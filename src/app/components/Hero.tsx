import Link from "next/link";
import { ArrowRight, ShoppingBag, Star, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Amazing
            <span className="text-blue-600 dark:text-blue-400"> Products</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore our curated collection of high-quality products. From electronics
            to fashion, we have everything you need to enhance your lifestyle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link
              href="/login"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Sign Up
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Fast Delivery
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Free shipping on orders over $50
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Quality Guaranteed
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Premium products with warranty
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Easy Returns
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                30-day return policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
