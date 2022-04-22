import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { useRef, useState } from "react"
import { Movie } from "../../typings"
import Thumbnail from "./Thumbnail"

interface Props{
  title:string,
  films:Movie[]
}


const Row = ({title, films}:Props) => {

  const rowRef= useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick=(direction:string)=>{
      setIsMoved(true)


      if(rowRef.current){
        const {scrollLeft, clientWidth} = rowRef.current

        const scrollTo = 
          direction === "left" 
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth
          rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"})

      }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">

      <h2 className="w-56 text-sm font-semibold cursor-pointer text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>

      <div className="relative group">

        <ChevronLeftIcon className={`absolute z-40 top-0 bottom-0 m-auto transition opacity-0 left-2 h-9 w-9 hover:scale-125 group-hover:opacity-100 ${!isMoved && "hidden"}`} onClick={()=> handleClick("left")}/>

        <div ref={rowRef} className="flex items-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
          
          {films?.map((movie) => (
            
            <Thumbnail key={movie.id} movie={movie}/>

          ))}
          {/* // <Thumbnail/>
          // <Thumbnail/> */}

        </div>

        <ChevronRightIcon className="absolute top-0 bottom-0 z-40 m-auto transition opacity-0 right-2 h-9 w-9 hover:scale-125 group-hover:opacity-100" onClick={()=> handleClick("right")}/>
      </div>

    </div>
  )
}

export default Row