import * as React from "react";
import { motion } from "framer-motion";
import { Attribute } from "../typings";

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

type ListItemProps = {
  attribute: Attribute;
}

export const ListItem = ({ attribute }: ListItemProps) => {

  return (
    // Framer Motion List Item using the custom animation parameters
    // Displays the Minted NFT Trait/Value pairs
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      key={attribute?.value}
      className=' text-primary-950 text-lg uppercase font-bold'
    >
        {attribute?.trait_type + ": "}<span className=" text-primary-50 text-lg uppercase font-semibold"> {attribute?.value}</span>
    </motion.li>
  );
};