import AddAddressForm from "./AddressList";
import AddressList from "./AddAddressForm";
import { useState } from "react";

export default function AddressPage() {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="max-w-3xl mx-auto">
      <AddAddressForm onSuccess={handleRefresh} />
      <AddressList key={refresh} />
    </div>
  );
}


