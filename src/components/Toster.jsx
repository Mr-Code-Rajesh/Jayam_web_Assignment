import { Toaster } from "react-hot-toast";
 
const Toster = () => {
   return (
     <Toaster
      position="bottom-right"
      toastOptions={{
      style: { background: "#fff", color: "#333", borderRadius: "8px" },
      success: {
      iconTheme: { primary: "#16a34a", secondary: "#fff" },
      style: {
        animation: "slideIn 0.3s ease",
      },
    },
    error: {
      iconTheme: { primary: "#dc2626", secondary: "#fff" },
      style: {
        animation: "slideIn 0.3s ease",
      },
    },
  }}/>

   )
 }
 
 export default Toster
 