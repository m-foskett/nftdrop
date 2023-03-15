import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

// Framer Motion Animation Parameters
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = ({attributes}) => (
  // Framer Motion List holding the Minted NFT Traits
  <motion.ul variants={variants}>
    {/* Map the Minted NFT attributes to the custom component: MenuItem */}
    {attributes.map( (property) => (
      <MenuItem property={property} key={property.value} />
    ))}
  </motion.ul>
);
