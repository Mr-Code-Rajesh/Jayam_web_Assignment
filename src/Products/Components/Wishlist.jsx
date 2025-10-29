import { useEffect } from "react";
import useStore from "../../Store/useStore";
import { motion } from "framer-motion";
import Spinner from "./Spinner";
import { X, Heart } from "lucide-react";


export default function Wishlist() {
  const wishlist = useStore((s) => s.wishlist);
  const ToggleWishlist = useStore((s) => s.ToggleWishlist);
  const FetchWishlist = useStore((s) => s.FetchWishlist);
  const loading = useStore((s) => s.loading);
  const user = useStore((s) => s.user);

  useEffect(() => {
    if (user?.uid) {
      FetchWishlist(user?.uid);
    }
  }, [user]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left mb-5">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <Heart className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-semibold text-gray-800">My Wishlist</h2>
        </div>
        <p className="bg-amber-500 text-white font-medium w-8 h-8 flex items-center justify-center rounded-full mt-2 sm:mt-0">
          {wishlist.length}
        </p>
      </div>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-600">
          <Heart className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-lg font-medium">
            Your wishlist is empty... 💔
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Add your favorite products to keep them handy ❤️
          </p>
        </div>
      ) : (
        <>
          <p className="text-center text-gray-500 text-sm mb-5">
            Your wishlist items appear below. Manage or remove them anytime.
          </p>

          {/* Wishlist Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-gray-200 rounded-lg p-3 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-44 object-contain mb-3 rounded-md"
                />

                {/* Product Info */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Price:{" "}
                  <span className="text-gray-800 font-medium">
                    ${item.price.toFixed(2)}
                  </span>
                </p>

                {/* Remove Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    ToggleWishlist({ ...item, id: item.productId }, user?.uid);
                  }}
                  className="mt-2 w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-md shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                  <span>Remove</span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
















