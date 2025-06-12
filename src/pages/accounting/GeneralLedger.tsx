import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Book, Plus, Search, TrendingUp, TrendingDown, DollarSign, Wallet, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const GeneralLedger = () => {
  const { toast } = useToast();
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [isLedgerViewOpen, setIsLedgerViewOpen] = useState(false);
  const [selectedLedgerAccount, setSelectedLedgerAccount] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Cash in Hand", code: "1001", balance: "₹50,000", type: "Current Assets", category: "Assets" },
    { id: 2, name: "Bank Account - SBI", code: "1002", balance: "₹2,50,000", type: "Current Assets", category: "Assets" },
    { id: 3, name: "Accounts Receivable", code: "1101", balance: "₹1,20,000", type: "Current Assets", category: "Assets" },
    { id: 4, name: "Inventory", code: "1201", balance: "₹85,000", type: "Current Assets", category: "Assets" },
    { id: 5, name: "Prepaid Insurance", code: "1301", balance: "₹15,000", type: "Current Assets", category: "Assets" },
    { id: 6, name: "Office Equipment", code: "1501", balance: "₹3,00,000", type: "Fixed Assets", category: "Assets" },
    { id: 7, name: "Buildings", code: "1502", balance: "₹15,00,000", type: "Fixed Assets", category: "Assets" },
    { id: 8, name: "Accumulated Depreciation - Equipment", code: "1601", balance: "₹50,000", type: "Contra Assets", category: "Assets" },
    { id: 9, name: "Accounts Payable", code: "2001", balance: "₹75,000", type: "Current Liabilities", category: "Liabilities" },
    { id: 10, name: "Accrued Expenses", code: "2101", balance: "₹25,000", type: "Current Liabilities", category: "Liabilities" },
    { id: 11, name: "Bank Loan", code: "2501", balance: "₹5,00,000", type: "Long-term Liabilities", category: "Liabilities" },
    { id: 12, name: "Owner's Capital", code: "3001", balance: "₹10,00,000", type: "Owner's Equity", category: "Equity" },
    { id: 13, name: "Retained Earnings", code: "3101", balance: "₹3,50,000", type: "Retained Earnings", category: "Equity" },
    { id: 14, name: "Sales Revenue", code: "4001", balance: "₹12,50,000", type: "Operating Revenue", category: "Revenue" },
    { id: 15, name: "Service Revenue", code: "4101", balance: "₹2,85,000", type: "Operating Revenue", category: "Revenue" },
    { id: 16, name: "Cost of Goods Sold", code: "5001", balance: "₹7,50,000", type: "Cost of Sales", category: "Expenses" },
    { id: 17, name: "Salaries Expense", code: "5201", balance: "₹4,20,000", type: "Operating Expenses", category: "Expenses" },
    { id: 18, name: "Rent Expense", code: "5301", balance: "₹1,20,000", type: "Operating Expenses", category: "Expenses" },
    { id: 19, name: "Utilities Expense", code: "5401", balance: "₹45,000", type: "Operating Expenses", category: "Expenses" },
    { id: 20, name: "Depreciation Expense", code: "5501", balance: "₹75,000", type: "Operating Expenses", category: "Expenses" }
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
    { id: 3, date: "2024-01-20", description: "Office Rent Payment", ref: "EXP001", debit: "", credit: "10,000", balance: "65,000" },
    { id: 4, date: "2024-01-25", description: "Customer Payment Received", ref: "CP001", debit: "15,000", credit: "", balance: "80,000" }
  ]);

  const accountTypes = {
    Assets: [
      "Current Assets",
      "Fixed Assets", 
      "Intangible Assets",
      "Investments",
      "Contra Assets",
      "Other Assets"
    ],
    Liabilities: [
      "Current Liabilities",
      "Long-term Liabilities",
      "Contingent Liabilities",
      "Other Liabilities"
    ],
    Equity: [
      "Owner's Equity",
      "Partner's Capital",
      "Retained Earnings",
      "Common Stock",
      "Preferred Stock",
      "Treasury Stock",
      "Additional Paid-in Capital",
      "Accumulated Other Comprehensive Income"
    ],
    Revenue: [
      "Operating Revenue",
      "Non-operating Revenue",
      "Service Revenue",
      "Interest Revenue",
      "Rental Revenue",
      "Dividend Revenue",
      "Other Revenue"
    ],
    Expenses: [
      "Cost of Sales",
      "Operating Expenses",
      "Administrative Expenses",
      "Selling Expenses",
      "Financial Expenses",
      "Interest Expense",
      "Depreciation Expense",
      "Amortization Expense",
      "Tax Expense",
      "Other Expenses"
    ]
  };

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

  const handleViewLedger = (accountName: string) => {
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

  const AccountTable = ({ data, title }: { data: any[], title: string }) => (
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
          Chart of Accounts
        </h1>
        <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Account</DialogTitle>
              <DialogDescription>
                Add a new account to your chart of accounts
              </DialogDescription>
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
                <Select value={accountData.category} onValueChange={(value) => setAccountData({...accountData, category: value, type: ""})}>
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
                <Select value={accountData.type} onValueChange={(value) => setAccountData({...accountData, type: value})} disabled={!accountData.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountData.category && accountTypes[accountData.category as keyof typeof accountTypes]?.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
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
                <p className="text-sm font-medium text-gray-600">Total Equity</p>
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
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Account Ledger - {selectedLedgerAccount}</DialogTitle>
            <DialogDescription>
              View transaction history for the selected account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium">From Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick start date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button className="mt-6">Filter</Button>
            </div>
            
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
              <span className="text-xl font-bold">₹80,000</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GeneralLedger;
