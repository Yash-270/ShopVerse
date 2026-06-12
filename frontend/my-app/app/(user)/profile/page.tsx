"use client";

import API from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  name: string;
  age: number;
  gender: string,
  email: string;
  contact: number;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const route=useRouter();

  const fetchProfile = async () => {
    try {
      const res = await API.get<User>("/user/profile");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12">

  <div className="max-w-3xl mx-auto bg-[#1a1a1a] 
    border border-[#2a2a2a] rounded-2xl 
    shadow-2xl p-8 space-y-8">

    <h2 className="text-3xl font-bold text-[#d4a373] text-center">
      My Profile
    </h2>

    <div className="space-y-6 text-gray-300">

      <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
        <p><b className="text-white">Name:</b> {user.name}</p>
      </div>

      <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
        <p><b className="text-white">Age:</b> {user.age}</p>
      </div>

      <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
        <p><b className="text-white">Gender:</b> {user.gender}</p>
      </div>

      {/* EMAIL */}
      <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
        <p>
          <b className="text-white">Email:</b> {user.email || "Not Added"}
        </p>

        <button
          onClick={() =>
            route.push(`/recoverpassword?keyedit=${encodeURIComponent(user.email || "")}`)
          }
          className="px-4 py-1 rounded-lg text-sm font-medium
            bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
            text-black hover:opacity-90 transition"
        >
          {user.email ? "Edit" : "Add"}
        </button>
      </div>

      {/* CONTACT */}
      <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
        <p>
          <b className="text-white">Contact:</b> {user.contact || "Not Added"}
        </p>

        <button
          onClick={() => route.push("/profile/edit")}
          className="px-4 py-1 rounded-lg text-sm font-medium
            bg-[#1a1a1a] border border-[#333]
            hover:bg-[#2a2a2a] transition"
        >
          {user.contact ? "Edit" : "Add"}
        </button>
      </div>

    </div>

  </div>

</div>
  );
}
