
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Users, Award, Shield, Target, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { number: "50,000+", label: "Properties Listed", icon: Home },
    { number: "1M+", label: "Happy Customers", icon: Users },
    { number: "25+", label: "Cities Covered", icon: Target },
    { number: "99%", label: "Customer Satisfaction", icon: Award }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We believe in complete transparency in all our dealings and ensure every property is verified."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. Their satisfaction is our success."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in service delivery and maintain the highest quality standards."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building strong communities by connecting people with their dream homes across India."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Home className="h-6 w-6" />
            <span className="text-sm">Home / About Us</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About PropIndia
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              India's leading real estate platform connecting millions of people with their dream properties. 
              We're committed to making property buying, selling, and renting transparent, efficient, and hassle-free.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              To revolutionize the Indian real estate market by providing a transparent, 
              efficient, and user-friendly platform that connects property seekers with 
              their perfect homes and investment opportunities.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We believe everyone deserves to find their dream property without the 
              hassles of traditional real estate processes. Our technology-driven 
              approach ensures verified listings, fair pricing, and seamless transactions.
            </p>
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Get in Touch
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80"
              alt="Modern office building"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These values guide everything we do and help us maintain the trust 
              of millions of users across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <Card className="mb-16">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80"
                  alt="Team meeting"
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Founded in 2018, PropIndia started with a simple vision: to make 
                  real estate accessible and transparent for everyone in India. 
                  What began as a small team of passionate individuals has now 
                  grown into the country's most trusted property platform.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Over the years, we've helped millions of Indians find their 
                  dream homes, make smart investments, and build their futures. 
                  Our commitment to innovation and customer satisfaction has made 
                  us the preferred choice for property seekers across the nation.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Today, we continue to expand our reach, enhance our technology, 
                  and most importantly, serve our customers with the same passion 
                  and dedication that started it all.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-blue-50 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers who have found their perfect homes through PropIndia. 
            Start your property search today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse Properties
              </Button>
            </Link>
            <Link to="/agents">
              <Button size="lg" variant="outline">
                Find an Agent
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
