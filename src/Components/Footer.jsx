import {
  BookOpenText,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Github,
  Phone,
  PhoneCall,
  Clock,
  MapPinHouseIcon,
} from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <>
      <footer className="bg-base-300 pt-10 pb-6 px-6 sm:px-12 mt-8">
        <div className="lg:flex w-full justify-between space-y-1">
          <div className="flex items-center gap-2">
            <div className="border border-dotted border-gray-500 rounded-full p-3">
              <PhoneCall size={20} />
            </div>
            <div>
              <p>call us 24/7</p>
              <p className="text-lg font-bold">+88019-4208-4201</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="border border-dotted border-gray-500 rounded-full p-3">
              <Mail size={20} />
            </div>
            <div>
              <p>Mail us</p>
              <p className="text-lg font-bold">bookgalaxy2000@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="border border-dotted border-gray-500 rounded-full p-3">
              <Clock size={20} />
            </div>
            <div>
              <p>Opening Hour</p>
              <p className="text-lg font-bold">Sun-Thursday : 9 AM to 6 PM.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="border border-dotted border-gray-500 rounded-full p-3">
              <MapPinHouseIcon size={20} />
            </div>
            <div>
              <p>Opening Hour</p>
              <p className="text-lg font-bold">10 Kazi Nazrul Islam Ave, Dhaka 1000</p>
            </div>
          </div>
        </div>
        <div className="divider"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <aside className="col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <BookOpenText className="size-10 text-info" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#01ecc9] via-[#01e7d4] to-[#00d4ff] bg-clip-text text-transparent">
                BookGalaxy
              </h1>
            </div>
            <p className="text-sm">
              Your digital universe for stories, adventures, and book
              discoveries.
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
            <h6 className="footer-title text-2xl font-semibold mb-2">
              Services
            </h6>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="link link-hover hover:text-info font-bold"
              >
                Book Rentals
              </Link>
              <Link
                to="/"
                className="link link-hover hover:text-info font-bold"
              >
                E-book Access
              </Link>
              <Link
                to="/"
                className="link link-hover hover:text-info font-bold"
              >
                Reading Events
              </Link>
              <Link
                to="/"
                className="link link-hover hover:text-info font-bold"
              >
                Custom Picks
              </Link>
            </div>
          </nav>

          <nav>
            <h6 className="footer-title text-2xl font-bold mb-2">Catagories</h6>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="link link-hover hover:text-info font-bold"
              >
                Novel Books
              </Link>
              <Link
                to="/"
                className="link link-hover hover:text-info font-bold"
              >
                Peotry Books
              </Link>
              <Link
                to="/"
                className="link link-hover hover:text-info font-bold"
              >
                Policical Books
              </Link>
              <Link
                to="/"
                className="link link-hover hover:text-info font-bold"
              >
                History Books
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
                  <button className="btn btn-primary join-item">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </footer>
      <div className="text-center text-sm p-4 bg-primary">
        &copy; {new Date().getFullYear()} BookGalaxy. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
