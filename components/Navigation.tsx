import * as React from "react";
import { motion } from "framer-motion";
import { ListItem } from "./ListItem";
import { Attribute } from "../typings";

// Framer Motion Animation Parameters
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

type NavigationProps = {
  attributes: Attribute[];
}

export const Navigation = ({attributes}: NavigationProps) => {

    return (
      // Framer Motion List displaying the Minted NFT Traits
      <motion.ul
        variants={variants}>
        {/* Map the Minted NFT attributes to the custom component: MenuItem */}
        {attributes.map( (attribute) => (
          <ListItem attribute={attribute} key={attribute.value}/>
        ))}
      </motion.ul>
    )
};
