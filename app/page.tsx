import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
 const user = await currentUser();
 if(!user)[
  redirect('/sign-up')
 ]
redirect('/student'); 
}
