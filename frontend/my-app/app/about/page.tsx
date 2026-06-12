export default function About() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-16">

      <div className="max-w-5xl mx-auto space-y-16">

        {/* HERO SECTION */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#d4a373]">
            About ShopVerse
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            ShopVerse is a modern ecommerce platform built to deliver premium
            quality products with a seamless shopping experience.
            We focus on style, performance, and trust.
          </p>
        </div>

        {/* MISSION */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a]
          rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-[#d4a373] mb-4">
            Our Mission
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Our mission is to provide customers with high-quality fashion,
            accessories, beauty products, and home essentials at competitive
            prices. We aim to build a trusted platform where customers can shop
            confidently and sellers can grow their businesses.
          </p>
        </div>

        {/* WHY CHOOSE US */}
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-[#1a1a1a] border border-[#2a2a2a]
            rounded-2xl p-6 shadow-xl text-center">

            <h3 className="text-xl font-semibold text-[#e6c79c] mb-3">
              Premium Quality
            </h3>

            <p className="text-gray-400">
              Carefully selected products ensuring durability,
              style, and performance.
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a]
            rounded-2xl p-6 shadow-xl text-center">

            <h3 className="text-xl font-semibold text-[#e6c79c] mb-3">
              Secure Payments
            </h3>

            <p className="text-gray-400">
              Safe and reliable payment options including
              Cash on Delivery and Online Payment.
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a]
            rounded-2xl p-6 shadow-xl text-center">

            <h3 className="text-xl font-semibold text-[#e6c79c] mb-3">
              Fast Delivery
            </h3>

            <p className="text-gray-400">
              Quick and dependable shipping to ensure
              your products reach you on time.
            </p>
          </div>

        </div>

        {/* COMPANY STORY */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a]
          rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-[#d4a373] mb-4">
            Our Story
          </h2>

          <p className="text-gray-300 leading-relaxed">
            ShopVerse started with a simple idea — create a digital marketplace
            that combines luxury aesthetics with powerful functionality.
            Built using modern technologies, our platform ensures
            performance, security, and scalability while maintaining a
            premium shopping experience.
          </p>
        </div>

        {/* FOOTER CTA */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-[#e6c79c]">
            Join Our Journey
          </h3>

          <p className="text-gray-400">
            Whether you're a customer looking for premium products
            or a seller wanting to grow your brand — ShopVerse is for you.
          </p>
        </div>

      </div>
    </div>
  );
}
