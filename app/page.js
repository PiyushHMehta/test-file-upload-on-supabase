import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 animate-fadeIn">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to my Bakery
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto">
          Discover and create delicious items, manage your bakery inventory, and
          showcase your culinary creations. Get started by creating a new item
          or view the list of items already available.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col md:flex-row gap-8">
        <Link
          href="/new-item"
          className="relative px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:text-white"
        >
          <span className="relative z-10">Create New Item</span>
          <span className="absolute inset-0 bg-blue-600 z-0 transition-all duration-300 animate-bgSlide"></span>
        </Link>
        <Link
          href="/items"
          className="relative px-6 py-3 bg-green-500 text-white rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:text-white"
        >
          <span className="relative z-10">View Items</span>
          <span className="absolute inset-0 bg-green-600 z-0 transition-all duration-300 animate-bgSlide"></span>
        </Link>
      </div>
    </div>
  );
}
