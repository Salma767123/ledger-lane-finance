
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Clipboard, Plus, Search, Eye, Edit, Trash2, X, RefreshCw, Check, Clock, Truck, Download, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PurchaseOrders = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: 1, orderNo: "PO-001", vendor: "Tech Supplies Ltd", date: "2024-01-15", totalAmount: 45000, status: "Pending", items: [{ product: "Product A", account: "Inventory", quantity: 10, rate: 4500, amount: 45000 }], reference: "REF-001", expectedDelivery: "2024-02-01", paymentTerms: "Due on Receipt", deliveryAddress: "123 Main St, City", notes: "Urgent delivery required" },
    { id: 2, orderNo: "PO-002", vendor: "Office Equipment Co", date: "2024-01-16", totalAmount: 32000, status: "Approved", items: [{ product: "Product B", account: "Inventory", quantity: 8, rate: 4000, amount: 32000 }], reference: "REF-002", expectedDelivery: "2024-02-05", paymentTerms: "Net 30", deliveryAddress: "456 Oak Ave, Town", notes: "Standard delivery" },
    { id: 3, orderNo: "PO-003", vendor: "Software Solutions", date: "2024-01-17", totalAmount: 25000, status: "Delivered", items: [{ product: "Product C", account: "Office Supplies", quantity: 5, rate: 5000, amount: 25000 }], reference: "REF-003", expectedDelivery: "2024-01-25", paymentTerms: "Net 15", deliveryAddress: "789 Pine St, Village", notes: "Digital delivery" },
    { id: 4, orderNo: "PO-004", vendor: "Furniture World", date: "2024-01-18", totalAmount: 65000, status: "Pending", items: [{ product: "Product D", account: "Equipment", quantity: 13, rate: 5000, amount: 65000 }], reference: "REF-004", expectedDelivery: "2024-02-10", paymentTerms: "Due on Receipt", deliveryAddress: "321 Elm Dr, County", notes: "Fragile items" }
  ]);

  const [orderForm, setOrderForm] = useState({
    vendor: "",
    orderNo: "",
    reference: "",
    date: "",
    expectedDelivery: "",
    paymentTerms: "Due on Receipt",
    deliveryAddress: "",
    notes: "",
    items: [{ product: "", account: "", quantity: "", rate: "", amount: 0 }]
  });

  const calculateItemAmount = (quantity, rate) => {
    return parseFloat(quantity || "0") * parseFloat(rate || "0");
  };

  const calculateTotals = () => {
    const subtotal = orderForm.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    return { subtotal };
  };

  const addItem = () => {
    setOrderForm({
      ...orderForm,
      items: [...orderForm.items, { product: "", account: "", quantity: "", rate: "", amount: 0 }]
    });
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...orderForm.items];
    updatedItems[index][field] = value;
    
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount = calculateItemAmount(
        updatedItems[index].quantity,
        updatedItems[index].rate
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
      vendor: "",
      orderNo: "",
      reference: "",
      date: "",
      expectedDelivery: "",
      paymentTerms: "Due on Receipt",
      deliveryAddress: "",
      notes: "",
      items: [{ product: "", account: "", quantity: "", rate: "", amount: 0 }]
    });
  };

  const handleCreateOrder = () => {
    if (orderForm.vendor && orderForm.date && orderForm.items.some(item => item.product)) {
      const { subtotal } = calculateTotals();
      
      const processedItems = orderForm.items
        .filter(item => item.product)
        .map(item => ({
          product: item.product,
          account: item.account,
          quantity: parseFloat(item.quantity || "0"),
          rate: parseFloat(item.rate || "0"),
          amount: parseFloat(item.quantity || "0") * parseFloat(item.rate || "0")
        }));
      
      const newOrder = {
        id: purchaseOrders.length + 1,
        orderNo: orderForm.orderNo || `PO-${(purchaseOrders.length + 1).toString().padStart(3, '0')}`,
        vendor: orderForm.vendor,
        date: orderForm.date,
        totalAmount: subtotal,
        status: "Pending",
        items: processedItems,
        reference: orderForm.reference,
        expectedDelivery: orderForm.expectedDelivery,
        paymentTerms: orderForm.paymentTerms,
        deliveryAddress: orderForm.deliveryAddress,
        notes: orderForm.notes
      };
      
      setPurchaseOrders([...purchaseOrders, newOrder]);
      resetForm();
      setIsCreateDialogOpen(false);
      toast({
        title: "Purchase Order Created",
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

  const handleSaveAsDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Purchase order has been saved as draft."
    });
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setOrderForm({
      vendor: order.vendor,
      orderNo: order.orderNo,
      reference: order.reference || "",
      date: order.date,
      expectedDelivery: order.expectedDelivery || "",
      paymentTerms: order.paymentTerms || "Due on Receipt",
      deliveryAddress: order.deliveryAddress || "",
      notes: order.notes || "",
      items: order.items?.map(item => ({
        product: item.product,
        account: item.account || "",
        quantity: item.quantity.toString(),
        rate: item.rate.toString(),
        amount: item.amount
      })) || [{ product: "", account: "", quantity: "", rate: "", amount: 0 }]
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateOrder = () => {
    if (selectedOrder && orderForm.vendor && orderForm.date) {
      const { subtotal } = calculateTotals();
      
      const processedItems = orderForm.items
        .filter(item => item.product)
        .map(item => ({
          product: item.product,
          account: item.account,
          quantity: parseFloat(item.quantity || "0"),
          rate: parseFloat(item.rate || "0"),
          amount: parseFloat(item.quantity || "0") * parseFloat(item.rate || "0")
        }));
      
      const updatedOrder = {
        ...selectedOrder,
        vendor: orderForm.vendor,
        orderNo: orderForm.orderNo,
        date: orderForm.date,
        totalAmount: subtotal,
        items: processedItems,
        reference: orderForm.reference,
        expectedDelivery: orderForm.expectedDelivery,
        paymentTerms: orderForm.paymentTerms,
        deliveryAddress: orderForm.deliveryAddress,
        notes: orderForm.notes
      };
      
      setPurchaseOrders(purchaseOrders.map(order => 
        order.id === selectedOrder.id ? updatedOrder : order
      ));
      setIsEditDialogOpen(false);
      setSelectedOrder(null);
      resetForm();
      toast({
        title: "Purchase Order Updated",
        description: `Order ${selectedOrder.orderNo} has been updated successfully.`
      });
    }
  };

  const handleDeleteOrder = (orderId) => {
    setPurchaseOrders(purchaseOrders.filter(order => order.id !== orderId));
    toast({
      title: "Order Deleted",
      description: "Purchase order has been deleted successfully."
    });
  };

  const handleStatusChange = (orderId, newStatus) => {
    setPurchaseOrders(purchaseOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Status Updated",
      description: `Order status changed to ${newStatus}.`
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

  const handleApproveOrder = (order) => {
    handleStatusChange(order.id, "Approved");
  };

  const handleCancel = () => {
    resetForm();
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Approved': return <Check className="h-4 w-4" />;
      case 'Delivered': return <Truck className="h-4 w-4" />;
      default: return <RefreshCw className="h-4 w-4" />;
    }
  };

  const { subtotal } = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Clipboard className="h-8 w-8" />
          Purchase Orders
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Purchase Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Clipboard className="h-5 w-5" />
                New Purchase Order
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Vendor Selection */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-red-500">Vendor Name*</label>
                  <Select value={orderForm.vendor} onValueChange={(value) => setOrderForm({...orderForm, vendor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tech Supplies Ltd">Tech Supplies Ltd</SelectItem>
                      <SelectItem value="Office Equipment Co">Office Equipment Co</SelectItem>
                      <SelectItem value="Software Solutions">Software Solutions</SelectItem>
                      <SelectItem value="Furniture World">Furniture World</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Delivery Address</label>
                  <Textarea 
                    value={orderForm.deliveryAddress}
                    onChange={(e) => setOrderForm({...orderForm, deliveryAddress: e.target.value})}
                    placeholder="Enter delivery address"
                    className="min-h-[40px]"
                  />
                </div>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-red-500">Purchase Order#*</label>
                  <Input 
                    value={orderForm.orderNo}
                    onChange={(e) => setOrderForm({...orderForm, orderNo: e.target.value})}
                    placeholder="PO-0000"
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
                <div>
                  <label className="text-sm font-medium text-red-500">Date*</label>
                  <Input 
                    type="date"
                    value={orderForm.date}
                    onChange={(e) => setOrderForm({...orderForm, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Expected Delivery Date</label>
                  <Input 
                    type="date"
                    value={orderForm.expectedDelivery}
                    onChange={(e) => setOrderForm({...orderForm, expectedDelivery: e.target.value})}
                  />
                </div>
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
                        <TableHead className="w-[20%]">ACCOUNT</TableHead>
                        <TableHead className="w-[12%]">QUANTITY</TableHead>
                        <TableHead className="w-[12%]">RATE</TableHead>
                        <TableHead className="w-[12%]">AMOUNT</TableHead>
                        <TableHead className="w-[14%]">ACTION</TableHead>
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
                            <Select 
                              value={item.account} 
                              onValueChange={(value) => updateItem(index, 'account', value)}
                            >
                              <SelectTrigger className="border-0 focus:ring-0">
                                <SelectValue placeholder="Select an account" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Inventory">Inventory</SelectItem>
                                <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                                <SelectItem value="Equipment">Equipment</SelectItem>
                                <SelectItem value="Software">Software</SelectItem>
                              </SelectContent>
                            </Select>
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
                      <span>Discount:</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Notes */}
              <div>
                <label className="text-sm font-medium">Customer Notes</label>
                <Textarea 
                  value={orderForm.notes}
                  onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                  placeholder="Will be displayed on the purchase order"
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={handleSaveAsDraft}>
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
            <CardTitle>Purchase Orders List</CardTitle>
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
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNo}</TableCell>
                  <TableCell>{order.vendor}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                      <SelectTrigger className={`w-32 ${getStatusColor(order.status)}`}>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)} title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditOrder(order)} title="Edit">
                        <Edit className="h-4 w-4" />
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

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
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
                  <h3 className="font-semibold text-gray-900 mb-2">Vendor Details</h3>
                  <div className="space-y-1">
                    <p className="font-medium">{selectedOrder.vendor}</p>
                    <p>Vendor Address Line 1</p>
                    <p>Vendor Address Line 2</p>
                    <p>Phone: +91 9876543210</p>
                    <p>Email: vendor@example.com</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Order Date:</span> {selectedOrder.date}</p>
                    <p><span className="font-medium">Order No:</span> {selectedOrder.orderNo}</p>
                    <p><span className="font-medium">Reference:</span> {selectedOrder.reference || "N/A"}</p>
                    <p><span className="font-medium">Expected Delivery:</span> {selectedOrder.expectedDelivery || "N/A"}</p>
                    <p><span className="font-medium">Payment Terms:</span> {selectedOrder.paymentTerms || "Due on Receipt"}</p>
                    <p><span className="font-medium">Status:</span> {selectedOrder.status}</p>
                  </div>
                </div>
              </div>

              {selectedOrder.deliveryAddress && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
                  <p>{selectedOrder.deliveryAddress}</p>
                </div>
              )}
              
              {/* Items Table */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Item</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.account || "N/A"}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">₹{item.rate.toLocaleString()}</TableCell>
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
                    <span>₹{selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>₹{selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleApproveOrder(selectedOrder)}>
                  Approve Order
                </Button>
                <Button variant="outline" onClick={() => {
                  setIsViewDialogOpen(false);
                  handleEditOrder(selectedOrder);
                }}>
                  Edit Order
                </Button>
                <Button variant="outline" onClick={() => handlePrintOrder(selectedOrder)}>
                  Print Order
                </Button>
                <Button variant="outline" onClick={() => handleDownloadOrder(selectedOrder)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={() => handleSendOrder(selectedOrder)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send to Vendor
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
            <DialogTitle>Edit Purchase Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Vendor Selection */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-red-500">Vendor Name*</label>
                <Select value={orderForm.vendor} onValueChange={(value) => setOrderForm({...orderForm, vendor: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech Supplies Ltd">Tech Supplies Ltd</SelectItem>
                    <SelectItem value="Office Equipment Co">Office Equipment Co</SelectItem>
                    <SelectItem value="Software Solutions">Software Solutions</SelectItem>
                    <SelectItem value="Furniture World">Furniture World</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Delivery Address</label>
                <Textarea 
                  value={orderForm.deliveryAddress}
                  onChange={(e) => setOrderForm({...orderForm, deliveryAddress: e.target.value})}
                  placeholder="Enter delivery address"
                  className="min-h-[40px]"
                />
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-red-500">Purchase Order#*</label>
                <Input 
                  value={orderForm.orderNo}
                  onChange={(e) => setOrderForm({...orderForm, orderNo: e.target.value})}
                  placeholder="PO-0000"
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
              <div>
                <label className="text-sm font-medium text-red-500">Date*</label>
                <Input 
                  type="date"
                  value={orderForm.date}
                  onChange={(e) => setOrderForm({...orderForm, date: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Expected Delivery Date</label>
                <Input 
                  type="date"
                  value={orderForm.expectedDelivery}
                  onChange={(e) => setOrderForm({...orderForm, expectedDelivery: e.target.value})}
                />
              </div>
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
            </div>

            {/* Item Table */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Item Table</h3>
                <Button onClick={addItem} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Row
                </Button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-[30%]">ITEM DETAILS</TableHead>
                      <TableHead className="w-[20%]">ACCOUNT</TableHead>
                      <TableHead className="w-[12%]">QUANTITY</TableHead>
                      <TableHead className="w-[12%]">RATE</TableHead>
                      <TableHead className="w-[12%]">AMOUNT</TableHead>
                      <TableHead className="w-[14%]">ACTION</TableHead>
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
                          <Select 
                            value={item.account} 
                            onValueChange={(value) => updateItem(index, 'account', value)}
                          >
                            <SelectTrigger className="border-0 focus:ring-0">
                              <SelectValue placeholder="Select an account" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Inventory">Inventory</SelectItem>
                              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                              <SelectItem value="Equipment">Equipment</SelectItem>
                              <SelectItem value="Software">Software</SelectItem>
                            </SelectContent>
                          </Select>
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
                    <span>Discount:</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Notes */}
            <div>
              <label className="text-sm font-medium">Customer Notes</label>
              <Textarea 
                value={orderForm.notes}
                onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                placeholder="Will be displayed on the purchase order"
                className="mt-1"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdateOrder} className="flex-1">
                Update Order
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrders;
