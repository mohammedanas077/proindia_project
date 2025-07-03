
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Square, Phone, Heart, Share2, Eye } from "lucide-react";
import { Property } from "@/utils/propertyFilters";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant={property.type === "sale" ? "default" : "secondary"} className="animate-scale-in">
              {property.type === "sale" ? "For Sale" : "For Rent"}
            </Badge>
            {property.isVerified && (
              <Badge variant="outline" className="bg-green-100 text-green-800 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                Verified
              </Badge>
            )}
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white transition-all duration-200 hover:scale-110">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white transition-all duration-200 hover:scale-110">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="md:w-2/3 p-4 flex-1">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600 animate-bounce-gentle">
                  {formatPrice(property.price)}
                  {property.type === "rent" && <span className="text-sm text-gray-500">/month</span>}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bhk} BHK</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.area} sq.ft</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>2.5k views</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <Badge 
                  key={amenity} 
                  variant="outline" 
                  className="text-xs animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {amenity}
                </Badge>
              ))}
              {property.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  +{property.amenities.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2 pt-2">
              <Link to={`/properties/${property.id}/contact`} className="flex-1">
                <Button size="sm" variant="outline" className="w-full transition-all duration-200 hover:scale-105">
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </Button>
              </Link>
              <Link to={`/properties/${property.id}`} className="flex-1">
                <Button size="sm" className="w-full transition-all duration-200 hover:scale-105">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
