
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Plus, Search, Calendar, FileText, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JournalEntries = () => {
  const { toast } = useToast();
  const [isNewEntryDialogOpen, setIsNewEntryDialogOpen] = useState(false);
  const [isViewAllDialogOpen, setIsViewAllDialogOpen] = useState(false);
  const [isAdjustingEntriesOpen, setIsAdjustingEntriesOpen] = useState(false);
  const [isClosingEntriesOpen, setIsClosingEntriesOpen] = useState(false);
  const [isRecurringEntriesOpen, setIsRecurringEntriesOpen] = useState(false);
  const [isCreateAdjustingOpen, setIsCreateAdjustingOpen] = useState(false);
  const [isCreateClosingOpen, setIsCreateClosingOpen] = useState(false);
  const [isCreateRecurringOpen, setIsCreateRecurringOpen] = useState(false);
  const [isGenerateStatementOpen, setIsGenerateStatementOpen] = useState(false);
  
  const [journalEntries, setJournalEntries] = useState([
    { id: 1, entryNo: "JE001", date: "2024-01-15", description: "Office Rent Expense", reference: "INV-001", amount: 25000, status: "Posted" },
    { id: 2, entryNo: "JE002", date: "2024-01-16", description: "Sales Revenue", reference: "INV-002", amount: 45000, status: "Posted" },
    { id: 3, entryNo: "JE003", date: "2024-01-17", description: "Equipment Purchase", reference: "PO-001", amount: 15000, status: "Draft" }
  ]);

  const [adjustingEntries, setAdjustingEntries] = useState([
    { id: 1, entryNo: "AJE001", date: "2024-01-31", description: "Depreciation Adjustment", amount: 5000, status: "Posted" },
    { id: 2, entryNo: "AJE002", date: "2024-01-31", description: "Accrued Interest", amount: 2500, status: "Draft" }
  ]);

  const [closingEntries, setClosingEntries] = useState([
    { id: 1, entryNo: "CJE001", date: "2024-12-31", description: "Revenue Closing Entry", amount: 125000, status: "Posted" },
    { id: 2, entryNo: "CJE002", date: "2024-12-31", description: "Expense Closing Entry", amount: 85000, status: "Posted" }
  ]);

  const [recurringEntries, setRecurringEntries] = useState([
    { id: 1, name: "Monthly Rent", frequency: "Monthly", amount: 25000, nextDate: "2024-02-01", status: "Active" },
    { id: 2, name: "Insurance Premium", frequency: "Quarterly", amount: 15000, nextDate: "2024-04-01", status: "Active" }
  ]);
  
  const [newEntry, setNewEntry] = useState({
    date: "",
    description: "",
    reference: "",
    account: "",
    debit: "",
    credit: ""
  });

  const [adjustingEntry, setAdjustingEntry] = useState({
    date: "",
    description: "",
    account: "",
    debit: "",
    credit: "",
    reason: ""
  });

  const [closingEntry, setClosingEntry] = useState({
    date: "",
    description: "",
    account: "",
    amount: "",
    type: ""
  });

  const [recurringEntry, setRecurringEntry] = useState({
    name: "",
    description: "",
    frequency: "",
    amount: "",
    startDate: "",
    account: ""
  });

  const [statementForm, setStatementForm] = useState({
    fromDate: "",
    toDate: "",
    entryType: ""
  });

  const handleCreateEntry = () => {
    if (newEntry.date && newEntry.description && newEntry.account) {
      const newJournalEntry = {
        id: journalEntries.length + 1,
        entryNo: `JE${String(journalEntries.length + 1).padStart(3, '0')}`,
        date: newEntry.date,
        description: newEntry.description,
        reference: newEntry.reference,
        amount: parseFloat(newEntry.debit || newEntry.credit || "0"),
        status: "Draft"
      };
      setJournalEntries([...journalEntries, newJournalEntry]);
      setNewEntry({ date: "", description: "", reference: "", account: "", debit: "", credit: "" });
      setIsNewEntryDialogOpen(false);
      toast({
        title: "Journal Entry Created",
        description: `Entry ${newJournalEntry.entryNo} has been created successfully.`
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleCreateAdjustingEntry = () => {
    if (adjustingEntry.date && adjustingEntry.description && adjustingEntry.account) {
      const newAdjusting = {
        id: adjustingEntries.length + 1,
        entryNo: `AJE${String(adjustingEntries.length + 1).padStart(3, '0')}`,
        date: adjustingEntry.date,
        description: adjustingEntry.description,
        amount: parseFloat(adjustingEntry.debit || adjustingEntry.credit || "0"),
        status: "Draft"
      };
      setAdjustingEntries([...adjustingEntries, newAdjusting]);
      setAdjustingEntry({ date: "", description: "", account: "", debit: "", credit: "", reason: "" });
      setIsCreateAdjustingOpen(false);
      toast({
        title: "Adjusting Entry Created",
        description: `Adjusting entry ${newAdjusting.entryNo} has been created.`
      });
    }
  };

  const handleCreateClosingEntry = () => {
    if (closingEntry.date && closingEntry.description && closingEntry.account) {
      const newClosing = {
        id: closingEntries.length + 1,
        entryNo: `CJE${String(closingEntries.length + 1).padStart(3, '0')}`,
        date: closingEntry.date,
        description: closingEntry.description,
        amount: parseFloat(closingEntry.amount || "0"),
        status: "Draft"
      };
      setClosingEntries([...closingEntries, newClosing]);
      setClosingEntry({ date: "", description: "", account: "", amount: "", type: "" });
      setIsCreateClosingOpen(false);
      toast({
        title: "Closing Entry Created",
        description: `Closing entry ${newClosing.entryNo} has been created.`
      });
    }
  };

  const handleCreateRecurringEntry = () => {
    if (recurringEntry.name && recurringEntry.frequency && recurringEntry.amount) {
      const newRecurring = {
        id: recurringEntries.length + 1,
        name: recurringEntry.name,
        frequency: recurringEntry.frequency,
        amount: parseFloat(recurringEntry.amount),
        nextDate: recurringEntry.startDate,
        status: "Active"
      };
      setRecurringEntries([...recurringEntries, newRecurring]);
      setRecurringEntry({ name: "", description: "", frequency: "", amount: "", startDate: "", account: "" });
      setIsCreateRecurringOpen(false);
      toast({
        title: "Recurring Entry Created",
        description: `Recurring entry "${newRecurring.name}" has been set up.`
      });
    }
  };

  const handleGenerateStatement = () => {
    if (statementForm.fromDate && statementForm.toDate) {
      toast({
        title: "Statement Generated",
        description: `Journal entries statement from ${statementForm.fromDate} to ${statementForm.toDate} has been generated.`
      });
      setStatementForm({ fromDate: "", toDate: "", entryType: "" });
      setIsGenerateStatementOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Please select date range.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-purple-600" />
          Journal Entries
        </h1>
        <div className="flex gap-2">
          <Dialog open={isGenerateStatementOpen} onOpenChange={setIsGenerateStatementOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generate Statement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Journal Entries Statement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">From Date *</label>
                  <Input 
                    type="date"
                    value={statementForm.fromDate}
                    onChange={(e) => setStatementForm({...statementForm, fromDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">To Date *</label>
                  <Input 
                    type="date"
                    value={statementForm.toDate}
                    onChange={(e) => setStatementForm({...statementForm, toDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Entry Type</label>
                  <Select value={statementForm.entryType} onValueChange={(value) => setStatementForm({...statementForm, entryType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All entry types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Entries</SelectItem>
                      <SelectItem value="regular">Regular Entries</SelectItem>
                      <SelectItem value="adjusting">Adjusting Entries</SelectItem>
                      <SelectItem value="closing">Closing Entries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleGenerateStatement} className="flex-1">
                    Generate Statement
                  </Button>
                  <Button variant="outline" onClick={() => setIsGenerateStatementOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isNewEntryDialogOpen} onOpenChange={setIsNewEntryDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                New Journal Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Journal Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Date *</label>
                  <Input 
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description *</label>
                  <Input 
                    value={newEntry.description}
                    onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                    placeholder="Enter description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Reference</label>
                  <Input 
                    value={newEntry.reference}
                    onChange={(e) => setNewEntry({...newEntry, reference: e.target.value})}
                    placeholder="Enter reference"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Account *</label>
                  <Select value={newEntry.account} onValueChange={(value) => setNewEntry({...newEntry, account: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="accounts-receivable">Accounts Receivable</SelectItem>
                      <SelectItem value="office-expense">Office Expense</SelectItem>
                      <SelectItem value="sales-revenue">Sales Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Debit Amount</label>
                    <Input 
                      type="number"
                      value={newEntry.debit}
                      onChange={(e) => setNewEntry({...newEntry, debit: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Credit Amount</label>
                    <Input 
                      type="number"
                      value={newEntry.credit}
                      onChange={(e) => setNewEntry({...newEntry, credit: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateEntry} className="flex-1">
                    Create Entry
                  </Button>
                  <Button variant="outline" onClick={() => setIsNewEntryDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-gray-900">{journalEntries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{journalEntries.filter(entry => entry.date.startsWith('2024-01')).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Edit className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Draft Entries</p>
                <p className="text-2xl font-bold text-gray-900">{journalEntries.filter(entry => entry.status === 'Draft').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Journal Entry Management</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search entries..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            <Dialog open={isViewAllDialogOpen} onOpenChange={setIsViewAllDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">View All Journal Entries</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>All Journal Entries</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Entry No.</th>
                          <th className="text-left p-4">Date</th>
                          <th className="text-left p-4">Description</th>
                          <th className="text-right p-4">Amount</th>
                          <th className="text-left p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {journalEntries.map((entry) => (
                          <tr key={entry.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{entry.entryNo}</td>
                            <td className="p-4">{entry.date}</td>
                            <td className="p-4">{entry.description}</td>
                            <td className="p-4 text-right">₹{entry.amount}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${entry.status === 'Posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {entry.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAdjustingEntriesOpen} onOpenChange={setIsAdjustingEntriesOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Adjusting Entries</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Adjusting Entries</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Manage period-end adjusting entries here.</p>
                    <Dialog open={isCreateAdjustingOpen} onOpenChange={setIsCreateAdjustingOpen}>
                      <DialogTrigger asChild>
                        <Button>Create Adjusting Entry</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Adjusting Entry</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Date *</label>
                            <Input 
                              type="date"
                              value={adjustingEntry.date}
                              onChange={(e) => setAdjustingEntry({...adjustingEntry, date: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Description *</label>
                            <Input 
                              value={adjustingEntry.description}
                              onChange={(e) => setAdjustingEntry({...adjustingEntry, description: e.target.value})}
                              placeholder="Enter adjustment description"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Account *</label>
                            <Select value={adjustingEntry.account} onValueChange={(value) => setAdjustingEntry({...adjustingEntry, account: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="depreciation">Depreciation Expense</SelectItem>
                                <SelectItem value="accrued-interest">Accrued Interest</SelectItem>
                                <SelectItem value="prepaid-expense">Prepaid Expense</SelectItem>
                                <SelectItem value="unearned-revenue">Unearned Revenue</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Debit Amount</label>
                              <Input 
                                type="number"
                                value={adjustingEntry.debit}
                                onChange={(e) => setAdjustingEntry({...adjustingEntry, debit: e.target.value})}
                                placeholder="0.00"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Credit Amount</label>
                              <Input 
                                type="number"
                                value={adjustingEntry.credit}
                                onChange={(e) => setAdjustingEntry({...adjustingEntry, credit: e.target.value})}
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Reason</label>
                            <Input 
                              value={adjustingEntry.reason}
                              onChange={(e) => setAdjustingEntry({...adjustingEntry, reason: e.target.value})}
                              placeholder="Reason for adjustment"
                            />
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button onClick={handleCreateAdjustingEntry} className="flex-1">
                              Create Entry
                            </Button>
                            <Button variant="outline" onClick={() => setIsCreateAdjustingOpen(false)} className="flex-1">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Entry No.</th>
                          <th className="text-left p-4">Date</th>
                          <th className="text-left p-4">Description</th>
                          <th className="text-right p-4">Amount</th>
                          <th className="text-left p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adjustingEntries.map((entry) => (
                          <tr key={entry.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{entry.entryNo}</td>
                            <td className="p-4">{entry.date}</td>
                            <td className="p-4">{entry.description}</td>
                            <td className="p-4 text-right">₹{entry.amount}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${entry.status === 'Posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {entry.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isClosingEntriesOpen} onOpenChange={setIsClosingEntriesOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Closing Entries</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Closing Entries</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Manage year-end closing entries here.</p>
                    <Dialog open={isCreateClosingOpen} onOpenChange={setIsCreateClosingOpen}>
                      <DialogTrigger asChild>
                        <Button>Create Closing Entry</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Closing Entry</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Date *</label>
                            <Input 
                              type="date"
                              value={closingEntry.date}
                              onChange={(e) => setClosingEntry({...closingEntry, date: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Description *</label>
                            <Input 
                              value={closingEntry.description}
                              onChange={(e) => setClosingEntry({...closingEntry, description: e.target.value})}
                              placeholder="Enter closing entry description"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Account *</label>
                            <Select value={closingEntry.account} onValueChange={(value) => setClosingEntry({...closingEntry, account: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="revenue">Revenue Accounts</SelectItem>
                                <SelectItem value="expenses">Expense Accounts</SelectItem>
                                <SelectItem value="income-summary">Income Summary</SelectItem>
                                <SelectItem value="retained-earnings">Retained Earnings</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Amount *</label>
                            <Input 
                              type="number"
                              value={closingEntry.amount}
                              onChange={(e) => setClosingEntry({...closingEntry, amount: e.target.value})}
                              placeholder="Enter amount"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Entry Type</label>
                            <Select value={closingEntry.type} onValueChange={(value) => setClosingEntry({...closingEntry, type: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="revenue-closing">Revenue Closing</SelectItem>
                                <SelectItem value="expense-closing">Expense Closing</SelectItem>
                                <SelectItem value="income-summary-closing">Income Summary Closing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button onClick={handleCreateClosingEntry} className="flex-1">
                              Create Entry
                            </Button>
                            <Button variant="outline" onClick={() => setIsCreateClosingOpen(false)} className="flex-1">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Entry No.</th>
                          <th className="text-left p-4">Date</th>
                          <th className="text-left p-4">Description</th>
                          <th className="text-right p-4">Amount</th>
                          <th className="text-left p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {closingEntries.map((entry) => (
                          <tr key={entry.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{entry.entryNo}</td>
                            <td className="p-4">{entry.date}</td>
                            <td className="p-4">{entry.description}</td>
                            <td className="p-4 text-right">₹{entry.amount}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${entry.status === 'Posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {entry.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isRecurringEntriesOpen} onOpenChange={setIsRecurringEntriesOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Recurring Entries</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Recurring Entries</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Set up and manage recurring journal entries.</p>
                    <Dialog open={isCreateRecurringOpen} onOpenChange={setIsCreateRecurringOpen}>
                      <DialogTrigger asChild>
                        <Button>Create Recurring Entry</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Recurring Entry</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Entry Name *</label>
                            <Input 
                              value={recurringEntry.name}
                              onChange={(e) => setRecurringEntry({...recurringEntry, name: e.target.value})}
                              placeholder="Enter recurring entry name"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <Input 
                              value={recurringEntry.description}
                              onChange={(e) => setRecurringEntry({...recurringEntry, description: e.target.value})}
                              placeholder="Enter description"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Frequency *</label>
                            <Select value={recurringEntry.frequency} onValueChange={(value) => setRecurringEntry({...recurringEntry, frequency: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                                <SelectItem value="Quarterly">Quarterly</SelectItem>
                                <SelectItem value="Semi-annually">Semi-annually</SelectItem>
                                <SelectItem value="Annually">Annually</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Amount *</label>
                            <Input 
                              type="number"
                              value={recurringEntry.amount}
                              onChange={(e) => setRecurringEntry({...recurringEntry, amount: e.target.value})}
                              placeholder="Enter amount"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Start Date *</label>
                            <Input 
                              type="date"
                              value={recurringEntry.startDate}
                              onChange={(e) => setRecurringEntry({...recurringEntry, startDate: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Account</label>
                            <Select value={recurringEntry.account} onValueChange={(value) => setRecurringEntry({...recurringEntry, account: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="rent-expense">Rent Expense</SelectItem>
                                <SelectItem value="insurance">Insurance Expense</SelectItem>
                                <SelectItem value="depreciation">Depreciation Expense</SelectItem>
                                <SelectItem value="utilities">Utilities Expense</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button onClick={handleCreateRecurringEntry} className="flex-1">
                              Create Entry
                            </Button>
                            <Button variant="outline" onClick={() => setIsCreateRecurringOpen(false)} className="flex-1">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Frequency</th>
                          <th className="text-right p-4">Amount</th>
                          <th className="text-left p-4">Next Date</th>
                          <th className="text-left p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recurringEntries.map((entry) => (
                          <tr key={entry.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{entry.name}</td>
                            <td className="p-4">{entry.frequency}</td>
                            <td className="p-4 text-right">₹{entry.amount}</td>
                            <td className="p-4">{entry.nextDate}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${entry.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {entry.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Entry No.</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Reference</th>
                  <th className="text-right p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {journalEntries.map((entry) => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{entry.entryNo}</td>
                    <td className="p-4">{entry.date}</td>
                    <td className="p-4">{entry.description}</td>
                    <td className="p-4">{entry.reference}</td>
                    <td className="p-4 text-right">₹{entry.amount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${entry.status === 'Posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">View</Button>
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

export default JournalEntries;
