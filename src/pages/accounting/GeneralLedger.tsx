
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
import { useToast } from "@/hooks/use-toast";

const GeneralLedger = () => {
  const { toast } = useToast();
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [isLedgerViewOpen, setIsLedgerViewOpen] = useState(false);
  const [selectedLedgerAccount, setSelectedLedgerAccount] = useState("");
  
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Cash in Hand", code: "1001", balance: "₹50,000", type: "Current Asset", category: "Assets" },
    { id: 2, name: "Bank Account", code: "1002", balance: "₹2,50,000", type: "Current Asset", category: "Assets" },
    { id: 3, name: "Accounts Receivable", code: "1101", balance: "₹1,20,000", type: "Current Asset", category: "Assets" },
    { id: 4, name: "Equipment", code: "1501", balance: "₹5,00,000", type: "Fixed Asset", category: "Assets" },
    { id: 5, name: "Accounts Payable", code: "2001", balance: "₹75,000", type: "Current Liability", category: "Liabilities" },
    { id: 6, name: "Bank Loan", code: "2501", balance: "₹3,00,000", type: "Long-term Liability", category: "Liabilities" },
    { id: 7, name: "Owner's Capital", code: "3001", balance: "₹5,00,000", type: "Equity", category: "Equity" },
    { id: 8, name: "Retained Earnings", code: "3101", balance: "₹2,22,220", type: "Equity", category: "Equity" },
    { id: 9, name: "Sales Revenue", code: "4001", balance: "₹8,45,670", type: "Revenue", category: "Revenue" },
    { id: 10, name: "Office Rent", code: "5001", balance: "₹60,000", type: "Operating Expense", category: "Expenses" },
    { id: 11, name: "Utilities", code: "5101", balance: "₹15,000", type: "Operating Expense", category: "Expenses" },
    { id: 12, name: "Salaries", code: "5201", balance: "₹3,00,000", type: "Operating Expense", category: "Expenses" }
  ]);
  
  const [accountData, setAccountData] = useState({
    name: "",
    type: "",
    category: "",
    description: "",
    openingBalance: ""
  });

  const [ledgerTransactions] = useState([
    { id: 1, date: "2024-01-01", description: "Opening Balance", ref: "OB001", debit: "50,000", credit: "", balance: "50,000" },
    { id: 2, date: "2024-01-15", description: "Cash Sale", ref: "CS001", debit: "25,000", credit: "", balance: "75,000" },
    { id: 3, date: "2024-01-20", description: "Office Expense", ref: "EXP001", debit: "", credit: "5,000", balance: "70,000" },
    { id: 4, date: "2024-01-25", description: "Customer Payment", ref: "CP001", debit: "15,000", credit: "", balance: "85,000" }
  ]);

  const handleCreateAccount = () => {
    if (accountData.name && accountData.type && accountData.category) {
      const newAccount = {
        id: accounts.length + 1,
        name: accountData.name,
        code: `${accountData.category === 'Assets' ? '1' : accountData.category === 'Liabilities' ? '2' : accountData.category === 'Equity' ? '3' : accountData.category === 'Revenue' ? '4' : '5'}${String(accounts.length + 1).padStart(3, '0')}`,
        balance: `₹${accountData.openingBalance || '0'}`,
        type: accountData.type,
        category: accountData.category
      };
      setAccounts([...accounts, newAccount]);
      setAccountData({ name: "", type: "", category: "", description: "", openingBalance: "" });
      setIsAccountDialogOpen(false);
      toast({
        title: "Account Created",
        description: `Account "${newAccount.name}" has been created successfully.`
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleViewLedger = (accountName) => {
    setSelectedLedgerAccount(accountName);
    setIsLedgerViewOpen(true);
  };

  const assetsData = accounts.filter(acc => acc.category === 'Assets');
  const liabilitiesData = accounts.filter(acc => acc.category === 'Liabilities');
  const equityData = accounts.filter(acc => acc.category === 'Equity');
  const revenueData = accounts.filter(acc => acc.category === 'Revenue');
  const expensesData = accounts.filter(acc => acc.category === 'Expenses');

  const trialBalanceData = accounts.map(account => ({
    ...account,
    debit: ['Assets', 'Expenses'].includes(account.category) ? account.balance : '-',
    credit: ['Liabilities', 'Equity', 'Revenue'].includes(account.category) ? account.balance : '-'
  }));

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
            {data.map((account) => (
              <tr key={account.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{account.name}</td>
                <td className="p-4">{account.code}</td>
                <td className="p-4">{account.type}</td>
                <td className="p-4 text-right font-semibold">{account.balance}</td>
                <td className="p-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewLedger(account.name)}
                  >
                    View Ledger
                  </Button>
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
                <label className="text-sm font-medium">Account Category *</label>
                <Select value={accountData.category} onValueChange={(value) => setAccountData({...accountData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Assets">Assets</SelectItem>
                    <SelectItem value="Liabilities">Liabilities</SelectItem>
                    <SelectItem value="Equity">Equity</SelectItem>
                    <SelectItem value="Revenue">Revenue</SelectItem>
                    <SelectItem value="Expenses">Expenses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Account Type *</label>
                <Select value={accountData.type} onValueChange={(value) => setAccountData({...accountData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Current Asset">Current Asset</SelectItem>
                    <SelectItem value="Fixed Asset">Fixed Asset</SelectItem>
                    <SelectItem value="Current Liability">Current Liability</SelectItem>
                    <SelectItem value="Long-term Liability">Long-term Liability</SelectItem>
                    <SelectItem value="Equity">Equity</SelectItem>
                    <SelectItem value="Revenue">Revenue</SelectItem>
                    <SelectItem value="Operating Expense">Operating Expense</SelectItem>
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
                <p className="text-2xl font-bold text-gray-900">₹{assetsData.reduce((sum, acc) => sum + parseInt(acc.balance.replace(/[₹,]/g, '')), 0).toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-gray-900">₹{liabilitiesData.reduce((sum, acc) => sum + parseInt(acc.balance.replace(/[₹,]/g, '')), 0).toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-gray-900">₹{equityData.reduce((sum, acc) => sum + parseInt(acc.balance.replace(/[₹,]/g, '')), 0).toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-gray-900">₹{(revenueData.reduce((sum, acc) => sum + parseInt(acc.balance.replace(/[₹,]/g, '')), 0) - expensesData.reduce((sum, acc) => sum + parseInt(acc.balance.replace(/[₹,]/g, '')), 0)).toLocaleString()}</p>
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
                      {trialBalanceData.map((account) => (
                        <tr key={account.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">{account.name}</td>
                          <td className="p-4">{account.code}</td>
                          <td className="p-4 text-right">{account.debit}</td>
                          <td className="p-4 text-right">{account.credit}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-900 font-bold">
                        <td className="p-4">Total</td>
                        <td className="p-4"></td>
                        <td className="p-4 text-right">₹{(assetsData.reduce((sum, acc) => sum + parseInt(acc.balance.replace(/[₹,]/g, '')), 0) + expensesData.reduce((sum, acc) => sum + parseInt(acc.balance.replace(/[₹,]/g, '')), 0)).toLocaleString()}</td>
                        <td className="p-4 text-right">₹{(liabilitiesData.reduce((sum, acc) => sum + parseInt(acc.balance.replace(/[₹,]/g, '')), 0) + equityData.reduce((sum, acc) => sum + parseInt(acc.balance.replace(/[₹,]/g, '')), 0) + revenueData.reduce((sum, acc) => sum + parseInt(acc.balance.replace(/[₹,]/g, '')), 0)).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isLedgerViewOpen} onOpenChange={setIsLedgerViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Account Ledger - {selectedLedgerAccount}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Description</th>
                    <th className="text-left p-4">Reference</th>
                    <th className="text-right p-4">Debit</th>
                    <th className="text-right p-4">Credit</th>
                    <th className="text-right p-4">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{transaction.date}</td>
                      <td className="p-4">{transaction.description}</td>
                      <td className="p-4">{transaction.ref}</td>
                      <td className="p-4 text-right">{transaction.debit ? `₹${transaction.debit}` : '-'}</td>
                      <td className="p-4 text-right">{transaction.credit ? `₹${transaction.credit}` : '-'}</td>
                      <td className="p-4 text-right font-semibold">₹{transaction.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
              <span className="font-medium">Current Balance:</span>
              <span className="text-xl font-bold">₹85,000</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GeneralLedger;
