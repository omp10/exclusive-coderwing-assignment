import { Link } from "react-router-dom";
import {
  FaPaperPlane,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Exclusive */}
          <div>
            <h3 className="text-xl font-bold">Exclusive</h3>
            <div className="mt-4">
              <h4 className="font-semibold">Subscribe</h4>
              <p className="mt-2 text-sm text-gray-300">
                Get 10% off your first order
              </p>
              <div className="mt-4 flex items-center rounded border border-gray-500 py-2 px-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                />
                <FaPaperPlane className="text-white" />
              </div>
            </div>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="font-bold">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          {/* Column 3: Account */}
          <div>
            <h4 className="font-bold">Account</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <Link to="#">My Account</Link>
              </li>
              <li>
                <Link to="#">Login / Register</Link>
              </li>
              <li>
                <Link to="#">Cart</Link>
              </li>
              <li>
                <Link to="#">Wishlist</Link>
              </li>
              <li>
                <Link to="#">Shop</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Link */}
          <div>
            <h4 className="font-bold">Quick Link</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms Of Use</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Download App */}
          {/* Column 5: Download App */}
          <div>
            <h4 className="font-bold">Download App</h4>
            <p className="mt-4 text-xs text-gray-300">
              Save $3 with App New User Only
            </p>
            <div className="mt-4 flex items-center gap-4">
              {/* QR Code */}
              <img src="/images/qr.jpg" alt="QR code" className="h-24 w-24" />

              {/* Buttons stacked vertically */}
              <div className="flex flex-col justify-between gap-2">
                <img
                  src="/images/google-play.png"
                  alt="Google Play"
                  className="h-12 w-auto"
                />
                <img
                  src="/images/app-store.png"
                  alt="App Store"
                  className="h-12 w-auto"
                />
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-4 flex gap-4 text-xl">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4">
        <p className="text-center text-xs text-gray-500">
          © Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </footer>
  );
}
