import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FeaturedCollections() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Featured Collections - Stygo Fashion Marketplace";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      "Discover Stygo's featured collections: Budget Finds, New Arrivals, and Best Sellers. Shop quality fashion products directly via WhatsApp.";
  }, []);

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

  ];

  const handleNavigate = (link) => navigate(link);

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Collections</h2>
        <p className="text-gray-500 mt-2">
          Browse our top picks and most popular fashion items.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((collection) => {
          const optimizedUrl = `${collection.image}?w=800&q=70&auto=format`;
          return (
            <article
              key={collection.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative group focus:outline-none"
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
            </article>
          );
        })}
      </div>
    </section>
  );
}
