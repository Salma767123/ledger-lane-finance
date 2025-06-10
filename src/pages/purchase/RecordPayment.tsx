
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RecordPayment = () => {
  const navigate = useNavigate();
  const { billId } = useParams();
  const { toast } = useToast();

  const [paymentForm, setPaymentForm] = useState({
    paymentMade: "",
    bankCharges: "",
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMode: "Cash",
    paidThrough: "Bank Acc 1 (GBP)",
    payment: "NaN",
    reference: "",
    notes: "",
    attachments: []
  });

  const handleSave = () => {
    if (!paymentForm.paymentMade || !paymentForm.paymentDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Recorded",
      description: `Payment of ₹${paymentForm.paymentMade} has been recorded successfully.`,
    });
    
    navigate("/purchase/bills");
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + paymentForm.attachments.length > 5) {
      toast({
        title: "Error",
        description: "You can upload a maximum of 5 files.",
        variant: "destructive"
      });
      return;
    }
    
    setPaymentForm({
      ...paymentForm,
      attachments: [...paymentForm.attachments, ...files]
    });
  };

  const removeAttachment = (index) => {
    const updatedAttachments = paymentForm.attachments.filter((_, i) => i !== index);
    setPaymentForm({ ...paymentForm, attachments: updatedAttachments });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/purchase/bills")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bills
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Record Payment</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-red-500">Payment Made* (INR)</label>
              <Input 
                type="number"
                value={paymentForm.paymentMade}
                onChange={(e) => setPaymentForm({...paymentForm, paymentMade: e.target.value})}
                placeholder="491.00390000000004"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Bank Charges (if any)</label>
              <Input 
                type="number"
                value={paymentForm.bankCharges}
                onChange={(e) => setPaymentForm({...paymentForm, bankCharges: e.target.value})}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-red-500">Payment Date*</label>
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
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Paid Through*</label>
              <Select value={paymentForm.paidThrough} onValueChange={(value) => setPaymentForm({...paymentForm, paidThrough: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Acc 1 (GBP)">Bank Acc 1 (GBP)</SelectItem>
                  <SelectItem value="Bank Acc 2 (USD)">Bank Acc 2 (USD)</SelectItem>
                  <SelectItem value="Cash Account">Cash Account</SelectItem>
                  <SelectItem value="Petty Cash">Petty Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-red-500">Payment #*</label>
              <div className="flex">
                <Input 
                  value={paymentForm.payment}
                  onChange={(e) => setPaymentForm({...paymentForm, payment: e.target.value})}
                  placeholder="NaN"
                />
                <Button variant="outline" size="sm" className="ml-2">
                  🔄
                </Button>
              </div>
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
              placeholder="Additional notes for the payment"
              className="mt-1"
            />
          </div>

          {/* Currency conversion note */}
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
            (As on 10 Jun 2025) 1 INR = 271 INR 🔄
          </div>

          {/* Attachments */}
          <div>
            <label className="text-sm font-medium">Attachments</label>
            <div className="mt-2">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <div className="text-sm text-gray-600 mb-2">Upload File</div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  Choose Files
                </Button>
                <div className="text-xs text-gray-500 mt-2">
                  You can upload a maximum of 5 files, 10MB each
                </div>
              </div>
              
              {paymentForm.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {paymentForm.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => navigate("/purchase/bills")}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordPayment;
