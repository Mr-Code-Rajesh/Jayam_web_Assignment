import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../../Store/useStore";
import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import Placeorder from "./Placeorder";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(true);

  // Cart
  const cart = useStore((s) => s.cart);
  const ToggleCart = useStore((s) => s.ToggleCart);
  const FetchCart = useStore((s) => s.FetchCart);

  useEffect(() => {
    FetchCart();
  }, [FetchCart]);

  // Fetch Addresses
  const fetchAddresses = async () => {
    try {
      setLoadingAddress(true);
      const res = await axios.get(
        `http://localhost:3000/addresses?userId=${user.uid}`
      );
      setAddresses(res.data);
      if (res.data.length > 0) setSelected(res.data[0]);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    } finally {
      setLoadingAddress(false);
    }
  };

  useEffect(() => {
    if (user) fetchAddresses();
  }, [user]);

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-600">
        Please login to view your cart.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md p-4 sm:p-6 rounded-lg mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <h2 className="text-2xl font-semibold">My Cart</h2>
          <span className="bg-amber-500 text-white font-semibold w-8 h-8 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        </div>
      </div>

      {/* Address Section */}
      <div className="border-b pb-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>

        {loadingAddress ? (
          <p className="text-gray-500">Loading address...</p>
        ) : addresses.length === 0 ? (
          <div className="text-gray-600">
            <p>No address found.</p>
            <button
              onClick={() => navigate("/dashboard/address")}
              className="mt-2 bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-700 transition text-sm"
            >
              <Plus className="inline-block mr-1 w-4 h-4" />
              Add Address
            </button>
          </div>
        ) : selected ? (
          <div className="text-gray-700">
            <p className="text-sm sm:text-base leading-relaxed">
              <span className="font-medium">{selected.name}</span>,{" "}
              {selected.addressLine}, {selected.city}, {selected.state},{" "}
              {selected.pincode}
            </p>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
              <div>
                <label className="font-medium text-sm">Change Address:</label>
                <select
                  value={selected.id}
                  onChange={(e) =>
                    setSelected(
                      addresses.find((a) => String(a.id) === e.target.value)
                    )
                  }
                  className="border border-gray-400 rounded-md px-3 py-1 text-sm ml-2 cursor-pointer"
                >
                  {addresses.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} - {a.city}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => navigate("/dashboard/address")}
                className="flex items-center gap-2 bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-700 transition text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Select an address</p>
        )}
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <p className="text-center text-xl text-gray-600 py-6">
          Your Cart is empty 💔
        </p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cart.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="border border-gray-200 rounded-lg p-3 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-contain mb-3"
              />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">Price: ${item.price}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => ToggleCart(item)}
                className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-md shadow-md hover:from-red-600 hover:to-red-700 transition-all text-sm w-full sm:w-auto"
              >
                <X className="w-4 h-4" />
                <span>Remove</span>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Sticky Footer for Place Order */}
      {cart.length > 0 && (
        <div className=" bg-white border-t border-gray-200 mt-6 py-3 px-4 sm:px-6 flex flex-col sm:flex-row justify-end items-center gap-3">
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <Placeorder
              userid={user?.id}
              addresses={addresses}
              selectedAddress={selected}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
