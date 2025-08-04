import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & description */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Ruposhee Bazar</h2>
          <p className="text-sm">
            Your trusted online store for everyday essentials and premium products. Fast delivery, great deals, and secure checkout.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/all-products" className="hover:text-orange-500">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-orange-500">Categories</Link></li>
            <li><Link className="hover:text-orange-500">Best Sellers</Link></li>
            <li><Link className="hover:text-orange-500">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-orange-500">Contact Us</Link></li>
            <li><Link className="hover:text-orange-500">FAQs</Link></li>
            <li><Link className="hover:text-orange-500">Return Policy</Link></li>
            <li><Link className="hover:text-orange-500">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
          <p className="text-sm mb-3">Email: support@ruposhee.com</p>
          <div className="flex gap-4 text-lg">
            {/* External links stay as <a> tags */}
            <a href="#"><FaFacebookF className="hover:text-blue-500" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-500" /></a>
            <a href="#"><FaTwitter className="hover:text-sky-500" /></a>
            <a href="#"><FaYoutube className="hover:text-red-500" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Ruposhee Bazar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
