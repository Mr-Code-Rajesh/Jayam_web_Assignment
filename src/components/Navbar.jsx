import { Link } from "react-router-dom";
import useStore from "../Store/useStore";
import { logoutUser as firebaseLogout } from "../Utilize/Firebase";
import { useEffect, useState, useRef } from "react";
import { ShoppingCart, Search } from "lucide-react";

export default function Navbar() {
  const { user, logoutUser } = useStore();
  const cart = useStore((s) => s.cart);
  const searchQuery = useStore((s) => s.searchQuery);
  const SearchProduct = useStore((s) => s.SearchProduct);

  const [hovering, setHovering] = useState(false);
  const [input, setInput] = useState(searchQuery);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await firebaseLogout();
    logoutUser();
  };

  //  Debounce Logic Search
  useEffect(() => {
    const t = setTimeout(() => SearchProduct(input), 300);
    return () => clearTimeout(t);
  }, [input, SearchProduct]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sample Suggestions
  const sampleSuggestions = [
    "Wooden Table",
    "Smartphone",
    "LED Lamp",
    "Headphones",
    "Sofa Set",
    "Cotton Bedsheet",
  ];

  const filteredSuggestions = sampleSuggestions.filter((s) =>
    s.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelect = (value) => {
    setInput(value);
    SearchProduct(value); 
    setShowDropdown(false);
  };

  return (
    <nav className="flex justify-between items-center px-5 py-3 bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <Link
        to="/"
        className="text-xl font-bold tracking-wide hover:text-yellow-400 transition"
      >
        Jayam Store
      </Link>

      <div
        className="relative hidden md:flex items-center w-1/3 bg-gray-800 rounded-full px-3 py-1.5
                   focus-within:ring-2 ring-yellow-400 transition-all"
        ref={dropdownRef}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search products..."
          className="bg-transparent w-full outline-none text-sm text-gray-200 placeholder-gray-400"
        />
        <button className="text-gray-400 hover:text-yellow-400 transition">
          <Search className="w-5 h-5" />
        </button>

       
        {showDropdown && (
          <div
            className="absolute top-full left-0 w-full mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-[9999]
                       animate-fadeIn border border-gray-200"
          >
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(suggestion)}
                  className="px-4 py-2 text-gray-700 text-sm hover:bg-yellow-100 cursor-pointer transition"
                >
                  {suggestion}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No suggestions found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5 relative">
        {/* Cart */}
        <Link to="/dashboard/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-white hover:text-yellow-400 transition" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-[10px] font-semibold text-white rounded-full px-1.5">
              {cart.length}
            </span>
          )}
        </Link>

        {/* User Menu */}
        {user ? (
          <div
            className="relative group"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <img
                src={
                  user.photoURL ||
                  (user.providerData && user.providerData[0]?.photoURL)
                }
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-yellow-400 object-cover hover:scale-105 transition-transform"
              />
              <span className="hidden sm:block font-medium">
                {user.displayName || "User"}
              </span>
            </div>

            {hovering && (
              <div className="absolute right-0 mt-3 bg-white text-gray-800 rounded-lg shadow-lg w-44 py-2 animate-fadeIn border border-gray-100">
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  My Dashboard
                </Link>
                <Link
                  to="/dashboard/orders"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  My Orders
                </Link>
                <Link
                  to="/dashboard/wishlist"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Wishlist
                </Link>
                {user?.email === "king.is.busy444@gmail.com" && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm font-medium bg-yellow-500 text-white text-center rounded-md mx-2 mt-1 hover:bg-yellow-600 transition"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition text-red-600 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm bg-yellow-500 px-4 py-1.5 rounded-md hover:bg-yellow-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
