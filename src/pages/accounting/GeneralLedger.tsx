import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  const assetsData = [
    { name: "Cash in Hand", code: "1001", balance: "₹50,000", type: "Current Asset" },
    { name: "Bank Account", code: "1002", balance: "₹2,50,000", type: "Current Asset" },
    { name: "Accounts Receivable", code: "1101", balance: "₹1,20,000", type: "Current Asset" },
    { name: "Equipment", code: "1501", balance: "₹5,00,000", type: "Fixed Asset" }
  ];

  const liabilitiesData = [
    { name: "Accounts Payable", code: "2001", balance: "₹75,000", type: "Current Liability" },
    { name: "Bank Loan", code: "2501", balance: "₹3,00,000", type: "Long-term Liability" },
    { name: "Accrued Expenses", code: "2101", balance: "₹25,000", type: "Current Liability" }
  ];

  const equityData = [
    { name: "Owner's Capital", code: "3001", balance: "₹5,00,000", type: "Equity" },
    { name: "Retained Earnings", code: "3101", balance: "₹2,22,220", type: "Equity" }
  ];

  const revenueData = [
    { name: "Sales Revenue", code: "4001", balance: "₹8,45,670", type: "Revenue" },
    { name: "Service Revenue", code: "4101", balance: "₹4,00,000", type: "Revenue" }
  ];

  const expensesData = [
    { name: "Office Rent", code: "5001", balance: "₹60,000", type: "Operating Expense" },
    { name: "Utilities", code: "5101", balance: "₹15,000", type: "Operating Expense" },
    { name: "Salaries", code: "5201", balance: "₹3,00,000", type: "Operating Expense" }
  ];

  const trialBalanceData = [
    ...assetsData.map(item => ({ ...item, debit: item.balance, credit: "-" })),
    ...liabilitiesData.map(item => ({ ...item, debit: "-", credit: item.balance })),
    ...equityData.map(item => ({ ...item, debit: "-", credit: item.balance })),
    ...revenueData.map(item => ({ ...item, debit: "-", credit: item.balance })),
    ...expensesData.map(item => ({ ...item, debit: item.balance, credit: "-" }))
  ];

  const AccountTable = ({ data, title }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Account Name</th>
              <th className="text-left p-4">Code</th>
              <th className="text-left p-4">Type</th>
              <th className="text-right p-4">Balance</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((account, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{account.name}</td>
                <td className="p-4">{account.code}</td>
                <td className="p-4">{account.type}</td>
                <td className="p-4 text-right font-semibold">{account.balance}</td>
                <td className="p-4">
                  <Button variant="outline" size="sm">View Ledger</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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
          <Tabs defaultValue="assets" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
              <TabsTrigger value="equity">Equity</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="trial-balance">Trial Balance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assets" className="mt-6">
              <AccountTable data={assetsData} title="Assets" />
            </TabsContent>
            
            <TabsContent value="liabilities" className="mt-6">
              <AccountTable data={liabilitiesData} title="Liabilities" />
            </TabsContent>
            
            <TabsContent value="equity" className="mt-6">
              <AccountTable data={equityData} title="Equity" />
            </TabsContent>
            
            <TabsContent value="revenue" className="mt-6">
              <AccountTable data={revenueData} title="Revenue" />
            </TabsContent>
            
            <TabsContent value="expenses" className="mt-6">
              <AccountTable data={expensesData} title="Expenses" />
            </TabsContent>
            
            <TabsContent value="trial-balance" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Trial Balance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Account Name</th>
                        <th className="text-left p-4">Code</th>
                        <th className="text-right p-4">Debit</th>
                        <th className="text-right p-4">Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trialBalanceData.map((account, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-4">{account.name}</td>
                          <td className="p-4">{account.code}</td>
                          <td className="p-4 text-right">{account.debit}</td>
                          <td className="p-4 text-right">{account.credit}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-900 font-bold">
                        <td className="p-4">Total</td>
                        <td className="p-4"></td>
                        <td className="p-4 text-right">₹15,67,890</td>
                        <td className="p-4 text-right">₹15,67,890</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
