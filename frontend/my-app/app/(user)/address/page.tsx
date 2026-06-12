"use client";
import API from "@/lib/axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react"

type Info={
    fullName: string,
    contact: string,
    addressLine: string,
    city: string,
    state: string,
    pincode: string,
    gender: string
}
const Address=()=>{
    const [add,setAdd]=useState<Info>({
        fullName: "",
        contact: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        gender: ""
    });
    
    const route=useRouter();
     const handleChange=(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setAdd({...add,[e.target.name]: e.target.value});
    }

    const handleSub= async (e: FormEvent)=>{
        e.preventDefault();
        try{
            const res=await API.post("/address",add);
            alert("Address added");
            route.push("/address/list");
        } catch (err: any) {
            alert(err.response?.data?.error || "Address failed");
        }
    };
   return (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4 py-12">

    <div className="w-full max-w-xl bg-[#1a1a1a]
      border border-[#2a2a2a] rounded-2xl
      shadow-2xl p-8">

      <h2 className="text-3xl font-bold text-center text-[#d4a373] mb-8">
        Add New Address
      </h2>

      <form onSubmit={handleSub} className="space-y-6">

        <input
          type="text"
          name="fullName"
          value={add.fullName}
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl
            bg-[#111] border border-[#333]
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            transition"
        />

        <input
          type="text"
          name="contact"
          value={add.contact}
          placeholder="Contact"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl
            bg-[#111] border border-[#333]
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            transition"
        />

        <input
          type="text"
          name="addressLine"
          value={add.addressLine}
          placeholder="Address Line"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl
            bg-[#111] border border-[#333]
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            transition"
        />

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="city"
            value={add.city}
            placeholder="City"
            onChange={handleChange}
            className="px-4 py-3 rounded-xl
              bg-[#111] border border-[#333]
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#d4a373]
              transition"
          />

          <input
            type="text"
            name="state"
            value={add.state}
            placeholder="State"
            onChange={handleChange}
            className="px-4 py-3 rounded-xl
              bg-[#111] border border-[#333]
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#d4a373]
              transition"
          />

        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="pincode"
            value={add.pincode}
            placeholder="Pincode"
            onChange={handleChange}
            className="px-4 py-3 rounded-xl
              bg-[#111] border border-[#333]
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#d4a373]
              transition"
          />

          <input
            type="text"
            name="gender"
            value={add.gender}
            placeholder="Gender"
            onChange={handleChange}
            className="px-4 py-3 rounded-xl
              bg-[#111] border border-[#333]
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#d4a373]
              transition"
          />

        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
            text-black hover:opacity-90
            transition shadow-lg"
        >
          Add Address
        </button>

      </form>

    </div>

  </div>
);

}
export default Address;