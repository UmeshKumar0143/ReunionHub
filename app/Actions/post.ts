"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getPosts() {
    
    const user = await currentUser();
        if (!user) {
            redirect('/sign-up')
        };

    const posts = await prisma.post.findMany({
        where: {
            alumniId: user?.id,
        },
        include:{
            alumni:true
        }
    });

    return posts;
}
export async function getAllPosts() {
    const user = await currentUser();
        if (!user) {
            redirect('/sign-up')
        };

    const posts = await prisma.post.findMany({
        include:{
            alumni:true
        }
    });

    return posts;
}

export async function getWebinars(){
    const user = await currentUser(); 
    
    const webinars = await prisma.webinar.findMany({
        where:{
            alumniId: user?.id
        },
        include:{
            alumni:true
        }
    })
}
export async function getReferrals(){
    const user = await currentUser(); 
    
    const webinars = await prisma.jobPost.findMany({
        where:{
            alumniId: user?.id
        },
        include:{
            alumni:true
        }
    })
}
