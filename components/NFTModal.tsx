import React, { useState } from 'react'
// Thirdweb NFT Type Import
import { NFT } from '@thirdweb-dev/sdk';
// Framer Motion Import
import { motion } from 'framer-motion'
// Custom Functional Component Import: Navigation
import { Navigation } from './Navigation';
import { Attribute } from '../typings';

// Custom Props Type for the NFTModal component
type NFTModalProps = {
    mintedNFT: NFT,
    onClose(): void,
};

function NFTModal({ onClose, mintedNFT}: NFTModalProps) {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // State Variable
    const [reveal, setReveal] = useState<boolean>(false);
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Extract the mintedNFT's attributes
    const attributes = mintedNFT.metadata.attributes as Attribute[];
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    return (
        // Custom Framer Motion Component
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
            id="wrapper"
        >
            {/* Modal Base Container */}
            <div className='flex flex-col w-[700px]'>
                {/* Close Button */}
                <button
                    onClick={() => onClose()}
                    className='text-primary-50 font-extrabold text-2xl place-self-end'
                >
                    X
                </button>
                {/* Modal Content Container */}
                <div className='bg-gradient-to-br from-primary-950 to-primary-400 p-2 rounded text-center'>
                    {/* Minted NFT description */}
                    <h3 className='text-primary-50 text-xl lg:text-3xl font-bold pb-4'>
                       Your newly minted {mintedNFT.metadata.description}
                    </h3>
                    {/* Minted NFT Container */}
                    <div className='flex flex-row justify-evenly'>
                        <div className='bg-gradient-to-br from-primary-200 to-primary-900 p-2 rounded-xl'>
                            {/* Minted NFT Image */}
                            <motion.img
                                className='w-44 object-cover'
                                animate={{
                                    opacity: [0, 1],
                                    scale: [0, 1.5, 1],
                                    rotate: [0, 180, 360],
                                    borderRadius: ["10%", "10%", "50%", "50%", "10%"],
                                    x: [-300, -150, 0],
                                    y: [-300, -150, 0],
                                }}
                                transition={{
                                    duration: 2,
                                }}
                                viewport={{ once: true }}
                                src={ mintedNFT.metadata.image?.toString() }
                                alt=""
                            />
                        </div>
                        {/* Framer Motion Nav Component */}
                        <motion.nav
                            className='flex flex-col justify-center'
                            animate={reveal ? "open" : "closed"}
                        >
                            {/* When button is clicked, set the reveal condition */}
                            {reveal ? (
                                    <>
                                    </>
                                ) : (
                                    <button className=" bg-primary-950 rounded-md font-semibold text-primary-50 py-2 px-3" onClick={() => setReveal(true)}>
                                        Click to reveal traits!
                                    </button>
                                )
                            }
                            {/* Custom Navigation Component */}
                            <Navigation attributes={attributes}/>
                        </motion.nav>
                    </div>
                    {/* Minted NFT Description */}
                    <h3 className=' text-primary-50 text-md'>
                        {mintedNFT.metadata.name + " of the " + (mintedNFT.metadata.description) + " collection"}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

export default NFTModal