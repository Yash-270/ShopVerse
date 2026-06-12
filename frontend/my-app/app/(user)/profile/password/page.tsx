"use client";

import API from "@/lib/axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Password() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const route=useRouter();

  const handleSub = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put("/user/profile/password", {
        currPass: currentPassword,
        newPass: newPassword,
      });

      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      route.push("/profile");
    } catch (err) {
      console.error("Failed to update password");
      alert("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">

    <div className="w-full max-w-md bg-[#1a1a1a]
      border border-[#2a2a2a] rounded-2xl
      shadow-2xl p-8">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center text-[#d4a373] mb-2">
        Change Password
      </h2>

      <p className="text-center text-gray-400 text-sm mb-8">
        Update your account security
      </p>

      <form onSubmit={handleSub} className="space-y-6">

        <input
          type="password"
          placeholder="Enter Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl
            bg-[#111] border border-[#333]
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            transition"
        />

        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl
            bg-[#111] border border-[#333]
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
            text-black hover:opacity-90 transition shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </form>

    </div>
  </div>
);
}
