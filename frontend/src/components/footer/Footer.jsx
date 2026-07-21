import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
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
          <form className="flex gap-2 w-full lg:w-auto">
            <input type="email" placeholder="Enter your email address" className="flex-1 lg:w-72 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap">Subscribe</button>
          </form>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} <span className="text-blue-600 dark:text-blue-400">YatraSphere</span>. All rights reserved.</p>
          <p>Made with ❤️ for travelers, by travelers.</p>
          <p>English (US)</p>
        </div>
      </div>
    </footer>
  );
}