import React from "react";
import useStore from "../../Store/useStore";
import { motion } from "framer-motion";

export default function Placeorder({ userid, selectedAddress }) {
  const cart = useStore((s) => s.cart);
  const ClearCart = useStore((s) => s.ClearCart);
  const PlaceOrder = useStore((s) => s.PlaceOrder);

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white rounded-md shadow-sm border border-gray-200">
      {/* Cart Summary */}
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-xl text-gray-800 font-semibold">
          🛒 Items in Cart:{" "}
          <span className="text-amber-600 font-bold">{cart.length}</span>
        </h2>
        <h2 className="text-lg sm:text-xl text-gray-800 font-semibold mt-1">
          💰 Total Price:{" "}
          <span className="text-green-600 font-bold">${totalPrice}</span>
        </h2>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        {/* Place Order */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!selectedAddress}
          onClick={() => PlaceOrder(userid, selectedAddress)}
        className={`px-5 py-2.5 rounded-md text-white shadow
            ${selectedAddress  ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          ✅ Place Order
        </motion.button>

        {/* Clear Cart */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => ClearCart(user?.id)}
          className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-md shadow-md transition-all duration-300 flex items-center justify-center gap-2"
        >
          🗑 Clear Cart
        </motion.button>
      </div>
    </div>
  );
}
