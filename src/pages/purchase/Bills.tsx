
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Receipt, Plus, Search, Eye, Edit, Trash2, CreditCard, Download, Send, Filter, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Bills = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  
  const [bills, setBills] = useState([
    { 
      id: 1, 
      billNo: "BILL-001", 
      vendor: "Tech Supplies Ltd", 
      date: "2024-01-15", 
      dueDate: "2024-02-15", 
      amount: 45000, 
      paidAmount: 0,
      status: "Pending", 
      category: "Equipment",
      poReference: "PO-001",
      description: "Office equipment purchase",
      paymentTerms: "Net 30",
      notes: "Urgent delivery required"
    },
    { 
      id: 2, 
      billNo: "BILL-002", 
      vendor: "Office Equipment Co", 
      date: "2024-01-16", 
      dueDate: "2024-02-16", 
      amount: 32000, 
      paidAmount: 32000,
      status: "Paid", 
      category: "Supplies",
      poReference: "PO-002",
      description: "Office supplies",
      paymentTerms: "Net 15",
      notes: ""
    },
    { 
      id: 3, 
      billNo: "BILL-003", 
      vendor: "Software Solutions", 
      date: "2024-01-17", 
      dueDate: "2024-02-17", 
      amount: 25000, 
      paidAmount: 0,
      status: "Overdue", 
      category: "Software",
      poReference: "PO-003",
      description: "Software licenses",
      paymentTerms: "Due on Receipt",
      notes: "Annual subscription"
    }
  ]);

  const [newBill, setNewBill] = useState({
    vendor: "",
    billNo: "",
    poReference: "",
    description: "",
    amount: "",
    dueDate: "",
    category: "",
    paymentTerms: "Due on Receipt",
    notes: ""
  });

  const [editBill, setEditBill] = useState({
    vendor: "",
    billNo: "",
    poReference: "",
    description: "",
    amount: "",
    dueDate: "",
    category: "",
    paymentTerms: "",
    notes: ""
  });

  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: "Bank Transfer",
    reference: "",
    notes: ""
  });

  const handleCreateBill = () => {
    if (newBill.vendor && newBill.description && newBill.amount && newBill.dueDate) {
      const bill = {
        id: bills.length + 1,
        billNo: newBill.billNo || `BILL-${String(bills.length + 1).padStart(3, '0')}`,
        vendor: newBill.vendor,
        date: new Date().toISOString().split('T')[0],
        dueDate: newBill.dueDate,
        amount: parseFloat(newBill.amount),
        paidAmount: 0,
        status: "Pending",
        category: newBill.category,
        poReference: newBill.poReference,
        description: newBill.description,
        paymentTerms: newBill.paymentTerms,
        notes: newBill.notes
      };
      setBills([...bills, bill]);
      setNewBill({ 
        vendor: "", billNo: "", poReference: "", description: "", 
        amount: "", dueDate: "", category: "", paymentTerms: "Due on Receipt", notes: "" 
      });
      setIsCreateDialogOpen(false);
      toast({
        title: "Bill Created",
        description: `Bill ${bill.billNo} has been created successfully.`
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleEditBill = () => {
    if (editBill.vendor && editBill.description && editBill.amount && editBill.dueDate) {
      setBills(bills.map(bill => 
        bill.id === selectedBill.id 
          ? {
              ...bill,
              vendor: editBill.vendor,
              billNo: editBill.billNo,
              poReference: editBill.poReference,
              description: editBill.description,
              amount: parseFloat(editBill.amount),
              dueDate: editBill.dueDate,
              category: editBill.category,
              paymentTerms: editBill.paymentTerms,
              notes: editBill.notes
            }
          : bill
      ));
      setIsEditDialogOpen(false);
      toast({
        title: "Bill Updated",
        description: `Bill ${editBill.billNo} has been updated successfully.`
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleRecordPayment = () => {
    if (paymentForm.amount && parseFloat(paymentForm.amount) > 0) {
      const paymentAmount = parseFloat(paymentForm.amount);
      const remainingAmount = selectedBill.amount - selectedBill.paidAmount;
      
      if (paymentAmount > remainingAmount) {
        toast({
          title: "Error",
          description: "Payment amount cannot exceed the remaining balance.",
          variant: "destructive"
        });
        return;
      }

      setBills(bills.map(bill => 
        bill.id === selectedBill.id 
          ? {
              ...bill,
              paidAmount: bill.paidAmount + paymentAmount,
              status: (bill.paidAmount + paymentAmount) >= bill.amount ? "Paid" : "Partially Paid"
            }
          : bill
      ));
      
      setPaymentForm({
        amount: "",
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: "Bank Transfer",
        reference: "",
        notes: ""
      });
      setIsRecordPaymentOpen(false);
      toast({
        title: "Payment Recorded",
        description: `Payment of ₹${paymentAmount.toLocaleString()} has been recorded.`
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid payment amount.",
        variant: "destructive"
      });
    }
  };

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (bill) => {
    setSelectedBill(bill);
    setEditBill({
      vendor: bill.vendor,
      billNo: bill.billNo,
      poReference: bill.poReference,
      description: bill.description,
      amount: bill.amount.toString(),
      dueDate: bill.dueDate,
      category: bill.category,
      paymentTerms: bill.paymentTerms,
      notes: bill.notes
    });
    setIsEditDialogOpen(true);
  };

  const handleRecordPaymentClick = (bill) => {
    setSelectedBill(bill);
    setPaymentForm({
      amount: (bill.amount - bill.paidAmount).toString(),
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: "Bank Transfer",
      reference: "",
      notes: ""
    });
    setIsRecordPaymentOpen(true);
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
      case 'Partially Paid': return 'bg-blue-100 text-blue-800';
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
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Bill</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-red-500">Vendor *</label>
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
                    <label className="text-sm font-medium">Bill Number</label>
                    <Input 
                      value={newBill.billNo}
                      onChange={(e) => setNewBill({...newBill, billNo: e.target.value})}
                      placeholder="Auto-generated if empty"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">PO Reference</label>
                    <Input 
                      value={newBill.poReference}
                      onChange={(e) => setNewBill({...newBill, poReference: e.target.value})}
                      placeholder="Enter PO reference"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-red-500">Due Date *</label>
                    <Input 
                      type="date"
                      value={newBill.dueDate}
                      onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-red-500">Amount *</label>
                    <Input 
                      type="number"
                      value={newBill.amount}
                      onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                      placeholder="Enter amount"
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
                </div>

                <div>
                  <label className="text-sm font-medium text-red-500">Description *</label>
                  <Input 
                    value={newBill.description}
                    onChange={(e) => setNewBill({...newBill, description: e.target.value})}
                    placeholder="Enter bill description"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Payment Terms</label>
                  <Select value={newBill.paymentTerms} onValueChange={(value) => setNewBill({...newBill, paymentTerms: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea 
                    value={newBill.notes}
                    onChange={(e) => setNewBill({...newBill, notes: e.target.value})}
                    placeholder="Additional notes"
                  />
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
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
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
                <TableHead>Paid</TableHead>
                <TableHead>Balance</TableHead>
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
                  <TableCell>₹{bill.paidAmount.toLocaleString()}</TableCell>
                  <TableCell>₹{(bill.amount - bill.paidAmount).toLocaleString()}</TableCell>
                  <TableCell>{bill.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleViewBill(bill)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(bill)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {bill.status !== "Paid" && (
                        <Button variant="outline" size="sm" onClick={() => handleRecordPaymentClick(bill)}>
                          <CreditCard className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => handleDeleteBill(bill.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Bill Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Bill Details</DialogTitle>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Bill Number</label>
                    <p className="text-lg font-semibold">{selectedBill.billNo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Vendor</label>
                    <p>{selectedBill.vendor}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">PO Reference</label>
                    <p>{selectedBill.poReference || "N/A"}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Bill Date</label>
                    <p>{selectedBill.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Due Date</label>
                    <p>{selectedBill.dueDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Payment Terms</label>
                    <p>{selectedBill.paymentTerms}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedBill.status)}`}>
                      {selectedBill.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Category</label>
                    <p>{selectedBill.category}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Total Amount</label>
                    <p className="text-2xl font-bold text-green-600">₹{selectedBill.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Paid Amount</label>
                    <p className="text-xl font-semibold text-blue-600">₹{selectedBill.paidAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Balance</label>
                    <p className="text-xl font-semibold text-red-600">₹{(selectedBill.amount - selectedBill.paidAmount).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p>{selectedBill.description}</p>
              </div>

              {selectedBill.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Notes</label>
                  <p>{selectedBill.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                {selectedBill.status !== "Paid" && (
                  <Button onClick={() => {
                    setIsViewDialogOpen(false);
                    handleRecordPaymentClick(selectedBill);
                  }}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Record Payment
                  </Button>
                )}
                <Button variant="outline" onClick={() => {
                  setIsViewDialogOpen(false);
                  handleEditClick(selectedBill);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Bill
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Bill Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Bill</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-red-500">Vendor *</label>
                <Select value={editBill.vendor} onValueChange={(value) => setEditBill({...editBill, vendor: value})}>
                  <SelectTrigger>
                    <SelectValue />
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
                <label className="text-sm font-medium">Bill Number</label>
                <Input 
                  value={editBill.billNo}
                  onChange={(e) => setEditBill({...editBill, billNo: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">PO Reference</label>
                <Input 
                  value={editBill.poReference}
                  onChange={(e) => setEditBill({...editBill, poReference: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-red-500">Due Date *</label>
                <Input 
                  type="date"
                  value={editBill.dueDate}
                  onChange={(e) => setEditBill({...editBill, dueDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-red-500">Amount *</label>
                <Input 
                  type="number"
                  value={editBill.amount}
                  onChange={(e) => setEditBill({...editBill, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={editBill.category} onValueChange={(value) => setEditBill({...editBill, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
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
            </div>

            <div>
              <label className="text-sm font-medium text-red-500">Description *</label>
              <Input 
                value={editBill.description}
                onChange={(e) => setEditBill({...editBill, description: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Payment Terms</label>
              <Select value={editBill.paymentTerms} onValueChange={(value) => setEditBill({...editBill, paymentTerms: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea 
                value={editBill.notes}
                onChange={(e) => setEditBill({...editBill, notes: e.target.value})}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleEditBill} className="flex-1">
                Update Bill
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Record Payment Dialog */}
      <Dialog open={isRecordPaymentOpen} onOpenChange={setIsRecordPaymentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Bill Number:</span>
                    <p className="font-semibold">{selectedBill.billNo}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Vendor:</span>
                    <p className="font-semibold">{selectedBill.vendor}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Amount:</span>
                    <p className="font-semibold">₹{selectedBill.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Balance Due:</span>
                    <p className="font-semibold text-red-600">₹{(selectedBill.amount - selectedBill.paidAmount).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-red-500">Payment Amount *</label>
                  <Input 
                    type="number"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                    placeholder="Enter payment amount"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-red-500">Payment Date *</label>
                  <Input 
                    type="date"
                    value={paymentForm.paymentDate}
                    onChange={(e) => setPaymentForm({...paymentForm, paymentDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Payment Method</label>
                <Select value={paymentForm.paymentMethod} onValueChange={(value) => setPaymentForm({...paymentForm, paymentMethod: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Reference</label>
                <Input 
                  value={paymentForm.reference}
                  onChange={(e) => setPaymentForm({...paymentForm, reference: e.target.value})}
                  placeholder="Transaction reference"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea 
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm({...paymentForm, notes: e.target.value})}
                  placeholder="Payment notes"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleRecordPayment} className="flex-1">
                  Record Payment
                </Button>
                <Button variant="outline" onClick={() => setIsRecordPaymentOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bills;
