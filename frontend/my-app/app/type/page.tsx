"use client";

import Link from "next/link";

export default function TypeSelector() {
const params =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : null;

const category = params?.get("category");
const type = params?.get("type");
  
const TYPES_BY_CATEGORY: Record<string, string[]> = {
  mens: ["shirt", "pant", "suit", "jeans"],
  females: ["saree", "top", "dress"],
  beauty: ["facewash", "cream", "serum"],
  access: ["watch", "belt"],
  kids: ["toys", "kids-shirt"],
  bags: ["handbag", "backpack"],
};

  // ❌ category hi nahi
  if (!category) return null;

  // ✅ category hai but type nahi → TYPE SHOW KARO
  if (category && !type) {
    const types = TYPES_BY_CATEGORY[category] || [];
    
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 capitalize">
          Select {category} type
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {types.map((t) => (
            <Link
              key={t}
              href={`/products?category=${category}&type=${t}`}
              className="border p-4 rounded text-center hover:shadow"
            >
              {t.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return null; // jab type aa jaaye → product list
}
