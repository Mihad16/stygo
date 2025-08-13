export default function FeaturedCollections() {
  const collections = [
    {
      id: 1,
      name: "Summer Essentials",
      description: "Lightweight and comfortable for warm days",
      image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891",
      buttonText: "Shop Summer"
    },
    {
      id: 2,
      name: "New Arrivals",
      description: "Discover our latest products",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      buttonText: "View New"
    },
    {
      id: 3,
      name: "Best Sellers",
      description: "Customer favorites",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e",
      buttonText: "Shop Popular"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 px-4">
        Featured Collections
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div key={collection.id} className="relative rounded-xl overflow-hidden group">
            <div className="h-64 bg-gray-200">
              {/* In a real app, you would use an actual image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold">{collection.name}</h3>
                <p className="text-sm opacity-90">{collection.description}</p>
                <button className="mt-3 bg-white text-gray-800 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition">
                  {collection.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}