
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Users, Building, Settings, BarChart3, Shield, Eye, Trash2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { toast } from "sonner";

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  phone: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    buyers: 0,
    sellers: 0,
    admins: 0
  });

  useEffect(() => {
    if (!loading && (!user || user.email !== "aqvines80@gmail.com")) {
      navigate("/");
      toast.error("Access denied. Admin privileges required.");
      return;
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && user.email === "aqvines80@gmail.com") {
      fetchProfiles();
    }
  }, [user]);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching profiles:', error);
        toast.error("Failed to fetch user data");
        return;
      }

      if (data) {
        setProfiles(data);
        
        // Calculate stats
        const totalUsers = data.length;
        const buyers = data.filter(p => p.user_type === 'buyer').length;
        const sellers = data.filter(p => p.user_type === 'seller').length;
        const admins = data.filter(p => p.user_type === 'admin').length;
        
        setStats({ totalUsers, buyers, sellers, admins });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to load user data");
    } finally {
      setLoadingProfiles(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) {
        console.error('Error deleting user:', error);
        toast.error("Failed to delete user");
        return;
      }

      toast.success("User deleted successfully");
      fetchProfiles(); // Refresh the list
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!user || user.email !== "aqvines80@gmail.com") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back, Administrator</p>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Shield className="h-4 w-4 mr-1" />
            Admin Access
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">All registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Buyers</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.buyers}</div>
              <p className="text-xs text-muted-foreground">Property seekers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sellers</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sellers}</div>
              <p className="text-xs text-muted-foreground">Agents & sellers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.admins}</div>
              <p className="text-xs text-muted-foreground">System administrators</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingProfiles ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Name</th>
                      <th className="text-left py-3 px-2 font-medium">Email</th>
                      <th className="text-left py-3 px-2 font-medium">Type</th>
                      <th className="text-left py-3 px-2 font-medium">Phone</th>
                      <th className="text-left py-3 px-2 font-medium">Joined</th>
                      <th className="text-left py-3 px-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.map((profile) => (
                      <tr key={profile.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">
                          {profile.first_name || profile.last_name 
                            ? `${profile.first_name} ${profile.last_name}`.trim()
                            : 'N/A'
                          }
                        </td>
                        <td className="py-3 px-2">{profile.email}</td>
                        <td className="py-3 px-2">
                          <Badge 
                            variant={profile.user_type === 'admin' ? 'default' : 'outline'}
                            className={
                              profile.user_type === 'admin' 
                                ? 'bg-red-100 text-red-800' 
                                : profile.user_type === 'seller'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }
                          >
                            {profile.user_type}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">{profile.phone || 'N/A'}</td>
                        <td className="py-3 px-2">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteUser(profile.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            disabled={profile.email === "aqvines80@gmail.com"}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {profiles.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No users found
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
