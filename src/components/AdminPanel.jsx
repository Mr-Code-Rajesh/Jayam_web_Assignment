import { useEffect, useState } from "react";
import useStore from "../Store/useStore";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

// Notes : AdminPanel component to manage and update order statuses.
// Purpose: To allow admin users to view all orders and update their statuses.


export default function AdminPanel() {
  const { orders, FetchOrders } = useStore();
  const [updating, setUpdating] = useState(false);

  //all orders 
  useEffect(() => {
    FetchOrders(); 
  }, [FetchOrders]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      await axios.patch(`http://localhost:3000/orders/${orderId}`, {
        status: newStatus,
      });
      toast.success(`Order #${orderId} marked as ${newStatus}`);
      FetchOrders();
    } catch (err) {
      console.error("Error updating status", err);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const statuses = ["On Process", "Shipped", "Arrived", "Delivered"];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">🧑‍💼 Admin - Manage Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
            >
              {/* Header */}
              <div className="flex flex-wrap justify-between items-center mb-2">
                <p className="font-semibold text-gray-800 text-lg">
                  Order #{order.id}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Arrived"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <ul className="border-t border-gray-200 pt-3 space-y-2">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      )}
                      <span>{item.title}</span>
                    </div>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              {/* Address */}
              {Array.isArray(order.address) && order.address.length > 0 && (
                <div className="mt-3 bg-gray-50 p-3 rounded-md">
                  <p className="text-gray-700 font-medium mb-1">📍 Delivery Address</p>
                  {order.address.map((addr) => (
                    <div
                      key={addr.id}
                      className="text-gray-600 text-sm leading-relaxed border-l-4 border-blue-400 pl-3 mb-2"
                    >
                      <p className="font-medium">{addr.name}</p>
                      <p>{addr.mobile}</p>
                      <p>
                        {addr.addressLine}, {addr.state} {addr.pincode}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer: Status Update */}
              <div className="mt-4 flex justify-between items-center">
                <p className="font-semibold text-gray-800">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>

                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  disabled={updating}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
