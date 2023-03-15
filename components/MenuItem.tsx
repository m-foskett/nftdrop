import * as React from "react";
import { motion } from "framer-motion";

// Framer Motion Animation Parameters
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export const MenuItem = ({ property }) => {

  return (
    // Framer Motion List Item using the custom animation parameters
    // Displays the Minted NFT Trait/Value pair
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      key={property.value}
      className=' text-white text-lg uppercase '
    >
        {property.trait_type + ": " + property.value}
    </motion.li>
  );
};