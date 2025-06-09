import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Package, DollarSign, Eye, Edit, Trash2, Plus, X, Download, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VendorDetail = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Sample vendor data - in real app, fetch by vendorId
  const vendor = {
    id: vendorId,
    name: "Tech Supplies Ltd",
    contact: "John Smith",
    phone: "+91 9876543210",
    email: "john@techsupplies.com",
    category: "Technology",
    status: "Active",
    address: "123 Tech Park, Mumbai",
    gstNumber: "27AABCT1332L1ZZ",
    registrationDate: "2022-01-15",
    totalOrders: 25,
    totalValue: 850000
  };

  const [orderHistory, setOrderHistory] = useState([
    { id: 1, orderNo: "PO-001", date: "2024-01-15", amount: 45000, status: "Delivered", items: [{ product: "Product A", quantity: 10, rate: 4500, amount: 45000 }] },
    { id: 2, orderNo: "PO-005", date: "2024-01-10", amount: 32000, status: "Pending", items: [{ product: "Product B", quantity: 8, rate: 4000, amount: 32000 }] },
    { id: 3, orderNo: "PO-008", date: "2024-01-05", amount: 28000, status: "Approved", items: [{ product: "Product C", quantity: 5, rate: 5600, amount: 28000 }] },
    { id: 4, orderNo: "PO-012", date: "2023-12-28", amount: 15000, status: "Delivered", items: [{ product: "Product D", quantity: 3, rate: 5000, amount: 15000 }] }
  ]);

  const [transactionHistory, setTransactionHistory] = useState([
    { id: 1, date: "2024-01-16", type: "Payment", description: "Payment for PO-001", amount: -45000, balance: 0, reference: "PAY-001" },
    { id: 2, date: "2024-01-15", type: "Purchase", description: "Purchase Order PO-001", amount: 45000, balance: 45000, reference: "PO-001" },
    { id: 3, date: "2024-01-11", type: "Payment", description: "Payment for PO-005", amount: -32000, balance: 0, reference: "PAY-002" },
    { id: 4, date: "2024-01-10", type: "Purchase", description: "Purchase Order PO-005", amount: 32000, balance: 32000, reference: "PO-005" }
  ]);

  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    date: "",
    reference: "",
    notes: ""
  });

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionDialogOpen(true);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsOrderDialogOpen(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsEditDialogOpen(true);
    toast({
      title: "Edit Order",
      description: `Editing order ${order.orderNo}`
    });
  };

  const handleDeleteOrder = (orderId) => {
    setOrderHistory(orderHistory.filter(order => order.id !== orderId));
    toast({
      title: "Order Deleted",
      description: "Purchase order has been deleted successfully."
    });
  };

  const handleDownloadOrder = (order) => {
    toast({
      title: "Download Started",
      description: `Downloading PDF for order ${order.orderNo}`
    });
  };

  const handleSendOrder = (order) => {
    toast({
      title: "Order Sent",
      description: `Order ${order.orderNo} has been sent to vendor`
    });
  };

  const handlePrintOrder = (order) => {
    toast({
      title: "Print Started",
      description: `Printing order ${order.orderNo}`
    });
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactionHistory(transactionHistory.filter(t => t.id !== transactionId));
    toast({
      title: "Transaction Deleted",
      description: "Transaction has been deleted successfully."
    });
  };

  const handleEditTransaction = (transaction) => {
    toast({
      title: "Edit Transaction",
      description: `Editing transaction ${transaction.reference}`
    });
  };

  const handleDownloadTransaction = (transaction) => {
    toast({
      title: "Download Started",
      description: `Downloading receipt for ${transaction.reference}`
    });
  };

  const handleAddPayment = () => {
    if (paymentForm.amount && paymentForm.date) {
      const newPayment = {
        id: transactionHistory.length + 1,
        date: paymentForm.date,
        type: "Payment",
        description: paymentForm.notes || "Manual payment entry",
        amount: -parseFloat(paymentForm.amount),
        balance: 0,
        reference: paymentForm.reference || `PAY-${String(transactionHistory.length + 1).padStart(3, '0')}`
      };
      
      setTransactionHistory([newPayment, ...transactionHistory]);
      setPaymentForm({ amount: "", date: "", reference: "", notes: "" });
      setIsAddPaymentDialogOpen(false);
      toast({
        title: "Payment Added",
        description: "Payment has been added successfully."
      });
    }
  };

  const handleNewOrder = () => {
    navigate('/purchase/orders');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionTypeColor = (type) => {
    return type === 'Payment' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/purchase/vendors')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Vendors
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
        <span className={`px-3 py-1 rounded-full text-sm ${vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {vendor.status}
        </span>
      </div>

      {/* Vendor Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{vendor.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">₹{vendor.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Member Since</p>
                <p className="text-2xl font-bold">{new Date(vendor.registrationDate).getFullYear()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Category</p>
                <p className="text-lg font-semibold">{vendor.category}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Details */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="text-lg">{vendor.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-lg">{vendor.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Address</p>
                  <p className="text-lg">{vendor.address}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Contact Person</p>
                <p className="text-lg">{vendor.contact}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">GST Number</p>
                <p className="text-lg">{vendor.gstNumber}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Registration Date</p>
                <p className="text-lg">{vendor.registrationDate}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Order History and Transaction History */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Purchase Order History</CardTitle>
                <Button onClick={handleNewOrder}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order No</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderHistory.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNo}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)} title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditOrder(order)} title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadOrder(order)} title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteOrder(order.id)} title="Delete">
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
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Transaction History</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={() => setIsAddPaymentDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionHistory.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getTransactionTypeColor(transaction.type)}`}>
                          {transaction.type}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.reference}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                        {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>₹{transaction.balance.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewTransaction(transaction)} title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditTransaction(transaction)} title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadTransaction(transaction)} title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteTransaction(transaction.id)} title="Delete">
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
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog - Invoice Format */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Purchase Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">PURCHASE ORDER</h2>
                    <p className="text-lg font-semibold text-blue-600">{selectedOrder.orderNo}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vendor and Order Info */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Vendor Information</h3>
                  <div className="space-y-1">
                    <p className="font-medium">{vendor.name}</p>
                    <p>{vendor.address}</p>
                    <p>{vendor.phone}</p>
                    <p>{vendor.email}</p>
                    <p>GST: {vendor.gstNumber}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Order Date:</span> {selectedOrder.date}</p>
                    <p><span className="font-medium">Order No:</span> {selectedOrder.orderNo}</p>
                    <p><span className="font-medium">Status:</span> {selectedOrder.status}</p>
                  </div>
                </div>
              </div>
              
              {/* Items Table */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Item</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">₹{item.rate.toLocaleString()}</TableCell>
                        <TableCell className="text-right">₹{item.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Total */}
              <div className="flex justify-end border-t pt-4">
                <div className="w-64">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount:</span>
                    <span>₹{selectedOrder.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => handleDownloadOrder(selectedOrder)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={() => handleSendOrder(selectedOrder)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send to Vendor
                </Button>
                <Button onClick={() => {
                  setIsOrderDialogOpen(false);
                  handleEditOrder(selectedOrder);
                }}>
                  Edit Order
                </Button>
                <Button variant="outline" onClick={() => handlePrintOrder(selectedOrder)}>
                  Print Order
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Transaction Details Dialog - Invoice Format */}
      <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-6">
              {/* Transaction Header */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">TRANSACTION RECEIPT</h2>
                    <p className="text-lg font-semibold text-blue-600">{selectedTransaction.reference}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm ${getTransactionTypeColor(selectedTransaction.type)}`}>
                      {selectedTransaction.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Vendor Information</h3>
                  <div className="space-y-1">
                    <p className="font-medium">{vendor.name}</p>
                    <p>{vendor.address}</p>
                    <p>{vendor.phone}</p>
                    <p>{vendor.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Transaction Details</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Date:</span> {selectedTransaction.date}</p>
                    <p><span className="font-medium">Reference:</span> {selectedTransaction.reference}</p>
                    <p><span className="font-medium">Type:</span> {selectedTransaction.type}</p>
                  </div>
                </div>
              </div>

              {/* Amount Details */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Description:</span>
                    <span>{selectedTransaction.description}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Amount:</span>
                    <span className={selectedTransaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                      {selectedTransaction.amount < 0 ? '-' : '+'}₹{Math.abs(selectedTransaction.amount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Running Balance:</span>
                    <span>₹{selectedTransaction.balance.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => handleDownloadTransaction(selectedTransaction)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button variant="outline" onClick={() => handleEditTransaction(selectedTransaction)}>
                  Edit Transaction
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Amount *</label>
              <Input 
                type="number"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Date *</label>
              <Input 
                type="date"
                value={paymentForm.date}
                onChange={(e) => setPaymentForm({...paymentForm, date: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Reference</label>
              <Input 
                value={paymentForm.reference}
                onChange={(e) => setPaymentForm({...paymentForm, reference: e.target.value})}
                placeholder="Payment reference"
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
              <Button onClick={handleAddPayment} className="flex-1">
                Add Payment
              </Button>
              <Button variant="outline" onClick={() => setIsAddPaymentDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorDetail;
