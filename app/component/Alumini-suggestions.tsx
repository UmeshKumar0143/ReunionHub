"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAlumuni } from "../Actions/action"
import { PersonStanding, Users } from "lucide-react";

interface alumniData {
  id:string
  name: string
  title: string
  university: string
  company : string
  graduationYear : number
  rating: number
  description: string
  major: string
}

export function AlumniSuggestions() {
  const [suggestedAlumni, setSuggestedAlumni] = useState<alumniData[]>([]); 
  const [loading, setLoading] = useState(false); 
  useEffect(()=> {
    const getAllAlumnis = async() =>{
      setLoading(true); 
      const data = await getAlumuni();
      setLoading(false); 
      setSuggestedAlumni(data); 
    }
    getAllAlumnis();
  },[])
  console.log(suggestedAlumni); 


  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-4 gap-2 flex items-center">
      <Users className="text-blue-400" />
        <h2 className="text-lg font-semibold">Suggested Alumni</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {!loading ?  suggestedAlumni.map((alumni:alumniData,index:number) => (
          <Link href={`/alumni-profile/${alumni.id}`} key={index} className="flex items-start gap-3 hover:bg-gray-100  rounded-md p-4">
          <div className="h-10 w-10 flex bg-blue-200 justify-center items-center border  rounded-full">
               <h1 className="font-bold ">{alumni?.name[0]}</h1>
              </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm">{alumni?.name}</h3>
              <p className="text-xs text-gray-500 truncate">{alumni?.title} at {alumni.company}</p>
              <p className="text-xs text-gray-500 truncate">{alumni.university}</p>
              <p className="text-xs text-gray-500">Class of {alumni?.graduationYear} , {alumni?.major}</p>
             
            </div>
            <button className="flex-shrink-0 rounded-md hover:cursor-pointer bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600">
              Connect
            </button>
          </Link>
        )): <div className="text-center">Loading...</div>  }
      
      </div>

      <div className="mt-4 text-center">
        <Link href="#" className="text-sm text-blue-500 hover:underline">
          View More Suggestions
        </Link>
      </div>
    </div>
  )
}