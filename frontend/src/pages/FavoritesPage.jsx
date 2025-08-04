import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FavoriteShops() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/favorites/shops/");
        setFavorites(res.data);
      } catch (err) {
        console.error("Failed to load favorite shops:", err);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Your Favorite Shops</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven't added any favorite shops yet.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((shop) => (
            <li key={shop.id} className="p-3 border rounded-lg shadow-sm">
              <h2 className="font-semibold">{shop.name}</h2>
              <p className="text-sm text-gray-600">{shop.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
