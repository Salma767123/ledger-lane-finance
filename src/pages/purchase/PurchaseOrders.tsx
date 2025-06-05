
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Clipboard, Plus, Search, Eye, Edit, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PurchaseOrders = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: 1, orderNo: "PO-001", vendor: "Tech Supplies Ltd", date: "2024-01-15", totalAmount: 45000, status: "Pending", items: [{ product: "Product A", quantity: 10, rate: 4500, amount: 45000 }] },
    { id: 2, orderNo: "PO-002", vendor: "Office Equipment Co", date: "2024-01-16", totalAmount: 32000, status: "Approved", items: [{ product: "Product B", quantity: 8, rate: 4000, amount: 32000 }] },
    { id: 3, orderNo: "PO-003", vendor: "Software Solutions", date: "2024-01-17", totalAmount: 25000, status: "Delivered", items: [{ product: "Product C", quantity: 5, rate: 5000, amount: 25000 }] },
    { id: 4, orderNo: "PO-004", vendor: "Furniture World", date: "2024-01-18", totalAmount: 65000, status: "Pending", items: [{ product: "Product D", quantity: 13, rate: 5000, amount: 65000 }] }
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
    items: [{ product: "", quantity: "", rate: "", amount: 0 }]
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
      items: [...orderForm.items, { product: "", quantity: "", rate: "", amount: 0 }]
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
      items: [{ product: "", quantity: "", rate: "", amount: 0 }]
    });
  };

  const handleCreateOrder = () => {
    if (orderForm.vendor && orderForm.date && orderForm.items.some(item => item.product)) {
      const { subtotal } = calculateTotals();
      
      const processedItems = orderForm.items
        .filter(item => item.product)
        .map(item => ({
          product: item.product,
          quantity: parseFloat(String(item.quantity || "0")),
          rate: parseFloat(String(item.rate || "0")),
          amount: parseFloat(String(item.quantity || "0")) * parseFloat(String(item.rate || "0"))
        }));
      
      const newOrder = {
        id: purchaseOrders.length + 1,
        orderNo: orderForm.orderNo || `PO-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
        vendor: orderForm.vendor,
        date: orderForm.date,
        totalAmount: subtotal,
        status: "Pending",
        items: processedItems
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

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleDeleteOrder = (orderId) => {
    setPurchaseOrders(purchaseOrders.filter(order => order.id !== orderId));
    toast({
      title: "Order Deleted",
      description: "Purchase order has been deleted successfully."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
              Create Purchase Order
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
              {/* Order Header */}
              <div className="grid grid-cols-3 gap-6">
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
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-red-500">Date*</label>
                  <Input 
                    type="date"
                    value={orderForm.date}
                    onChange={(e) => setOrderForm({...orderForm, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Expected Delivery Date</label>
                  <Input 
                    type="date"
                    value={orderForm.expectedDelivery}
                    onChange={(e) => setOrderForm({...orderForm, expectedDelivery: e.target.value})}
                    placeholder="dd MMM yyyy"
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
                        <TableHead className="w-[40%]">ITEM DETAILS</TableHead>
                        <TableHead className="w-[15%]">QUANTITY</TableHead>
                        <TableHead className="w-[15%]">RATE</TableHead>
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
                            <span className="text-lg font-semibold">
                              {item.amount?.toFixed(2) || '0.00'}
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

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
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
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)} title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Edit">
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Purchase Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Order Number</label>
                  <p className="text-lg font-semibold">{selectedOrder.orderNo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Vendor</label>
                  <p>{selectedOrder.vendor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Date</label>
                  <p>{selectedOrder.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Amount</label>
                  <p className="text-lg font-semibold">₹{selectedOrder.totalAmount.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₹{item.rate}</TableCell>
                        <TableCell>₹{item.amount?.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button>Approve Order</Button>
                <Button variant="outline">Edit Order</Button>
                <Button variant="outline">Print Order</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrders;
