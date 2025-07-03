import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home, Building2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterState } from "./SearchFilters";

interface HeroProps {
  onSearch: (filters: FilterState) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [activeTab, setActiveTab] = useState<"sale" | "rent">("sale");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Only search if there's some input
    if (searchLocation.trim()) {
      const searchFilters = {
        location: searchLocation,
        priceRange: [0, 50000000] as [number, number],
        propertyType: "all",
        bhk: "all",
        type: activeTab,
        minArea: "",
        maxArea: "",
        amenities: []
      };
      
      // Navigate to search results page with filters
      navigate("/search-results", { 
        state: { filters: searchFilters } 
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const stats = [
    { icon: Home, count: "50K+", label: "Properties" },
    { icon: Building2, count: "200+", label: "Cities" },
    { icon: MapPin, count: "1M+", label: "Happy Customers" }
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Find Your Perfect
            <span className="text-orange-400 block animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
              Dream Home
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover the best properties across India with verified listings
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white rounded-lg p-6 shadow-xl">
            {/* Buy/Rent Toggle */}
            <div className="flex mb-4">
              <button
                onClick={() => setActiveTab("sale")}
                className={`px-6 py-2 rounded-l-lg font-semibold transition-all duration-200 ${
                  activeTab === "sale"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveTab("rent")}
                className={`px-6 py-2 rounded-r-lg font-semibold transition-all duration-200 ${
                  activeTab === "rent"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Rent
              </button>
            </div>

            {/* Location Search */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter location (e.g., Bangalore, Mumbai, Delhi)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 h-12 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
              <Button 
                onClick={handleSearch}
                size="lg" 
                className="px-8 bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-105"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${0.6 + index * 0.2}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 group-hover:bg-white/20 transition-all duration-200">
                <stat.icon className="h-8 w-8 text-orange-400" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.count}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
