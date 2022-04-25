import { async } from "@firebase/util";
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs{
  email:string,
  password:string
}

function login() {
  
  const [login, setLogin]= useState(false)
  const {signIn, signUp} =useAuth()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
    // console.log({});

    if(login){
      await signIn(email, password)
    }else{
      await signUp(email, password)
    }
    
  }



  return (
    <div className="relative flex flex-col h-screen bg-black md:items-center md:justify-center md:bg-transparent">
        <Head>
          <title>Login | Netflix Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Image
          src="https://rb.gy/p2hphi"
          layout="fill"
          className="-z-10 !hidden opacity-60 sm:!inline"
          objectFit="cover"
        />

      <img
        src="https://rb.gy/ulxxee"
        className="absolute object-contain cursor-pointer left-4 top-4 md:left-10 md:top-6"
        width={150}
        height={150}
      />


      <form action="" className="relative px-6 py-10 mt-24 space-y-8 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14" 
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-semibold">Login</h1>
        <div className="space-y-4">
          <label htmlFor="" className="inline-block w-full">
            <input type="email" placeholder="email" className="input"
            {...register('email', {required: true})}
            />
            {errors.email && 
              <span className="text-sm text-red-600">
              This field is required
              </span>}
          </label>
          <label htmlFor="" className="inline-block w-full">
            <input type="password" placeholder="Password" className="input"
            {...register('password', {required: true})}
            />
            {errors.password && 
              <span className="text-sm text-red-600">
              This field is required
              </span>}
          </label>
        </div>

        <button type="submit" className="w-full rounded bg-[#e50914] py-3" onClick={()=> setLogin(true)}>
            Login
        </button>
        
        <div className="text-[gray]">
          Baru di sini ?{' '}
          <button className="text-white hover:underline" onClick={()=> setLogin(false)}>
            Daftar
          </button>
        </div>

      </form>


    </div>
  )
}

export default login