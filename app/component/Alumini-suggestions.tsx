"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAlumuni } from "../alumni/action"

// const suggestedAlumni = [
//   {
//     id: 1,
//     name: "Alex Johnson",
//     title: "Senior Software Engineer at Google",
//     year: "2015",
//     connections: ["CS302", "CS401", "3 Friends"],
//     image: "/placeholder.svg?height=60&width=60",
//   },
//   {
//     id: 2,
//     name: "Sarah Williams",
//     title: "Product Manager at Meta",
//     year: "2016",
//     connections: ["CS302", "CS401", "4 more"],
//     image: "/placeholder.svg?height=60&width=60",
//   },
//   {
//     id: 3,
//     name: "Michael Chen",
//     title: "Data Scientist at Microsoft",
//     year: "2015",
//     connections: ["CS302", "CS401", "3 Friends"],
//     image: "/placeholder.svg?height=60&width=60",
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     title: "UX Designer at Adobe",
//     year: "2017",
//     connections: ["CS302", "CS401"],
//     image: "/placeholder.svg?height=60&width=60",
//   },
// ]

export function AlumniSuggestions() {
  const [suggestedAlumni, setSuggestedAlumni] = useState([]); 
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
      <div className="mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500 mr-2"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <h2 className="text-lg font-semibold">Suggested Alumni</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {!loading ?  suggestedAlumni.map((alumni) => (
          <div key={alumni.id} className="flex items-start gap-3 rounded-md p-2">
          <div className="h-10 w-10 flex bg-blue-200 justify-center items-center border  rounded-full">
               <h1 className="font-bold ">{alumni.name[0]}</h1>
              </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm">{alumni.name}</h3>
              <p className="text-xs text-gray-500 truncate">{alumni.title}</p>
              <p className="text-xs text-gray-500">Class of {alumni.graduationYear} , {alumni.major}</p>
             
            </div>
            <button className="flex-shrink-0 rounded-md hover:cursor-pointer bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600">
              Connect
            </button>
          </div>
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