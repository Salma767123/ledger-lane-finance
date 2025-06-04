
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
import { Building2, Plus, Search, TrendingUp, TrendingDown, CreditCard, Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Banking = () => {
  const { toast } = useToast();
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isReconciliationDialogOpen, setIsReconciliationDialogOpen] = useState(false);
  const [isStatementsDialogOpen, setIsStatementsDialogOpen] = useState(false);
  
  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, bankName: "HDFC Bank", accountType: "Current", accountNumber: "****5678", balance: 845670 },
    { id: 2, bankName: "ICICI Bank", accountType: "Savings", accountNumber: "****1234", balance: 400220 }
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-01-15", description: "Payment from Customer ABC", account: "HDFC Bank", type: "Credit", amount: 45000, status: "Completed" },
    { id: 2, date: "2024-01-14", description: "Office Rent Payment", account: "ICICI Bank", type: "Debit", amount: 25000, status: "Completed" },
    { id: 3, date: "2024-01-13", description: "Utility Bill Payment", account: "HDFC Bank", type: "Debit", amount: 5000, status: "Pending" }
  ]);

  const [reconciliationData, setReconciliationData] = useState([
    { id: 1, date: "2024-01-15", description: "Unmatched Deposit", amount: 10000, status: "Unmatched" },
    { id: 2, date: "2024-01-14", description: "Bank Charge", amount: 500, status: "Unmatched" }
  ]);
  
  const [accountData, setAccountData] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    balance: ""
  });

  const [transactionData, setTransactionData] = useState({
    account: "",
    type: "",
    amount: "",
    description: "",
    date: ""
  });

  const [reconciliationForm, setReconciliationForm] = useState({
    account: "",
    statementDate: "",
    statementBalance: ""
  });

  const [statementForm, setStatementForm] = useState({
    account: "",
    fromDate: "",
    toDate: ""
  });

  const handleAddAccount = () => {
    if (accountData.bankName && accountData.accountType && accountData.accountNumber) {
      const newAccount = {
        id: bankAccounts.length + 1,
        bankName: accountData.bankName,
        accountType: accountData.accountType,
        accountNumber: accountData.accountNumber,
        balance: parseFloat(accountData.balance) || 0
      };
      setBankAccounts([...bankAccounts, newAccount]);
      setAccountData({ bankName: "", accountType: "", accountNumber: "", balance: "" });
      setIsAccountDialogOpen(false);
      toast({
        title: "Account Added",
        description: `${accountData.bankName} account has been added successfully.`
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleRecordTransaction = () => {
    if (transactionData.account && transactionData.type && transactionData.amount) {
      const newTransaction = {
        id: transactions.length + 1,
        date: transactionData.date || new Date().toISOString().split('T')[0],
        description: transactionData.description || `${transactionData.type} transaction`,
        account: transactionData.account,
        type: transactionData.type === "credit" ? "Credit" : "Debit",
        amount: parseFloat(transactionData.amount),
        status: "Completed"
      };

      // Update account balance
      const accountIndex = bankAccounts.findIndex(acc => acc.bankName === transactionData.account);
      if (accountIndex !== -1) {
        const updatedAccounts = [...bankAccounts];
        if (transactionData.type === "credit") {
          updatedAccounts[accountIndex].balance += parseFloat(transactionData.amount);
        } else {
          updatedAccounts[accountIndex].balance -= parseFloat(transactionData.amount);
        }
        setBankAccounts(updatedAccounts);
      }

      setTransactions([newTransaction, ...transactions]);
      setTransactionData({ account: "", type: "", amount: "", description: "", date: "" });
      setIsTransactionDialogOpen(false);
      toast({
        title: "Transaction Recorded",
        description: `${newTransaction.type} of ₹${newTransaction.amount} has been recorded.`
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleReconciliation = () => {
    if (reconciliationForm.account && reconciliationForm.statementDate) {
      toast({
        title: "Reconciliation Started",
        description: `Bank reconciliation for ${reconciliationForm.account} has been initiated.`
      });
      setReconciliationForm({ account: "", statementDate: "", statementBalance: "" });
    } else {
      toast({
        title: "Error",
        description: "Please select account and statement date.",
        variant: "destructive"
      });
    }
  };

  const handleGenerateStatement = () => {
    if (statementForm.account && statementForm.fromDate && statementForm.toDate) {
      toast({
        title: "Statement Generated",
        description: `Bank statement for ${statementForm.account} from ${statementForm.fromDate} to ${statementForm.toDate} has been generated.`
      });
      setStatementForm({ account: "", fromDate: "", toDate: "" });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleQuickDeposit = () => {
    setTransactionData({...transactionData, type: "credit"});
    setIsTransactionDialogOpen(true);
  };

  const handleQuickWithdrawal = () => {
    setTransactionData({...transactionData, type: "debit"});
    setIsTransactionDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          Banking
        </h1>
        <div className="flex gap-2">
          <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Bank Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Bank Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Bank Name *</label>
                  <Input 
                    value={accountData.bankName}
                    onChange={(e) => setAccountData({...accountData, bankName: e.target.value})}
                    placeholder="Enter bank name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Account Type *</label>
                  <Select value={accountData.accountType} onValueChange={(value) => setAccountData({...accountData, accountType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Savings">Savings</SelectItem>
                      <SelectItem value="Current">Current</SelectItem>
                      <SelectItem value="Fixed">Fixed Deposit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Account Number *</label>
                  <Input 
                    value={accountData.accountNumber}
                    onChange={(e) => setAccountData({...accountData, accountNumber: e.target.value})}
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Initial Balance</label>
                  <Input 
                    type="number"
                    value={accountData.balance}
                    onChange={(e) => setAccountData({...accountData, balance: e.target.value})}
                    placeholder="Enter initial balance"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddAccount} className="flex-1">
                    Add Account
                  </Button>
                  <Button variant="outline" onClick={() => setIsAccountDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Record Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Account *</label>
                  <Select value={transactionData.account} onValueChange={(value) => setTransactionData({...transactionData, account: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {bankAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.bankName}>
                          {account.bankName} - {account.accountType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Transaction Type *</label>
                  <Select value={transactionData.type} onValueChange={(value) => setTransactionData({...transactionData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit (Deposit)</SelectItem>
                      <SelectItem value="debit">Debit (Withdrawal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Amount *</label>
                  <Input 
                    type="number"
                    value={transactionData.amount}
                    onChange={(e) => setTransactionData({...transactionData, amount: e.target.value})}
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input 
                    value={transactionData.description}
                    onChange={(e) => setTransactionData({...transactionData, description: e.target.value})}
                    placeholder="Enter description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    type="date"
                    value={transactionData.date}
                    onChange={(e) => setTransactionData({...transactionData, date: e.target.value})}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleRecordTransaction} className="flex-1">
                    Record Transaction
                  </Button>
                  <Button variant="outline" onClick={() => setIsTransactionDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900">₹{bankAccounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Inflow</p>
                <p className="text-2xl font-bold text-gray-900">₹{transactions.filter(t => t.type === 'Credit').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Outflow</p>
                <p className="text-2xl font-bold text-gray-900">₹{transactions.filter(t => t.type === 'Debit').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{transactions.filter(t => t.status === 'Pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Bank Accounts</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsAccountDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bankAccounts.map((account) => (
                  <Card key={account.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{account.bankName} - {account.accountType}</h3>
                          <p className="text-sm text-gray-600">Account: {account.accountNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">₹{account.balance.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Available Balance</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={handleQuickDeposit}
              >
                <ArrowUpRight className="h-4 w-4 mr-2 text-green-600" />
                Record Deposit
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={handleQuickWithdrawal}
              >
                <ArrowDownLeft className="h-4 w-4 mr-2 text-red-600" />
                Record Withdrawal
              </Button>
              
              <Dialog open={isReconciliationDialogOpen} onOpenChange={setIsReconciliationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start" variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Bank Reconciliation
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Bank Reconciliation</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">Select Bank Account</label>
                        <Select value={reconciliationForm.account} onValueChange={(value) => setReconciliationForm({...reconciliationForm, account: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {bankAccounts.map((account) => (
                              <SelectItem key={account.id} value={account.bankName}>
                                {account.bankName} - {account.accountType}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Statement Date</label>
                        <Input 
                          type="date" 
                          value={reconciliationForm.statementDate}
                          onChange={(e) => setReconciliationForm({...reconciliationForm, statementDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Statement Balance</label>
                        <Input 
                          type="number" 
                          placeholder="Enter balance"
                          value={reconciliationForm.statementBalance}
                          onChange={(e) => setReconciliationForm({...reconciliationForm, statementBalance: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Unmatched Transactions</h4>
                      <div className="border rounded p-4 bg-gray-50 max-h-64 overflow-y-auto">
                        {reconciliationData.length > 0 ? (
                          <div className="space-y-2">
                            {reconciliationData.map((item) => (
                              <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded border">
                                <div>
                                  <p className="font-medium">{item.description}</p>
                                  <p className="text-sm text-gray-600">{item.date}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">₹{item.amount.toLocaleString()}</p>
                                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{item.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">No unmatched transactions found.</p>
                        )}
                      </div>
                    </div>
                    <Button onClick={handleReconciliation} className="w-full">Start Reconciliation</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isStatementsDialogOpen} onOpenChange={setIsStatementsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start" variant="outline">
                    <Building2 className="h-4 w-4 mr-2" />
                    View Statements
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Bank Statements</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">Select Account</label>
                        <Select value={statementForm.account} onValueChange={(value) => setStatementForm({...statementForm, account: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {bankAccounts.map((account) => (
                              <SelectItem key={account.id} value={account.bankName}>
                                {account.bankName} - {account.accountType}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">From Date</label>
                        <Input 
                          type="date" 
                          value={statementForm.fromDate}
                          onChange={(e) => setStatementForm({...statementForm, fromDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">To Date</label>
                        <Input 
                          type="date" 
                          value={statementForm.toDate}
                          onChange={(e) => setStatementForm({...statementForm, toDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">Date</th>
                            <th className="text-left p-4">Description</th>
                            <th className="text-right p-4">Debit</th>
                            <th className="text-right p-4">Credit</th>
                            <th className="text-right p-4">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions
                            .filter(t => statementForm.account ? t.account === statementForm.account : true)
                            .map((transaction) => (
                            <tr key={transaction.id} className="border-b hover:bg-gray-50">
                              <td className="p-4">{transaction.date}</td>
                              <td className="p-4">{transaction.description}</td>
                              <td className="p-4 text-right">{transaction.type === 'Debit' ? `₹${transaction.amount.toLocaleString()}` : '-'}</td>
                              <td className="p-4 text-right">{transaction.type === 'Credit' ? `₹${transaction.amount.toLocaleString()}` : '-'}</td>
                              <td className="p-4 text-right">₹{transaction.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleGenerateStatement}>Generate Statement</Button>
                      <Button variant="outline">Export PDF</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search transactions..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Account</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-right p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{transaction.date}</td>
                    <td className="p-4">{transaction.description}</td>
                    <td className="p-4">{transaction.account}</td>
                    <td className="p-4">
                      <span className={`flex items-center ${transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'Credit' ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownLeft className="h-4 w-4 mr-1" />}
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`p-4 text-right font-semibold ${transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'Credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Banking;
