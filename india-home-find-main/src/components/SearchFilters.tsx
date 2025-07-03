
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  location: string;
  priceRange: [number, number];
  propertyType: string;
  bhk: string;
  type: string;
  minArea: string;
  maxArea: string;
  amenities: string[];
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    priceRange: [0, 50000000],
    propertyType: "all",
    bhk: "all",
    type: "all",
    minArea: "",
    maxArea: "",
    amenities: []
  });

  const amenities = [
    "Parking", "Gym", "Swimming Pool", "Security", "Power Backup",
    "Lift", "Garden", "Club House", "Children's Play Area", "Jogging Track"
  ];

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked 
      ? [...filters.amenities, amenity]
      : filters.amenities.filter(a => a !== amenity);
    
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
  };

  const handleBhkToggle = (bhk: string) => {
    const newBhk = filters.bhk === bhk ? "all" : bhk;
    handleFilterChange("bhk", newBhk);
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      location: "",
      priceRange: [0, 50000000],
      propertyType: "all",
      bhk: "all",
      type: "all",
      minArea: "",
      maxArea: "",
      amenities: []
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Location</Label>
            <Input
              placeholder="Enter city, locality or pincode"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>

          {/* Buy/Rent Toggle */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Property For</Label>
            <div className="flex gap-2">
              <Button
                variant={filters.type === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange("type", "all")}
                className="flex-1"
              >
                All
              </Button>
              <Button
                variant={filters.type === "sale" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange("type", "sale")}
                className="flex-1"
              >
                Buy
              </Button>
              <Button
                variant={filters.type === "rent" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange("type", "rent")}
                className="flex-1"
              >
                Rent
              </Button>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Property Type</Label>
            <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="plot">Plot</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* BHK */}
          <div>
            <Label className="text-sm font-medium mb-2 block">BHK</Label>
            <div className="flex flex-wrap gap-2">
              {["1", "2", "3", "4", "5+"].map((bhk) => (
                <Button
                  key={bhk}
                  variant={filters.bhk === bhk ? "default" : "outline"}
                  size="sm"
                  className="h-8 px-3"
                  onClick={() => handleBhkToggle(bhk)}
                >
                  {bhk} BHK
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
            </Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange("priceRange", value)}
              max={50000000}
              step={100000}
              className="w-full"
            />
          </div>

          {/* Area Range */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Area (sq.ft)</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="Min" 
                className="flex-1"
                value={filters.minArea}
                onChange={(e) => handleFilterChange("minArea", e.target.value)}
              />
              <Input 
                placeholder="Max" 
                className="flex-1"
                value={filters.maxArea}
                onChange={(e) => handleFilterChange("maxArea", e.target.value)}
              />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Amenities</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                  />
                  <label
                    htmlFor={amenity}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline"
              className="flex-1"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
