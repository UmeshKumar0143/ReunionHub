"use server"

import prisma from "@/lib/prisma"

export default async function getAlumni(id:string){
        const alumni = prisma.alumni.findUnique({
            where:{
                id: id
            },
            include:{
                post: true, 
            }
        })
        return alumni; 
}