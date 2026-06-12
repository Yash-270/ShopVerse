"use client";

import API from "@/lib/axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  stock: string,
  about: string;
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

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProduct = async () => {
    try {
      const res = await API.get<Product>(`/product/list/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const addCart = async () => {
    try {
      // ✅ qty body me bhejna
      await API.post(`/product/cart/${id}`, {
        quantity: qty
      });

      alert("Added to cart");
      router.push("/cart");
    } catch (err) {
      console.error("Failed to add cart");
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading product...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white py-12 px-6">

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

    {/* PRODUCT IMAGE */}
    <div className="bg-[#1a1a1a] border border-[#2a2a2a]
      rounded-2xl overflow-hidden shadow-2xl">

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
      />
    </div>

    {/* PRODUCT DETAILS */}
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-[#d4a373]">
        {product.title}
      </h1>

      <p className="text-2xl font-semibold text-[#e6c79c]">
        ₹{product.price}
      </p>

      <p className="text-gray-400">
        Stock Available: {product.stock}
      </p>

      <p className="text-gray-300 leading-relaxed">
        {product.about}
      </p>

      {/* QTY SELECTOR */}
      <div className="flex items-center gap-4 mt-6">

        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className="px-4 py-2 bg-[#1a1a1a] border border-[#333]
          rounded-lg hover:bg-[#2a2a2a] transition"
        >
          -
        </button>

        <span className="text-lg font-semibold text-[#d4a373]">
          {qty}
        </span>

        <button
          onClick={() => setQty(q => q + 1)}
          className="px-4 py-2 bg-[#1a1a1a] border border-[#333]
          rounded-lg hover:bg-[#2a2a2a] transition"
        >
          +
        </button>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-6 mt-8">

        <button
          onClick={addCart}
          className="px-6 py-3 rounded-xl font-semibold
          bg-[#1a1a1a] border border-[#333]
          hover:bg-[#2a2a2a] transition"
        >
          Add to Cart
        </button>

        <Link
          href={`/checkout?product=${encodeURIComponent(id)}&qty=${encodeURIComponent(qty)}`}
          className="px-6 py-3 rounded-xl font-semibold
          bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
          text-black shadow-lg hover:opacity-90 transition"
        >
          Buy Now
        </Link>

      </div>

    </div>

  </div>

</div>
  );
}

