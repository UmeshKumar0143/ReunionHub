import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function  layout({children}:{children:ReactNode}){
    const user = await currentUser(); 
    if(!user){
        redirect('sign-up'); 
    }
    const userButtonAppearance = {
        elements: {
          userButtonAvatarBox: "w-10 h-10", 
          userButtonPopoverCard: "bg-blue-100", 
          userButtonPopoverActionButton: "text-red-600", 
        },
      };
    return<div>
           <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-lg font-medium text-indigo-700">ReconnectHub</div>
          <div className="flex items-center gap-3">
            <span className="text-gray-700">Welcome, Umesh</span>
            <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
              <UserButton appearance={userButtonAppearance} afterSignOutUrl="/sign-in"/>
            </div>
          </div>
        </div>
      </header>
        {children}
    </div>
}