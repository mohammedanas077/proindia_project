
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SearchFilters, FilterState } from "@/components/SearchFilters";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Home, MapPin, Filter } from "lucide-react";
import { useState } from "react";
import { filterProperties, Property } from "@/utils/propertyFilters";

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
  }
];

const Properties = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);

  const handleFilterChange = (filters: FilterState) => {
    const filtered = filterProperties(mockProperties, filters);
    setFilteredProperties(filtered);
    console.log("Applied filters:", filters);
    console.log("Filtered results:", filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 animate-slide-in-right">
            <Home className="h-6 w-6" />
            <span className="text-sm">Home / Properties</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 animate-fade-in-up">All Properties</h1>
          <p className="text-xl text-blue-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Browse through our extensive collection of verified properties
          </p>
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
                {filteredProperties.length} Properties Found
              </h2>
              <select className="px-4 py-2 border rounded-lg bg-background transition-all duration-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                <option>Sort by: Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
            
            <div className="grid gap-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property, index) => (
                  <div 
                    key={property.id} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <PropertyCard property={property} />
                  </div>
                ))
              ) : (
                <div className="text-center py-12 animate-fade-in">
                  <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                  <p className="text-gray-400 mt-2">Try adjusting your filters to see more results.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredProperties.length > 0 && (
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

export default Properties;
