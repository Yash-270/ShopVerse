"use client";

import API from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function ForgetPassword() {
  const params = useSearchParams();
  const identifier = params.get("value"); // email or phone
  const route = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier || "");
  const handleSub = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!identifier) {
      alert("Invalid request");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await API.put("/user/forget-password", {
        type: isEmail ? "email" : "contact",
        identify: identifier,

        password: newPassword,
        conf: confirmPassword,

      });

      alert("Password updated successfully");
      route.push("/login");
    } catch (err) {
      alert("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">

    <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border border-[#2a2a2a]">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center text-[#d4a373] mb-2">
        Reset Password
      </h2>

      <p className="text-center text-sm text-gray-400 mb-8">
        Enter your new password below
      </p>

      <form onSubmit={handleSub} className="space-y-5">

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#111]
            border border-[#333] text-white
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            placeholder-gray-500 transition"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#111]
            border border-[#333] text-white
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            placeholder-gray-500 transition"
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
