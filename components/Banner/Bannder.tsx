import Image from "next/image"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../constants/movie"
import { Movie } from "../../typings"
import { FaPlay } from 'react-icons/fa'

interface Props{
  netflixOriginals:Movie[]
}

function Banner({netflixOriginals}:Props) {
  
  const [movie, setMovie] =useState<Movie | null>(null)

  useEffect (()=>{
    setMovie(
      netflixOriginals[Math.floor(Math.random()* netflixOriginals.length)]
    )
  },[netflixOriginals])

  console.log(movie);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 md:h-[85vh] lg:justify-end lg:pb-12">
    <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image src={`${BASE_URL}${movie?.backdrop_path || movie?.poster_path}`} layout='fill' objectFit="cover"/>
      </div>
        <h1 className="text-2xl lg:text-7xl md:4xl">{movie?.title|| movie?.name}</h1>
        <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">{movie?.overview}</p>

        <div>
          <button className="text-black bg-white bannerButton">
          <FaPlay className="w-4 h-4 text-black md:h-7 md:w-7" />
            Play
          </button>
          <button className="bannerButton">More Info</button>
        </div>

    </div>
  )
}

export default Banner