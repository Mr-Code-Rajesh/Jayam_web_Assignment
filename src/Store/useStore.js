import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";


const useStore = create(persist((set,get) => ({
  user: null,
  loading : false,
  categories:[],
  products:[],
  wishlist:[],
  cart:[],
  orders:[],
  filteredProducts:[],
  searchQuery: "",

  // userData
  setUser: (u) => set({ user: u }),
  logoutUser: () => set({ user: null }),
   

  // categories
  FetchCategories : async ()=>{
    set({ loading: true });
   try{
    let res = await axios.get("http://localhost:3000/categories");
    set({categories:res.data,loading:false});
   }catch(err){
    console.log("Error occur while Fecthing....",err);
    set({loading:false});
   }
  },

  // products
  FetchProducts : async ()=>{
    set({ loading: true});
    try{
      let res = await axios.get('http://localhost:3000/products');
      const data = res.data || [];
      set({ products: data, filteredProducts:data, loading: false });
    }catch(err){
      console.log("Error occur from Products Fetching...",err);
      set({ loading: false });
    }
  },

  // Search Products
  SearchProduct:(q)=>{
    const query = (q ?? "").trim().toLowerCase();
    const all = get().products;
     if (!query) {
      set({ searchQuery: "", filteredProducts: all });
      return;
    }

    const filtered = all.filter(p => (
      `${p.title ?? ""} ${p.description ?? ""}`.toLowerCase().includes(query)
    ));

    set({ searchQuery: q, filteredProducts: filtered });
  },



  // Wishlist
  FetchWishlist : async ()=>{
    set({loading:true})
    try{
      let res = await axios.get('http://localhost:3000/wishlist');
      set({wishlist:res.data,loading:false});
    }catch(err){
      console.log("Error occur from fetching the wishlist",err);
      
    } 
  },

  // wishlist Add & Remove Logic
  ToggleWishlist: async(products)=>{
    let CurrentWishlist = get().wishlist;

  // Check for Out of Stock for block adding to wishlist
  if (!products || products.stock <= 0) {
    toast.error(`"${products?.title || "Product"}" is not available 💔`, {
      style: {
        borderRadius: "8px",
        background: "#fee2e2",
        color: "#991b1b",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    });
    return; 
  }
    let IsexitsInWishlist = CurrentWishlist.some((item)=> item.id === products.id);

    // WishList remove logic
    if(IsexitsInWishlist){
      let updateWishList = CurrentWishlist.filter((item)=> item.id !== products.id);
      set({wishlist:updateWishList});
      try{
        await axios.delete(`http://localhost:3000/wishlist/${products.id}`);
        toast.error(`Removed from Wishlist 💔`, { title: products.title });
      }catch(err){
        console.log("Error occur from deleting the wishlist",err);
      }
    }
    // wishList add logic
    else{
      let updateWishList = [...CurrentWishlist,products];
      set({wishlist:updateWishList})
      try{
        await axios.post(`http://localhost:3000/wishlist`,products);
        toast.success(`Added to Wishlist ❤️`, {title: products.title });
      }catch(err){
        console.log("Error occur from adding wishlist",err);
      }
    }
  },



   // Cart
  FetchCart : async ()=>{
    set({loading:true})
    try{
      let res = await axios.get('http://localhost:3000/cart');
      set({cart:res.data,loading:false});
    }catch(err){
      console.log("Error occur from fetching the cart",err);
      set({loading:false});
    }
  },


  // Cart Add & Remove Logic
  ToggleCart: async(products)=>{
    let CurrentCart = get().cart;
    

  // Check for Out of Stock
  if (!products || products.stock <= 0) {
    toast.error(`"${products?.title || "Product"}" is out of stock 💔`, {
      style: {
        borderRadius: "8px",
        background: "#fee2e2",
        color: "#991b1b",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    });
    return; 
  }


    let IsexitsInCart = CurrentCart.some((item)=> item.id === products.id); 

    // Cart remove logic
    if(IsexitsInCart){
      let updateCart = CurrentCart.filter((item)=> item.id !== products.id);
      set({cart:updateCart});
      try{
        await axios.delete(`http://localhost:3000/cart/${products.id}`);
        toast.error(`Removed from Cart 💔`, { title: products.title });
      }catch(err){
        console.log("Error occur from deleting the cart",err);
      }
    }
    // Cart add logic
    else{
      let updateCart = [...CurrentCart,products];
      set({cart:updateCart})
      try{
        await axios.post(`http://localhost:3000/cart`,products);
        toast.success(`Added to Cart ❤️`, {title: products.title });
      }catch(err){
        console.log("Error occur from adding cart",err);
      }
    }
  },
 

  // Clear Cart
  ClearCart: async () => {
    set({ loading: true });
    try {
      const cartItems = await axios.get("http://localhost:3000/cart");
      await Promise.all(
      cartItems.data.map((item) =>
        axios.delete(`http://localhost:3000/cart/${item.id}`)
      )
     );
    set({ cart: [] });
      toast.success("Cart cleared successfully ❤️");
    } catch (err) {
      console.log("Error clearing cart", err);
      set({ loading: false });
    }
  },

  // Fetch Orders
  FetchOrders: async (userId) => {
    set({ loading: true });
  try {
    const res = await axios.get(`http://localhost:3000/orders?userId=${userId}`);
    set({ orders: res.data, loading: false });
  } catch (err) {
    console.log("Error fetching orders", err);
    set({ loading: false });
  }
  },

  // Place orders
  PlaceOrder: async (userId, address) => {
  const state = get();
  if (!state.cart.length) return toast.error("Your cart is empty 🛒!");
  if (!address) return toast.error("Select a delivery address 📍");

  const totalAmount = state.cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const newOrder = {
    userId,
    items: state.cart,
    totalAmount,
    address,
    status: "On Process",
    orderDate: new Date().toISOString(),
  };

  try {
    await axios.post("http://localhost:3000/orders", newOrder);  
    const cartItems = await axios.get("http://localhost:3000/cart");
      await Promise.all(
      cartItems.data.map((item) =>
        axios.delete(`http://localhost:3000/cart/${item.id}`)
      )
     );
    set({ cart: [] });
    toast.success("Order placed successfully 🛒");
  } catch (err) {
    console.log("Error placing order", err);
    toast.error("Failed to place order");
  }
},





























}),{
  name: "ecommerce-store",
  getStorage: () => localStorage,
  partialize: (state) => (
  { user: state.user },
  {wishlist:state.wishlist}
  ),
}));

export default useStore;


