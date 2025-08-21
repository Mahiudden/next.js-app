import Link from "next/link";
import ProgressiveImage from "./ProgressiveImage";
import { ShoppingCart } from "lucide-react";

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        {product.image ? (
          <ProgressiveImage
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => {
              console.error('Image failed to load:', product.image);
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </span>
          
          <Link
            href={`/products/${product.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Details
          </Link>
        </div>
        
        {product.user?.name && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Added by {product.user.name}
          </p>
        )}
      </div>
    </div>
  );
}
