
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Item Added",
      description: "New item has been added to inventory successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">New Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Type</Label>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </div>
              <RadioGroup value={itemType} onValueChange={setItemType} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="goods" id="goods" />
                  <Label htmlFor="goods" className="text-sm">Goods</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="service" id="service" />
                  <Label htmlFor="service" className="text-sm">Service</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="name" className="text-sm font-medium">Name*</Label>
              </div>
              <Input id="name" placeholder="" className="h-9" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="sku" className="text-sm font-medium">SKU</Label>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </div>
              <Input id="sku" placeholder="" className="h-9" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="unit" className="text-sm font-medium">Unit</Label>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </div>
              <Select>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="" />
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
              <Label htmlFor="hsn" className="text-sm font-medium">HSN Code</Label>
              <div className="relative">
                <Input id="hsn" placeholder="" className="h-9 pr-8" />
                <Search className="h-4 w-4 absolute right-2 top-2.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="tax-preference" className="text-sm font-medium">Tax Preference*</Label>
              </div>
              <Select defaultValue="taxable">
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="taxable">Taxable</SelectItem>
                  <SelectItem value="non-taxable">Non-taxable</SelectItem>
                  <SelectItem value="exempt">Exempt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Esse</Label>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-9">
                    nihil
                  </span>
                  <Input placeholder="%" className="rounded-l-none h-9" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">nemo*</Label>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </div>
                <Input placeholder="lure" className="h-9" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">sint</Label>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="nobis" />
                  <Label htmlFor="nobis" className="text-sm">nobis</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales & Purchase Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Information */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="sales-info" defaultChecked />
                <CardTitle className="text-lg text-blue-600">Sales Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="selling-price" className="text-sm font-medium">Selling Price*</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-9">
                    INR
                  </span>
                  <Input id="selling-price" placeholder="0.00" className="rounded-l-none h-9" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sales-account" className="text-sm font-medium">Account*</Label>
                <Select defaultValue="19948">
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="19948">[ 19948 ] Sales</SelectItem>
                    <SelectItem value="19949">[ 19949 ] Sales Revenue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sales-description" className="text-sm font-medium">Description</Label>
                <Textarea id="sales-description" placeholder="" rows={3} className="resize-none" />
              </div>
            </CardContent>
          </Card>

          {/* Purchase Information */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="purchase-info" defaultChecked />
                <CardTitle className="text-lg text-blue-600">Purchase Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cost-price" className="text-sm font-medium">Cost Price*</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-9">
                    INR
                  </span>
                  <Input id="cost-price" placeholder="0.00" className="rounded-l-none h-9" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchase-account" className="text-sm font-medium">Account*</Label>
                <Select defaultValue="28607">
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="28607">[ 28607 ] Cost of Goods Sold</SelectItem>
                    <SelectItem value="28608">[ 28608 ] Purchase</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchase-description" className="text-sm font-medium">Description</Label>
                <Textarea id="purchase-description" placeholder="" rows={3} className="resize-none" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred-vendor" className="text-sm font-medium">Preferred Vendor</Label>
                <Select>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendor1">Vendor 1</SelectItem>
                    <SelectItem value="vendor2">Vendor 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Default Tax Rates */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Default Tax Rates</CardTitle>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Intra State Tax Rate</Label>
                <div className="p-2 bg-gray-50 rounded border text-sm">
                  GST12 (12 %)
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Inter State Tax Rate</Label>
                <div className="p-2 bg-gray-50 rounded border text-sm">
                  IGST12 (12 %)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-4">
          <Link to="/inventory">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
