
import { FilterState } from "@/components/SearchFilters";

export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: "sale" | "rent";
  propertyType: string;
  bhk: number;
  area: number;
  image: string;
  amenities: string[];
  isVerified: boolean;
}

export const filterProperties = (properties: Property[], filters: FilterState): Property[] => {
  return properties.filter(property => {
    // Location filter - improved logic
    if (filters.location && filters.location.trim() !== "") {
      const searchLocation = filters.location.toLowerCase().trim();
      const propertyLocation = property.location.toLowerCase();
      
      // Check if the search term matches any part of the property location
      const locationParts = propertyLocation.split(',').map(part => part.trim());
      const searchTerms = searchLocation.split(' ').filter(term => term.length > 0);
      
      // Property matches if any search term matches any location part
      const hasLocationMatch = searchTerms.some(searchTerm => 
        locationParts.some(locationPart => 
          locationPart.includes(searchTerm) || searchTerm.includes(locationPart)
        )
      );
      
      if (!hasLocationMatch) {
        return false;
      }
    }

    // Type filter (buy/rent)
    if (filters.type !== "all" && property.type !== filters.type) {
      return false;
    }

    // Property type filter
    if (filters.propertyType !== "all" && property.propertyType !== filters.propertyType) {
      return false;
    }

    // BHK filter
    if (filters.bhk !== "all") {
      const bhkValue = filters.bhk === "5+" ? 5 : parseInt(filters.bhk);
      if (filters.bhk === "5+" && property.bhk < 5) {
        return false;
      } else if (filters.bhk !== "5+" && property.bhk !== bhkValue) {
        return false;
      }
    }

    // Price range filter
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
      return false;
    }

    // Area filter
    if (filters.minArea && property.area < parseInt(filters.minArea)) {
      return false;
    }
    if (filters.maxArea && property.area > parseInt(filters.maxArea)) {
      return false;
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }

    return true;
  });
};
