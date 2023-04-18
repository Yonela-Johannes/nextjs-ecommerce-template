import Nav from "@/components/Nav"
import { useSession, signIn } from "next-auth/react"

export default function Layout({children}){
  const { data: session } = useSession()
  if(session) {
    return (
      <div className={'bg-blue-900 w-screen h-screen flex'}>
        <Nav />
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
          {children}
        </div>
      </div>
    )
  }
  return(
    <div className={'bg-blue-900 w-screen h-screen flex items-center'}>
      <div className="text-center w-full">
        Not signed
        <br />
        <button onClick={() => signIn('google')} className="bg-white p-2 rounded-md px-4">Sign in with Google</button>
      </div>
    </div>
  )
}
