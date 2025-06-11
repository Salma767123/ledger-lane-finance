
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, Save, ArrowLeft, HelpCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AddItem = () => {
  const { toast } = useToast();
  const [itemType, setItemType] = useState("goods");
  const [salesInfoEnabled, setSalesInfoEnabled] = useState(true);
  const [purchaseInfoEnabled, setPurchaseInfoEnabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Item Added Successfully",
      description: "New item has been added to inventory.",
    });
  };

  const handleSalesInfoChange = (checked: boolean | "indeterminate") => {
    setSalesInfoEnabled(checked === true);
  };

  const handlePurchaseInfoChange = (checked: boolean | "indeterminate") => {
    setPurchaseInfoEnabled(checked === true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/inventory">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Inventory
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">New Item</h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b">
              <CardTitle className="text-lg font-semibold text-gray-800">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Item Type */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-gray-700">Type</Label>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </div>
                <RadioGroup value={itemType} onValueChange={setItemType} className="flex gap-8">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="goods" id="goods" />
                    <Label htmlFor="goods" className="text-sm font-medium">Goods</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="service" id="service" />
                    <Label htmlFor="service" className="text-sm font-medium">Service</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="Enter item name" 
                    className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                    required
                  />
                </div>

                {/* SKU */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="sku" className="text-sm font-medium text-gray-700">SKU</Label>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input 
                    id="sku" 
                    placeholder="Auto-generated if left blank" 
                    className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                  />
                </div>

                {/* Unit */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="unit" className="text-sm font-medium text-gray-700">Unit</Label>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <Select>
                    <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="m">Meters (m)</SelectItem>
                      <SelectItem value="l">Liters (l)</SelectItem>
                      <SelectItem value="box">Box</SelectItem>
                      <SelectItem value="dozen">Dozen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* HSN Code */}
                <div className="space-y-2">
                  <Label htmlFor="hsn" className="text-sm font-medium text-gray-700">HSN Code</Label>
                  <div className="relative">
                    <Input 
                      id="hsn" 
                      placeholder="Enter HSN code" 
                      className="h-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                    />
                    <Search className="h-4 w-4 absolute right-3 top-3 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Tax Preference */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="tax-preference" className="text-sm font-medium text-gray-700">
                    Tax Preference <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Select defaultValue="taxable">
                  <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="taxable">Taxable</SelectItem>
                    <SelectItem value="non-taxable">Non-taxable</SelectItem>
                    <SelectItem value="exempt">Exempt</SelectItem>
                    <SelectItem value="zero-rated">Zero Rated</SelectItem>
                    <SelectItem value="out-of-scope">Out of Scope</SelectItem>
                    <SelectItem value="reverse-charge">Reverse Charge</SelectItem>
                    <SelectItem value="gst-0">GST 0%</SelectItem>
                    <SelectItem value="gst-5">GST 5%</SelectItem>
                    <SelectItem value="gst-12">GST 12%</SelectItem>
                    <SelectItem value="gst-18">GST 18%</SelectItem>
                    <SelectItem value="gst-28">GST 28%</SelectItem>
                    <SelectItem value="igst-0">IGST 0%</SelectItem>
                    <SelectItem value="igst-5">IGST 5%</SelectItem>
                    <SelectItem value="igst-12">IGST 12%</SelectItem>
                    <SelectItem value="igst-18">IGST 18%</SelectItem>
                    <SelectItem value="igst-28">IGST 28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sales & Purchase Information */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Sales Information */}
            <Card className="shadow-sm">
              <CardHeader className="bg-blue-50/50 border-b">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="sales-info" 
                    checked={salesInfoEnabled}
                    onCheckedChange={handleSalesInfoChange}
                  />
                  <CardTitle className="text-lg text-blue-700">Sales Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="selling-price" className="text-sm font-medium text-gray-700">
                    Selling Price <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm h-10">
                      ₹
                    </span>
                    <Input 
                      id="selling-price" 
                      placeholder="0.00" 
                      type="number"
                      step="0.01"
                      className="rounded-l-none h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                      disabled={!salesInfoEnabled}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-account" className="text-sm font-medium text-gray-700">
                    Account <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="19948" disabled={!salesInfoEnabled}>
                    <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="19948">Sales</SelectItem>
                      <SelectItem value="19949">Sales Revenue</SelectItem>
                      <SelectItem value="19950">Product Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-description" className="text-sm font-medium text-gray-700">Description</Label>
                  <Textarea 
                    id="sales-description" 
                    placeholder="Enter sales description" 
                    rows={3} 
                    className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={!salesInfoEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Purchase Information */}
            <Card className="shadow-sm">
              <CardHeader className="bg-green-50/50 border-b">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="purchase-info" 
                    checked={purchaseInfoEnabled}
                    onCheckedChange={handlePurchaseInfoChange}
                  />
                  <CardTitle className="text-lg text-green-700">Purchase Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cost-price" className="text-sm font-medium text-gray-700">
                    Cost Price <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm h-10">
                      ₹
                    </span>
                    <Input 
                      id="cost-price" 
                      placeholder="0.00" 
                      type="number"
                      step="0.01"
                      className="rounded-l-none h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                      disabled={!purchaseInfoEnabled}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchase-account" className="text-sm font-medium text-gray-700">
                    Account <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="28607" disabled={!purchaseInfoEnabled}>
                    <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="28607">Cost of Goods Sold</SelectItem>
                      <SelectItem value="28608">Purchase</SelectItem>
                      <SelectItem value="28609">Inventory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchase-description" className="text-sm font-medium text-gray-700">Description</Label>
                  <Textarea 
                    id="purchase-description" 
                    placeholder="Enter purchase description" 
                    rows={3} 
                    className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={!purchaseInfoEnabled}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferred-vendor" className="text-sm font-medium text-gray-700">Preferred Vendor</Label>
                  <Select disabled={!purchaseInfoEnabled}>
                    <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor1">ABC Suppliers</SelectItem>
                      <SelectItem value="vendor2">XYZ Trading Co.</SelectItem>
                      <SelectItem value="vendor3">Best Materials Ltd.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Rates */}
          <Card className="shadow-sm">
            <CardHeader className="bg-yellow-50/50 border-b">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg text-yellow-700">Default Tax Rates</CardTitle>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Intra State Tax Rate</Label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium">
                    GST 18% (CGST 9% + SGST 9%)
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Inter State Tax Rate</Label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium">
                    IGST 18%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Link to="/inventory">
              <Button variant="outline" size="lg" className="px-6">
                Cancel
              </Button>
            </Link>
            <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              <Save className="h-4 w-4 mr-2" />
              Save Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
