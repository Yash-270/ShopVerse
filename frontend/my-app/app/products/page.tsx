"use client";

import API from "@/lib/axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
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

export default function Products() {
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "");
  const [type, setType] = useState(params.get("type") || "");
  const [page, setPage] = useState(1);
  const search = params.get("search");      
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ CLEAN FILTER STATE
  const [filters, setFilters] = useState({
    fabric: "",
    size: "",
    color: "",
    brand: "",
    gender: "",
    skinType: "",
    minPrice: "",
    maxPrice: "",
  });

  // ✅ FILTER CONFIG (TYPE BASED)

  const FILTERS_BY_CATEGORY: Record<string, string[]> = { 
    mens: ["shirt", "pant", "watch"],
    females: ["suit", "saree", "top","watch"],
    beauty: ["cream"],
    access: ["headph"],
    kids: ["shirt", "pant", "suit", "top"],
    home: ["watch"],
    bags: ["bag"],
  };

  const FILTERS_BY_TYPE: Record<string, string[]> = {
    shirt: ["fabric", "size", "color", "brand", "gender"],
    pant: ["size", "color", "gender"],
    suit: ["fabric", "size", "color"],
    saree: ["fabric", "color"],
    top: ["fabric", "size", "color"],
    watch: ["brand", "gender"],
    cream: ["brand", "skinType"],
    headph: ["brand"],
  };
  const BRAND_OPTIONS: Record<string, string[]> = {
    shirt: ["Gucci", "Armani"],
    watch: ["Rolex", "Titan"],
    beauty: ["MamaEarth", "Sugar"],
    headph: ["Sony", "Boat"],
  };
  

  // ✅ FETCH PRODUCTS (category + type + filters)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/product/list", {
        params: {
          category,
          type,
          ...filters,
          search,
          page,
          limit: 12,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    setCategory(params.get("category") || "");
    setType(params.get("type") || "");
  },[params])


  useEffect(() => {
      fetchProducts();
  }, [category, type, filters]);

  const filtertype = FILTERS_BY_CATEGORY[category || ""] || [];

  let filtersToShow: string[] = [];
  if(!type){
    filtersToShow = [
      "fabric",
      "size",
      "color",
      "brand",
      "gender",
      "skinType",
    ];
  }
  else{
    filtersToShow = FILTERS_BY_TYPE[type || ""] || [];
  }

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
  <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-8">

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

      {/* FILTER SIDEBAR */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] 
        rounded-2xl p-6 space-y-6 shadow-xl">

        <h2 className="text-xl font-bold text-[#d4a373]">
          Filters
        </h2>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[#111]
          border border-[#333] focus:ring-2 focus:ring-[#d4a373]"
        >
          <option value="">All Categories</option>
          <option value="mens">Mens</option>
          <option value="beauty">Beauty</option>
          <option value="access">Accessories</option>
          <option value="kids">Kids & Toys</option>
          <option value="home">Home & Kitchen</option>
          <option value="females">Female</option>
          <option value="bags">Bags</option>
        </select>

   
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[#111]
          border border-[#333] focus:ring-2 focus:ring-[#d4a373]"
        >
          <option value="">All Types</option>
          {filtertype.includes("shirt") && (<option value="shirt">Shirt</option>)}
          {filtertype.includes("pant") && (<option value="pant">Pant</option>)}
          {filtertype.includes("suit") && (<option value="suit">Suit</option>)}
          {filtertype.includes("saree") && (<option value="saree">Saree</option>)}
          {filtertype.includes("top") && (<option value="top">Top</option>)}
          {filtertype.includes("watch") && (<option value="watch">Watch</option>)}
          {filtertype.includes("cream") && (<option value="cream">Skin Creams</option>)}
        </select>

        <div className="space-y-4">
          {filtersToShow.includes("fabric") && (
            <select
              onChange={(e) =>
                setFilters({ ...filters, fabric: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg bg-[#111]
              border border-[#333] focus:ring-2 focus:ring-[#d4a373]"
            >
              <option value="">Fabric</option>
              <option value="cotton">Cotton</option>
              <option value="linen">Linen</option>
            </select>
          )}

          {filtersToShow.includes("size") && (
            <select
              onChange={(e) =>
                setFilters({ ...filters, size: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg bg-[#111]
              border border-[#333] focus:ring-2 focus:ring-[#d4a373]"
            >
              <option value="">Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          )}

          {filtersToShow.includes("color") && (
            <select
              onChange={(e) =>
                setFilters({ ...filters, color: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg bg-[#111]
              border border-[#333] focus:ring-2 focus:ring-[#d4a373]"
            >
              <option value="">Color</option>
              <option value="red">Red</option>
              <option value="black">Black</option>
            </select>
          )}

          {filtersToShow.includes("brand") && (
            <select
              onChange={(e) =>
                setFilters({ ...filters, brand: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg bg-[#111]
              border border-[#333] focus:ring-2 focus:ring-[#d4a373]"
            >
              <option value="">Brand</option>
              {BRAND_OPTIONS[type!]?.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}

          {filtersToShow.includes("gender") && (
            <select
              onChange={(e) =>
                setFilters({ ...filters, gender: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg bg-[#111]
              border border-[#333] focus:ring-2 focus:ring-[#d4a373]"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          )}

          {filtersToShow.includes("skinType") && (
            <select
              onChange={(e) =>
                setFilters({ ...filters, skinType: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg bg-[#111]
              border border-[#333] focus:ring-2 focus:ring-[#d4a373]"
            >
              <option value="">Skin Type</option>
              <option value="oily">Oily</option>
              <option value="dry">Dry</option>
            </select>
          )}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="md:col-span-3">

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link
              key={p._id}
              href={`/product/${p._id}`}
              className="bg-[#1a1a1a] border border-[#2a2a2a]
              rounded-2xl overflow-hidden shadow-lg
              hover:shadow-[#d4a373]/20 hover:scale-105
              transition duration-300"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <p className="font-semibold text-gray-200 line-clamp-2">
                  {p.title}
                </p>
                <p className="mt-2 text-[#d4a373] font-bold text-lg">
                  ₹{p.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-6 py-2 rounded-lg bg-[#1a1a1a]
            border border-[#333] hover:bg-[#2a2a2a]
            disabled:opacity-40"
          >
            Prev
          </button>

          <button
            onClick={() => setPage(page + 1)}
            className="px-6 py-2 rounded-lg bg-gradient-to-r
            from-[#8b5e3c] to-[#d4a373] text-black"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  </div>
);

}
