"use client";

import API from "@/lib/axios";
import { useEffect, useState } from "react";
import Section from "./Section";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function Home() {
  const [home, setHome] = useState<Product[]>([]);
  const [mens, setMens] = useState<Product[]>([]);
  const [females, setFemales] = useState<Product[]>([]);
  const [beauty, setBeauty] = useState<Product[]>([]);
  const [access, setAccess] = useState<Product[]>([]);
  const [kids, setKids] = useState<Product[]>([]);
  const [bags, setBags] = useState<Product[]>([]);

  const fetchHomeProducts = async () => {
    try {
      const [homeRes, mensRes, femalesRes,beautyRes,accessRes,kidsRes,bagsRes] = await Promise.all([
        API.get("/product/list", {
          params: { category: "home", limit: 6 },
        }),
        API.get("/product/list", {
          params: { category: "mens", limit: 6 },
        }),
        API.get("/product/list", {
          params: { category: "females", limit: 6 },
        }),
        API.get("/product/list", {
          params: { category: "beauty", limit: 6 },
        }),
        API.get("/product/list", {
          params: { category: "access", limit: 6 },
        }),
        API.get("/product/list", {
          params: { category: "kids", limit: 6 },
        }),
        API.get("/product/list", {
          params: { category: "bags", limit: 6 },
        }),
      ]);

      setHome(homeRes.data);
      setMens(mensRes.data);
      setFemales(femalesRes.data);
      setBeauty(beautyRes.data);
      setAccess(accessRes.data);
      setKids(kidsRes.data);
      setBags(bagsRes.data);

    } catch (err) {
      console.error("Failed to load homepage products");
    }
  };

  useEffect(() => {
    fetchHomeProducts();
  }, []);

  return (
  <div className="bg-[#0f0f0f] min-h-screen text-white">

    {/* 🔥 HERO SECTION */}
    <div className="relative h-[420px] w-full">
      <img
        src="/banner.jpg"
        //alt="Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#e6c79c]">
            Discover Trending Products
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Shop the latest collections now
          </p>
        </div>
      </div>
    </div>

    <div className="space-y-16 px-6 py-12 max-w-7xl mx-auto">

      <Section title="Home & Kitchen" products={home} link="/type?category=home" />

      <Section title="Mens Wear" products={mens} link="/type?category=mens" />

      <Section title="Females Dress" products={females} link="/type?category=females" />

      <Section title="Beauty" products={beauty} link="/type?category=beauty" />

      <Section title="Accessories" products={access} link="/type?category=access" />

      <Section title="Kids & Toys" products={kids} link="/type?category=kids" />

      <Section title="Bags" products={bags} link="/type?category=bags" />

    </div>
  </div>
);

}
