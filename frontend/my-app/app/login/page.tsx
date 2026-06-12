"use client";
import API from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
type Info={
    identify:string,
    password:string,
}
const Login = () => {
    
    const [form, setForm] = useState<Info>({
        identify: "",
        password: "",
    });
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const isEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.identify);

      const isPhone =
        /^[0-9]{10}$/.test(form.identify);   // simple 10 digit check

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!isEmail && !isPhone) {
                alert("Please enter valid email or mobile number");
                return;
            }

        const res = await API.post("/user/login",{
            type: isEmail ? "email" : "contact",
            identify: form.identify,
            password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        alert("Login Successful");
        router.refresh();
        router.push("/");
        } catch (err: any) {
        alert(err.response?.data?.error || "Login failed");
        }
    };

return (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">

    <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border border-[#2a2a2a]">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center text-[#d4a373] mb-2">
        Welcome Back
      </h2>

      <p className="text-center text-gray-400 text-sm mb-6">
        Login to continue your journey
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="identify"
          value={form.identify}
          placeholder="Email or Mobile Number"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-[#111]
          border border-[#333] text-white
          focus:outline-none focus:ring-2 focus:ring-[#d4a373]
          placeholder-gray-500 transition"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-[#111]
          border border-[#333] text-white
          focus:outline-none focus:ring-2 focus:ring-[#d4a373]
          placeholder-gray-500 transition"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold
          bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
          text-black hover:opacity-90 transition shadow-lg"
        >
          Login
        </button>

      </form>

      {/* FOOTER */}
      <div className="mt-6 text-center text-sm text-gray-400 space-y-2">

        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#d4a373] hover:underline"
          >
            Sign up
          </Link>
        </p>

        <p>
          <Link
            href="/recoverpassword"
            className="text-[#c08962] hover:underline"
          >
            Forgot Password?
          </Link>
        </p>

      </div>

    </div>
  </div>
);

};
export default Login;