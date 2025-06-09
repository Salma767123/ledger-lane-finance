
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clipboard, Plus, Search, Eye, Edit, Trash2, Download, Send, X, RefreshCw, Check, Clock, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SalesOrders = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [salesOrders, setSalesOrders] = useState([
    { id: 1, orderNo: "SO-001", customer: "ABC Corporation", date: "2024-01-15", dueDate: "2024-01-30", amount: 85000, tax: 15300, total: 100300, status: "Confirmed", items: [{ product: "Product A", quantity: 10, rate: 5000, discount: 0, amount: 50000 }, { product: "Product B", quantity: 7, rate: 5000, discount: 0, amount: 35000 }] },
    { id: 2, orderNo: "SO-002", customer: "XYZ Industries", date: "2024-01-16", dueDate: "2024-01-31", amount: 65000, tax: 11700, total: 76700, status: "Processing", items: [{ product: "Product C", quantity: 13, rate: 5000, discount: 0, amount: 65000 }] },
    { id: 3, orderNo: "SO-003", customer: "John Smith", date: "2024-01-17", dueDate: "2024-02-01", amount: 25000, tax: 4500, total: 29500, status: "Shipped", items: [{ product: "Product D", quantity: 5, rate: 5000, discount: 0, amount: 25000 }] },
    { id: 4, orderNo: "SO-004", customer: "Tech Solutions Pvt Ltd", date: "2024-01-18", dueDate: "2024-02-02", amount: 45000, tax: 8100, total: 53100, status: "Draft", items: [{ product: "Product E", quantity: 9, rate: 5000, discount: 0, amount: 45000 }] }
  ]);

  const [orderForm, setOrderForm] = useState({
    customer: "",
    orderNo: "",
    reference: "",
    date: "",
    expectedShipment: "",
    paymentTerms: "Due on Receipt",
    deliveryMethod: "",
    salesperson: "",
    items: [{ product: "", quantity: "", rate: "", discount: 0, amount: 0 }]
  });

  const calculateItemAmount = (quantity, rate, discount = 0) => {
    const baseAmount = parseFloat(quantity || "0") * parseFloat(rate || "0");
    const discountAmount = baseAmount * (parseFloat(discount.toString()) / 100);
    return baseAmount - discountAmount;
  };

  const calculateTotals = () => {
    const subtotal = orderForm.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const shippingCharges = 0; // Can be dynamic
    const adjustments = 0; // Can be dynamic
    const total = subtotal + shippingCharges + adjustments;
    return { subtotal, shippingCharges, adjustments, total };
  };

  const addItem = () => {
    setOrderForm({
      ...orderForm,
      items: [...orderForm.items, { product: "", quantity: "", rate: "", discount: 0, amount: 0 }]
    });
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...orderForm.items];
    updatedItems[index][field] = value;
    
    if (field === 'quantity' || field === 'rate' || field === 'discount') {
      updatedItems[index].amount = calculateItemAmount(
        updatedItems[index].quantity,
        updatedItems[index].rate,
        updatedItems[index].discount
      );
    }
    
    setOrderForm({ ...orderForm, items: updatedItems });
  };

  const removeItem = (index) => {
    if (orderForm.items.length > 1) {
      const updatedItems = orderForm.items.filter((_, i) => i !== index);
      setOrderForm({ ...orderForm, items: updatedItems });
    }
  };

  const resetForm = () => {
    setOrderForm({
      customer: "",
      orderNo: "",
      reference: "",
      date: "",
      expectedShipment: "",
      paymentTerms: "Due on Receipt",
      deliveryMethod: "",
      salesperson: "",
      items: [{ product: "", quantity: "", rate: "", discount: 0, amount: 0 }]
    });
  };

  const handleCreateOrder = () => {
    if (orderForm.customer && orderForm.date && orderForm.items.some(item => item.product)) {
      const { subtotal, total } = calculateTotals();
      const tax = subtotal * 0.18; // 18% tax
      
      const processedItems = orderForm.items
        .filter(item => item.product)
        .map(item => ({
          product: item.product,
          quantity: parseFloat(String(item.quantity || "0")),
          rate: parseFloat(String(item.rate || "0")),
          discount: parseFloat(String(item.discount || "0")),
          amount: calculateItemAmount(item.quantity, item.rate, item.discount)
        }));
      
      const newOrder = {
        id: salesOrders.length + 1,
        orderNo: orderForm.orderNo || `SO-${(salesOrders.length + 1).toString().padStart(3, '0')}`,
        customer: orderForm.customer,
        date: orderForm.date,
        dueDate: orderForm.expectedShipment || orderForm.date,
        amount: subtotal,
        tax: tax,
        total: subtotal + tax,
        status: "Draft",
        items: processedItems
      };
      
      setSalesOrders([...salesOrders, newOrder]);
      resetForm();
      setIsCreateDialogOpen(false);
      toast({
        title: "Sales Order Created",
        description: `Order ${newOrder.orderNo} has been created successfully.`
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setOrderForm({
      customer: order.customer,
      orderNo: order.orderNo,
      reference: "",
      date: order.date,
      expectedShipment: order.dueDate,
      paymentTerms: "Due on Receipt",
      deliveryMethod: "",
      salesperson: "",
      items: order.items?.map(item => ({
        product: item.product,
        quantity: item.quantity.toString(),
        rate: item.rate.toString(),
        discount: item.discount || 0,
        amount: item.amount
      })) || [{ product: "", quantity: "", rate: "", discount: 0, amount: 0 }]
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateOrder = () => {
    if (selectedOrder && orderForm.customer && orderForm.date) {
      const { subtotal, total } = calculateTotals();
      const tax = subtotal * 0.18;
      
      const processedItems = orderForm.items
        .filter(item => item.product)
        .map(item => ({
          product: item.product,
          quantity: parseFloat(String(item.quantity || "0")),
          rate: parseFloat(String(item.rate || "0")),
          discount: parseFloat(String(item.discount || "0")),
          amount: calculateItemAmount(item.quantity, item.rate, item.discount)
        }));
      
      const updatedOrder = {
        ...selectedOrder,
        customer: orderForm.customer,
        orderNo: orderForm.orderNo,
        date: orderForm.date,
        dueDate: orderForm.expectedShipment,
        amount: subtotal,
        tax: tax,
        total: subtotal + tax,
        items: processedItems
      };
      
      setSalesOrders(salesOrders.map(order => 
        order.id === selectedOrder.id ? updatedOrder : order
      ));
      setIsEditDialogOpen(false);
      toast({
        title: "Sales Order Updated",
        description: `Order ${selectedOrder.orderNo} has been updated successfully.`
      });
    }
  };

  const handleDeleteOrder = (orderId) => {
    setSalesOrders(salesOrders.filter(order => order.id !== orderId));
    toast({
      title: "Order Deleted",
      description: "Sales order has been deleted successfully."
    });
  };

  const handleStatusChange = (orderId, newStatus) => {
    setSalesOrders(salesOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Status Updated",
      description: `Order status changed to ${newStatus}.`
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Draft': return <RefreshCw className="h-4 w-4" />;
      case 'Confirmed': return <Check className="h-4 w-4" />;
      case 'Processing': return <Clock className="h-4 w-4" />;
      case 'Shipped': return <Truck className="h-4 w-4" />;
      case 'Delivered': return <Check className="h-4 w-4" />;
      default: return <RefreshCw className="h-4 w-4" />;
    }
  };

  const { subtotal, shippingCharges, adjustments, total } = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Clipboard className="h-8 w-8" />
          Sales Orders
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Sales Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Clipboard className="h-5 w-5" />
                New Sales Order
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Customer Selection */}
              <div>
                <label className="text-sm font-medium text-red-500">Customer Name*</label>
                <Select value={orderForm.customer} onValueChange={(value) => setOrderForm({...orderForm, customer: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or add a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ABC Corporation">ABC Corporation</SelectItem>
                    <SelectItem value="XYZ Industries">XYZ Industries</SelectItem>
                    <SelectItem value="John Smith">John Smith</SelectItem>
                    <SelectItem value="Tech Solutions Pvt Ltd">Tech Solutions Pvt Ltd</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-red-500">Sales Order#*</label>
                  <Input 
                    value={orderForm.orderNo}
                    onChange={(e) => setOrderForm({...orderForm, orderNo: e.target.value})}
                    placeholder="SO-0000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Reference#</label>
                  <Input 
                    value={orderForm.reference}
                    onChange={(e) => setOrderForm({...orderForm, reference: e.target.value})}
                    placeholder="Enter reference"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-red-500">Sales Order Date*</label>
                  <Input 
                    type="date"
                    value={orderForm.date}
                    onChange={(e) => setOrderForm({...orderForm, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Expected Shipment Date</label>
                  <Input 
                    type="date"
                    value={orderForm.expectedShipment}
                    onChange={(e) => setOrderForm({...orderForm, expectedShipment: e.target.value})}
                    placeholder="dd MMM yyyy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium">Payment Terms</label>
                  <Select value={orderForm.paymentTerms} onValueChange={(value) => setOrderForm({...orderForm, paymentTerms: value})}>
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
                  <label className="text-sm font-medium">Delivery Method</label>
                  <Select value={orderForm.deliveryMethod} onValueChange={(value) => setOrderForm({...orderForm, deliveryMethod: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a delivery method or type to add" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard Delivery">Standard Delivery</SelectItem>
                      <SelectItem value="Express Delivery">Express Delivery</SelectItem>
                      <SelectItem value="Pickup">Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Salesperson</label>
                  <Select value={orderForm.salesperson} onValueChange={(value) => setOrderForm({...orderForm, salesperson: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select or Add Salesperson" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Item Table */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Item Table</h3>
                  <div className="flex gap-2">
                    <Button onClick={addItem} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Row
                    </Button>
                    <Button variant="outline" size="sm">
                      Add Items in Bulk
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-[30%]">ITEM DETAILS</TableHead>
                        <TableHead className="w-[15%]">QUANTITY</TableHead>
                        <TableHead className="w-[15%]">RATE</TableHead>
                        <TableHead className="w-[10%]">DISCOUNT</TableHead>
                        <TableHead className="w-[15%]">AMOUNT</TableHead>
                        <TableHead className="w-[15%]">ACTION</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderForm.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input 
                              value={item.product}
                              onChange={(e) => updateItem(index, 'product', e.target.value)}
                              placeholder="Type or click to select an item."
                              className="border-0 focus:ring-0"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                              placeholder="1.00"
                              className="border-0 focus:ring-0"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number"
                              value={item.rate}
                              onChange={(e) => updateItem(index, 'rate', e.target.value)}
                              placeholder="0.00"
                              className="border-0 focus:ring-0"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Input 
                                type="number"
                                value={item.discount}
                                onChange={(e) => updateItem(index, 'discount', e.target.value)}
                                placeholder="0"
                                className="border-0 focus:ring-0 w-16"
                              />
                              <span className="text-sm text-gray-500">%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-lg font-semibold">
                              ₹{item.amount?.toFixed(2) || '0.00'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button 
                              onClick={() => removeItem(index)}
                              variant="ghost" 
                              size="sm"
                              disabled={orderForm.items.length === 1}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span>Sub Total:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Charges:</span>
                      <span>₹{shippingCharges.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Adjustment:</span>
                      <span>₹{adjustments.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={handleCreateOrder}>
                  Save as Draft
                </Button>
                <Button onClick={handleCreateOrder}>
                  Save and Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Sales Orders List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search orders..." className="pl-10 w-64" />
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
                <TableHead>Order No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNo}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.dueDate}</TableCell>
                  <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                  <TableCell>₹{order.tax.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold">₹{order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                      <SelectTrigger className={`w-32 ${getStatusColor(order.status)}`}>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)} title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditOrder(order)} title="Edit">
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

      {/* View Order Dialog - Invoice Format */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sales Order Details</DialogTitle>
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
                    <p className="font-medium">{selectedOrder.customer}</p>
                    <p>Customer Address Line 1</p>
                    <p>Customer Address Line 2</p>
                    <p>Phone: +91 9876543210</p>
                    <p>Email: customer@example.com</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Order Date:</span> {selectedOrder.date}</p>
                    <p><span className="font-medium">Due Date:</span> {selectedOrder.dueDate}</p>
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
                      <TableHead className="text-right">Discount</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">₹{item.rate.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{item.discount || 0}%</TableCell>
                        <TableCell className="text-right">₹{item.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Totals */}
              <div className="flex justify-end border-t pt-4">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₹{selectedOrder.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleStatusChange(selectedOrder.id, "Confirmed")}>
                  Confirm Order
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
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

      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Sales Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Same form structure as create dialog */}
            <div>
              <label className="text-sm font-medium text-red-500">Customer Name*</label>
              <Select value={orderForm.customer} onValueChange={(value) => setOrderForm({...orderForm, customer: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select or add a customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ABC Corporation">ABC Corporation</SelectItem>
                  <SelectItem value="XYZ Industries">XYZ Industries</SelectItem>
                  <SelectItem value="John Smith">John Smith</SelectItem>
                  <SelectItem value="Tech Solutions Pvt Ltd">Tech Solutions Pvt Ltd</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdateOrder} className="flex-1">
                Update Order
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesOrders;
