
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import Details from "../component/Details";

export default async function Page(){
    const user = await currentUser(); 
    if(!user){
        redirect('/sign-up')
    }
   
     return (
        <div>
            <Details/>
        </div>
     )
}