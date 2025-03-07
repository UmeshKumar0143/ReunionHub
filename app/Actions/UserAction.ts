"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function createUser(formData: FormData) {
    const user = await currentUser(); 
    const profession = formData.get("profession") as string | null;
    try {
        if (profession === "alumni") {
            await prisma.alumni.create({
                data: {
                    name: user?.firstName as string, 
                    id: user?.id, 
                    enroln: parseInt(formData.get("admissionNo") as string),
                    university: formData.get("universityName") as string,
                    major: formData.get("course") as string,
                    graduationYear: parseInt(formData.get("graduationYear") as string),
                    company: formData.get("company") as string,
                    title: formData.get("title") as string,
                    description: formData.get("description") as string,
                    rating: 0, 
                }
            });
            
            return { success: true, redirectTo: "/alumni" };
        } else if (profession === "student") {
            await prisma.student.create({
                data: {
                    name: user?.firstName as string,
                    enroln: parseInt(formData.get("admissionNo") as string),
                    description: formData.get("description") as string,
                    university: formData.get("universityName") as string,
                    major: formData.get("course") as string, 
                    course: formData.get("course") as string,
                    graduationYear: parseInt(formData.get("graduationYear") as string),
                }
            });
            return { success: true, redirectTo: "/student" };
    }  
    }catch (error) {
        console.log("Error Occured", error);
  
    }
}