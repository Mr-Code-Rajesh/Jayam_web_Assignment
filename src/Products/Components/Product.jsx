import { useEffect ,useState} from 'react'
import useStore from '../../Store/useStore';
import { Heart } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import Spinner from './Spinner';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Notes : Product component to display list of products with add to cart and wishlist functionality.
// Purpose: To showcase products fetched from the store and allow users to add them to their cart or wishlist.


const Product = () => {

  // Products
  const filtered = useStore(s => s.filteredProducts);
  const loading = useStore((s) => s.loading);
  const FetchProducts = useStore((s) => s.FetchProducts);
  const all = useStore(s => s.products);
  const query = useStore(s => s.searchQuery);

  const products = (query?.trim()?.length ? filtered : all) ?? [];

  // wishlist
  const wishlist = useStore((s)=> s.wishlist);
  const ToggleWishlist = useStore((s)=> s.ToggleWishlist);
  const FetchWishlist = useStore((s)=> s.FetchWishlist);


  // Cart 
  const ToggleCart = useStore((s)=> s.ToggleCart);
  const FetchCart = useStore((s)=> s.FetchCart);


  useEffect(() => {
    FetchProducts();
    FetchWishlist();
    FetchCart();
  }, [FetchProducts,FetchWishlist,FetchCart]);


  useEffect(()=>{
    console.log("Products:", products);
  },[products]);


  // liked state
  const isLiked = (id) => wishlist.some((item)=> String(item.id)=== String(id));


  // Animation Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, 
      ease: "easeInOut",
      duration: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "tween", 
      ease: "easeOut",
      duration: 0.25,
    },
  },
};

  
  // Loading and Error States
  if (loading) return <Spinner />;
  if (!products.length) return <div className=' text-3xl font-semibold text-center p-4 shadow-md rounded-md'>No products found</div>;


  return (
    <motion.section
      variants={container}
      initial={false}
      animate="show"
      viewport={{ once: false, amount: 0.05 }} 
      className="w-full min-h-[40vh] bg-white/80 shadow-md p-5 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={item}
          whileHover={{ scale: 1.05, rotate: 0.3 }}
          whileTap={{ scale: 0.97 }}
          className="relative bg-white shadow-sm rounded-xl flex flex-col w-56 hover:shadow-xl transition-transform duration-200 cursor-pointer overflow-hidden backdrop-blur-sm"
        >
          {/* Wishlist Heart */}
          <motion.div
            className="absolute right-3 top-3 z-20"
            whileHover={{ scale: 1.2 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(product.id);
            }}
          >
            <Heart
              fill={isLiked(product.id) ? "red" : "white"}
              stroke={isLiked(product.id) ? "red" : "gray"}
              className="w-6 h-6 cursor-pointer transition-all duration-200"
              onClick={(e)=>{
                e.stopPropagation()
                ToggleWishlist(product);
              }}
            />

          </motion.div>

          {/* Product Image */}
          <motion.div
            className="w-56 h-56 overflow-hidden rounded-t-xl"
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 opacity-95 hover:opacity-100"
            />
          </motion.div>

          {/* Product Info */}
          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-gray-800 font-semibold text-md line-clamp-2">
              {product.title}
            </h3>
            <p className="text-gray-600 text-sm font-medium line-clamp-1">
              {product.description}
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">
                Price: $<span className="font-medium">{product.price}</span>
              </span>
              <span className="text-gray-600">
                Stock:{" "}
                <span className="text-black/80 font-medium">
                  {product.stock}
                </span>
              </span>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 bg-yellow-500 cursor-pointer text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center justify-center gap-2 shadow-sm"
              onClick={(e)=>{
                  e.stopPropagation();
                  ToggleCart(product);
              }} >
              Add to Cart <ShoppingCart className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};
export default Product;





