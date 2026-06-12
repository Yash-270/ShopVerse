"use client";
import API from "@/lib/axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
 type Info={
    name:string,
    identify:string,
    role:string,
    password:string
}
const Signup=()=>{
  const route=useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const isVerified=verified === "true"
    const[form,setForm]=useState<Info>({
        name:"",
        identify:"",
        role:"",
        password:"",
    });
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.identify);
    const isPhone = /^[0-9]{10}$/.test(form.identify); 

    const handleChange=(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setForm({...form,[e.target.name]: e.target.value});
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    try {
      if (!isEmail && !isPhone) {
                alert("Please enter valid email or mobile number");
                return;
            }
      const res = await API.post("/user/signup",{
        ...form,
        type: isEmail ? "email" : "contact",
        //type: form.identify.includes("@") ? "email" : "contact",
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Signup Successful");
      route.push("/");
    } catch (err: any) {
      console.log(err.response?.data);
      alert(err.response?.data?.error || "Signup failed");
    }
  };
    return (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">

    <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border border-[#2a2a2a]">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center text-[#d4a373] mb-2">
        Create Account
      </h2>

      <p className="text-center text-sm text-gray-400 mb-8">
        Start your shopping journey
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={form.name}
          className="w-full px-4 py-3 rounded-xl bg-[#111]
            border border-[#333] text-white
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            placeholder-gray-500 transition"
        />

        <input
          name="identify"
          type="text"
          placeholder="Email Address or Mobile Number"
          onChange={handleChange}
          value={form.identify}
          className="w-full px-4 py-3 rounded-xl bg-[#111]
            border border-[#333] text-white
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            placeholder-gray-500 transition"
        />

        {isEmail && !isVerified && (
          <button
            type="button"
            onClick={() =>
              route.push(
                `/recoverpassword?value=${encodeURIComponent(form.identify)}`
              )
            }
            className="w-full text-sm text-[#d4a373] underline"
          >
            Validate Email
          </button>
        )}

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="w-full px-4 py-3 rounded-xl bg-[#111]
            border border-[#333] text-white
            focus:outline-none focus:ring-2 focus:ring-[#d4a373]
            placeholder-gray-500 transition"
        />

        {/* ROLE SELECT */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <p className="text-sm font-medium text-gray-400">
            I want to join as
          </p>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-56 px-4 py-2 rounded-xl bg-[#111]
              border border-[#333] text-white text-center
              focus:outline-none focus:ring-2 focus:ring-[#d4a373]
              transition"
          >
            <option value="">Select Role</option>
            <option value="Customer">Customer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isEmail && !isVerified}
          className="w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
            text-black hover:opacity-90 transition shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </button>

      </form>

      {/* FOOTER */}
      <p className="text-center text-sm text-gray-400 mt-8">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#d4a373] hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  </div>
);

}


export default Signup;