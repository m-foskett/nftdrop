import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';
import Link from 'next/link';
// Sanity and Custom Image Handler Import
import { sanityClient, urlFor } from '../../sanity';
// Custom Typings Import
import { Collection } from '../../typings';
// Thirdweb Smart Contract Hook Imports
import { ConnectWallet, useAddress, useContract, } from "@thirdweb-dev/react";
// Thirdweb NFT Type Import
import { NFT } from '@thirdweb-dev/sdk';
// BigNumber Type Import
import { BigNumber } from 'ethers';
// Toast Pop Up Import
import toast, { Toaster } from 'react-hot-toast';
// Custom Functional Component Import: NFTModal
import NFTModal from '../../components/NFTModal';

// Custom Interface for NFT Collection
interface Props {
  collection: Collection,
}

function NFTDropPage({collection}: Props) {
  // State Variables
  const [claimedSupply, setClaimedSupply] = useState<number>();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [priceInEth, setPriceInEth] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [mintedNFT, setMintedNFT] = useState<NFT>();
  // Get the NFT Drop Contract
  const nftDrop = useContract(collection.address, "nft-drop").contract;
  // Authentication Hook: Get wallet address
  const address = useAddress();

  // Test for acquisition of the NFT Drop smart contract
  useEffect(() => {
    // If NFT Drop smart contract is null, return
    if (!nftDrop) return;
    // Function Definition: fetchPrice
    const fetchPrice = async () => {
      // Get the NFT Drop smart contract claim conditions
      const claimConditions = await nftDrop.claimConditions.getAll();
      // Setter function: setPriceInEth
      //  - Gets value from the claim conditions
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
    }
    // fetchPrice call
    fetchPrice();
  }, [nftDrop])

  // Test for acquisition of the NFT Drop smart contract
  useEffect(() => {
    // If NFT Drop smart contract is null, return
      if (!nftDrop) return;
      // Async Function Definition: fetchNFTDropData
      const fetchNFTDropData = async () => {
        // Set the loading condition to true
        setLoading(true);
        // Await the fetch of the amount of claimed NFTs in the collection
        const claimed = await nftDrop.getAllClaimed();
        // Await the fetch of the total amount of NFTs in the collection
        const total = await nftDrop.totalSupply();
        // Set the acquired values to state variables
        setClaimedSupply(claimed.length);
        setTotalSupply(total);
        // Set the loading condition to false
        setLoading(false);
      }
      // fetchNFTDropData call
      fetchNFTDropData();
  }, [nftDrop])

  // Custom Function: mintNFT
  const mintNFT = () => {
    // Check for acquisition of the smart contract and whether the user's wallet is connected,
    // If either is null then return
    if (!nftDrop || !address) return;
    // Set the loading condition to true
    setLoading(true);
    // Toast Pop Up to indicate that the NFT is minting
    const notification = toast.loading('Minting your NFT', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      }
    });
    const quantity = 1; // quantity of NFTs to claim in transaction
    // Claim the minted NFT to the connected wallet address
    nftDrop?.claimTo(address, quantity).then(async (tx) => {
      const receipt = tx[0].receipt // the transaction receipt
      const claimedTokenId = tx[0].id // the id of the NFT claimed
      const claimedNFT = await tx[0].data() // (optional) get the claimed NFT metadata

      // Toast Pop Up to indicate that the NFT was successfully minted
      toast('Successful Mint!', {
        duration: 8000,
        style: {
          background: 'green',
          color: 'white',
          fontWeight: 'bolder',
          fontSize: '17px',
          padding: '20px',
        }
      })
      // Testing Data
      console.log(receipt)
      console.log(claimedTokenId)
      console.log(claimedNFT)
      // Set the condition to enable the NFT Hatching Modal
      setShowModal(true);
      // Set the newly minted NFT to the state variable
      setMintedNFT(claimedNFT);
    }).catch(err => {
      console.log(err);
      // Toast Pop Up to indicate something went wrong
      toast('Whoops... Something went wrong!', {
        style: {
          background: 'red',
          color: 'white',
          fontWeight: 'bolder',
          fontSize: '17px',
          padding: '20px',
        }
      });
    }).finally(() => {
      // Set the loading condition to false
      setLoading(false);
      // Dismiss any Toast pop ups
      toast.dismiss(notification);
    })
  }

  return (
    <>
      {/* Base Container */}
      <div className='flex flex-col h-screen lg:grid lg:grid-cols-10'>
        {/* Toaster Component to allow for Toast Pop Ups */}
        <Toaster />
        {/* Left-Side of Page */}
        <div className='lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500'>
          <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen '>
            {/* Collection Image Border */}
            <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
              {/* Collection Image */}
              <img className='w-44 rounded-xl object-cover lg:h-96 lg:w-72 ' src={urlFor(collection.previewImage).url()} alt=""  />
            </div>
            {/* Collection Details */}
            <div className='text-center p-5 space-y-2'>
              {/* Collection Title */}
              <h1 className='text-4xl font-bold text-white'>{collection.nftCollectionName}</h1>
              {/* Collection Description */}
              <h2 className='text-xl text-gray-300'>{collection.description}</h2>
            </div>
          </div>
        </div>
        {/* Right-Side of Page */}
        <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
          {/* Header */}
          <header className='flex items-center justify-between'>
            {/* Link to Home Page */}
            <Link href={`/`}>
              <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>The{' '}<span className='font-extrabold underline decoration-pink-600/50'>BOBSON</span>{' '}NFT Grand Exchange!</h1>
            </Link>
            {/* Connect Wallet Component from Thirdweb */}
            <ConnectWallet accentColor="#e11d48" colorMode='light'/>
          </header>
          {/* Page Rule */}
          <hr className='my-2 border'/>
          {/* Content Container */}
          <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0 lg:justify-center'>
            {/* Collection Display Image */}
            <img className='w-80 object-cover pb-10 lg:h-40' src={urlFor(collection.mainImage).url()} alt="" />
            {/* Collection Title */}
            <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>{collection.title}</h1>
            {/* If the loading condition is set to true */}
            {loading ? (
              // Show loading message
              <p className='text-green-500 pt-2 text-xl animate-pulse'>Loading NFT Supply Count...</p>
            // If the loading condition is set to false
              ) : (
                // Display the amount of claimed NFTs out of the total supply
              <p className='text-green-500 pt-2 text-xl'>{claimedSupply == null ? "X" : claimedSupply} / {totalSupply?.toString()} NFTs claimed!</p>
            )}
            {/* If loading */}
            {loading && (
              // Display buffering animation
              <img className='h-80 w-80 object-contain' src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" alt="" />
            )}
          </div>
          {/* Mint Button */}
          {/* onClick: call the custom mintNFT function */}
          {/* Disable Button if: */}
          {/* - user wallet is not connected */}
          {/* - the loading condition is set */}
          {/* - all of the NFTs have already been claimed */}
          <button onClick={mintNFT} disabled={loading || !address || claimedSupply === totalSupply?.toNumber()} className='h-16 bg-red-600 w-full text-white rounded-full mt-10 font-bold disabled:bg-gray-400'>
            {/* If loading, display loading */}
            {loading ? (
              <>Loading</>
            // Else if all NFTs have been claimed, display SOLD OUT
            ) : claimedSupply === totalSupply?.toNumber() ? (
              <>SOLD OUT</>
            // Else if user wallet not connected, display sign in
            ) : !address ? (
              <>Sign in to Mint</>
            ) : (
            // Else display the Mint an NFT suggestion
              <span className='font-bold'>Mint an NFT ({priceInEth} ETH))</span>
            )}
          </button>
        </div>
      </div>
      {/* Custom Functional Component: NFTModal */}
      <NFTModal isVisible={showModal} onClose={() => setShowModal(false)} mintedNFT={mintedNFT} />
    </>
  )
}

export default NFTDropPage

// Asynchronous call with ServerSide Rendering
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  // GROQ Query to gather the collections and their details
  const query =
  `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
        asset
    },
    previewImage {
        asset
    },
    slug {
        current
    },
    creator-> {
        _id,
        name,
        address,
        slug {
            current
        },
    },
  }`
  // Await the fetch of the collection gathering query
  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })
  // If collection returns null then return notFound prop set to true
  if (!collection){
    return {
      notFound: true,
    }
  }
  // Return as props to the Home page functional component
  return {
    props: {
      collection,
    }
  }
}