import { Children, ReactNode } from "react";

export default function layout({children}:{children: ReactNode}){
    return <div>
        {children}
    </div>
}