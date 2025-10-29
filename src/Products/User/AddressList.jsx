import axios from "axios";
import { useEffect, useState } from "react";
import useStore from "../../Store/useStore";

export default function AddressList() {
  const { user } = useStore();
  const [addresses, setAddresses] = useState([]);


  // Fetch Addresses
  const fetchAddresses = async () => {
    if (!user) return;
    const res = await axios.get(`http://localhost:3000/addresses?userId=${user.uid}`);
    setAddresses(res.data);
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);


  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Saved Addresses</h3>
      {addresses.length === 0 ? (
        <p className="text-gray-500">No addresses saved yet.</p>
      ) : (
        <div className="grid gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-black/30 mb-3 p-4 rounded bg-gray-50">
              <p className="font-medium">{addr.name} – {addr.mobile}</p>
              <p>{addr.addressLine}</p>
              <p>{addr.city}, {addr.state} – {addr.pincode}</p>
              <span className="text-sm bg-blue-100 px-2 py-1 rounded">{addr.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



