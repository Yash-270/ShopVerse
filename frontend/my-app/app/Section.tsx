import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};
export default function Section({
  title,
  products,
  link,
}: {
  title: string;
  products: Product[];
  link: string;
}) {
  return (
  <div>

    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-[#d4a373]">
        {title}
      </h2>

      <Link
        href={link}
        className="text-sm font-medium text-gray-400 hover:text-[#d4a373] transition"
      >
        View All →
      </Link>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-6 gap-6">

      {products?.map((p) => (
        <div
          key={p._id}
          className="bg-[#1a1a1a] border border-[#2a2a2a]
            rounded-2xl p-3 shadow-lg
            hover:shadow-[#d4a373]/20
            hover:scale-[1.02]
            transition duration-300"
        >
          <Link href={`/product/${p._id}`}>
            <img
              src={p.image}
              alt={p.title}
              className="h-36 w-full object-cover rounded-xl"
            />

            <p className="text-sm mt-3 text-gray-300">
              {p.title}
            </p>

            <p className="font-semibold text-[#e6c79c] mt-1">
              ₹{p.price}
            </p>
          </Link>
        </div>
      ))}

    </div>

  </div>
);
}