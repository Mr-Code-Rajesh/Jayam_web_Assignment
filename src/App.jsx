import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPopup from "./components/LoginpopUp";
import useStore from "./Store/useStore";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import AdminPanel from "./components/AdminPanel";

import Dashboard from "./components/Dashboard"
import MyProfile from "./Products/User/MyProfile";
import Wishlist from "./Products/Components/Wishlist";
import Orders from "./Products/Components/OrderHistory";
import Cart from "./Products/Components/Cart";
import Products from "./components/Products";
import AddressPage from "./Products/User/AddressPage";
import Toster from "./components/Toster";


export default function App() {
  const { user } = useStore();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      <Navbar />
      {!user && <LoginPopup />}

      <Toster/>

      <div className="flex-grow bg-gray-100 p-8">
      {user && (
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<MyProfile />} />
            <Route path="address" element={<AddressPage />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="orders" element={<Orders />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="/admin" element={<AdminPanel />} />
           <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
      </div>
      <Footer />
      </div>
    </BrowserRouter>
  );
}



