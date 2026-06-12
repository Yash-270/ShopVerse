"use client";

import API from "@/lib/axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  age: number;
  gender: string;
  email?: string;
  contact?: string;
};

export default function UpdateProfile() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    age: 0,
    gender: "",
    email: "",
    contact: "",
  });
  const [original, setOriginal] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH PROFILE ----------------
  const fetchProfile = async () => {
    try {
      const res = await API.get<User>("/user/profile");
      setOriginal(res.data);
    } catch {
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({...user,[e.target.name]:e.target.value});
  };

  // ---------------- UPDATE PROFILE ----------------
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if(!original) return;
    try {
        const payload: Partial<User>={}
        if(user.name !== original.name) payload.name=user.name;
        if(user.age !== original.age) payload.age=user.age;
        if(user.gender !== original.gender) payload.gender=user.gender;
      await API.put("/user/profile/update", payload);
      alert("Profile updated");
      router.push("/profile");
    } catch {
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

 return (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">

    <div className="w-full max-w-md bg-[#1a1a1a]
      border border-[#2a2a2a] rounded-2xl
      shadow-2xl p-8">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center text-[#d4a373] mb-2">
        Edit Profile
      </h2>

      <p className="text-center text-gray-400 text-sm mb-8">
        Update your personal details
      </p>

      <form onSubmit={handleUpdate} className="space-y-6">

        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-4 py-3 rounded-xl
            bg-[#111] border border-[#333]
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            transition"
        />

        <input
          name="age"
          type="number"
          value={user.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full px-4 py-3 rounded-xl
            bg-[#111] border border-[#333]
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            transition"
        />

        <input
          name="gender"
          value={user.gender}
          onChange={handleChange}
          placeholder="Gender"
          className="w-full px-4 py-3 rounded-xl
            bg-[#111] border border-[#333]
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            transition"
        />

        {/* 🔒 EMAIL (READ ONLY) */}
        <input
          value={user.email}
          disabled
          className="w-full px-4 py-3 rounded-xl
            bg-[#222] border border-[#333]
            text-gray-400 cursor-not-allowed"
        />

        {/* 🔒 CONTACT (READ ONLY) */}
        <input
          value={user.contact}
          disabled
          className="w-full px-4 py-3 rounded-xl
            bg-[#222] border border-[#333]
            text-gray-400 cursor-not-allowed"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
            text-black hover:opacity-90
            transition shadow-lg"
        >
          Save Changes
        </button>

      </form>

    </div>
  </div>
);

}
