import React, { useState } from 'react'
// Thirdweb NFT Type Import
import { NFT } from '@thirdweb-dev/sdk';
// Framer Motion Import
import { motion } from 'framer-motion'
// Custom Functional Component Import: Navigation
import { Navigation } from './Navigation';

// Custom Props Type for the NFTModal component
type Props = {
    isVisible: boolean,
    mintedNFT: NFT | undefined,
    onClose(): void,
}

// Dummy NFT object of imported type NFT for testing
const dummyNFT: NFT = {
    metadata: {
        attributes: [
            {
                trait_type: 'Shirt',
                value: 'caveman'
            },
            {
                trait_type: 'Fur',
                value: 'brown'
            },
            {
                trait_type: 'Hat',
                value: 'beanie'
            },
            {
                trait_type: 'Eyes',
                value: 'sleepy'
            }
        ],
        description: "BOBSON Ape",
        id: "1",
        image: "https://gateway.ipfscdn.io/ipfs/QmecgHz9dM171cR4JxSaw2B3uzWtQvLYjhBzNZJ3N1EX2c/1.png",
        name: "#1",
        uri: "ipfs://QmWtFFrsCnk83yb7bXfyjxCr6tVVzgtTaXR3ZD6aiRuZuY/1",
    },
    owner: "0x20a2918d9d3d85D7f45Fa97352eF7f08d506f2Bd",
    supply: 1,
    type: "ERC721",
}

function NFTModal({ isVisible, onClose, mintedNFT}: Props) {
    // If the isVisible condition is set to false then return null
    if ( !isVisible ) return null;
    // State Variable
    const [reveal, setReveal] = useState<boolean>(false);
    // Error handling
    const handleClose = (e) => {
        if(e.target.id === 'wrapper' ) onClose();
    }

    return (
        // Custom Framer Motion Component
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
            id="wrapper"
            onClick={handleClose}
        >
            {/* Modal Container */}
            <div className='w-[700px] flex flex-col'>
                {/* Close Button */}
                <button onClick={() => onClose()} className='text-white text-xl place-self-end'>X</button>
                <div className='bg-gradient-to-br from-cyan-800 to-rose-500 p-2 rounded text-center'>
                    {/* Minted NFT description */}
                    <h3 className='text-white text-xl font-bold lg:text-3xl lg:font-extrabold'>
                       Your newly minted {mintedNFT?.metadata.description != null ? mintedNFT.metadata.description : "NFT"}
                    </h3>
                    {/* Minted NFT Container */}
                    <div className='flex-col grid grid-cols-10'>
                        <div className='col-span-4 bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
                            {/* Minted NFT Image */}
                            <motion.img
                                className='w-44 rounded-xl object-cover lg:h-96 lg:w-72 '
                                animate={{
                                    opacity: [0, 1],
                                    scale: [0, 1.5, 1],
                                    rotate: [0, 180, 360],
                                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                                    x: 0,
                                }}
                                transition={{
                                    duration: 2,
                                }}
                                // whileInView={{ x: 0, opacity: 1, }}
                                viewport={{ once: true }}
                                src={ mintedNFT?.metadata?.image?.toString() }
                                alt=""
                            />
                        </div>
                        {/* Framer Motion Nav Component */}
                        <motion.nav
                            className='flex items-center justify-center col-span-6'
                            // initial={false}
                            animate={reveal ? "open" : "closed"}
                        >
                            {/* When button is clicked, set the reveal condition */}
                            {reveal ? (
                                    <>
                                    </>
                                ) : (
                                    <button className=" bg-orange-300 rounded-md font-semibold text-black" onClick={() => setReveal(true)}>
                                        Click to reveal traits!
                                    </button>
                                )
                            }
                            {/* Custom Navigation Component */}
                            <Navigation attributes={mintedNFT?.metadata.attributes}/>
                        </motion.nav>
                    </div>
                    {/* Minted NFT Description */}
                    <h3 className=' text-white text-md'>
                    {mintedNFT?.metadata.name + " of the " + (mintedNFT?.metadata.description != null ? mintedNFT?.metadata.description : "NFT") + " collection"}
                    </h3>
                </div>
            </div>
        </motion.div>
    )
}

export default NFTModal
