"use client";

import API from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  _id: string;
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
  }
};

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchOrders = async () => {
    try {
      const res = await API.get<Order[]>("/order/myorder");
      setOrders(res.data);
    } catch {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchOrders();
  },[]);

  if (loading) return <p>Loading orders...</p>;

  return (
  <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12">

    <div className="max-w-5xl mx-auto space-y-8">

      <h2 className="text-3xl font-bold text-[#d4a373] text-center">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-10">
          No Orders Found
        </div>
      ) : (
        orders.map((o) => (
          <div
            key={o._id}
            className="bg-[#1a1a1a] border border-[#2a2a2a]
              rounded-2xl p-6 shadow-xl
              flex flex-col md:flex-row gap-6
              hover:shadow-[#d4a373]/20 transition duration-300"
          >
            {/* PRODUCT IMAGE */}
            <div className="flex-shrink-0">
              <img
                src={o.product.image}
                alt={o.product.title}
                className="h-28 w-28 object-cover rounded-xl"
              />
            </div>

            {/* PRODUCT DETAILS */}
            <div className="flex flex-col justify-between flex-1">

              <div>
                <Link
                  href={`/product/${o.product._id}`}
                  className="text-lg font-semibold text-[#e6c79c] hover:underline"
                >
                  {o.product.title}
                </Link>

                <p className="text-gray-400 mt-1">
                  Price: ₹{o.product.price}
                </p>
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

            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}
