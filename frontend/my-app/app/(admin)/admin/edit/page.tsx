"use client";

import API from "@/lib/axios";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminEdit() {
    const params=useSearchParams();
    const id=params.get("id") as string;
    const[select,setSelect]=useState("");   
    const handleSelect=async ()=>{
        try{
            if(!select) return alert("Please select a status");
            await API.put(`/order/edit/${id}`,{
                 status: select 
            });
            alert("Status updated successfully!");
        }
        catch(err: any){
            console.log("error");
        }
    }
   return (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">

    <div className="w-full max-w-md bg-[#1a1a1a]
      border border-[#2a2a2a] rounded-2xl
      shadow-2xl p-8 text-white">

      <h2 className="text-3xl font-bold text-center text-[#d4a373] mb-8">
        Update Order Status
      </h2>

      <div className="space-y-6">

        <select
          onChange={(e) => setSelect(e.target.value)}
          value={select}
          className="w-full px-4 py-3 rounded-xl
            bg-[#111] border border-[#333]
            text-white
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            transition"
        >
          <option value="">Select Status</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button
          onClick={handleSelect}
          className="w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
            text-black hover:opacity-90
            transition shadow-lg"
        >
          Set Status
        </button>

      </div>

    </div>

  </div>
);

}