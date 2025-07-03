
import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-orange-400" />
              <span className="text-xl font-bold">PropIndia</span>
            </div>
            <p className="text-gray-400 mb-4">
              India's leading real estate platform connecting buyers, sellers, and renters with verified properties across the nation.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Buy Property</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rent Property</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Post Property</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Property Agents</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Property News</a></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Mumbai</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Delhi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bangalore</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hyderabad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chennai</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3" />
                <span>contact@propindia.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-1" />
                <span>123 Business Center,<br />MG Road, Bangalore - 560001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PropIndia. All rights reserved. | Privacy Policy | Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};
