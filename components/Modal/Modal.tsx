import { useRecoilState, useRecoilValue } from "recoil"
import MuiModal from '@mui/material/Modal'
import { modalState, movieState } from "../../atoms/modalAtom"
import { PlusIcon, ThumbUpIcon, XIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import { Element, Genre } from "../../typings"
import ReactPlayer from "react-player/lazy"
import { FaPlay } from "react-icons/fa"
import Thumbnail from "../Row/Thumbnail"

function Modal(){
    const [showModal, setShowModal]=useRecoilState(modalState)
    const [movie, setMovie] =useRecoilState(movieState)
    const [trailer, setTrailer] = useState("")
    const [genres, setGenres] = useState<Genre[]>([])
    const [muted, setMuted] = useState(false)

    useEffect(()=>{
        if(!movie) return

        async function fetchMovie(){
            const data= await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === 'tv' ? 'tv' : 'movie'
                  }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                  }&language=en-US&append_to_response=videos`
            )
            .then((response) => response.json())
            .catch(err=> console.log(err.message))

            if(data?.videos){
                const index= data.videos.results.findIndex(
                    (element:Element)=> element.type ==="Trailer"
                )
                setTrailer(data.videos?.results[index]?.key)
            }
            if(data?.genres){
                setGenres(data.genres)
            }

        }
        fetchMovie()
    },[movie])

    const handleClose= () => {
        setShowModal(false)
    }

    console.log(trailer)

    return(
        <MuiModal open={showModal} onClose={handleClose} className="fixed !top-7 left-0 right-0 w-full mx-auto max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
            <>
                <button onClick={handleClose} className="modalButton absolute right-5 !z-40 top-5 h-9 w-9 border-none bg-[#181818]">
                    <XIcon className="w-6 h-6"/>
                </button>

                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}
                    />
                    <div className="absolute flex items-center justify-between w-full px-10 bottom-10">
                        <div className="flex space-x-2">
                            <button className="flex text-xl font-bold bg-white rounded px-8 items-center text-black transition hover:bg=[#e6e6e6] gap-x-2">
                                <FaPlay className="text-black w-7 h-7"/>
                                Play
                            </button>

                            <button className="modalButton">
                                <PlusIcon className="h-7 w-7"/>
                            </button>

                            <button className="modalButton">
                                <ThumbUpIcon className="h-7 w-7"/>
                            </button>
                            
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    ) 
    
}

export default Modal