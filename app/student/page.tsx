import Image from "next/image"
import { AlumniPosts } from "../component/Alumini-posts"
import { AlumniSuggestions } from "../component/Alumini-suggestions"
import { Sidebar } from "../component/Sidebar"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Bell, Briefcase } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default async function Home() {
    const user = await currentUser(); 
    if (!user) {
        redirect('sign-up'); 
    }
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span className="font-semibold text-blue-600">ReconnectHub</span>
          </div>
          <div className="relative flex-1 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for alumni by name, company, or industry..."
                className="w-full rounded-md border border-gray-300 py-2 pl-4 pr-10 text-sm focus:border-blue-500 focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-full px-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:cursor-pointer hover:text-blue-500">
              <Bell/>
            </button>
            <button className="text-gray-500 hover:cursor-pointer hover:text-blue-500">
              <Briefcase/>
            </button>
            <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
              <UserButton afterSignOutUrl="/sign-in"/>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <AlumniSuggestions />
            <AlumniPosts />
            <div className="flex w-full justify-center items-center">
            <Link href={'/resume'}  className="px-8 bg-purple-400 py-3 w-[20xw] mt-8 text-white font-bold capitalize rounded-lg ">Upload Your Resume </Link>
            </div>
          </div>
          <div className="md:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  )
}