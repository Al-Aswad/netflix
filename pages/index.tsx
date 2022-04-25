import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { listenerCount } from 'process'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import Banner from '../components/Banner/Bannder'
import Header from '../components/Header/Header'
import Row from '../components/Row/Row'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'
import request from '../utils/request'

interface Props{
  netflixOriginals:Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries
}:Props) => {
  const {logout, loading} =useAuth()
  // const showModal=useRecoilValue
  const [showModal, setShowModal]= useState(false)

  if(loading) return <div>Loading...</div>

  console.log("Tranding Now" ,trendingNow);

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Netflix Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className='relative pb-24 pl-4 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals}/>
          <section className='md:space-y-24'>
            <Row title="Original"  films={netflixOriginals}/>
            {/* <Row title="Tranding Now"  films={trendingNow}/> */}
            <Row title="Top Rated"  films={topRated}/>
            <Row title="Action"  films={actionMovies}/>

            {/* {list.length >0 && <Row title="My List" films={list} />} */}

            <Row title="Komedi"  films={comedyMovies}/>
            <Row title="Hantu"  films={horrorMovies}/>
            <Row title="Romantis"  films={romanceMovies}/>
            <Row title="Dokumentari"  films={documentaries}/>
          </section>
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
    fetch(request.fetchTrandingNow).then(res => res.json()),
    fetch(request.fetchTopRated).then(res => res.json()),
    fetch(request.fecthActionMovies).then(res => res.json()),
    fetch(request.fetchComedyMovies).then(res => res.json()),
    fetch(request.fetchHorrorMovies).then(res => res.json()),
    fetch(request.fetchRomanceMovies).then(res => res.json()),
    fetch(request.fetchDocumentaries).then(res => res.json()),
  ]);

  console.log("Trading Now ", trandingNow);

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