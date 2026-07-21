import { useState } from "react";
import axios from "axios";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaCheckCircle, FaTimes } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";

const exploreLinks = ["Destinations", "Trips", "Packages", "Offers & Deals", "Budget Calculator", "Travel Guides", "Blogs", "Explore Places"];
const communityLinks = ["Share Experience", "Travel Stories", "Travel Alerts", "Safety Tips", "Discussions", "Travel Buddies", "Local Insights"];
const companyLinks = ["About Us", "How It Works", "Careers", "Press & Media", "Contact Us", "Terms & Conditions", "Privacy Policy", "Refund Policy"];
const supportLinks = ["Help Center", "FAQs", "Report an Issue", "Sitemap", "Community Rules", "Trust & Safety"];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [errorMsg, setErrorMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      await axios.post("http://127.0.0.1:8000/newsletter/subscribe", { email: email.trim() });
      setStatus("idle");
      setEmail("");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-[#0b1120] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="col-span-2">
            <img src={theme === "dark" ? logoDark : logoLight} alt="YatraSphere" className="w-[100px] h-auto object-contain mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Your all-in-one travel companion. Explore new places, plan smart budgets, share real experiences, and get the best deals for your next adventure.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaYoutube, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Community" links={communityLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Stay Inspired!</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Subscribe to our newsletter and get travel tips, exclusive deals, and inspiring stories straight to your inbox.</p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col items-end gap-1.5 w-full lg:w-auto">
            <div className="flex gap-2 w-full lg:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 lg:w-72 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Subscribe"}
              </button>
            </div>
            {status === "error" && (
              <p className="text-xs text-red-500 dark:text-red-400">{errorMsg}</p>
            )}
          </form>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} <span className="text-blue-600 dark:text-blue-400">YatraSphere</span>. All rights reserved.</p>
          <p>Made with ❤️ for travelers, by travelers.</p>
          <p>English (US)</p>
        </div>
      </div>

      {/* THANK YOU POPUP */}

      {showPopup && (

        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-[360px] w-full text-center relative shadow-xl"
          >

            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <FaTimes className="text-[14px]" />
            </button>

            <div className="w-[56px] h-[56px] mx-auto rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center">
              <FaCheckCircle className="text-green-600 dark:text-green-400 text-[26px]" />
            </div>

            <h3 className="mt-4 text-[17px] font-bold text-gray-900 dark:text-gray-100">
              Thank you for subscribing!
            </h3>

            <p className="mt-1.5 text-[13px] text-gray-500 dark:text-gray-400">
              A welcome email is on its way to your inbox. Get ready for travel tips, deals, and inspiring stories!
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-5 w-full h-[38px] rounded-lg bg-blue-600 text-white text-[13px] font-semibold hover:bg-blue-700 transition"
            >
              Got it
            </button>

          </div>
        </div>

      )}

    </footer>
  );
}