"use client";
import API from "@/lib/axios";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
type Info={
    _id: string,
    fullName: string,
    contact: string,
    addressLine: string,
    city: string,
    state: string,
    pincode: string,
    gender: string
}

const List=()=>{
    const [add,setAdd]=useState<Info[]>([]);
    const[loading,setLoading]=useState(true);
  const fetchAdd = async () => {
    try {
      const res = await API.get("/address/list");
      setAdd(res.data);
    } catch (err: any) {
      alert(err.response?.data?.error || "Address failed");
    }
    finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdd();
  }, []);

  const deleteAddress = async (id: string) => {
    try {
      await API.delete(`/address/${id}`);
      fetchAdd(); // refresh
    } catch (err: any) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };
  if(loading) return <p> Loading...</p>
  return (
  <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12">

    <div className="max-w-4xl mx-auto space-y-8">

      <h2 className="text-3xl font-bold text-[#d4a373] text-center">
        My Addresses
      </h2>

      {add.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No Address Found
        </div>
      ) : (
        add.map((p) => (
          <div
            key={p._id}
            className="bg-[#1a1a1a] border border-[#2a2a2a]
              rounded-2xl p-6 shadow-xl
              hover:shadow-[#d4a373]/20 transition duration-300"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">

              <p>
                <b className="text-white">Full Name:</b> {p.fullName}
              </p>

              <p>
                <b className="text-white">Contact:</b> {p.contact}
              </p>

              <p>
                <b className="text-white">Address:</b> {p.addressLine}
              </p>

              <p>
                <b className="text-white">City:</b> {p.city}
              </p>

              <p>
                <b className="text-white">State:</b> {p.state}
              </p>

              <p>
                <b className="text-white">Pincode:</b> {p.pincode}
              </p>

              <p>
                <b className="text-white">Gender:</b> {p.gender}
              </p>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-6 mt-6">

              <Link
                href={`/address/edit?id=${p._id}`}
                className="px-4 py-2 rounded-lg font-semibold
                  bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
                  text-black hover:opacity-90 transition shadow-md"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteAddress(p._id)}
                className="px-4 py-2 rounded-lg
                  border border-red-600 text-red-500
                  hover:bg-red-600 hover:text-white
                  transition"
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>

  </div>
);

}
export default List;