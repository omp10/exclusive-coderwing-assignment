import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaAngleRight,
  FaAngleLeft,
  FaSearch,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";
import {
  FaMobileAlt,
  FaLaptop,
  FaRegClock,
  FaCamera,
  FaHeadphones,
  FaGamepad,
} from "react-icons/fa";
import { FaTruck, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { apiGet, apiPost } from "../lib/api";

// Product data for the flash sale section
const flashSaleProducts = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    oldPrice: 160,
    discount: "40%",
    rating: 4,
    reviews: 88,
    imageUrl: "/images/gamepad_2.png",
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    price: 960,
    oldPrice: 1160,
    discount: "35%",
    rating: 4.5,
    reviews: 75,
    imageUrl: "/images/keyboard.png",
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: 370,
    oldPrice: 400,
    discount: "20%",
    rating: 5,
    reviews: 99,
    imageUrl: "/images/monitor.png",
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    discount: "25%",
    rating: 4.5,
    reviews: 99,
    imageUrl: "/images/chair.png",
  },
];

// Product data for the best-selling section
const bestSellingProducts = [
  {
    id: 1,
    name: "The north coat",
    price: 260,
    oldPrice: 360,
    rating: 4.5,
    reviews: 65,
    imageUrl: "/images/coat.png",
  },
  {
    id: 2,
    name: "Gucci duffle bag",
    price: 960,
    oldPrice: 1160,
    rating: 4,
    reviews: 65,
    imageUrl: "/images/bag.png",
  },
  {
    id: 3,
    name: "RGB liquid CPU Cooler",
    price: 160,
    oldPrice: 170,
    rating: 5,
    reviews: 65,
    imageUrl: "/images/cooler.png",
  },
  {
    id: 4,
    name: "Small BookSelf",
    price: 360,
    oldPrice: 400,
    rating: 4.5,
    reviews: 65,
    imageUrl: "/images/bookshelf.png",
  },
];

// Product data for the explore products section
const exploreProducts = [
  {
    id: 1,
    name: "Breed Dry Dog Food",
    price: 100,
    oldPrice: 160,
    rating: 4,
    reviews: 35,
    imageUrl: "/images/dogfood.jpg",
  },
  {
    id: 2,
    name: "CANON EOS DSLR Camera",
    price: 360,
    oldPrice: 400,
    rating: 4.5,
    reviews: 95,
    imageUrl: "/images/canon.png",
  },
  {
    id: 3,
    name: "ASUS FHD Gaming Laptop",
    price: 700,
    oldPrice: 1160,
    rating: 4.5,
    reviews: 325,
    imageUrl: "/images/laptop.png",
  },
  {
    id: 4,
    name: "Curology Product Set",
    price: 500,
    oldPrice: 400,
    rating: 5,
    reviews: 145,
    imageUrl: "/images/curology.png",
  },
  {
    id: 5,
    name: "Kids Electric Car",
    price: 960,
    oldPrice: 1160,
    rating: 4.5,
    reviews: 65,
    imageUrl: "/images/car.png",
    new: true,
  },
  {
    id: 6,
    name: "Jr. Zoom Soccer Cleats",
    price: 1160,
    oldPrice: 400,
    rating: 3.5,
    reviews: 35,
    imageUrl: "/images/cleats.png",
  },
  {
    id: 7,
    name: "G911 Shooter USB Gamepad",
    price: 660,
    oldPrice: 1160,
    rating: 5,
    reviews: 55,
    imageUrl: "/images/gamepad.png",
    new: true,
  },
  {
    id: 8,
    name: "Quilted Satin Jacket",
    price: 660,
    oldPrice: 400,
    rating: 4.5,
    reviews: 55,
    imageUrl: "/images/jacket.png",
  },
];

// Category data
const categories = [
  { name: "Phones", icon: FaMobileAlt },
  { name: "Computers", icon: FaLaptop },
  { name: "SmartWatch", icon: FaRegClock },
  { name: "Camera", icon: FaCamera },
  { name: "Headphones", icon: FaHeadphones },
  { name: "Gaming", icon: FaGamepad },
];

