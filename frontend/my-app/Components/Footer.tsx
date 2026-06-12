import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white border-t border-[#2a2a2a] mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-[#d4a373] mb-4">
            ShopVerse
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium ecommerce platform offering fashion,
            beauty, accessories, and home essentials with
            secure checkout and fast delivery.
          </p>
        </div>

        {/* CUSTOMER LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-[#e6c79c] mb-4">
            Customer
          </h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/login" className="hover:text-[#d4a373] transition">
                Login
              </Link>
            </li>

            <li>
              <Link href="/signup" className="hover:text-[#d4a373] transition">
                Create Account
              </Link>
            </li>

            <li>
              <Link href="/myorders" className="hover:text-[#d4a373] transition">
                My Orders
              </Link>
            </li>

            <li>
              <Link href="/refund" className="hover:text-[#d4a373] transition">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* SELLER LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-[#e6c79c] mb-4">
            Seller
          </h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/login" className="hover:text-[#d4a373] transition">
                Become a Seller
              </Link>
            </li>

            <li>
              <Link href="/dashboard" className="hover:text-[#d4a373] transition">
                Seller Dashboard
              </Link>
            </li>

            <li>
              <Link href="/add" className="hover:text-[#d4a373] transition">
                Add Products
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-[#e6c79c] mb-4">
            Company
          </h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/about" className="hover:text-[#d4a373] transition">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-[#d4a373] transition">
                Contact Us
              </Link>
            </li>

            <li>
              <Link href="/terms" className="hover:text-[#d4a373] transition">
                Terms & Conditions
              </Link>
            </li>

            <li>
              <Link href="/privacy" className="hover:text-[#d4a373] transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#2a2a2a] py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ShopVerse. All rights reserved.
      </div>

    </footer>
  );
}
