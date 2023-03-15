import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
// Sanity and Custom Image Handler Import
import { sanityClient, urlFor } from '../sanity';
// Custom Typings Import
import { Collection } from '../typings';

// Custom Interface for NFT Collection
interface Props {
  collections: Collection[],
}

const Home = ({ collections }: Props) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen py-20 px-10 2xl:px-0">
      <Head>
        <title>NFT Drop</title>
      </Head>
      {/* Home Page Title */}
      <h1 className='mb-10 text-4xl font-extralight'>The{' '}<span className='font-extrabold underline decoration-pink-600/50'>BOBSON</span>{' '}NFT Grand Exchange!</h1>
      {/* Main Body */}
      <main className='bg-slate-100 p-10 shadow-xl shadow-rose-400/20'>
        {/* Collection Container */}
        <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {/* Map all elements of the queried collections into a display component that links to the collection page  */}
          {collections.map(collection => (
            // Link to collection page
            <Link href={`/nft/${collection.slug.current}`}>
              {/* Internal Container */}
              <div className='flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105'>
                {/* Collection Image */}
                <img className='h-96 w-60 rounded-2xl object-cover' src={urlFor(collection.mainImage).url()} alt="" />
                {/* Collection Details */}
                <div className='p-5'>
                  {/* Collection Title */}
                  <h2 className='text-3xl'>{collection.title}</h2>
                  {/* Collection Description */}
                  <p className='mt-2 text-sm text-gray-400'>{collection.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
// Asynchronous call with ServerSide Rendering
export const getServerSideProps: GetServerSideProps = async () => {
  // GROQ Query to gather the collections and their details
  const query =
  `*[_type == "collection"]{
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
  const collections = await sanityClient.fetch(query);
  // Return as props to the Home page functional component
  return {
    props: {
      collections,
    }
  }
}
