"use client";

import API from "@/lib/axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  stock: string;
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

type FormState = {
  title: string;
  price: string;
  stock: string;
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

export default function Add() {

  const [form, setForm] = useState<FormState>({
    title: "",
    price: "",
    stock: "instock",
    about: "",
    image: "",

    category: "",
    type: "",
    brand: "",
    fabric: "",
    size: "",
    color: "",
    gender: "",
    skinType: ""
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<string | null>(null);

  // ✅ FILTER CONFIG


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
  };

  const BRAND_OPTIONS: Record<string, string[]> = {
    shirt: ["Gucci", "Armani"],
    watch: ["Rolex", "Titan"],
    cream: ["MamaEarth", "Sugar"],
  };

  const filtertype = FILTERS_BY_CATEGORY[form.category || ""] || [];

  // const filtersToShow =
  //   form.category && form.type && FILTERS_BY_TYPE[form.type]
  //     ? FILTERS_BY_TYPE[form.type]
  //     : ["fabric", "size", "color", "brand", "gender", "skinType"];
      let filtersToShow: string[] = [];

      if(form.category && form.type){
        filtersToShow = FILTERS_BY_TYPE[form.type] || [];
      }
  // ---------------- FETCH PRODUCTS ----------------

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/list");
      setProducts(res.data.products || res.data);
    } catch {
      console.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ---------------- HANDLE CHANGE ----------------

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.[0]) {
  //     setForm({
  //       ...form,
  //       image: e.target.files[0]
  //     });
  //   }
  // };

  // ---------------- SUBMIT ----------------

 const handleSubmit = async (e: FormEvent) => {

      e.preventDefault();
      setLoading(true);
      try{

      const data = new FormData();

      // data.append("title", form.title);
      // data.append("price", form.price);
      // data.append("stock", form.stock);
      // data.append("about", form.about);

      // data.append("category", form.category);
      // data.append("type", form.type);
      // data.append("brand", form.brand);
      // data.append("fabric", form.fabric);
      // data.append("size", form.size);
      // data.append("color", form.color);
      // data.append("gender", form.gender);
      // data.append("skinType", form.skinType);
      // data.append("image", form.image);

     

      if (edit) {

        await API.put(`/product/${edit}`,{
          title: form.title,
          price: Number(form.price),
          about: form.about,
          image: form.image,

          category: form.category,
          type: form.type,

          brand: form.brand,
          fabric: form.fabric,
          size: form.size,
          color: form.color,
          gender: form.gender,
          skinType: form.skinType,

          stock: form.stock

        });

        alert("Updated");

      } else {

        await API.post("/product",{
          title: form.title,
          price: Number(form.price),
          about: form.about,

          image: form.image,

          category: form.category,
          type: form.type,

          brand: form.brand,
          fabric: form.fabric,
          size: form.size,
          color: form.color,
          gender: form.gender,
          skinType: form.skinType,

          stock: form.stock
        });


        alert("Added");

      }


      setForm({
        title: "",
        price: "",
        stock: "instock",
        about: "",
        image: "",

        category: "",
        type: "",
        brand: "",
        fabric: "",
        size: "",
        color: "",
        gender: "",
        skinType: ""
      });

      fetchProducts();

    } catch (error) {
      alert("Failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE ----------------

  const deleteProduct = async (id: string) => {
     try {

        if(!confirm("Are you sure?")) return;

      await API.delete(`/product/${id}`);

      alert("Deleted");

      fetchProducts();

    }
    catch (err: any) {

      console.error(err.response?.data);

      alert(err.response?.data?.message || "Delete failed");

    }
  }

  // ---------------- EDIT ----------------

  const editProduct = (p: Product) => {
    setEdit(p._id);

    setForm({
      title: p.title,
      price: String(p.price),
      stock: p.stock,
      about: p.about,
      image: p.image,

      category: p.category,
      type: p.type,
      brand: p.brand || "",
      fabric: p.fabric || "",
      size: p.size || "",
      color: p.color || "",
      gender: p.gender || "",
      skinType: p.skinType || ""
    });
  };

  // ---------------- UI ----------------

  return (
  <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12">

    <div className="max-w-6xl mx-auto space-y-10">

      <h2 className="text-3xl font-bold text-center text-[#d4a373]">
        {edit ? "Update Product" : "Add Product"}
      </h2>

      {/* FORM CARD */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a]
        rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-4 py-3 rounded-xl
              bg-[#111] border border-[#333]
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="w-full px-4 py-3 rounded-xl
              bg-[#111] border border-[#333]
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
          />


          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            placeholder="About the product"
            className="w-full px-4 py-3 rounded-xl
              bg-[#111] border border-[#333]
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl
              bg-[#111] border border-[#333]
              focus:ring-2 focus:ring-[#d4a373]"
          >
            <option value="">Select Category</option>
            <option value="mens">Mens</option>
            <option value="beauty">Beauty</option>
            <option value="access">Accessories</option>
            <option value="kids">Kids & Toys</option>
            <option value="home">Home & Kitchen</option>
            <option value="females">Female</option>
            <option value="bags">Bags</option>
          </select>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl
              bg-[#111] border border-[#333]
              focus:ring-2 focus:ring-[#d4a373]"
          >
          <option value="">Select Type</option>
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
              onChange={handleChange
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
              onChange={handleChange
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
              onChange={handleChange
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
              onChange={handleChange
              }
              className="w-full px-3 py-2 rounded-lg bg-[#111]
              border border-[#333] focus:ring-2 focus:ring-[#d4a373]"
            >
              <option value="">Brand</option>
              {BRAND_OPTIONS[form.type!]?.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}

          {filtersToShow.includes("gender") && (
            <select
              onChange={handleChange
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
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#111]
              border border-[#333] focus:ring-2 focus:ring-[#d4a373]"
            >
              <option value="">Skin Type</option>
              <option value="oily">Oily</option>
              <option value="dry">Dry</option>
            </select>
          )}
        </div>


          {/* IMAGE */}
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Paste Image URL"
            className="w-full px-4 py-3 rounded-xl
              bg-[#111] border border-[#333]
              text-white placeholder-gray-500
              focus:ring-2 focus:ring-[#d4a373]"
          />

          {/* STOCK */}
          <div className="flex gap-6 text-gray-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="stock"
                value="instock"
                checked={form.stock === "instock"}
                onChange={handleChange}
                className="accent-[#d4a373]"
              />
              In Stock
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="stock"
                value="outstock"
                checked={form.stock === "outstock"}
                onChange={handleChange}
                className="accent-[#d4a373]"
              />
              Out of Stock
            </label>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold
              bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
              text-black hover:opacity-90 transition shadow-lg
              disabled:opacity-50"
          >
            {edit ? "Update Product" : "Add Product"}
          </button>

        </form>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map(p => (
          <div
            key={p._id}
            className="bg-[#1a1a1a] border border-[#2a2a2a]
              rounded-2xl p-4 shadow-xl
              hover:shadow-[#d4a373]/20 transition duration-300"
          >

            <img
              src={p.image}
              alt={p.title}
              className="h-40 w-full object-cover rounded-xl"
            />

            <Link
              href={`/product/${p._id}`}
              className="block mt-3 text-[#e6c79c] font-semibold hover:underline"
            >
              {p.title}
            </Link>

            <div className="flex justify-between mt-4">

              <button
                onClick={() => editProduct(p)}
                className="px-4 py-1 rounded-lg
                  bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
                  text-black text-sm font-semibold"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="px-4 py-1 rounded-lg
                  border border-red-600 text-red-500
                  hover:bg-red-600 hover:text-white transition text-sm"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>

  </div>
);

}

