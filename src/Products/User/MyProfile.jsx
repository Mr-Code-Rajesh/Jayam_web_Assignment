import FAQ from "../../components/FAQ";
import useStore from "../../Store/useStore";

export default function MyProfile() {
  const { user } = useStore();

  return (
   <div className=" w-full">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      {user && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={user.photoURL || user.providerData?.[0]?.photoURL}
            alt={user.displayName}
            className="w-24 h-24 rounded-full border object-cover"
          />
          <p className="font-medium text-lg">{user.displayName}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>  
      )}
    </div>
     <div className=" mt-5">
      <FAQ />
     </div>
   </div>
  );
}







