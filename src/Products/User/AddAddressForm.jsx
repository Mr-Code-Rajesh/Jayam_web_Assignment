import { useState } from "react";
import axios from "axios";
import useStore from "../../Store/useStore";
import toast from "react-hot-toast";

export default function AddAddressForm({ onSuccess }) {
  const { user } = useStore();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    type: "Home",
    addressLine: "",
    city: "",
    state: "",
    pincode: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first.");

    try {
      await axios.post("http://localhost:3000/addresses", {
        ...form,
        userId: user.uid
      });
      onSuccess?.();
      setForm({
        name: "",
        mobile: "",
        type: "Home",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""
      });
      toast.success("Address saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save address.");
    }
  };

  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold">Add a New Address</h3>

      <div className="grid md:grid-cols-2 gap-3">
        <input name="name" placeholder="Name" className="border p-2 rounded" value={form.name} onChange={handleChange} />
        <input name="mobile" placeholder="Mobile Number" className="border p-2 rounded" value={form.mobile} onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" className="border p-2 rounded" value={form.pincode} onChange={handleChange} />
        <input name="city" placeholder="City" className="border p-2 rounded" value={form.city} onChange={handleChange} />
        <input name="state" placeholder="State" className="border p-2 rounded" value={form.state} onChange={handleChange} />
      </div>

      <textarea name="addressLine" placeholder="Full Address" className="border w-full p-2 rounded" value={form.addressLine} onChange={handleChange}></textarea>

      <div className="flex gap-3">
        <label className="flex items-center gap-1">
          <input type="radio" name="type" value="Home" checked={form.type === "Home"} onChange={handleChange} /> Home
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="type" value="Work" checked={form.type === "Work"} onChange={handleChange} /> Work
        </label>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Address
      </button>
    </form>
  );
}
