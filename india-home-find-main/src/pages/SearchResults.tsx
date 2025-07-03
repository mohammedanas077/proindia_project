
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SearchFilters, FilterState } from "@/components/SearchFilters";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter } from "lucide-react";
import { filterProperties, Property } from "@/utils/propertyFilters";

// Mock data for demonstration
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Spacious 3BHK Apartment in Koramangala",
    location: "Koramangala, Bangalore",
    price: 8500000,
    type: "sale" as const,
    propertyType: "apartment",
    bhk: 3,
    area: 1850,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
    amenities: ["Parking", "Gym", "Swimming Pool"],
    isVerified: true
  },
  {
    id: 2,
    title: "Modern 2BHK Flat for Rent",
    location: "Bandra West, Mumbai",
    price: 85000,
    type: "rent" as const,
    propertyType: "apartment",
    bhk: 2,
    area: 1200,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&q=80",
    amenities: ["Parking", "Security", "Power Backup"],
    isVerified: true
  },
  {
    id: 3,
    title: "Luxury Villa with Garden",
    location: "Whitefield, Bangalore",
    price: 15000000,
    type: "sale" as const,
    propertyType: "villa",
    bhk: 4,
    area: 3200,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    amenities: ["Garden", "Parking", "Swimming Pool", "Security"],
    isVerified: false
  },
  {
    id: 4,
    title: "Cozy 1BHK Studio Apartment",
    location: "Andheri East, Mumbai",
    price: 45000,
    type: "rent" as const,
    propertyType: "apartment",
    bhk: 1,
    area: 650,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    amenities: ["Parking", "Security", "Gym"],
    isVerified: true
  },
  {
    id: 5,
    title: "Premium Penthouse with City View",
    location: "Marine Drive, Mumbai",
    price: 25000000,
    type: "sale" as const,
    propertyType: "apartment",
    bhk: 4,
    area: 2800,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    amenities: ["Parking", "Gym", "Swimming Pool", "Security", "Club House"],
    isVerified: true
  },
  {
    id: 6,
    title: "Spacious Family Villa",
    location: "Gurgaon, Delhi NCR",
    price: 12000000,
    type: "sale" as const,
    propertyType: "villa",
    bhk: 5,
    area: 4200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    amenities: ["Garden", "Parking", "Swimming Pool", "Security", "Children's Play Area"],
    isVerified: true
  }
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    location: "",
    priceRange: [0, 50000000],
    propertyType: "all",
    bhk: "all",
    type: "all",
    minArea: "",
    maxArea: "",
    amenities: []
  });

  useEffect(() => {
    // Get filters from navigation state
    const filters = location.state?.filters || currentFilters;
    setCurrentFilters(filters);
    
    // Apply filters to get results
    const filteredProperties = filterProperties(mockProperties, filters);
    setSearchResults(filteredProperties);
  }, [location.state]);

  const handleFilterChange = (filters: FilterState) => {
    setCurrentFilters(filters);
    const filteredProperties = filterProperties(mockProperties, filters);
    setSearchResults(filteredProperties);
    console.log("Applied filters:", filters);
    console.log("Filtered results:", filteredProperties);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-blue-600 text-white py-8 animate-fade-in">
        <div className="container mx-auto px-4">
          <Button
            onClick={handleBackToHome}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4 animate-slide-in-right"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold mb-4 animate-fade-in-up">Search Results</h1>
          {currentFilters.location && (
            <p className="text-xl text-blue-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Properties in "{currentFilters.location}"
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden animate-fade-in">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full transition-all duration-200 hover:scale-105"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 transition-all duration-300 ${showFilters ? "block animate-slide-in-right" : "hidden lg:block lg:animate-slide-in-right"}`}>
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>
          
          {/* Property Listings */}
          <div className="lg:w-3/4 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground animate-fade-in">
                {searchResults.length} Properties Found
              </h2>
              <select className="px-4 py-2 border rounded-lg bg-background transition-all duration-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                <option>Sort by: Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
            
            {searchResults.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="text-gray-500 text-lg mb-4">
                  No properties found matching your criteria
                </div>
                <div className="text-gray-400 mb-6">
                  Try adjusting your search filters or search for a different location
                </div>
                <Button onClick={handleBackToHome} className="transition-all duration-200 hover:scale-105">
                  Back to Home
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {searchResults.map((property, index) => (
                  <div 
                    key={property.id} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {searchResults.length > 0 && (
              <div className="flex justify-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex gap-2">
                  <Button variant="outline" className="transition-all duration-200 hover:scale-105">Previous</Button>
                  <Button className="transition-all duration-200 hover:scale-105">1</Button>
                  <Button variant="outline" className="transition-all duration-200 hover:scale-105">2</Button>
                  <Button variant="outline" className="transition-all duration-200 hover:scale-105">3</Button>
                  <Button variant="outline" className="transition-all duration-200 hover:scale-105">Next</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
