import { motion } from "framer-motion";
import { LogIn, X, Sparkles } from "lucide-react";
import { signInWithGoogle } from "../Utilize/Firebase";
import useStore from "../Store/useStore";
import toast from "react-hot-toast";
import google from '../assets/google.webp'

export default function LoginPopup() {
  const { setUser } = useStore();

  const handleLogin = async () => {
    const loggedInUser = await signInWithGoogle();
    if (loggedInUser) {
      console.log("User logged in:", loggedInUser);
      setUser(loggedInUser);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
        className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-11/12 max-w-sm text-center"
      >
        {/* Close Icon (optional) */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          onClick={() => window.location.reload()}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo / Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="text-white w-7 h-7" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Welcome to <span className="text-yellow-500">Jayam Store</span>
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to explore the latest products and offers.
        </p>

        {/* Google Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 w-full py-2.5 px-4 rounded-lg cursor-pointer text-white font-medium bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-500 shadow-md transition-all duration-300"
        >
          <img
            src={google}
            alt="Google"
            className="w-5 h-5 bg-white rounded-full"
          />
          Continue with Google
        </motion.button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-2">
          <div className="h-px bg-gray-300 flex-grow" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px bg-gray-300 flex-grow" />
        </div>

        {/* Secondary Action */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=> toast.error("Sorry Guest Not allowed...🤪😁!")}
          className="flex  cursor-pointer items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
        >
          <LogIn className="w-5 h-5" />
          Continue as Guest
        </motion.button>


        {/* Footer */}
        <p className="text-xs text-gray-400 mt-4">
          By signing in, you agree to our{" "}
          <span className="text-yellow-500 cursor-pointer hover:underline">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-yellow-500 cursor-pointer hover:underline">
            Privacy Policy
          </span>
          .
        </p>
      </motion.div>
    </motion.div>
  );
}
