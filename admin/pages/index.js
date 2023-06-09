import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"

export default function Home(){
  const {data: session} = useSession();
  return(
    <Layout>
    <div className="flex justify-between">
    <h2>
      Hello, {session?.user?.name}
    </h2>
      <div className="bg-gray-200 flex flex-col text-center items-center text-black p-2 rounded-lg">
        <img src={session?.user.image} className="object-cover rounded-lg w-8 h-8"  alt="user profile" />
        {session?.user?.name}
      </div>
    </div>
    </Layout>
  )
}
