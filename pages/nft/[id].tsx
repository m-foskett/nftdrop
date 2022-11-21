import React from 'react'
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";

type Props = {}

function NFTDropPage({}: Props) {

  // Authentication
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <div className='flex flex-col h-screen lg:grid lg:grid-cols-10'>
      {/* Left-Side */}
      <div className='lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500'>
        <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen '>
          <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
            <img className='w-44 rounded-xl object-cover lg:h-96 lg:w-72 ' src="https://links.papareact.com/8sg" alt=""  />
          </div>
          <div className='text-center p-5 space-y-2'>
            <h1 className='text-4xl font-bold text-white'>BOBSON APES</h1>
            <h2 className='text-xl text-gray-300'>A collection of the top 1% of Apes that will one day overthrow humanity!</h2>
          </div>
        </div>
      </div>
      {/* Right-Side */}
      <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
        {/* Header */}
        <header className='flex itemse-center justify-between'>
          <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>The{' '}<span className='font-extrabold underline decoration-pink-600/50'>BOBSON</span>{' '}NFT Grand Exchange!</h1>
          <ConnectWallet accentColor="#e11d48" colorMode='light'/>
        </header>
        <hr className='my-2 border'/>
        {/* Content */}
        <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0 lg:justify-center'>
          <img className='w-80 object-cover pb-10 lg:h-40' src="https://links.papareact.com/bdy" alt="" />
          <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>The BOBSON Ape Exclusive Club | NFT Drop</h1>
          <p className='text-green-500 pt-2 text-xl'>7 / 21 NFTs claimed!</p>
        </div>
        {/* Mint Button */}
        <button className='h-16 bg-red-600 w-full text-white rounded-full mt-10 font-bold'>
          Mint an NFT (0.01 ETH)
        </button>
      </div>
    </div>
  )
}




export default NFTDropPage