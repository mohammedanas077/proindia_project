
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Home, User, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("buyer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Registration form submitted with:', {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      userType,
      phone: phone.trim(),
      accountType,
      acceptTerms
    });
    
    // Validation
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter your first and last name");
      return;
    }

    if (!email.trim() || !password) {
      toast.error("Please enter email and password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    const userData = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      user_type: userType,
      phone: phone.trim(),
      ...(userType === "seller" && {
        account_type: accountType,
        aadhaar: aadhaar.trim(),
        pan: pan.trim(),
      }),
    };

    console.log('Submitting user data:', userData);

    const { error } = await signUp(email.trim(), password, userData);
    
    if (error) {
      console.error('Registration error:', error);
      toast.error(error.message || "Failed to create account");
    } else {
      toast.success("Account created successfully! Please check your email to verify your account.");
      navigate("/login");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Home className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PropIndia</span>
          </div>
          <p className="text-gray-600">Create your account and start your property journey</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-xl">Create Your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">I want to</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      userType === "buyer"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setUserType("buyer")}
                  >
                    <User className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-center">
                      <div className="font-medium">Buy/Rent</div>
                      <div className="text-xs text-gray-500">Find properties</div>
                    </div>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      userType === "seller"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setUserType("seller")}
                  >
                    <Building className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="text-center">
                      <div className="font-medium">Sell/Rent Out</div>
                      <div className="text-xs text-gray-500">List properties</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className="mt-1"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      className="mt-1"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex mt-1">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md">
                      <span className="text-sm text-gray-600">+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      className="rounded-l-none"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Seller-specific fields */}
                {userType === "seller" && (
                  <>
                    <div>
                      <Label htmlFor="accountType">Account Type</Label>
                      <Select value={accountType} onValueChange={setAccountType}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual Owner</SelectItem>
                          <SelectItem value="agent">Real Estate Agent</SelectItem>
                          <SelectItem value="builder">Builder/Developer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="aadhaar">Aadhaar Number (Optional)</Label>
                        <Input
                          id="aadhaar"
                          placeholder="XXXX XXXX XXXX"
                          className="mt-1"
                          value={aadhaar}
                          onChange={(e) => setAadhaar(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="pan">PAN Number (Optional)</Label>
                        <Input
                          id="pan"
                          placeholder="ABCDE1234F"
                          className="mt-1"
                          value={pan}
                          onChange={(e) => setPan(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  I agree to the{" "}
                  <span className="text-blue-600 hover:text-blue-800">Terms & Conditions</span>
                  {" "}and{" "}
                  <span className="text-blue-600 hover:text-blue-800">Privacy Policy</span>
                </label>
              </div>

              {/* Create Account Button */}
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in here
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