// Reusable component for the countdown timer
const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerItems = Object.keys(timeLeft);

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {timerItems.length ? (
        timerItems.map((interval, index) => (
          <div key={interval} className="flex items-center gap-2">
            <div className="text-center">
              <span className="block text-xl md:text-3xl font-bold">
                {String(timeLeft[interval]).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm font-medium text-gray-500 capitalize">
                {interval}
              </span>
            </div>
            {index < timerItems.length - 1 && (
              <span className="text-xl md:text-2xl text-red-500 font-bold mb-5">
                :
              </span>
            )}
          </div>
        ))
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};

// Main Home component
export function Home() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(targetDate.getHours() + 23);
  targetDate.setMinutes(targetDate.getMinutes() + 19);
  targetDate.setSeconds(targetDate.getSeconds() + 56);

  const bannerTargetDate = new Date();
  bannerTargetDate.setDate(bannerTargetDate.getDate() + 23);
  bannerTargetDate.setHours(bannerTargetDate.getHours() + 5);
  bannerTargetDate.setMinutes(bannerTargetDate.getMinutes() + 59);
  bannerTargetDate.setSeconds(bannerTargetDate.getSeconds() + 35);

  const [cartItems, setCartItems] = useState([]);
  const [apiProducts, setApiProducts] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [adding, setAdding] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { products } = await apiGet('/products');
        setApiProducts(products);
      } catch (e) {
        // Ignore for now; UI has static placeholders
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, []);

  function resolveProductIdForApi(product) {
    // If the product already has a backend-like id (e.g., "p1"), use it
    if (typeof product.id === 'string' && product.id.startsWith('p')) return product.id
    // Try to find by exact name match in loaded backend products
    if (apiProducts && product?.name) {
      const match = apiProducts.find(p => (p.name || '').toLowerCase() === product.name.toLowerCase())
      if (match) return match.id
    }
    return null
  }

  const handleAddToCart = async (product) => {
    // optimistic local counter for UI
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    try {
      setAdding(a => ({ ...a, [product.id]: true }));
      const productId = resolveProductIdForApi(product);
      if (!productId) {
        throw { error: 'This demo item is not in the backend catalog yet.' }
      }
      await apiPost('/cart', { productId, quantity: 1 }, true);
      // notify nav/cart listeners
      window.dispatchEvent(new CustomEvent('cart-updated'))
    } catch (e) {
      alert(e?.error || 'Failed to add to cart. Please sign up/login first.');
    } finally {
      setAdding(a => ({ ...a, [product.id]: false }));
    }
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Cart Counter */}
      {totalCartItems > 0 && (
        <div className="fixed top-20 right-4 z-50 rounded-full bg-red-500 px-3 py-1 text-white text-sm font-bold">
          {totalCartItems}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10">
        {/* Categories Sidebar */}
        <div className="hidden md:block col-span-1 border-r pr-6">
          <ul className="space-y-2">
            {[
              "Woman’s Fashion",
              "Men’s Fashion",
              "Electronics",
              "Home & Lifestyle",
              "Medicine",
              "Sports & Outdoor",
              "Baby’s & Toys",
              "Groceries & Pets",
              "Health & Beauty",
            ].map((category, index) => (
              <li
                key={index}
                className="group flex items-center justify-between py-1 text-gray-700 hover:text-red-500"
              >
                <Link to="#">{category}</Link>
                <FaAngleRight className="text-sm text-gray-400 group-hover:text-red-500" />
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Banner */}
        <div className="md:col-span-3 lg:col-span-4 bg-black text-white rounded-md overflow-hidden relative">
          <div className="flex items-center justify-between p-10">
            <div className="z-10">
              <div className="flex items-center gap-2">
                <img
                  src="/images/apple.png"
                  alt="Apple logo"
                  className="h-10 w-8"
                />
                <span className="text-lg">iPhone 14 Series</span>
              </div>
              <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
                Up to 10% <br /> off Voucher
              </h1>
              <Link
                to="#"
                className="mt-6 inline-flex items-center gap-2 border-b-2 border-white pb-1"
              >
                <span className="font-semibold">Shop Now</span>
                <FaAngleRight />
              </Link>
            </div>
            <img
              src="/images/iphone.jpg"
              alt="iPhone 14 Series"
              className="absolute right-0 top-1/2 -translate-y-1/2 transform h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Flash Sales Section */}
      <div className="mt-20">
        <div className="flex items-center gap-4">
          <div className="h-10 w-5 rounded-sm bg-red-500" />
          <h3 className="font-semibold text-red-500">Today's</h3>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <h2 className="text-4xl font-semibold">Flash Sales</h2>
          <Countdown targetDate={targetDate} />
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaAngleLeft />
            </button>
            <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative rounded-lg bg-gray-100 p-4 pb-12 aspect-square flex items-center justify-center overflow-hidden">
                <span className="absolute left-3 top-3 rounded bg-red-500 px-3 py-1 text-xs text-white">
                  -{product.discount}
                </span>
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 hover:text-red-500">
                    <FaRegHeart />
                  </div>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 hover:text-red-500">
                    <FaSearch />
                  </div>
                </div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full object-contain"
                />
                <button
                  className="absolute bottom-0 w-full translate-y-full transform bg-black py-2 text-white transition-transform duration-300 group-hover:translate-y-0"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </button>
              </div>

              <div className="mt-3">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-red-500 font-medium">
                    ${product.price}
                  </span>
                  <span className="text-gray-500 line-through">
                    ${product.oldPrice}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button className="rounded bg-red-500 px-10 py-4 font-semibold text-white transition-colors hover:bg-red-600">
            View All Products
          </button>
        </div>
      </div>

      {/* Browse By Category Section */}
      <div className="mt-20">
        <div className="flex items-center gap-4">
          <div className="h-10 w-5 rounded-sm bg-red-500" />
          <h3 className="font-semibold text-red-500">Categories</h3>
        </div>
        <div className="mt-6 flex items-end justify-between">
          <h2 className="text-4xl font-semibold">Browse By Category</h2>
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaAngleLeft />
            </button>
            <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border p-4 transition-colors hover:bg-red-500 hover:text-white ${
                  category.name === "Camera" ? "bg-red-500 text-white" : ""
                }`}
              >
                <IconComponent className="h-12 w-12" />
                <span className="mt-2 text-sm font-semibold">
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Best Selling Products Section */}
      <div className="mt-20">
        <div className="flex items-center gap-4">
          <div className="h-10 w-5 rounded-sm bg-red-500" />
          <h3 className="font-semibold text-red-500">This Month</h3>
        </div>
        <div className="mt-6 flex items-end justify-between">
          <h2 className="text-4xl font-semibold">Best Selling Products</h2>
          <button className="rounded bg-red-500 px-8 py-2 font-semibold text-white transition-colors hover:bg-red-600">
            View All
          </button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellingProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative rounded-lg bg-gray-100 p-4 pb-12 aspect-square flex items-center justify-center overflow-hidden">
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 hover:text-red-500">
                    <FaRegHeart />
                  </div>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 hover:text-red-500">
                    <FaSearch />
                  </div>
                </div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full object-contain"
                />
                <button
                  className="absolute bottom-0 w-full translate-y-full transform bg-black py-2 text-white transition-transform duration-300 group-hover:translate-y-0"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
              <div className="mt-3">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-red-500 font-medium">
                    ${product.price}
                  </span>
                  <span className="text-gray-500 line-through">
                    ${product.oldPrice}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Our Products Section */}
      <div className="mt-20">
        <div className="flex items-center gap-4">
          <div className="h-10 w-5 rounded-sm bg-red-500" />
          <h3 className="font-semibold text-red-500">Our Products</h3>
        </div>
        <div className="mt-6 flex items-end justify-between">
          <h2 className="text-4xl font-semibold">Explore Our Products</h2>
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaAngleLeft />
            </button>
            <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {exploreProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative rounded-lg bg-gray-100 p-4 pb-12 aspect-square flex items-center justify-center overflow-hidden">
                {product.new && (
                  <span className="absolute left-3 top-3 rounded bg-green-500 px-3 py-1 text-xs text-white">
                    New
                  </span>
                )}
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 hover:text-red-500">
                    <FaRegHeart />
                  </div>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 hover:text-red-500">
                    <FaSearch />
                  </div>
                </div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full object-contain"
                />
                <button
                  className="absolute bottom-0 w-full translate-y-full transform bg-black py-2 text-white transition-transform duration-300 group-hover:translate-y-0"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </button>
              </div>

              <div className="mt-3">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-red-500 font-medium">
                    ${product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-500 line-through">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button className="rounded bg-red-500 px-10 py-4 font-semibold text-white transition-colors hover:bg-red-600">
            View All Products
          </button>
        </div>
      </div>

      {/* Enhance Your Music Experience Banner */}
      <div className="relative mt-20 flex h-[400px] items-center justify-between overflow-hidden rounded-md bg-black px-12 text-white">
        <div className="z-10 flex flex-col items-start">
          <span className="mb-2 text-sm text-gray-300">Categories</span>
          <h2 className="text-4xl font-semibold leading-tight">
            Enhance Your <br /> Music Experience
          </h2>
          <div className="mt-4">
            <Countdown targetDate={bannerTargetDate} />
          </div>
          <button className="mt-8 rounded bg-green-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-green-600">
            Buy Now!
          </button>
        </div>
        <img
          src="/images/jbl.png"
          alt="JBL Boombox"
          className="absolute right-0 top-1/2 -translate-y-1/2 transform object-cover h-full scale-x-[-1]"
        />
      </div>

      {/* New Arrival Section */}
      <div className="mt-20">
        <div className="flex items-center gap-4">
          <div className="h-10 w-5 rounded-sm bg-red-500" />
          <h3 className="font-semibold text-red-500">Featured</h3>
        </div>
        <h2 className="mt-6 text-4xl font-semibold">New Arrival</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Main Left Banner */}
          <div className="relative overflow-hidden rounded-md bg-black">
            <img
              src="/images/ps5.png"
              alt="PlayStation 5"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-semibold">PlayStation 5</h3>
              <p className="mt-2 w-2/3 text-sm text-gray-300">
                Black and White version of the PS5 coming out on sale.
              </p>
              <Link
                to="#"
                className="mt-4 inline-block border-b border-white pb-1 font-medium"
              >
                Shop Now
              </Link>
            </div>
          </div>
          {/* Right Banners */}
          <div className="grid gap-6">
            {/* Top Right Banner */}
            <div className="relative overflow-hidden rounded-md bg-black">
              <img
                src="/images/woman.jpg"
                alt="Woman's Collections"
                className="h-full w-full object-cover opacity-60"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-semibold">Women's Collections</h3>
                <p className="mt-2 w-2/3 text-sm text-gray-300">
                  Featured women collections that give you another vibe.
                </p>
                <Link
                  to="#"
                  className="mt-4 inline-block border-b border-white pb-1 font-medium"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            {/* Bottom Right Banners */}
            <div className="grid grid-cols-2 gap-6">
              <div className="relative overflow-hidden rounded-md bg-black">
                <img
                  src="/images/speaker.png"
                  alt="Speakers"
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-semibold">Speakers</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Amazon wireless speakers
                  </p>
                  <Link
                    to="#"
                    className="mt-4 inline-block border-b border-white pb-1 font-medium"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-md bg-black">
                <img
                  src="/images/perfume.png"
                  alt="Perfume"
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-semibold">Perfume</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    GUCCI INTENSE OUD EDP
                  </p>
                  <Link
                    to="#"
                    className="mt-4 inline-block border-b border-white pb-1 font-medium"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services & Guarantee Section */}
      <div className="mt-20 flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
            <FaTruck className="text-4xl" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">FREE AND FAST DELIVERY</h3>
          <p className="mt-1 text-sm text-gray-500">
            free delivery for all orders over $140
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
            <FaHeadset className="text-4xl" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">24/7 CUSTOMER SERVICE</h3>
          <p className="mt-1 text-sm text-gray-500">
            friendly 24/7 customer support
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
            <FaShieldAlt className="text-4xl" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">MONEY BACK GUARANTEE</h3>
          <p className="mt-1 text-sm text-gray-500">
            we return money within 30 days
          </p>
        </div>
      </div>
    </section>
  );
}
export default Home;
