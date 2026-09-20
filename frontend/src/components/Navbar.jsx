import React from 'react';

export default function Navbar() {
  const navItems = [
    'PRODUCT',
    'BRAND',
    'CATEGORY',
    'BRAND CATEGORY',
    "ORDER'S PANEL",
    'BAR CHART',
    'BUYING GUIDE',
    'EXCEL',
    'SEO TEXT',
  ];

  return (
    <header className="bg-black text-white w-full sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs font-semibold tracking-wider">
        <div className="flex items-center space-x-6">
          <span className="text-base font-extrabold tracking-widest text-white cursor-pointer hover:text-gray-300">
            VPLAK
          </span>
          <nav className="hidden md:flex items-center space-x-5 text-gray-200">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`hover:text-white transition-colors duration-150 ${
                  item === "ORDER'S PANEL"
                    ? 'text-white border-b-2 border-white pb-0.5'
                    : 'text-gray-300'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <button
            onClick={() => alert('Logout clicked')}
            className="text-xs font-bold text-white uppercase tracking-wider hover:text-red-400 transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </header>
  );
}
