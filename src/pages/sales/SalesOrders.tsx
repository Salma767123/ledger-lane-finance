import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clipboard, Plus, Search, Eye, Edit, Trash2, Download, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SalesOrders = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [salesOrders, setSalesOrders] = useState([
    { id: 1, orderNo: "SO-001", customer: "ABC Corporation", date: "2024-01-15", dueDate: "2024-01-30", amount: 85000, tax: 15300, total: 100300, status: "Confirmed", items: [{ product: "Product A", quantity: 10, rate: 5000, amount: 50000 }, { product: "Product B", quantity: 7, rate: 5000, amount: 35000 }] },
    { id: 2, orderNo: "SO-002", customer: "XYZ Industries", date: "2024-01-16", dueDate: "2024-01-31", amount: 65000, tax: 11700, total: 76700, status: "Processing", items: [{ product: "Product C", quantity: 13, rate: 5000, amount: 65000 }] },
    { id: 3, orderNo: "SO-003", customer: "John Smith", date: "2024-01-17", dueDate: "2024-02-01", amount: 25000, tax: 4500, total: 29500, status: "Shipped", items: [{ product: "Product D", quantity: 5, rate: 5000, amount: 25000 }] },
    { id: 4, orderNo: "SO-004", customer: "Tech Solutions Pvt Ltd", date: "2024-01-18", dueDate: "2024-02-02", amount: 45000, tax: 8100, total: 53100, status: "Draft", items: [{ product: "Product E", quantity: 9, rate: 5000, amount: 45000 }] }
  ]);

  const [orderForm, setOrderForm] = useState({
    customer: "",
    date: "",
    dueDate: "",
    taxRate: "18",
    items: [{ product: "", quantity: "", rate: "", amount: 0 }]
  });

  const calculateItemAmount = (quantity, rate) => {
    return parseFloat(quantity || 0) * parseFloat(rate || 0);
  };

  const calculateTotals = () => {
    const subtotal = orderForm.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const tax = subtotal * (parseFloat(orderForm.taxRate) / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
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

  const handleCreateOrder = () => {
    if (orderForm.customer && orderForm.date && orderForm.items.some(item => item.product)) {
      const { subtotal, tax, total } = calculateTotals();
      
      const newOrder = {
        id: salesOrders.length + 1,
        orderNo: `SO-${String(salesOrders.length + 1).padStart(3, '0')}`,
        customer: orderForm.customer,
        date: orderForm.date,
        dueDate: orderForm.dueDate || orderForm.date,
        amount: subtotal,
        tax: tax,
        total: total,
        status: "Draft",
        items: orderForm.items.filter(item => item.product)
      };
      
      setSalesOrders([...salesOrders, newOrder]);
      setOrderForm({
        customer: "",
        date: "",
        dueDate: "",
        taxRate: "18",
        items: [{ product: "", quantity: "", rate: "", amount: 0 }]
      });
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
      date: order.date,
      dueDate: order.dueDate,
      taxRate: "18",
      items: order.items || [{ product: "", quantity: "", rate: "", amount: 0 }]
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateOrder = () => {
    if (selectedOrder && orderForm.customer && orderForm.date) {
      const { subtotal, tax, total } = calculateTotals();
      
      const updatedOrder = {
        ...selectedOrder,
        customer: orderForm.customer,
        date: orderForm.date,
        dueDate: orderForm.dueDate,
        amount: subtotal,
        tax: tax,
        total: total,
        items: orderForm.items.filter(item => item.product)
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

  const { subtotal, tax, total } = calculateTotals();

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
              Create Sales Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Sales Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Order Header */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Customer *</label>
                  <Select value={orderForm.customer} onValueChange={(value) => setOrderForm({...orderForm, customer: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ABC Corporation">ABC Corporation</SelectItem>
                      <SelectItem value="XYZ Industries">XYZ Industries</SelectItem>
                      <SelectItem value="John Smith">John Smith</SelectItem>
                      <SelectItem value="Tech Solutions Pvt Ltd">Tech Solutions Pvt Ltd</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Tax Rate (%)</label>
                  <Select value={orderForm.taxRate} onValueChange={(value) => setOrderForm({...orderForm, taxRate: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="28">28%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Order Date *</label>
                  <Input 
                    type="date"
                    value={orderForm.date}
                    onChange={(e) => setOrderForm({...orderForm, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <Input 
                    type="date"
                    value={orderForm.dueDate}
                    onChange={(e) => setOrderForm({...orderForm, dueDate: e.target.value})}
                  />
                </div>
              </div>

              {/* Order Items */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Order Items</h3>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {orderForm.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-5 gap-3 items-end">
                      <div>
                        <label className="text-sm font-medium">Product</label>
                        <Select 
                          value={item.product} 
                          onValueChange={(value) => updateItem(index, 'product', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Product A">Product A</SelectItem>
                            <SelectItem value="Product B">Product B</SelectItem>
                            <SelectItem value="Product C">Product C</SelectItem>
                            <SelectItem value="Product D">Product D</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Quantity</label>
                        <Input 
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Rate</label>
                        <Input 
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(index, 'rate', e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Amount</label>
                        <Input 
                          value={item.amount?.toFixed(2) || '0.00'}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div>
                        <Button 
                          onClick={() => removeItem(index)}
                          variant="outline" 
                          size="sm"
                          disabled={orderForm.items.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax ({orderForm.taxRate}%):</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateOrder} className="flex-1">
                  Create Order
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
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditOrder(order)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteOrder(order.id)}>
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Sales Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
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
                  <label className="text-sm font-medium text-gray-600">Customer</label>
                  <p>{selectedOrder.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Order Date</label>
                  <p>{selectedOrder.date}</p>
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
              
              <div className="flex justify-end">
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
                <Button>Confirm Order</Button>
                <Button variant="outline">Download PDF</Button>
                <Button variant="outline">Send to Customer</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Sales Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Same form structure as create dialog */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Customer *</label>
                <Select value={orderForm.customer} onValueChange={(value) => setOrderForm({...orderForm, customer: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ABC Corporation">ABC Corporation</SelectItem>
                    <SelectItem value="XYZ Industries">XYZ Industries</SelectItem>
                    <SelectItem value="John Smith">John Smith</SelectItem>
                    <SelectItem value="Tech Solutions Pvt Ltd">Tech Solutions Pvt Ltd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Tax Rate (%)</label>
                <Select value={orderForm.taxRate} onValueChange={(value) => setOrderForm({...orderForm, taxRate: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Order Date *</label>
                <Input 
                  type="date"
                  value={orderForm.date}
                  onChange={(e) => setOrderForm({...orderForm, date: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input 
                  type="date"
                  value={orderForm.dueDate}
                  onChange={(e) => setOrderForm({...orderForm, dueDate: e.target.value})}
                />
              </div>
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
