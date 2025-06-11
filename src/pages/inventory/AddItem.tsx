
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Package, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AddItem = () => {
  const { toast } = useToast();
  const [itemType, setItemType] = useState("goods");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Item Added",
      description: "New item has been added to inventory successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Inventory
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="h-8 w-8 text-blue-600" />
          New Item
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Type *</Label>
                <RadioGroup value={itemType} onValueChange={setItemType} className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="goods" id="goods" />
                    <Label htmlFor="goods">Goods</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="service" id="service" />
                    <Label htmlFor="service">Service</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Enter item name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" placeholder="Enter SKU" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="m">Meters (m)</SelectItem>
                    <SelectItem value="l">Liters (l)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hsn">HSN Code</Label>
                <Input id="hsn" placeholder="Enter HSN code" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-preference">Tax Preference *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Taxable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="taxable">Taxable</SelectItem>
                    <SelectItem value="non-taxable">Non-taxable</SelectItem>
                    <SelectItem value="exempt">Exempt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Tax</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="selling-price">Selling Price *</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      INR
                    </span>
                    <Input id="selling-price" placeholder="0.00" className="rounded-l-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost-price">Cost Price *</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      INR
                    </span>
                    <Input id="cost-price" placeholder="0.00" className="rounded-l-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sales-account">Account *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="19948">[ 19948 ] Sales</SelectItem>
                      <SelectItem value="19949">[ 19949 ] Sales Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchase-account">Account *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="28607">[ 28607 ] Cost of Goods Sold</SelectItem>
                      <SelectItem value="28608">[ 28608 ] Purchase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sales-description">Description</Label>
                <Textarea id="sales-description" placeholder="Enter sales description" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchase-description">Description</Label>
                <Textarea id="purchase-description" placeholder="Enter purchase description" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred-vendor">Preferred Vendor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendor1">Vendor 1</SelectItem>
                    <SelectItem value="vendor2">Vendor 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tax Rates */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Default Tax Rates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Sales Information</h4>
                  <div className="space-y-2">
                    <Label>Intra State Tax Rate</Label>
                    <div className="p-3 bg-gray-50 rounded border">
                      <span className="text-sm">GST12 (12 %)</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Inter State Tax Rate</Label>
                    <div className="p-3 bg-gray-50 rounded border">
                      <span className="text-sm">IGST12 (12 %)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Purchase Information</h4>
                  <div className="space-y-2">
                    <Label>Intra State Tax Rate</Label>
                    <div className="p-3 bg-gray-50 rounded border">
                      <span className="text-sm">GST12 (12 %)</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Inter State Tax Rate</Label>
                    <div className="p-3 bg-gray-50 rounded border">
                      <span className="text-sm">IGST12 (12 %)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Additional Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="track-inventory" />
                  <Label htmlFor="track-inventory">Track inventory for this item</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="returnable" />
                  <Label htmlFor="returnable">Returnable item</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="taxable" />
                  <Label htmlFor="taxable">Taxable</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Link to="/inventory">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Item
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
