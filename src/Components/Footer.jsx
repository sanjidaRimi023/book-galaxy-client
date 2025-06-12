import {
  BookOpenText,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Github,
} from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-300 pt-10 pb-6 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <aside className="col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <BookOpenText className="text-primary size-10" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#01ecc9] via-[#01e7d4] to-[#00d4ff] bg-clip-text text-transparent">
              BookGalaxy
            </h1>
          </div>
          <p className="text-sm">
            Your digital universe for stories, adventures, and book discoveries.
          </p>
          <div className="flex gap-3 mt-2">
            <Link to="/" className="hover:text-blue-600">
              <Facebook />
            </Link>
            <Link to="/" className="hover:text-gray-500">
              <Github />
            </Link>
            <Link to="/" className="hover:text-sky-500">
              <Twitter />
            </Link>
            <Link
              href="mailto:info@bookgalaxy.com"
              className="hover:text-rose-500"
            >
              <Mail />
            </Link>
          </div>
        </aside>

        <nav>
          <h6 className="footer-title font-semibold mb-2">Services</h6>
          <div className="flex flex-col gap-2">
            <Link to="/" className="link link-hover hover:text-info">
              Book Rentals
            </Link>
            <Link to="/" className="link link-hover hover:text-info">
              E-book Access
            </Link>
            <Link to="/" className="link link-hover hover:text-info">
              Reading Events
            </Link>
            <Link to="/" className="link link-hover hover:text-info">
              Custom Picks
            </Link>
          </div>
        </nav>

        <nav>
          <h6 className="footer-title font-semibold mb-2">Company</h6>
          <div className="flex flex-col gap-2">
            <Link to="/" className="link link-hover hover:text-info">
              About Us
            </Link>
            <Link to="/" className="link link-hover hover:text-info">
              Contact
            </Link>
            <Link to="/" className="link link-hover hover:text-info">
              Jobs
            </Link>
            <Link to="/" className="link link-hover hover:text-info">
              Press
            </Link>
          </div>
        </nav>

        <div>
          <h6 className="footer-title font-semibold mb-2">NewBook News 📬</h6>
          <p className="text-sm mb-2">
            Stay in the loop with new arrivals, rare finds, and bookworm-only
            deals!
          </p>
          <form>
            <fieldset className="w-80">
              <div className="join">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered join-item"
                />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-sm border-t pt-4">
        &copy; {new Date().getFullYear()} BookGalaxy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
