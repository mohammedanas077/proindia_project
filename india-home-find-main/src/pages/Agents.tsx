
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Star, Building, Users, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

const mockAgents = [
  {
    id: 1,
    name: "Rajesh Kumar",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    location: "Bangalore, Karnataka",
    phone: "+91 98765 43210",
    email: "rajesh@propindia.com",
    rating: 4.8,
    reviews: 125,
    propertiesSold: 45,
    isVerified: true,
    specialization: ["Residential", "Commercial"],
    experience: 8
  },
  {
    id: 2,
    name: "Priya Sharma",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b9b00088?auto=format&fit=crop&w=300&q=80",
    location: "Mumbai, Maharashtra",
    phone: "+91 87654 32109",
    email: "priya@propindia.com",
    rating: 4.9,
    reviews: 89,
    propertiesSold: 32,
    isVerified: true,
    specialization: ["Residential", "Luxury"],
    experience: 6
  },
  {
    id: 3,
    name: "Amit Patel",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    location: "Delhi, Delhi",
    phone: "+91 76543 21098",
    email: "amit@propindia.com",
    rating: 4.7,
    reviews: 156,
    propertiesSold: 67,
    isVerified: true,
    specialization: ["Commercial", "Investment"],
    experience: 12
  }
];

const Agents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Home className="h-6 w-6" />
            <span className="text-sm">Home / Agents</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Find Property Agents</h1>
          <p className="text-xl text-blue-100">
            Connect with verified real estate professionals across India
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or location"
                  className="pl-10"
                />
              </div>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-orange-500 hover:bg-orange-600">
                <Search className="h-4 w-4 mr-2" />
                Search Agents
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {mockAgents.length} Agents Found
          </h2>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="properties">Most Properties Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAgents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="relative inline-block mb-3">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                    />
                    {agent.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-1">{agent.name}</h3>
                  <div className="flex items-center justify-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{agent.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{agent.rating}</span>
                      <span className="text-gray-600 text-sm ml-1">
                        ({agent.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {agent.specialization.map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {agent.propertiesSold}
                    </div>
                    <div className="text-xs text-gray-600">Properties Sold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {agent.experience}
                    </div>
                    <div className="text-xs text-gray-600">Years Experience</div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-2">
                  <Link to={`/agents/${agent.id}`}>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button variant="outline">Previous</Button>
            <Button>1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Agents;
