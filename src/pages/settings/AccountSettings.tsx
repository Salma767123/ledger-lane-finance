
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Book, Plus, Edit, Trash2, Save, Calendar, Percent, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Account settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Book className="h-8 w-8 text-green-600" />
          Account Settings
        </h1>
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="Enter company name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-address">Address</Label>
              <Input id="company-address" placeholder="Enter company address" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="gstin">GSTIN</Label>
                <Input id="gstin" placeholder="Enter GSTIN" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN</Label>
                <Input id="pan" placeholder="Enter PAN" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fiscal Year Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Fiscal Year Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fiscal-start">Fiscal Year Start</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="october">October</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-year">Current Fiscal Year</Label>
              <Input id="current-year" placeholder="2024-25" readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">INR (₹)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tax Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Tax Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="gst-enabled" />
                <Label htmlFor="gst-enabled">Enable GST</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-gst">Default GST Rate (%)</Label>
                <Input id="default-gst" type="number" placeholder="18" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>GST Rates</Label>
                <div className="space-y-2">
                  {[
                    { rate: "0%", items: "Essential goods" },
                    { rate: "5%", items: "Basic necessities" },
                    { rate: "12%", items: "Standard goods" },
                    { rate: "18%", items: "Most goods & services" },
                    { rate: "28%", items: "Luxury items" }
                  ].map((gst) => (
                    <div key={gst.rate} className="flex items-center justify-between p-2 border rounded">
                      <span>{gst.rate} - {gst.items}</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="tds-enabled" />
                <Label htmlFor="tds-enabled">Enable TDS</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="tcs-enabled" />
                <Label htmlFor="tcs-enabled">Enable TCS</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart of Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Chart of Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account-name">Account Name</Label>
              <Input id="account-name" placeholder="Enter account name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-type">Account Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assets">Assets</SelectItem>
                  <SelectItem value="liabilities">Liabilities</SelectItem>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expenses">Expenses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-code">Account Code</Label>
              <Input id="account-code" placeholder="Enter account code" />
            </div>

            <Button size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {[
                { code: "1000", name: "Cash", type: "Assets" },
                { code: "1100", name: "Bank", type: "Assets" },
                { code: "2000", name: "Accounts Payable", type: "Liabilities" },
                { code: "3000", name: "Sales", type: "Income" },
                { code: "4000", name: "Office Expenses", type: "Expenses" }
              ].map((account) => (
                <div key={account.code} className="flex items-center justify-between p-2 border rounded text-sm">
                  <div>
                    <div className="font-medium">{account.code} - {account.name}</div>
                    <div className="text-gray-500 text-xs">{account.type}</div>
                  </div>
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

        {/* Accounting Preferences */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Accounting Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">General Settings</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-backup" />
                  <Label htmlFor="auto-backup">Auto backup data</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="decimal-places" />
                  <Label htmlFor="decimal-places">Show 2 decimal places</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="thousand-separator" />
                  <Label htmlFor="thousand-separator">Use thousand separator</Label>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Invoice Settings</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-invoice-number" />
                  <Label htmlFor="auto-invoice-number">Auto-generate invoice numbers</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                  <Input id="invoice-prefix" placeholder="INV-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-terms">Default Payment Terms (days)</Label>
                  <Input id="invoice-terms" type="number" placeholder="30" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Reporting</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-zero-balances" />
                  <Label htmlFor="show-zero-balances">Show zero balances in reports</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="consolidate-accounts" />
                  <Label htmlFor="consolidate-accounts">Consolidate similar accounts</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-currency">Report Currency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">INR (₹)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;
