import { useState } from "react";
import logo from '../assets/img/AlphaBlack.png'
import Nav from "@/components/Nav"
import { useSession, signIn } from "next-auth/react"
import Image from "next/image";
export default function Layout({children}){
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false)
  if(session) {
    return (
      <div className="md:bg-primary min-h-screen bg-tertiary">
        <Image className="object-contain hidden md:block mx-auto md:h-[40px] md:w-[40px] p-1 w-[28px] h-[28px]" src={logo} alt='logo' />
        <div className="block md:hidden mb-4 w-full items-center flex justify-between px-1 py-1">
          <div className="flex gap-8 items-center">
            <button className="bg-transparent" onClick={() => setShowNav(!showNav)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col text-text_primary p-2 rounded-lg">
            <Image className="object-contain flex mx-auto md:h-[35px] md:w-[35px] p-1 w-[28px] h-[28px]" src={logo} alt='logo' />
          </div>
        </div>
        <div className='flex gap-6'>
          <Nav show={showNav} />
          <div className="bg-white h-full flex-grow mt-2 mb-2 rounded-lg p-4 mx-2">
            {children}
          </div>
        </div>
      </div>
    )
  }
  return(
    <div className={'bg-bg w-screen h-screen flex items-center justify-center'}>
      <div className="text-center text-gray-700 w-full">
       <Image className="object-contain flex mx-auto md:h-[50px] m-4 md:w-[50px] w-[22px] h-[22px] p-1" src={logo} alt='logo' />
        Not signed in
        <br />
        <button onClick={() => signIn('google')} className="bg-bg border border-primary p-2 text-primary my-4 rounded-md px-4">Sign in with Google</button>
      </div>
    </div>
  )
}
