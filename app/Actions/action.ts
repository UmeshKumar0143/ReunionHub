"use server"

import prisma from "@/lib/prisma"

export async function getAlumuni(){
    const alumni = await prisma.alumni.findMany({})
    console.log("Alumni: ", alumni); 
    return alumni; 
}

export async function getJobPosting(){
     const jobPosting = await prisma.jobPost.findMany({
        include:{
            alumni:true
        }  })
    return jobPosting
    }

    export async function getWebinar(){
        const webinar = await prisma.webinar.findMany({
           include:{
               alumni:true
           }  })
       return webinar
       }
   
   