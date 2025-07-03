
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Square, Phone, Heart, Share2, CheckCircle, Car, Dumbbell, Waves, Shield, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyDetails = () => {
  const navigate = useNavigate();

  const property = {
    id: 1,
    title: "Spacious 3BHK Apartment in Koramangala",
    location: "Koramangala, Bangalore",
    price: 8500000,
    type: "sale",
    propertyType: "apartment",
    bhk: 3,
    area: 1850,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Parking", "Gym", "Swimming Pool", "Security", "Power Backup", "Lift"],
    isVerified: true,
    description: "Beautiful 3BHK apartment in the heart of Koramangala with modern amenities and excellent connectivity. The property features spacious rooms, modular kitchen, and a balcony with garden view.",
    seller: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      isVerified: true
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Crore`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">Properties / {property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-4 md:col-span-2 md:row-span-2">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg"
                  />
                </div>
                {property.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property ${index + 2}`}
                    className="w-full h-32 md:h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <Badge 
                    variant="default"
                    className="bg-green-600"
                  >
                    For Sale
                  </Badge>
                  {property.isVerified && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {formatPrice(property.price)}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bhk} BHK</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.area} sq.ft</span>
                  </div>
                  <Badge variant="outline">
                    {property.propertyType}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          {amenity === "Parking" && <Car className="h-4 w-4 text-blue-600" />}
                          {amenity === "Gym" && <Dumbbell className="h-4 w-4 text-blue-600" />}
                          {amenity === "Swimming Pool" && <Waves className="h-4 w-4 text-blue-600" />}
                          {amenity === "Security" && <Shield className="h-4 w-4 text-blue-600" />}
                          {!["Parking", "Gym", "Swimming Pool", "Security"].includes(amenity) && 
                            <Home className="h-4 w-4 text-blue-600" />}
                        </div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Seller</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{property.seller.name}</span>
                      {property.seller.isVerified && (
                        <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{property.seller.phone}</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium capitalize">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area</span>
                    <span className="font-medium">{property.area} sq.ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">BHK</span>
                    <span className="font-medium">{property.bhk} BHK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per sq.ft</span>
                    <span className="font-medium">₹{Math.round(property.price / property.area)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
