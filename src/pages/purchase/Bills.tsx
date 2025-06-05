
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Bills = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  
  const [bills, setBills] = useState([
    { id: 1, billNo: "BILL-001", vendor: "Tech Supplies Ltd", date: "2024-01-15", dueDate: "2024-02-15", amount: 45000, status: "Pending", category: "Equipment" },
    { id: 2, billNo: "BILL-002", vendor: "Office Equipment Co", date: "2024-01-16", dueDate: "2024-02-16", amount: 32000, status: "Paid", category: "Supplies" },
    { id: 3, billNo: "BILL-003", vendor: "Software Solutions", date: "2024-01-17", dueDate: "2024-02-17", amount: 25000, status: "Overdue", category: "Software" },
    { id: 4, billNo: "BILL-004", vendor: "Utilities Corp", date: "2024-01-18", dueDate: "2024-02-18", amount: 8500, status: "Pending", category: "Utilities" }
  ]);

  const [newBill, setNewBill] = useState({
    vendor: "",
    description: "",
    amount: "",
    dueDate: "",
    category: ""
  });

  const handleCreateBill = () => {
    if (newBill.vendor && newBill.description && newBill.amount && newBill.dueDate) {
      const bill = {
        id: bills.length + 1,
        billNo: `BILL-${String(bills.length + 1).padStart(3, '0')}`,
        vendor: newBill.vendor,
        date: new Date().toISOString().split('T')[0],
        dueDate: newBill.dueDate,
        amount: parseFloat(newBill.amount),
        status: "Pending",
        category: newBill.category
      };
      setBills([...bills, bill]);
      setNewBill({ vendor: "", description: "", amount: "", dueDate: "", category: "" });
      setIsCreateDialogOpen(false);
      toast({
        title: "Bill Created",
        description: `Bill ${bill.billNo} has been created successfully.`
      });
    }
  };

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setIsViewDialogOpen(true);
  };

  const handleDeleteBill = (billId) => {
    setBills(bills.filter(bill => bill.id !== billId));
    toast({
      title: "Bill Deleted",
      description: "Bill has been deleted successfully."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Receipt className="h-8 w-8" />
          Bills
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Bill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Bill</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Vendor *</label>
                <Select value={newBill.vendor} onValueChange={(value) => setNewBill({...newBill, vendor: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech Supplies Ltd">Tech Supplies Ltd</SelectItem>
                    <SelectItem value="Office Equipment Co">Office Equipment Co</SelectItem>
                    <SelectItem value="Software Solutions">Software Solutions</SelectItem>
                    <SelectItem value="Utilities Corp">Utilities Corp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description *</label>
                <Input 
                  value={newBill.description}
                  onChange={(e) => setNewBill({...newBill, description: e.target.value})}
                  placeholder="Enter bill description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Amount *</label>
                <Input 
                  type="number"
                  value={newBill.amount}
                  onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date *</label>
                <Input 
                  type="date"
                  value={newBill.dueDate}
                  onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={newBill.category} onValueChange={(value) => setNewBill({...newBill, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Supplies">Supplies</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateBill} className="flex-1">
                  Create Bill
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Bills List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search bills..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill No</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.billNo}</TableCell>
                  <TableCell>{bill.vendor}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell>₹{bill.amount.toLocaleString()}</TableCell>
                  <TableCell>{bill.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewBill(bill)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteBill(bill.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bill Details</DialogTitle>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Bill Number</label>
                  <p className="text-lg font-semibold">{selectedBill.billNo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedBill.status)}`}>
                    {selectedBill.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Vendor</label>
                  <p>{selectedBill.vendor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <p>{selectedBill.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Bill Date</label>
                  <p>{selectedBill.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Due Date</label>
                  <p>{selectedBill.dueDate}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-600">Amount</label>
                  <p className="text-2xl font-bold text-green-600">₹{selectedBill.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button>Mark as Paid</Button>
                <Button variant="outline">Edit Bill</Button>
                <Button variant="outline">Print Bill</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bills;
