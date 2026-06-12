import "./globals.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Script from "next/script";   // 👈 ye import add karo

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-white">

        {/* 👇 Razorpay Script Add Karo Yaha */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        <div className="flex flex-col min-h-screen">

          <NavBar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

        </div>

      </body>
    </html>
  );
}

