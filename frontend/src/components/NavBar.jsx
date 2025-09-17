import { Link, NavLink } from 'react-router-dom';
import { FaSearch, FaRegHeart, FaShoppingCart } from 'react-icons/fa';

export function NavBar() {
  const linkClass = ({ isActive }) =>
    `relative py-2 font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:scale-x-0 before:bg-black before:transition-transform before:duration-300 hover:text-gray-900 dark:hover:text-gray-100 ${
      isActive ? 'text-black before:scale-x-100' : 'text-gray-600 dark:text-gray-400'
    }`;

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
            <FaShoppingCart className="h-5 w-5 cursor-pointer text-gray-700 hover:text-black" />
          </div>
        </div>
      </div>
    </header>
  );
}
