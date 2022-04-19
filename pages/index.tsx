import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner/Bannder'
import Header from '../components/Header/Header'
import request from '../utils/request'

const Home: NextPage = () => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netflix Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main>
        <Banner></Banner>
          {/* Next Js */}
      </main>

     
    </div>
  )
}

export default Home


export const getServerSideProps = async () => {

  const [
    netflixOriginals,
    trandingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,

  ] = await Promise.all([
    fetch(request.fecthNetflixOriginals).then(res => res.json()),
    fetch(request.fetchTranding).then(res => res.json()),
    fetch(request.fetchTopRated).then(res => res.json()),
    fetch(request.fecthActionMovies).then(res => res.json()),
    fetch(request.fetchComedyMovies).then(res => res.json()),
    fetch(request.fetchHorrorMovies).then(res => res.json()),
    fetch(request.fetchRomanceMovies).then(res => res.json()),
    fetch(request.fetchDocumentaries).then(res => res.json()),
  ]);

  return {
    props:{
      netflixOriginals: netflixOriginals.results,
      trandingNow: trandingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    }
  }

}