
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RecordPayment = () => {
  const navigate = useNavigate();
  const { billId } = useParams();
  const { toast } = useToast();

  const [billData, setBillData] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    paymentMade: "",
    bankCharges: "",
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMode: "Cash",
    paymentNumber: "",
    paidThrough: "Bank Acc 1 (GBP)",
    reference: "",
    notes: ""
  });

  useEffect(() => {
    // Mock bill data - in real app, fetch from API
    const mockBill = {
      id: billId,
      billNo: "BILL-444",
      vendor: "Tech Supplies Ltd",
      amount: 53100,
      paidAmount: 0,
      status: "Pending"
    };
    setBillData(mockBill);
    setPaymentForm({
      ...paymentForm,
      paymentMade: (mockBill.amount - mockBill.paidAmount).toString()
    });
  }, [billId]);

  const handleSave = () => {
    if (!paymentForm.paymentMade || parseFloat(paymentForm.paymentMade) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid payment amount.",
        variant: "destructive"
      });
      return;
    }

    const paymentAmount = parseFloat(paymentForm.paymentMade);
    const remainingAmount = billData.amount - billData.paidAmount;

    if (paymentAmount > remainingAmount) {
      toast({
        title: "Error",
        description: "Payment amount cannot exceed the remaining balance.",
        variant: "destructive"
      });
      return;
    }

    // In real app, save payment to backend
    toast({
      title: "Payment Recorded",
      description: `Payment of ₹${paymentAmount.toLocaleString()} has been recorded successfully.`
    });

    navigate("/purchase/bills");
  };

  if (!billData) {
    return <div>Loading...</div>;
  }

  const remainingAmount = billData.amount - billData.paidAmount;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/purchase/bills")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="h-8 w-8" />
            Record Payment
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bill Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Bill Number:</span>
              <p className="font-semibold">{billData.billNo}</p>
            </div>
            <div>
              <span className="text-gray-600">Vendor:</span>
              <p className="font-semibold">{billData.vendor}</p>
            </div>
            <div>
              <span className="text-gray-600">Total Amount:</span>
              <p className="font-semibold">₹{billData.amount.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600">Balance Due:</span>
              <p className="font-semibold text-red-600">₹{remainingAmount.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-red-500">Payment Made (INR) *</label>
              <Input 
                type="number"
                value={paymentForm.paymentMade}
                onChange={(e) => setPaymentForm({...paymentForm, paymentMade: e.target.value})}
                placeholder="Enter payment amount"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Bank Charges (if any)</label>
              <Input 
                type="number"
                value={paymentForm.bankCharges}
                onChange={(e) => setPaymentForm({...paymentForm, bankCharges: e.target.value})}
                placeholder="Enter bank charges"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-red-500">Payment Date *</label>
              <Input 
                type="date"
                value={paymentForm.paymentDate}
                onChange={(e) => setPaymentForm({...paymentForm, paymentDate: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Payment Mode</label>
              <Select value={paymentForm.paymentMode} onValueChange={(value) => setPaymentForm({...paymentForm, paymentMode: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Check">Check</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Payment #</label>
              <Input 
                value={paymentForm.paymentNumber}
                onChange={(e) => setPaymentForm({...paymentForm, paymentNumber: e.target.value})}
                placeholder="NaN"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Paid Through</label>
              <Select value={paymentForm.paidThrough} onValueChange={(value) => setPaymentForm({...paymentForm, paidThrough: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Acc 1 (GBP)">Bank Acc 1 (GBP)</SelectItem>
                  <SelectItem value="Cash Account">Cash Account</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Reference#</label>
            <Input 
              value={paymentForm.reference}
              onChange={(e) => setPaymentForm({...paymentForm, reference: e.target.value})}
              placeholder="Enter reference number"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea 
              value={paymentForm.notes}
              onChange={(e) => setPaymentForm({...paymentForm, notes: e.target.value})}
              placeholder="Additional notes"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Attachments</label>
            <div className="mt-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
              <p className="text-xs text-gray-500 mt-1">You can upload a maximum of 5 files, 10MB each</p>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            (As on 10 Jun 2025) 1 INR = 271 INR
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleSave} className="flex-1">
          Save
        </Button>
        <Button variant="outline" onClick={() => navigate("/purchase/bills")} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RecordPayment;
