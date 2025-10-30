import { useEffect } from "react";
import useStore from "../../Store/useStore";

export default function Orders() {
  const { orders, FetchOrders, user } = useStore();

  useEffect(() => {
    if (user?.uid) FetchOrders(user.uid);
  }, [user,FetchOrders]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">No orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Order Header */}
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    Order #{order.id}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Date: {new Date(order.orderDate).toLocaleString()}
                  </p>
                </div>
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

              {/* Order Items */}
              <ul className="mt-4 border-t border-gray-200 pt-3 space-y-2">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center text-sm text-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      )}
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              {/* Address Section */}
            {order.address && (
           <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <p className="text-gray-700 font-medium mb-2">📍 Delivery Address</p>
        
            {(() => {
              const a = Array.isArray(order.address) ? order.address[0] : order.address;
              if (!a) return null;
        
              return (
                <div className="text-gray-600 text-sm leading-relaxed border-l-4 border-blue-400 pl-3">
                  {a.name && <p className="font-semibold">{a.name}</p>}
                  {a.mobile && <p>{a.mobile}</p>}
                  <p>
                    {a.addressLine}
                    {a.city && `, ${a.city}`}
                    {a.state && `, ${a.state}`}
                    {a.pincode && ` - ${a.pincode}`}
                  </p>
                  {a.type && (
                    <p className="text-gray-500 text-xs mt-1">({a.type})</p>
                  )}
                </div>
              );
            })()}
          </div>
            )}
              {/* Total */}
              <div className="mt-4 flex justify-between items-center">
                <p className="font-semibold text-gray-800 text-lg">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
