import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag, Plus, Calculator, FileText, TrendingUp, AlertCircle } from "lucide-react";

const Tax = () => {
  const [isTaxRateDialogOpen, setIsTaxRateDialogOpen] = useState(false);
  const [isTaxRatesDialogOpen, setIsTaxRatesDialogOpen] = useState(false);
  const [isGSTSettingsDialogOpen, setIsGSTSettingsDialogOpen] = useState(false);
  const [isTaxReportsDialogOpen, setIsTaxReportsDialogOpen] = useState(false);
  const [isFileReturnsDialogOpen, setIsFileReturnsDialogOpen] = useState(false);
  
  const [taxRateData, setTaxRateData] = useState({
    name: "",
    rate: "",
    type: "",
    description: ""
  });

  const handleAddTaxRate = () => {
    if (taxRateData.name && taxRateData.rate && taxRateData.type) {
      console.log("Adding tax rate:", taxRateData);
      setTaxRateData({ name: "", rate: "", type: "", description: "" });
      setIsTaxRateDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Tag className="h-8 w-8 text-green-600" />
          Tax Management
        </h1>
        <Dialog open={isTaxRateDialogOpen} onOpenChange={setIsTaxRateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Tax Rate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Tax Rate</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tax Name *</label>
                <Input 
                  value={taxRateData.name}
                  onChange={(e) => setTaxRateData({...taxRateData, name: e.target.value})}
                  placeholder="Enter tax name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tax Rate (%) *</label>
                <Input 
                  type="number"
                  value={taxRateData.rate}
                  onChange={(e) => setTaxRateData({...taxRateData, rate: e.target.value})}
                  placeholder="Enter tax rate"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tax Type *</label>
                <Select value={taxRateData.type} onValueChange={(value) => setTaxRateData({...taxRateData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gst">GST</SelectItem>
                    <SelectItem value="cgst">CGST</SelectItem>
                    <SelectItem value="sgst">SGST</SelectItem>
                    <SelectItem value="igst">IGST</SelectItem>
                    <SelectItem value="cess">Cess</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input 
                  value={taxRateData.description}
                  onChange={(e) => setTaxRateData({...taxRateData, description: e.target.value})}
                  placeholder="Enter description"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddTaxRate} className="flex-1">
                  Add Tax Rate
                </Button>
                <Button variant="outline" onClick={() => setIsTaxRateDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tax Collected</p>
                <p className="text-2xl font-bold text-gray-900">₹2,45,678</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">₹45,890</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Returns</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Filed Returns</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Tax Rates Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Configure tax rates for different products and services.</p>
            <div className="space-y-2">
              <Dialog open={isTaxRatesDialogOpen} onOpenChange={setIsTaxRatesDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Manage Tax Rates</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Tax Rates Management</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Current Tax Rates</h4>
                      <Button size="sm" onClick={() => setIsTaxRateDialogOpen(true)}>
                        Add New Rate
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">Tax Name</th>
                            <th className="text-left p-4">Rate (%)</th>
                            <th className="text-left p-4">Type</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-gray-50">
                            <td className="p-4">Standard GST</td>
                            <td className="p-4">18%</td>
                            <td className="p-4">GST</td>
                            <td className="p-4">
                              <Button variant="outline" size="sm">Edit</Button>
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50">
                            <td className="p-4">Reduced GST</td>
                            <td className="p-4">5%</td>
                            <td className="p-4">GST</td>
                            <td className="p-4">
                              <Button variant="outline" size="sm">Edit</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isGSTSettingsDialogOpen} onOpenChange={setIsGSTSettingsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">GST Settings</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>GST Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">GSTIN</label>
                      <Input placeholder="Enter GSTIN" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">State</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Business Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular</SelectItem>
                          <SelectItem value="composition">Composition</SelectItem>
                          <SelectItem value="unregistered">Unregistered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Save Settings</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Tax Reports & Filing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Generate tax reports and file returns.</p>
            <div className="space-y-2">
              <Dialog open={isTaxReportsDialogOpen} onOpenChange={setIsTaxReportsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">View Tax Reports</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Tax Reports</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">Report Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select report" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gstr1">GSTR-1</SelectItem>
                            <SelectItem value="gstr3b">GSTR-3B</SelectItem>
                            <SelectItem value="gstr9">GSTR-9</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Period</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="annual">Annual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Year</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full">Generate Report</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isFileReturnsDialogOpen} onOpenChange={setIsFileReturnsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">File Returns</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>File Tax Returns</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Return Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select return type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gstr1">GSTR-1</SelectItem>
                          <SelectItem value="gstr3b">GSTR-3B</SelectItem>
                          <SelectItem value="gstr9">GSTR-9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Filing Period</label>
                      <Input type="month" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Due Date</label>
                      <Input type="date" />
                    </div>
                    <div className="bg-yellow-50 p-4 rounded">
                      <p className="text-sm text-yellow-800">
                        Please review all data before filing. Once filed, returns cannot be easily modified.
                      </p>
                    </div>
                    <Button className="w-full">File Return</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tax;
