import React from 'react';

const categories = [
  'Men',
  'Women',
  'Kids',
  'Accessories',
  'Beauty',
];

const CategoryScrolling = () => {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap py-4 px-2">
      {categories.map((category, index) => (
        <button
          key={index}
          className="inline-block bg-pink-500 text-white rounded-full px-4 py-2 mx-2 hover:bg-pink-600 transition duration-300"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryScrolling;