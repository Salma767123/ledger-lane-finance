
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Package, DollarSign, Users, Eye, Edit, Trash2, Plus, Download, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CustomerDetail = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);
  const [isViewTransactionDialogOpen, setIsViewTransactionDialogOpen] = useState(false);
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  // Sample customer data - in real app, fetch by customerId
  const customer = {
    id: customerId,
    name: "ABC Corporation",
    contact: "Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajesh@abccorp.com",
    type: "Corporate",
    status: "Active",
    address: "456 Business District, Mumbai",
    gstNumber: "27AABCA1332L1ZZ",
    registrationDate: "2021-03-10",
    totalOrders: 18,
    totalValue: 650000
  };

  const [orderHistory, setOrderHistory] = useState([
    { id: 1, orderNo: "SO-001", date: "2024-01-15", amount: 85000, status: "Delivered", items: 3 },
    { id: 2, orderNo: "SO-003", date: "2024-01-12", amount: 65000, status: "Shipped", items: 2 },
    { id: 3, orderNo: "SO-007", date: "2024-01-08", amount: 45000, status: "Processing", items: 1 },
    { id: 4, orderNo: "SO-012", date: "2023-12-25", amount: 25000, status: "Delivered", items: 2 }
  ]);

  const [transactionHistory, setTransactionHistory] = useState([
    { id: 1, date: "2024-01-16", type: "Payment", description: "Payment received for SO-001", amount: 85000, balance: 0 },
    { id: 2, date: "2024-01-15", type: "Sale", description: "Sales Order SO-001", amount: -85000, balance: -85000 },
    { id: 3, date: "2024-01-13", type: "Payment", description: "Payment received for SO-003", amount: 65000, balance: 0 },
    { id: 4, date: "2024-01-12", type: "Sale", description: "Sales Order SO-003", amount: -65000, balance: -65000 }
  ]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewOrderDialogOpen(true);
  };

  const handleEditOrder = (orderId) => {
    toast({
      title: "Edit Order",
      description: `Redirecting to edit order ${orderId}...`
    });
    // In real app, navigate to edit page
  };

  const handleDeleteOrder = (orderId) => {
    setOrderHistory(orderHistory.filter(order => order.id !== orderId));
    toast({
      title: "Order Deleted",
      description: "Order has been deleted successfully."
    });
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsViewTransactionDialogOpen(true);
  };

  const handleEditTransaction = (transactionId) => {
    toast({
      title: "Edit Transaction",
      description: `Editing transaction ${transactionId}...`
    });
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactionHistory(transactionHistory.filter(transaction => transaction.id !== transactionId));
    toast({
      title: "Transaction Deleted",
      description: "Transaction has been deleted successfully."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    return type === 'Corporate' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/sales/customers')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Customers
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
        <span className={`px-3 py-1 rounded-full text-sm ${getTypeColor(customer.type)}`}>
          {customer.type}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {customer.status}
        </span>
      </div>

      {/* Customer Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{customer.totalOrders}</p>
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
                <p className="text-2xl font-bold">₹{customer.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Customer Since</p>
                <p className="text-2xl font-bold">{new Date(customer.registrationDate).getFullYear()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Type</p>
                <p className="text-lg font-semibold">{customer.type}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="text-lg">{customer.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-lg">{customer.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Address</p>
                  <p className="text-lg">{customer.address}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Contact Person</p>
                <p className="text-lg">{customer.contact}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">GST Number</p>
                <p className="text-lg">{customer.gstNumber}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Registration Date</p>
                <p className="text-lg">{customer.registrationDate}</p>
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
                <CardTitle>Sales Order History</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Order
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order No</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
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
                      <TableCell>{order.items}</TableCell>
                      <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)} title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditOrder(order.id)} title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="Send">
                            <Send className="h-4 w-4" />
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
                  <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Payment</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Amount</label>
                          <Input type="number" placeholder="Enter amount" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Date</label>
                          <Input type="date" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Reference</label>
                          <Input placeholder="Payment reference" />
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1">Add Payment</Button>
                          <Button variant="outline" className="flex-1" onClick={() => setIsAddPaymentDialogOpen(false)}>Cancel</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">Export</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
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
                        <span className={`px-2 py-1 rounded-full text-xs ${transaction.type === 'Payment' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {transaction.type}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                        {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>₹{transaction.balance.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" onClick={() => handleViewTransaction(transaction)} title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditTransaction(transaction.id)} title="Edit">
                            <Edit className="h-4 w-4" />
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

      {/* View Order Dialog */}
      <Dialog open={isViewOrderDialogOpen} onOpenChange={setIsViewOrderDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">SALES ORDER</h2>
                    <p className="text-lg font-semibold text-blue-600">{selectedOrder.orderNo}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer and Order Info */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bill To</h3>
                  <div className="space-y-1">
                    <p className="font-medium">{customer.name}</p>
                    <p>{customer.address}</p>
                    <p>Phone: {customer.phone}</p>
                    <p>Email: {customer.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Order Date:</span> {selectedOrder.date}</p>
                    <p><span className="font-medium">Order No:</span> {selectedOrder.orderNo}</p>
                    <p><span className="font-medium">Status:</span> {selectedOrder.status}</p>
                    <p><span className="font-medium">Items:</span> {selectedOrder.items}</p>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="flex justify-end border-t pt-4">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount:</span>
                    <span>₹{selectedOrder.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Send to Customer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Transaction Dialog */}
      <Dialog open={isViewTransactionDialogOpen} onOpenChange={setIsViewTransactionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Date</label>
                  <p className="text-lg font-semibold">{selectedTransaction.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Type</label>
                  <span className={`px-2 py-1 rounded-full text-xs ${selectedTransaction.type === 'Payment' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {selectedTransaction.type}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Description</label>
                  <p>{selectedTransaction.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Amount</label>
                  <p className={`text-lg font-semibold ${selectedTransaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {selectedTransaction.amount < 0 ? '-' : '+'}₹{Math.abs(selectedTransaction.amount).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Running Balance</label>
                  <p className="text-lg font-semibold">₹{selectedTransaction.balance.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerDetail;
