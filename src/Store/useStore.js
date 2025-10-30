import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

const API = "http://localhost:3000";

const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      categories: [],
      products: [],
      wishlist: [],
      cart: [],
      orders: [],
      filteredProducts: [],
      searchQuery: "",

      // Auth
      setUser: (u) => set({ user: u }),
      logoutUser: () => set({ user: null, cart: [], wishlist: [], orders: [] }),

      // Categories
      FetchCategories: async () => {
        set({ loading: true });
        try {
          const res = await axios.get(`${API}/categories`);
          set({ categories: res.data, loading: false });
        } catch (err) {
          console.log("FetchCategories error", err);
          set({ loading: false });
        }
      },

      // Products
      FetchProducts: async () => {
        set({ loading: true });
        try {
          const res = await axios.get(`${API}/products`);
          const data = res.data || [];
          set({ products: data, filteredProducts: data, loading: false });
        } catch (err) {
          console.log("FetchProducts error", err);
          set({ loading: false });
        }
      },


      // Search
      SearchProduct: (q) => {
        const query = (q ?? "").trim().toLowerCase();
        const all = get().products;
        if (!query) {
          set({ searchQuery: "", filteredProducts: all });
          return;
        }
        const filtered = all.filter((p) =>
          `${p.title ?? ""} ${p.description ?? ""}`
            .toLowerCase()
            .includes(query)
        );
        set({ searchQuery: q, filteredProducts: filtered });
      },




      // Wishlist
      FetchWishlist: async (userId) => {
        if (!userId) return;
        set({ loading: true });
        try {
          const res = await axios.get(`${API}/wishlist?userId=${userId}`);
          set({ wishlist: res.data, loading: false });
        } catch (err) {
          console.error("FetchWishlist error:", err);
          set({ loading: false });
        }
      },


     ToggleWishlist: async (product, userId) => {
  if (!userId) return toast.error("Please login");

  try {
    // Check if this product already exists for this user
    const res = await axios.get(`${API}/wishlist?userId=${userId}&productId=${product.id}`);
    const exists = res.data[0];

    if (exists) {
      // Remove from wishlist
      await axios.delete(`${API}/wishlist/${exists.id}`);
      set((state) => ({
        wishlist: state.wishlist.filter((i) => i.id !== exists.id),
      }));
      toast.error("Removed from Wishlist 💔");
    } else {
      // Add new item
      if (product.stock <= 0) return toast.error("Out of stock 💔");

      const newItem = { ...product, productId: product.id, userId };
      delete newItem.id;
      const added = await axios.post(`${API}/wishlist`, newItem);
      set((state) => ({ wishlist: [...state.wishlist, added.data] }));
      toast.success("Added to Wishlist ❤️");
    }
  } catch (err) {
    console.error("Error toggling wishlist:", err);
  }
},
      


// fetch cart
FetchCart: async (userId) => {
  if (!userId) return;
  set({ loading: true });
  try {
    const res = await axios.get(`${API}/cart?userId=${userId}`);
    set({ cart: res.data, loading: false });
  } catch (err) {
    console.error("Error fetching cart:", err);
    set({ loading: false });
  }
},


  ToggleCart: async (product, userId) => {
  if (!userId) return toast.error("Please login");

  const state = get();

  try {
    //  Try to find if product already exists in user's cart
    const res = await axios.get(`${API}/cart?userId=${userId}&productId=${product.id}`);
    const exists = res.data[0];

    if (exists) {
      //  Remove from cart (delete by server ID)
      await axios.delete(`${API}/cart/${exists.id}`);
      set({
        cart: state.cart.filter((i) => i.id !== exists.id),
      });
      toast.error("Removed from Cart 💔");
    } else {
      //  Add new item to cart
      if (product.stock <= 0) return toast.error("Out of stock 💔");

      const newItem = { ...product, productId: product.id, userId };
      delete newItem.id;
      const added = await axios.post(`${API}/cart`, newItem);
      set({ cart: [...state.cart, added.data] });
      toast.success("Added to Cart ❤️");
    }
  } catch (err) {
    console.error("Error toggling cart:", err);
  }
},

      
      ClearCart: async (userId) => {
        if (!userId) return;
        set({ loading: true });
        try {
          const res = await axios.get(`${API}/cart?userId=${userId}`);
          await Promise.all(
            res.data.map((item) => axios.delete(`${API}/cart/${item.id}`))
          );
          set({ cart: [] });
          toast.success("Cart cleared successfully ❤️");
        } catch (err) {
          console.log("ClearCart error", err);
        } finally {
          set({ loading: false });
        }
      },

      // Orders
      FetchOrders: async (userId, isAdmin = false) => {
        set({ loading: true });
        try {
          const url = isAdmin
            ? `${API}/orders`
            : `${API}/orders?userId=${userId}`;
          const res = await axios.get(url);
          set({ orders: res.data, loading: false });
        } catch (err) {
          console.error("FetchOrders error:", err);
          set({ loading: false });
        }
      },

      //  Update order status
      UpdateOrderStatus: async (orderId, newStatus, isAdmin = false) => {
  set({ loading: true });
  try {
    // ✅ Update order on backend
    await axios.patch(`${API}/orders/${orderId}`, { status: newStatus });

    // ✅ Update locally without losing other orders
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ),
      loading: false,
    }));

    toast.success(`Order #${orderId} updated to ${newStatus}`);

    // ✅ Optionally refetch admin orders to stay synced with DB
    if (isAdmin) {
      const res = await axios.get(`${API}/orders`);
      set({ orders: res.data });
    }

  } catch (err) {
    console.error("UpdateOrderStatus error:", err);
    toast.error("Failed to update order status");
    set({ loading: false });
  }
},

      PlaceOrder: async (userId, selectedAddress) => {
        const state = get();
        if (!userId) return toast.error("Please login");
        if (!state.cart.length) return toast.error("Your cart is empty 🛒!");
        if (!selectedAddress)
          return toast.error("Select a delivery address 📍");

        const totalAmount = state.cart.reduce(
          (sum, item) => sum + (item.price || 0),
          0
        );

        const newOrder = {
          // let server assign id or keep your uuid; both OK
          userId,
          items: state.cart, // these already include userId/productId
          totalAmount,
          address: selectedAddress, // single object
          status: "On Process",
          orderDate: new Date().toISOString(),
        };

        try {
          await axios.post(`${API}/orders`, newOrder);

          // clear only THIS user's cart
          const res = await axios.get(`${API}/cart?userId=${userId}`);
          await Promise.all(
            res.data.map((item) => axios.delete(`${API}/cart/${item.id}`))
          );

          set({ cart: [] });
          toast.success("Order placed successfully 🛒");
        } catch (err) {
          console.log("PlaceOrder error", err);
          toast.error("Failed to place order");
        }
      },
    }),
    {
     name: "ecommerce-store",
     getStorage: () => localStorage,
     partialize: (state) => ({
       user: state.user,
       wishlist: state.wishlist,
       cart: state.cart,
       orders: state.orders,
     }),
    }
  )
);

export default useStore;
