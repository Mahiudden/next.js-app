"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, LogOut, Plus } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-900 dark:shadow-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                E-Commerce
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Products
            </Link>

            {session ? (
              <>
                <Link
                  href="/dashboard/add-product"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/register"
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
