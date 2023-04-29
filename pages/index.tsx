import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link';
// Sanity and Custom Image Handler Import
import { sanityClient, urlFor } from '../sanity';
import { Collection } from '../typings';

interface HomeProps {
  collections: Collection[],
}

const Home = ({ collections }: HomeProps) => {
  return (
    // Base Container
    <div className="bg-primary-100">
      {/* Content Container */}
      <div className='flex flex-col max-w-7xl mx-auto py-20 px-10 2xl:px-0 min-h-screen'>
        {/* Title */}
        <Head>
          <title>Bob's Grand NFT Exchange</title>
        </Head>
        {/* Home Page Title */}
        <h1 className='mb-10 text-4xl font-extralight'><span className='text-primary-950 font-extrabold underline decoration-primary-800/50'>Bob's</span>{' '}Grand NFT Exchange</h1>
        {/* Main Body */}
        <main className='bg-primary-50 p-10 shadow-xl shadow-primary-500/20'>
          {/* Collection Container */}
          <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {/* Map all elements of the queried collections from Sanity into a display component that links to the collection page  */}
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
                    <h2 className='text-3xl text-primary-950'>{collection.title}</h2>
                    {/* Collection Description */}
                    <p className='mt-2 text-sm text-primary-600'>{collection.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
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
