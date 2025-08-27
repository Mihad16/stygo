import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categories = [
  { name: 'Men', slug: 'men', icon: '👔' },
  { name: 'Women', slug: 'women', icon: '👗' },
  { name: 'Kids', slug: 'kids', icon: '👶' },
  { name: 'Accessories', slug: 'accessories', icon: '💍' },
  { name: 'Beauty', slug: 'beauty', icon: '💄' },
  { name: 'Shoes', slug: 'shoes', icon: '👟' },

 
];

const CategorySection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('men');

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - 200 
        : scrollLeft + 200;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (slug) => {
    setActiveCategory(slug);
    navigate(`/products?category=${slug}`);
  };

  return (
    <div className=" py-6 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl font-semibold text-gray-900">Shop by Category</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
              aria-label="Scroll left"
            >
              <FiChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
              aria-label="Scroll right"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-4 pb-4 overflow-x-auto scrollbar-hide"
          >
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-lg min-w-[120px] flex-shrink-0
                  transition-all duration-200 border
                  ${activeCategory === category.slug 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-gray-700'}
                `}
              >
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
