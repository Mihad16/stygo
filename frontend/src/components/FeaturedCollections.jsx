export default function FeaturedCollections() {
  const collections = [
    {
      id: 1,
      name: "Summer Essentials",
      image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891",
      buttonText: "Shop Summer"
    },
    {
      id: 2,
      name: "New Arrivals",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      buttonText: "View New"
    },
    {
      id: 3,
      name: "Best Sellers",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e",
      buttonText: "Shop Popular"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 px-4">Featured Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        {collections.map((collection) => (
          <div key={collection.id} className="rounded-lg overflow-hidden relative group">
            <img src={collection.image} alt={collection.name} className="w-full h-64 object-cover" />
            <div className="absolute bottom-0 left-0 p-4 bg-black/50 w-full text-white">
              <h3 className="text-lg font-semibold">{collection.name}</h3>
              <button className="mt-2 bg-white text-gray-800 px-3 py-1 text-sm rounded hover:bg-gray-100 transition">
                {collection.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
