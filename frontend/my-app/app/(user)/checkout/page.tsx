"use client";

import API from "@/lib/axios";
import { useEffect, useState } from "react";
import {  useRouter } from "next/navigation";

type AddressInfo = {
  _id: string;
  fullName: string;
  contact: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  gender: string;
  isActive: boolean;
};

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

export default function Payment() {
  const router = useRouter();

 const productId =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("product")
    : null;

const qty =
  typeof window !== "undefined"
    ? Number(
        new URLSearchParams(window.location.search).get("qty")
      ) || 1
    : 1;

  const [addresses, setAddresses] = useState<AddressInfo[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [pay, setPay] = useState<"COD" | "ONLINE">("COD");
  const [loading, setLoading] = useState(false);

  // ---------------- address list ----------------
  const fetchAdd = async () => {
    const res = await API.get<AddressInfo[]>("/address/list");
    setAddresses(res.data);
  };

  // ---------------- product ----------------
  const fetchProduct = async () => {
    if (!productId) return;
    const res = await API.get<Product>(`/product/list/${productId}`);
    setProduct(res.data);
  };

  useEffect(() => {

    fetchAdd();
    
    if(productId){
      fetchProduct();
    }
  }, [productId]);

  // ---------------- select address ----------------
  const selectAddress = async (id: string) => {
    await API.put(`/address/select/${id}`);
    fetchAdd();
  };



  const amount = product ? product.price * qty : 0;

  // ---------------- place order / pay ----------------
  const placeOrder = async () => {
    if (!productId) return;
    const activeAddress = addresses.find(a => a.isActive);

    if (!activeAddress) {
        alert("Select address");
        return;
    }
    try {
      setLoading(true);

      const res = await API.post("/payment/cod", {
        productId,
        addressId: activeAddress._id,
        quantity: qty,
        totalAmount: amount

      });

      const orderId = res.data._id;

      // COD → direct success
      //if (pay === "COD") {
        alert("Order placed successfully");
        router.push("/myorders");
        return;

    } catch (err: any) {
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

//   const placeOnline = async () => {

//   const activeAddress = addresses.find(a => a.isActive);

//   if (!activeAddress) {
//     alert("Select address");
//     return;
//   }

//   try {

//     const razorOrder = await API.post("/payment/online/create", {
//       amount
//     });

//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//       amount: razorOrder.data.amount,
//       currency: "INR",
//       order_id: razorOrder.data.id,

//       console.log("Amount:", amount),
//       console.log("Key:", process.env.NEXT_PUBLIC_RAZORPAY_KEY),

//       handler: async function (response: any) {

//         await API.post("/payment/verify", {
//           productId,
//           addressId: activeAddress._id,
//           quantity: qty,
//           totalAmount: amount,
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature
//         });

//         alert("Payment successful");
//         router.push("/myorders");
//       }
//     };

//     const rz = new (window as any).Razorpay(options);
//     rz.open();

//   } catch (err: any) {
//     alert(err.response?.data?.message || "Payment failed");
//   }
// };

const placeOnline = async () => {
  const activeAddress = addresses.find(a => a.isActive);

  if (!activeAddress) {
    alert("Select address");
    return;
  }

  try {
    const razorOrder = await API.post("/payment/online/create", {
      amount
    });

    console.log("Amount:", amount);
    console.log("Key:", process.env.NEXT_PUBLIC_RAZORPAY_KEY);
    console.log("Order:", razorOrder.data);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: razorOrder.data.amount,
      currency: "INR",
      order_id: razorOrder.data.id,

      handler: async function (response: any) {
        await API.post("/payment/verify", {
          productId,
          addressId: activeAddress._id,
          quantity: qty,
          totalAmount: amount,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        });

        alert("Payment successful");
        router.push("/myorders");
      }
    };

    const rz = new (window as any).Razorpay(options);

    rz.on("payment.failed", function (response: any) {
      console.log("FAILED:", response.error);
      alert(response.error.description);
    });

    rz.open();

  } catch (err: any) {
    console.log(err);
    alert(err.response?.data?.error || "Payment failed");
  }
};

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* LEFT SIDE */}
    <div className="md:col-span-2 space-y-8">

      {/* PRODUCT SUMMARY */}
      {product && (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a]
          rounded-2xl p-6 shadow-xl">

          <h2 className="text-xl font-bold text-[#d4a373] mb-4">
            Order Summary
          </h2>

          <p className="font-semibold text-lg">{product.title}</p>
          <p className="text-gray-400 mt-2">Price: ₹{product.price}</p>
          <p className="text-gray-400">Quantity: {qty}</p>

          <p className="text-xl font-bold text-[#e6c79c] mt-4">
            Total: ₹{amount}
          </p>
        </div>
      )}

      {/* ADDRESS LIST */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a]
        rounded-2xl p-6 shadow-xl space-y-6">

        <h3 className="text-xl font-bold text-[#d4a373]">
          Select Address
        </h3>

        {addresses.map((p) => (
          <label
            key={p._id}
            className={`block border rounded-xl p-4 cursor-pointer transition
              ${p.isActive
                ? "border-[#d4a373] bg-[#222]"
                : "border-[#333] hover:bg-[#222]"}`}
          >
            <div className="flex gap-3 items-start">

              <input
                type="radio"
                checked={p.isActive}
                onChange={() => selectAddress(p._id)}
                className="mt-1 accent-[#d4a373]"
              />

              <div className="text-gray-300">
                <p className="font-semibold text-white">{p.fullName}</p>
                <p>{p.addressLine}</p>
                <p>{p.city}, {p.state} - {p.pincode}</p>
                <p>{p.contact}</p>
              </div>

            </div>
          </label>
        ))}
      </div>

      {/* PAYMENT METHOD */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a]
        rounded-2xl p-6 shadow-xl space-y-4">

        <h3 className="text-xl font-bold text-[#d4a373]">
          Payment Method
        </h3>

        <label className="flex items-center gap-3 cursor-pointer
          border border-[#333] p-3 rounded-lg hover:bg-[#222]">

          <input
            type="radio"
            checked={pay === "COD"}
            onChange={() => setPay("COD")}
            className="accent-[#d4a373]"
          />

          <span>Cash on Delivery</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer
          border border-[#333] p-3 rounded-lg hover:bg-[#222]">

          <input
            type="radio"
            checked={pay === "ONLINE"}
            onChange={() => setPay("ONLINE")}
            className="accent-[#d4a373]"
          />

          <span>Online Payment</span>
        </label>

      </div>

    </div>

    {/* RIGHT SIDE - PLACE ORDER */}
    <div className="bg-[#1a1a1a] border border-[#2a2a2a]
      rounded-2xl p-8 shadow-2xl h-fit">

      <h3 className="text-2xl font-bold text-[#d4a373] mb-6">
        Final Payment
      </h3>

      <p className="text-gray-400 mb-2">
        Items Total: ₹{amount}
      </p>

      <p className="text-xl font-bold text-[#e6c79c] mb-6">
        Payable: ₹{amount}
      </p>

      <button
        disabled={loading}
        onClick={pay === "ONLINE" ? placeOnline : placeOrder}
        className="w-full py-3 rounded-xl font-semibold
          bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
          text-black hover:opacity-90 transition shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "Processing..."
          : pay === "ONLINE"
          ? "Pay Now"
          : "Place Order"}
      </button>

    </div>

  </div>

</div>

  );
}