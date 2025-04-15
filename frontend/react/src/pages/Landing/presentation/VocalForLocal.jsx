import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const localImages = [
  { src: 'public/fresh-veggies.avif', title: 'Fresh Veggies' },
  { src: '/public/organic fruit.jpeg', title: 'Organic Fruits' },
  { src: '/public/hph.avif', title: 'Handpicked Herbs' },
];

const VocalForLocal = () => {
  const navigate = useNavigate(); // ✅ This must be inside the component

  return (
    <div className="min-h-screen bg-green-50 py-20 px-5">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center text-green-800 mb-8"
      >
        Vocal for Local 🌱
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-3xl mx-auto text-center text-lg md:text-xl text-green-700"
      >
        At <strong>Farm Nest</strong>, we empower local farmers by connecting them directly with conscious consumers. Every product you buy supports our farmers, promotes sustainability, and nurtures our local economy.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {localImages.map((item, index) => (
          <motion.div
            key={index}
            className="rounded-2xl overflow-hidden shadow-lg bg-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            <img src={item.src} alt={item.title} className="w-full h-64 object-cover" />
            <div className="p-4 text-center font-semibold text-green-800">
              {item.title}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-12 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <button 
          onClick={() => navigate('/shop')} 
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          Explore Local Products
        </button>
      </motion.div>
    </div>
  );
};

export default VocalForLocal;
