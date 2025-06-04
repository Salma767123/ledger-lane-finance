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
import { Book, Plus, Search, TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";

const GeneralLedger = () => {
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [accountData, setAccountData] = useState({
    name: "",
    type: "",
    category: "",
    description: "",
    openingBalance: ""
  });

  const handleCreateAccount = () => {
    if (accountData.name && accountData.type && accountData.category) {
      console.log("Creating account:", accountData);
      setAccountData({ name: "", type: "", category: "", description: "", openingBalance: "" });
      setIsAccountDialogOpen(false);
    }
  };

  const handleViewDetails = (category: string) => {
    setSelectedCategory(category);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Book className="h-8 w-8 text-blue-600" />
          General Ledger
        </h1>
        <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Account Name *</label>
                <Input 
                  value={accountData.name}
                  onChange={(e) => setAccountData({...accountData, name: e.target.value})}
                  placeholder="Enter account name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Account Type *</label>
                <Select value={accountData.type} onValueChange={(value) => setAccountData({...accountData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asset">Asset</SelectItem>
                    <SelectItem value="liability">Liability</SelectItem>
                    <SelectItem value="equity">Equity</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Category *</label>
                <Select value={accountData.category} onValueChange={(value) => setAccountData({...accountData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-asset">Current Asset</SelectItem>
                    <SelectItem value="fixed-asset">Fixed Asset</SelectItem>
                    <SelectItem value="current-liability">Current Liability</SelectItem>
                    <SelectItem value="long-term-liability">Long-term Liability</SelectItem>
                    <SelectItem value="sales-revenue">Sales Revenue</SelectItem>
                    <SelectItem value="operating-expense">Operating Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input 
                  value={accountData.description}
                  onChange={(e) => setAccountData({...accountData, description: e.target.value})}
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Opening Balance</label>
                <Input 
                  type="number"
                  value={accountData.openingBalance}
                  onChange={(e) => setAccountData({...accountData, openingBalance: e.target.value})}
                  placeholder="Enter opening balance"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateAccount} className="flex-1">
                  Create Account
                </Button>
                <Button variant="outline" onClick={() => setIsAccountDialogOpen(false)} className="flex-1">
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
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">₹15,67,890</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Liabilities</p>
                <p className="text-2xl font-bold text-gray-900">₹8,45,670</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Owner's Equity</p>
                <p className="text-2xl font-bold text-gray-900">₹7,22,220</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Net Income</p>
                <p className="text-2xl font-bold text-gray-900">₹2,45,890</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Chart of Accounts</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search accounts..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-2">Current and fixed assets</p>
                <p className="text-xl font-bold text-green-600">₹15,67,890</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleViewDetails("Assets")}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Liabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-2">Current and long-term liabilities</p>
                <p className="text-xl font-bold text-red-600">₹8,45,670</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleViewDetails("Liabilities")}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Equity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-2">Owner's equity and retained earnings</p>
                <p className="text-xl font-bold text-blue-600">₹7,22,220</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleViewDetails("Equity")}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-2">Income and revenue accounts</p>
                <p className="text-xl font-bold text-green-600">₹12,45,670</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleViewDetails("Revenue")}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-2">Operating and other expenses</p>
                <p className="text-xl font-bold text-orange-600">₹9,99,780</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleViewDetails("Expenses")}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Trial Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-2">Complete trial balance report</p>
                <p className="text-sm text-gray-500">Last updated today</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => console.log("Generating trial balance report...")}
                >
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedCategory} Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Account Name</th>
                    <th className="text-left p-4">Account Code</th>
                    <th className="text-right p-4">Balance</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">Sample Account</td>
                    <td className="p-4">1001</td>
                    <td className="p-4 text-right">₹1,00,000</td>
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
    </div>
  );
};

export default GeneralLedger;
