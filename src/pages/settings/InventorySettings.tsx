
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Package, Plus, Edit, Trash2, Save, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InventorySettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Inventory settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="h-8 w-8 text-blue-600" />
          Inventory Settings
        </h1>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Category name" className="flex-1" />
              <Button size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {["Electronics", "Furniture", "Clothing", "Books"].map((category) => (
                <div key={category} className="flex items-center justify-between p-2 border rounded">
                  <span>{category}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Units of Measurement */}
        <Card>
          <CardHeader>
            <CardTitle>Units of Measurement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Unit name" />
              <Input placeholder="Symbol" />
            </div>
            <Button size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Unit
            </Button>
            <div className="space-y-2">
              {[
                { name: "Pieces", symbol: "pcs" },
                { name: "Kilograms", symbol: "kg" },
                { name: "Meters", symbol: "m" },
                { name: "Liters", symbol: "l" }
              ].map((unit) => (
                <div key={unit.name} className="flex items-center justify-between p-2 border rounded">
                  <span>{unit.name} ({unit.symbol})</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warehouses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Warehouses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input placeholder="Warehouse name" />
              <Textarea placeholder="Address" rows={2} />
              <Input placeholder="Contact person" />
              <Input placeholder="Phone number" />
            </div>
            <Button size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Warehouse
            </Button>
            <div className="space-y-2">
              {["Main Warehouse", "Secondary Storage", "Retail Store"].map((warehouse) => (
                <div key={warehouse} className="flex items-center justify-between p-2 border rounded">
                  <span>{warehouse}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-sku" />
                <Label htmlFor="auto-sku">Auto-generate SKU codes</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sku-prefix">SKU Prefix</Label>
                <Input id="sku-prefix" placeholder="PRD-" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="low-stock">Low Stock Alert Threshold</Label>
                <Input id="low-stock" type="number" placeholder="10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costing-method">Costing Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select costing method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fifo">FIFO (First In, First Out)</SelectItem>
                    <SelectItem value="lifo">LIFO (Last In, First Out)</SelectItem>
                    <SelectItem value="weighted">Weighted Average</SelectItem>
                    <SelectItem value="specific">Specific Identification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="negative-stock" />
                <Label htmlFor="negative-stock">Allow negative stock</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="batch-tracking" />
                <Label htmlFor="batch-tracking">Enable batch/lot tracking</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="expiry-tracking" />
                <Label htmlFor="expiry-tracking">Track expiry dates</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventorySettings;
