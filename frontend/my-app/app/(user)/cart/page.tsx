"use client";

import API from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CartItem = {
  _id: string;
  quantity: number;
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
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCart = async () => {
    try {
      const res = await API.get<CartItem[]>("/cart/mycart");
      setCart(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ---------------- update qty ----------------
  const updateQty = async (id: string, qty: number) => {
    if (qty < 1) return;

    await API.put(`/cart/${id}`, {
      quantity: qty
    });

    setCart(prev =>
      prev.map(i =>
        i._id === id ? { ...i, quantity: qty } : i
      )
    );
  };

  // ---------------- delete ----------------
  const deleteItem = async (id: string) => {
    await API.delete(`/cart/${id}`);
    setCart(prev => prev.filter(i => i._id !== id));
  };

  if (loading) return <p className="p-6">Loading...</p>;

  if (cart.length === 0)
    return <p className="p-6">Cart empty</p>;

  return (
  <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12">

    <div className="max-w-5xl mx-auto space-y-8">

      <h2 className="text-3xl font-bold text-[#d4a373] text-center">
        My Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          Your cart is empty 🛒
        </div>
      ) : (
        cart.map((c) => (
          <div
            key={c._id}
            className="bg-[#1a1a1a] border border-[#2a2a2a]
              rounded-2xl p-6 shadow-xl
              flex flex-col md:flex-row gap-6
              hover:shadow-[#d4a373]/20 transition duration-300"
          >

            {/* IMAGE */}
            <div className="flex-shrink-0">
              <img
                src={c.product.image}
                alt={c.product.title}
                className="h-28 w-28 object-cover rounded-xl"
              />
            </div>

            {/* PRODUCT DETAILS */}
            <div className="flex-1 space-y-2">

              <Link
                href={`/product/${c.product._id}`}
                className="text-lg font-semibold text-[#e6c79c] hover:underline"
              >
                {c.product.title}
              </Link>

              <p className="text-gray-400">
                ₹{c.product.price}
              </p>

              {/* QTY */}
              <div className="flex items-center gap-4 mt-3">

                <button
                  className="px-3 py-1 bg-[#111]
                    border border-[#333] rounded-lg
                    hover:bg-[#2a2a2a] transition"
                  onClick={() => updateQty(c._id, c.quantity - 1)}
                >
                  -
                </button>

                <span className="text-[#d4a373] font-semibold">
                  {c.quantity}
                </span>

                <button
                  className="px-3 py-1 bg-[#111]
                    border border-[#333] rounded-lg
                    hover:bg-[#2a2a2a] transition"
                  onClick={() => updateQty(c._id, c.quantity + 1)}
                >
                  +
                </button>

              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col justify-between gap-4">

              <button
                className="text-red-500 hover:text-red-400 transition"
                onClick={() => deleteItem(c._id)}
              >
                Delete
              </button>

              <button
                className="px-4 py-2 rounded-xl font-semibold
                  bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
                  text-black hover:opacity-90 transition shadow-lg"
                onClick={() =>
                  router.push(
                    `/checkout?product=${c.product._id}&qty=${c.quantity}`
                  )
                }
              >
                Buy Now
              </button>

            </div>

          </div>
        ))
      )}

    </div>

  </div>
);

}