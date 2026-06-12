"use client";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
type Props={
    children: React.ReactNode;
};
const AdminLayout=({children}: Props)=>{
    const[allow,setAllow]=useState<boolean | null>(null);
    const route=useRouter();
    useEffect(()=>{
        getUser()
            .then((role)=>{
            if (role === "admin" || role === "Seller") {
                setAllow(true);
            }
            else{
                setAllow(false);
            }
        })
        .catch(()=>setAllow(false));
    },[]);

    if(allow === null) return <p>Loading...</p>
    if(!allow) return route.push("/");
    return children;
}

export default AdminLayout;