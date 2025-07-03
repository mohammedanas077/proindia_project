
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Mail, MessageSquare, User, CheckCircle } from "lucide-react";

const PropertyContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock property data - in real app, fetch based on id
  const property = {
    id: parseInt(id || "1"),
    title: "Spacious 3BHK Apartment in Koramangala",
    location: "Koramangala, Bangalore",
    price: 8500000,
    type: "sale" as const,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
    seller: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
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
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Property
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="default">
                    {property.type === "sale" ? "For Sale" : "For Rent"}
                  </Badge>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(property.price)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Property Owner</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{property.seller.name}</p>
                      {property.seller.isVerified && (
                        <div className="flex items-center text-green-600 text-sm">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified Owner
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {property.seller.phone}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {property.seller.email}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Contact Owner</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name</label>
                      <Input placeholder="Enter your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input placeholder="Enter your phone" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="Enter your email" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      placeholder="Hi, I'm interested in this property. Please contact me with more details."
                      rows={5}
                    />
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Call {property.seller.phone}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Owner
                    </Button>
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

export default PropertyContact;
