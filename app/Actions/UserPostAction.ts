"use server"

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-up');
  }
  
  const title = formData.get("title") as string;
  const description = formData.get("content") as string;
  
  if (!title || !description) {
    return { success: false, error: "Title and content are required" };
  }
  
  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        description: description,
        alumniId: user.id
      }
    });
    
    return { success: true, data: post };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function createWebinar(formData: FormData) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-up');
  }
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dateString = formData.get("date") as string;
  const timeString = formData.get("time") as string;
  const link = formData.get("link") as string || "https://meet.google.com/"; // Default or from form
  
  if (!title || !description || !dateString || !timeString) {
    return { success: false, error: "All fields are required" };
  }
  
  // Combine date and time strings into a Date object
  const [year, month, day] = dateString.split('-').map(Number);
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date(year, month - 1, day, hours, minutes);
  
  try {
    const webinar = await prisma.webinar.create({
      data: {
        title,
        description,
        date,
        link,
        alumniId: user.id
      }
    });
    
    return { success: true, data: webinar };
  } catch (error) {
    console.error("Error creating webinar:", error);
    return { success: false, error: "Failed to create webinar" };
  }
}

export async function createJobPosting(formData: FormData) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-up');
  }
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const company = formData.get("company") as string;
  const location = formData.get("location") as string;
  const salaryString = formData.get("salary") as string;
  const salary = salaryString ? parseFloat(salaryString) : null;
  const link = formData.get("link") as string || "https://careers.company.com/"; // Default or from form
  
  if (!title || !description || !company || !location) {
    return { success: false, error: "Title, description, company, and location are required" };
  }
  
  // Current date for job posting
  const date = new Date();
  
  try {
    const jobPost = await prisma.jobPost.create({
      data: {
        title,
        description,
        company,
        location,
        salary,
        date,
        link,
        alumniId: user.id
      }
    });
    
    return { success: true, data: jobPost };
  } catch (error) {
    console.error("Error creating job posting:", error);
    return { success: false, error: "Failed to create job posting" };
  }
}