
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clipboard, Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PurchaseOrders = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: 1, orderNo: "PO-001", vendor: "Tech Supplies Ltd", date: "2024-01-15", totalAmount: 45000, status: "Pending", items: 3 },
    { id: 2, orderNo: "PO-002", vendor: "Office Equipment Co", date: "2024-01-16", totalAmount: 32000, status: "Approved", items: 5 },
    { id: 3, orderNo: "PO-003", vendor: "Software Solutions", date: "2024-01-17", totalAmount: 25000, status: "Delivered", items: 2 },
    { id: 4, orderNo: "PO-004", vendor: "Furniture World", date: "2024-01-18", totalAmount: 65000, status: "Pending", items: 4 }
  ]);

  const [newOrder, setNewOrder] = useState({
    vendor: "",
    description: "",
    quantity: "",
    unitPrice: "",
    totalAmount: ""
  });

  const handleCreateOrder = () => {
    if (newOrder.vendor && newOrder.description && newOrder.quantity && newOrder.unitPrice) {
      const order = {
        id: purchaseOrders.length + 1,
        orderNo: `PO-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
        vendor: newOrder.vendor,
        date: new Date().toISOString().split('T')[0],
        totalAmount: parseFloat(newOrder.quantity) * parseFloat(newOrder.unitPrice),
        status: "Pending",
        items: 1
      };
      setPurchaseOrders([...purchaseOrders, order]);
      setNewOrder({ vendor: "", description: "", quantity: "", unitPrice: "", totalAmount: "" });
      setIsCreateDialogOpen(false);
      toast({
        title: "Purchase Order Created",
        description: `Order ${order.orderNo} has been created successfully.`
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Purchase Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Vendor *</label>
                <Select value={newOrder.vendor} onValueChange={(value) => setNewOrder({...newOrder, vendor: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
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
                <label className="text-sm font-medium">Description *</label>
                <Input 
                  value={newOrder.description}
                  onChange={(e) => setNewOrder({...newOrder, description: e.target.value})}
                  placeholder="Enter item description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Quantity *</label>
                <Input 
                  type="number"
                  value={newOrder.quantity}
                  onChange={(e) => setNewOrder({...newOrder, quantity: e.target.value})}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Unit Price *</label>
                <Input 
                  type="number"
                  value={newOrder.unitPrice}
                  onChange={(e) => setNewOrder({...newOrder, unitPrice: e.target.value})}
                  placeholder="Enter unit price"
                />
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
                <TableHead>Items</TableHead>
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
                  <TableCell>{order.items}</TableCell>
                  <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
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
                  <label className="text-sm font-medium text-gray-600">Total Items</label>
                  <p>{selectedOrder.items}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Amount</label>
                  <p className="text-lg font-semibold">₹{selectedOrder.totalAmount.toLocaleString()}</p>
                </div>
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
