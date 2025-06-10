
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Receipt, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateBill = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [billForm, setBillForm] = useState({
    vendor: "",
    billNo: "",
    billDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    poReference: "",
    reference: "",
    paymentTerms: "Due on Receipt",
    notes: ""
  });

  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, rate: 0, tax: "GST@18%", amount: 0 }
  ]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      description: "",
      quantity: 1,
      rate: 0,
      tax: "GST@18%",
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    const subTotal = items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subTotal * 0.18; // 18% GST
    const total = subTotal + taxAmount;
    return { subTotal, taxAmount, total };
  };

  const handleSave = (status = "Pending") => {
    if (!billForm.vendor || !billForm.billNo || !billForm.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const { total } = calculateTotals();
    
    const bill = {
      id: Date.now(),
      billNo: billForm.billNo,
      vendor: billForm.vendor,
      date: billForm.billDate,
      dueDate: billForm.dueDate,
      amount: total,
      paidAmount: 0,
      status: status,
      poReference: billForm.poReference,
      reference: billForm.reference,
      description: items.map(item => item.description).join(", "),
      paymentTerms: billForm.paymentTerms,
      notes: billForm.notes,
      items: items
    };

    // In a real app, this would save to backend
    toast({
      title: "Bill Created",
      description: `Bill ${bill.billNo} has been created successfully.`
    });

    navigate("/purchase/bills");
  };

  const { subTotal, taxAmount, total } = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/purchase/bills")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Receipt className="h-8 w-8" />
            Create Bill
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-red-500">Vendor *</label>
              <Select value={billForm.vendor} onValueChange={(value) => setBillForm({...billForm, vendor: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech Supplies Ltd">Tech Supplies Ltd</SelectItem>
                  <SelectItem value="Office Equipment Co">Office Equipment Co</SelectItem>
                  <SelectItem value="Software Solutions">Software Solutions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-red-500">Bill Number *</label>
              <Input 
                value={billForm.billNo}
                onChange={(e) => setBillForm({...billForm, billNo: e.target.value})}
                placeholder="Enter bill number"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-red-500">Bill Date *</label>
              <Input 
                type="date"
                value={billForm.billDate}
                onChange={(e) => setBillForm({...billForm, billDate: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-red-500">Due Date *</label>
              <Input 
                type="date"
                value={billForm.dueDate}
                onChange={(e) => setBillForm({...billForm, dueDate: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">PO Reference</label>
              <Input 
                value={billForm.poReference}
                onChange={(e) => setBillForm({...billForm, poReference: e.target.value})}
                placeholder="Enter PO reference"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Reference</label>
              <Input 
                value={billForm.reference}
                onChange={(e) => setBillForm({...billForm, reference: e.target.value})}
                placeholder="Enter reference"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Payment Terms</label>
              <Select value={billForm.paymentTerms} onValueChange={(value) => setBillForm({...billForm, paymentTerms: value})}>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Items</CardTitle>
            <Button onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Details</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input 
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Enter item description"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Select value={item.tax} onValueChange={(value) => updateItem(item.id, 'tax', value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GST@18%">GST@18%</SelectItem>
                        <SelectItem value="GST@12%">GST@12%</SelectItem>
                        <SelectItem value="GST@5%">GST@5%</SelectItem>
                        <SelectItem value="No Tax">No Tax</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-6">
            <div className="w-80 space-y-2">
              <div className="flex justify-between">
                <span>Sub Total:</span>
                <span>₹{subTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%):</span>
                <span>₹{taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea 
              value={billForm.notes}
              onChange={(e) => setBillForm({...billForm, notes: e.target.value})}
              placeholder="Additional notes for the bill"
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={() => handleSave("Pending")} className="flex-1">
          Save & Send
        </Button>
        <Button variant="outline" onClick={() => handleSave("Draft")} className="flex-1">
          Save as Draft
        </Button>
        <Button variant="outline" onClick={() => navigate("/purchase/bills")} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateBill;
