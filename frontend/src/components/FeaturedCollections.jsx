import React from "react";
import { useNavigate } from "react-router-dom";

export default function FeaturedCollections() {
  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      name: "Budget Finds (Under ₹599)",
      description: "Quality products at affordable prices",
      image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891",
      buttonText: "Shop Now",
      link: "/Under599Page",
    },
    {
      id: 2,
      name: "New Arrivals",
      description: "Fresh styles just added",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      buttonText: "Explore New",
      link: "/new-arrivals",
    },
    {
      id: 3,
      name: "Best Sellers",
      description: "Customer favorites",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e",
      buttonText: "Shop Popular",
      link: "/best-sellers",
    },
  ];

  const handleNavigate = (link) => {
    navigate(link);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
 
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((collection) => {
          const optimizedUrl = `${collection.image}?w=800&q=70&auto=format`;

          return (
            <div
              key={collection.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative group"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={optimizedUrl}
                  srcSet={`
                    ${collection.image}?w=400&q=70&auto=format 400w,
                    ${collection.image}?w=800&q=70&auto=format 800w,
                    ${collection.image}?w=1200&q=70&auto=format 1200w
                  `}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt={collection.name}
                  loading="lazy"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold">{collection.name}</h3>
                  <p className="text-gray-200 text-sm mt-1">{collection.description}</p>
                  <button
                    onClick={() => handleNavigate(collection.link)}
                    className="mt-3 bg-white text-gray-800 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors"
                  >
                    {collection.buttonText}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}