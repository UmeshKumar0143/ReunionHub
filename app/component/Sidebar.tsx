"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import { getJobPosting, getWebinar } from "../alumni/action";

const topRatedAlumni = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sarah Williams",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Chen",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Sophia Lee",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];



// const jobPostings = [
//   {
//     id: 1,
//     title: "Software Engineer Intern",
//     company: "Google",
//     location: "Remote",
//     postedAgo: "over 1 year ago",
//     postedBy: {
//       name: "John Anderson",
//       image: "/placeholder.svg?height=24&width=24",
//     },
//   },
//   {
//     id: 2,
//     title: "Associate Product Manager",
//     company: "Apple",
//     location: "California, USA",
//     postedAgo: "over 1 year ago",
//     postedBy: {
//       name: "Sarah Johnson",
//       image: "/placeholder.svg?height=24&width=24",
//     },
//   },
//   {
//     id: 3,
//     title: "Backend Developer",
//     company: "Amazon",
//     location: "Seattle, USA",
//     postedAgo: "over 1 year ago",
//     postedBy: {
//       name: "David Wilson",
//       image: "/placeholder.svg?height=24&width=24",
//     },
//   },
// ]

// const webinars = [
//   {
//     id: 1,
//     title: "Introduction to Machine Learning in Industry",
//     description: "Learn about the fundamentals of machine learning and how companies are using it",
//     date: "Oct 15, 2023",
//     time: "10:00 AM",
//     duration: "60 minutes",
//     presenter: {
//       name: "Michael Chen",
//       image: "/placeholder.svg?height=24&width=24",
//     },
//   },
//   {
//     id: 2,
//     title: "Cloud Computing Fundamentals",
//     description: "Understanding cloud architecture components and how they're implemented",
//     date: "Oct 20, 2023",
//     time: "11:00 AM",
//     duration: "45 minutes",
//     presenter: {
//       name: "Sophia Lee",
//       image: "/placeholder.svg?height=24&width=24",
//     },
//   },
//   {
//     id: 3,
//     title: "Breaking into Product Management",
//     description: "Tips and strategies for landing your first product management role",
//     date: "Oct 25, 2023",
//     time: "10:30 AM",
//     duration: "75 minutes",
//     presenter: {
//       name: "Sarah Williams",
//       image: "/placeholder.svg?height=24&width=24",
//     },
//   },
// ]





export function Sidebar() {
  const [jobPostings, setJobPostings] = useState([]); 
const [webinars, setWebinars] = useState([]); 
useEffect(()=>{
   const getAllJobPosting = async () => {
     const data = await getJobPosting();
     setJobPostings(data);
   }
   getAllJobPosting();

   const getAllWebinars = async () => {
     const data = await getWebinar();
     setWebinars(data);
   }
   getAllWebinars(); 

},[])
console.log(jobPostings); 
console.log(webinars); 
  return (
    <div className="space-y-6">
      {/* Top Rated Alumni */}
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
            className="text-yellow-500 mr-2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <h2 className="text-sm font-semibold">Top Rated Alumni</h2>
        </div>

        <div className="space-y-3">
  {topRatedAlumni.map((alumni) => (
    <div key={alumni.id} className="flex flex-col items-start gap-1">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 border border-stone-400 justify-center items-center flex bg-blue-200 overflow-hidden rounded-full">
            {alumni.name[0]}
          </div>
          <span className="text-sm">{alumni.name}</span>
        </div>
        <button className="text-blue-500">
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>
      {/* Stars rating below name */}
      <div className="flex gap-0.5 text-yellow-500 ml-2 mt-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    </div>
  ))}
</div>


        <div className="mt-4 text-center">
          <Link href="#" className="text-xs text-blue-500 hover:underline">
            View All Top Alumni
          </Link>
        </div>
      </div>

      {/* Latest Job Postings */}
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
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <h2 className="text-sm font-semibold">Latest Job Postings</h2>
        </div>

        <div className="space-y-4">
          {jobPostings.map((job) => (
            <div key={job.id} className="rounded-md border border-gray-100 p-3">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium capitalize">{job.title}</h3>
                <button className="text-gray-400">
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
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500">
                {job.company} • {job.location}
              </p>
              <p className="text-md text-gray-950 font-bold "> <span className="text-gray-700">Salary : </span> ${job.salary}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">Posted {job.postedAgo}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">Posted by:</span>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 overflow-hidden rounded-full">
                   <h1></h1>
                    </div>
                    <span className="text-xs text-gray-500">{job.alumni.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link href="#" className="text-xs text-blue-500 hover:underline">
            View All Jobs
          </Link>
        </div>
      </div>

      {/* Upcoming Webinars */}
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
            <path d="M15 10v5" />
            <path d="M9 10v5" />
            <path d="M5 5h14" />
            <path d="M5 19h14" />
            <rect width="18" height="18" x="3" y="3" rx="2" />
          </svg>
          <h2 className="text-sm font-semibold">Upcoming Webinars</h2>
        </div>

        <div className="space-y-4">
          {webinars.map((webinar) => (
            <div key={webinar.id} className="rounded-md border border-gray-100 p-3">
              <div className="flex items-start gap-2">
                <div className="mt-1 flex-shrink-0 rounded-md bg-blue-100 p-1">
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
                    className="text-blue-500"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="m9 8 6 4-6 4Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{webinar.title}</h3>
                  <p className="text-xs text-gray-500">{webinar.description}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                   <span>
                       {new Date(webinar.date).toLocaleDateString()} • {new Date(webinar.date).toLocaleTimeString()}
                  </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">Presented by:</span>
                      <div className="flex items-center gap-1">
                      <div className="h-4 w-4 flex p-2 bg-blue-200 justify-center items-center border  rounded-full">
                      <h1 className="font-bold text-xs ">{webinar.alumni.name[0]}</h1>
                     </div>
                        <span className="text-xs text-gray-500">{webinar.alumni.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <button className="w-full rounded-md bg-blue-500 py-1 text-xs font-medium text-white hover:bg-blue-600">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link href="#" className="text-xs text-blue-500 hover:underline">
            View All Webinars
          </Link>
        </div>
      </div>
    </div>
  )
}