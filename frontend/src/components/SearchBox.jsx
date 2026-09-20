import React from 'react';

export default function SearchBox({ searchBy, setSearchBy, keyword, setKeyword, onSearch, loading }) {
  const options = [
    { label: 'OrderId', value: 'order_id' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-6 mb-8">
      <form onSubmit={handleSubmit}>
        <fieldset className="border-2 border-white/90 rounded-full px-6 py-2.5 bg-transparent shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <legend className="px-3 text-xs font-semibold text-gray-800 tracking-wide bg-transparent">
            Search Order
          </legend>

          {/* Left: By + Radio buttons */}
          <div className="flex items-center space-x-3 text-xs font-bold text-gray-800 whitespace-nowrap">
            <span className="text-gray-900">By</span>
            {options.map((opt) => (
              <label
                key={opt.value}
                className="inline-flex items-center space-x-1 cursor-pointer select-none hover:text-black"
              >
                <input
                  type="radio"
                  name="search_by"
                  value={opt.value}
                  checked={searchBy === opt.value}
                  onChange={(e) => setSearchBy(e.target.value)}
                  className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-[13px]">{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Center: Search input */}
          <div className="flex-1 w-full md:w-auto px-1">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="search..."
              className="w-full bg-[#9da8a6] hover:bg-[#a6b2b0] focus:bg-white text-gray-900 placeholder-gray-600 text-xs md:text-sm px-4 py-2 rounded-full outline-none transition-all duration-150 shadow-inner"
            />
          </div>

          {/* Right: Green button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-b from-[#18c635] to-[#12a82d] hover:from-[#15b02f] hover:to-[#0f8e26] text-white font-extrabold text-xs uppercase px-7 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-150 tracking-wider whitespace-nowrap active:scale-95 disabled:opacity-60"
          >
            {loading ? 'SEARCHING...' : 'SEARCH ORDER'}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

