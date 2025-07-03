
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Star, Building, Users, ArrowLeft, Calendar, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AgentProfile = () => {
  const navigate = useNavigate();

  const agent = {
    id: 1,
    name: "Rajesh Kumar",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    location: "Bangalore, Karnataka",
    phone: "+91 98765 43210",
    email: "rajesh@propindia.com",
    rating: 4.8,
    reviews: 125,
    propertiesSold: 45,
    isVerified: true,
    specialization: ["Residential", "Commercial"],
    experience: 8,
    joinedDate: "March 2016",
    languages: ["English", "Hindi", "Kannada"],
    aboutMe: "Experienced real estate professional with 8+ years in the Bangalore market. Specialized in residential and commercial properties with a track record of satisfied clients. Committed to finding the perfect property match for every client.",
    achievements: [
      "Top Performer 2023",
      "Customer Choice Award",
      "Excellence in Service"
    ]
  };

  const recentProperties = [
    {
      id: 1,
      title: "3BHK Apartment in Koramangala",
      price: "₹85 Lakh",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80",
      status: "Sold"
    },
    {
      id: 2,
      title: "2BHK Flat in Indiranagar",
      price: "₹65 Lakh", 
      image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=300&q=80",
      status: "Available"
    }
  ];

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
          <span className="text-sm text-gray-600">Agents / {agent.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agent Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    {agent.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{agent.location}</span>
                        </div>
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" />
                            <span className="ml-1 font-medium text-lg">{agent.rating}</span>
                            <span className="text-gray-600 ml-1">
                              ({agent.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.specialization.map((spec) => (
                        <Badge key={spec} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {agent.propertiesSold}
                        </div>
                        <div className="text-sm text-gray-600">Properties Sold</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {agent.experience}
                        </div>
                        <div className="text-sm text-gray-600">Years Experience</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {agent.reviews}
                        </div>
                        <div className="text-sm text-gray-600">Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Me */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">About Me</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {agent.aboutMe}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Languages:</span>
                    <span className="ml-2 text-gray-600">
                      {agent.languages.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium text-gray-900">Joined:</span>
                    <span className="ml-2 text-gray-600">{agent.joinedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {agent.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg">
                      <Award className="h-5 w-5 text-orange-500 mr-3" />
                      <span className="text-sm font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Properties */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentProperties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-medium mb-2">{property.title}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-semibold">
                          {property.price}
                        </span>
                        <Badge 
                          variant={property.status === "Sold" ? "default" : "secondary"}
                          className={property.status === "Sold" ? "bg-green-600" : ""}
                        >
                          {property.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Properties
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Agent</h3>
                <div className="space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="w-full">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Inquiry</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full p-3 border rounded-lg"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 border rounded-lg"
                  />
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Send Inquiry
                  </Button>
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

export default AgentProfile;
