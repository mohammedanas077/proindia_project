import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Menu, X, User, Building, Phone, Info, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const {
    user,
    signOut,
    loading
  } = useAuth();
  const navItems = [{
    name: "Home",
    path: "/",
    icon: Home
  }, {
    name: "Properties",
    path: "/properties",
    icon: Building
  }, {
    name: "Agents",
    path: "/agents",
    icon: User
  }, {
    name: "About",
    path: "/about",
    icon: Info
  }, {
    name: "Contact",
    path: "/contact",
    icon: Phone
  }];

  // Add admin link if user is admin
  if (user && user.email === "aqvines80@gmail.com") {
    navItems.push({
      name: "Admin",
      path: "/admin",
      icon: Shield
    });
  }
  const isActive = (path: string) => location.pathname === path;
  const handleSignOut = async () => {
    await signOut();
    toast.success("Successfully signed out!");
  };
  if (loading) {
    return <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
          </div>
        </div>
      </nav>;
  }
  return <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-2xl text-blue-600 hover:text-blue-700 transition-colors duration-200 animate-fade-in">
            <Home className="h-8 w-8" />
            <span>Propindia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => <Link key={item.name} to={item.path} className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-200 hover:scale-105 animate-fade-in ${isActive(item.path) ? "text-blue-600 bg-blue-50 font-semibold" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"} ${item.name === "Admin" ? "text-red-600 hover:text-red-700" : ""}`} style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>)}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-3 animate-slide-in-right">
            {user ? <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Welcome, {user.email}
                </span>
                <Button variant="outline" onClick={handleSignOut} className="transition-all duration-200 hover:scale-105">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div> : <>
                <Link to="/login">
                  <Button variant="outline" className="transition-all duration-200 hover:scale-105">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-105">
                    Register
                  </Button>
                </Link>
              </>}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-all duration-200">
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="py-4 space-y-2 animate-fade-in">
            {navItems.map(item => <Link key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)} className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${isActive(item.path) ? "text-blue-600 bg-blue-50 font-semibold" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"} ${item.name === "Admin" ? "text-red-600 hover:text-red-700" : ""}`}>
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>)}
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              {user ? <div className="space-y-2">
                  <div className="px-4 py-2 text-sm text-gray-600">
                    Welcome, {user.email}
                  </div>
                  <Button variant="outline" onClick={handleSignOut} className="w-full transition-all duration-200 hover:scale-105">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div> : <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full transition-all duration-200 hover:scale-105">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-105">
                      Register
                    </Button>
                  </Link>
                </>}
            </div>
          </div>
        </div>
      </div>
    </nav>;
};