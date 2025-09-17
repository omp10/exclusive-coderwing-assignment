import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaSearch, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { apiGet } from '../lib/api';

export function NavBar() {
  const linkClass = ({ isActive }) =>
    `relative py-2 font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:scale-x-0 before:bg-black before:transition-transform before:duration-300 hover:text-gray-900 dark:hover:text-gray-100 ${
      isActive ? 'text-black before:scale-x-100' : 'text-gray-600 dark:text-gray-400'
    }`;

  const [cartCount, setCartCount] = useState(0);

  async function refreshCartCount() {
    try {
      const { cart } = await apiGet('/cart');
      const count = (cart?.items || []).reduce((n, i) => n + (i.quantity || 0), 0);
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  }

  useEffect(() => {
    refreshCartCount();
    const handler = () => refreshCartCount();
    window.addEventListener('cart-updated', handler);
    return () => window.removeEventListener('cart-updated', handler);
  }, []);

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo/Brand */}
        <Link to="/" className="text-xl font-bold">Exclusive</Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/signup" className={linkClass}>
            Sign Up
          </NavLink>
        </nav>

        {/* Search and Icons */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full rounded-md bg-gray-100 py-2 pl-4 pr-10 text-sm focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <FaRegHeart className="h-5 w-5 cursor-pointer text-gray-700 hover:text-black" />
            <Link to="/cart" aria-label="Cart" className="relative inline-flex">
              <FaShoppingCart className="h-5 w-5 cursor-pointer text-gray-700 hover:text-black" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 text-[10px] font-bold leading-4 text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
