"use client";

import API from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  role: "Customer" | "Seller" | "admin";
};

type Order = {
  _id: string;
  orderId: string;
  dstatus: string;
  status: string;
  product: {
    _id: string;
    title: string;
    price: number;
    image: string;

    category: string;
    type: string;
    brand: string;
    fabric: string;
    size: string;
    color: string;
    gender: string;
    skinType: string;
  };
  user: {
    name: string;
    contact: string;
  };
  address: {
    fullName: string;
    contact: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
  
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  const fetchUser = async () => {
    try {
      const res = await API.get<User>("/user/profile");
      setUser(res.data);
    } catch {
      console.error("Failed to fetch user");
    }
  };

  // ---------------- FETCH ORDERS ----------------
  const fetchOrders = async (role: User["role"]) => {
    try {
      const url =
        role === "Seller" ? "/order/seller" : "/order/review";
      const res = await API.get<Order[]>(url);
      setOrders(res.data);
    } catch {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchOrders(user.role);
    }
  }, [user]);

  if (loading) return <p>Loading orders...</p>;

  return (
  <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12">

    <div className="max-w-6xl mx-auto space-y-8">

      <h2 className="text-3xl font-bold text-[#d4a373] text-center">
        Manage Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No Orders Found
        </div>
      ) : (
        orders.map((o) => (
          <div
            key={o._id}
            className="bg-[#1a1a1a] border border-[#2a2a2a]
              rounded-2xl p-6 shadow-xl
              flex flex-col lg:flex-row gap-8
              hover:shadow-[#d4a373]/20 transition duration-300"
          >

            {/* PRODUCT SECTION */}
            <div className="flex gap-4">

              <img
                src={o.product.image}
                alt={o.product.title}
                className="h-28 w-28 object-cover rounded-xl"
              />

              <div>
                <Link
                  href={`/product/${o.product._id}`}
                  className="text-lg font-semibold text-[#e6c79c] hover:underline"
                >
                  {o.product.title}
                </Link>

                <p className="text-gray-400 mt-2">
                  ₹{o.product.price}
                </p>
              </div>

            </div>

            {/* CUSTOMER + ADDRESS */}
            <div className="flex-1 space-y-3 text-gray-300">

              <div>
                <p>
                  <b className="text-white">Customer:</b> {o.user.name}
                </p>
                <p>
                  <b className="text-white">Contact:</b> {o.user.contact}
                </p>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-[#d4a373]">
                  Shipping Address:
                </p>

                <p>{o.address.fullName}</p>
                <p>{o.address.addressLine}</p>
                <p>
                  {o.address.city}, {o.address.state} - {o.address.pincode}
                </p>
                <p>{o.address.contact}</p>
              </div>

              {/* STATUS BADGE */}
              <div className="mt-4">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold
                    ${
                      o.status === "DELIVERED"
                        ? "bg-green-700 text-white"
                        : o.status === "SHIPPED"
                        ? "bg-yellow-600 text-black"
                        : o.status === "CANCELLED"
                        ? "bg-red-700 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                >
                  {o.status}
                </span>

              </div>
               <div className="mt-4">
                <span
                  className="px-4 py-1 rounded-full text-sm font-semibold">{o.dstatus}
                </span>
              </div>

            </div>

            {/* ACTION BUTTON */}
            <div className="flex items-start">

              <button
                onClick={() =>
                  route.push(
                    `/admin/edit?id=${encodeURIComponent(o.orderId)}`
                  )
                }
                className="px-6 py-3 rounded-xl font-semibold
                  bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
                  text-black hover:opacity-90 transition shadow-lg"
              >
                Edit Status
              </button>

            </div>

          </div>
        ))
      )}

    </div>

  </div>
);
}
