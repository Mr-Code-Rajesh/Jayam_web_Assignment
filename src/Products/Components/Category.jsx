import React, { useEffect } from 'react'
import useStore from '../../Store/useStore'
import { motion } from "framer-motion";
import Spinner from './Spinner'

// notes : Category component to display product categories with animations.
// purpose: To showcase product categories fetched from the store with framer-motion animations.

const Category = () => {
  const categories = useStore((state) => state.categories);
  const loading = useStore((state) => state.loading);
  const FetchCategories = useStore((state) => state.FetchCategories);


  // Fetch Categories
  useEffect(()=>{
   FetchCategories();
  },[FetchCategories]);


  useEffect(()=>{
    console.log("Categories:", categories);
  },[categories]);


  // Framer Motion Variants
  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        type: "spring",
        stiffness: 80,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 10 },
    },
  };


  // Loading and Error States
  if (loading) return <Spinner />;
  if (!categories.length) return <p>No categories found</p>;



  return (
     <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full min-h-24 bg-white/70 shadow-md rounded-xl p-4 mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center gap-2">

     { categories.map((cat) => (
        <motion.div
          key={cat.id}
          variants={item}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="mr-4 px-3 py-1"
        >
          <motion.div className="w-32 h-32" whileHover={{ rotate: 2 }}>
            <motion.img
              src={cat.img}
              alt={cat.name}
              className="w-full h-full object-cover rounded-2xl cursor-pointer opacity-90 hover:opacity-100 transition-transform duration-200"
            />
          </motion.div>
          {/* Optional category name When we want we'll add it In future */}
          {/* <span className="text-gray-700 font-medium bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 px-3 py-1 mt-2 block text-center">{cat.name}</span> */}
        </motion.div>
      )) }


    </motion.section>


  )
}

export default Category
