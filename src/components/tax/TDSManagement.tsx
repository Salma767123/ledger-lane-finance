import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, Calculator, Download, Upload, Eye, Edit, Receipt, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TDSManagement = () => {
  const { toast } = useToast();
  const [isTDSRateDialogOpen, setIsTDSRateDialogOpen] = useState(false);
  const [isTDSDeductionDialogOpen, setIsTDSDeductionDialogOpen] = useState(false);
  const [isFileReturnDialogOpen, setIsFileReturnDialogOpen] = useState(false);
  const [isViewCertificateDialogOpen, setIsViewCertificateDialogOpen] = useState(false);
  const [isChallanDialogOpen, setIsChallanDialogOpen] = useState(false);
  const [isViewReturnDialogOpen, setIsViewReturnDialogOpen] = useState(false);
  const [isEditDeductionDialogOpen, setIsEditDeductionDialogOpen] = useState(false);
  const [isTaxGroupDialogOpen, setIsTaxGroupDialogOpen] = useState(false);
  
  const [tdsRateData, setTdsRateData] = useState({
    section: "",
    description: "",
    rate: "",
    threshold: "",
    applicableOn: "",
    surchargeRate: "",
    educationCessRate: "",
    effectiveDate: "",
    taxGroup: ""
  });

  const [taxGroupData, setTaxGroupData] = useState({
    groupName: "",
    groupCode: "",
    description: "",
    sections: [] as string[]
  });

  // Simplified TDS Deduction Data - Only mandatory fields
  const [tdsDeductionData, setTdsDeductionData] = useState({
    section: "",
    deductee: "",
    amount: "",
    tdsRate: "",
    tdsAmount: "",
    date: "",
    panNumber: "",
    natureOfPayment: ""
  });

  const [challanData, setChallanData] = useState({
    challanNumber: "",
    bsrCode: "",
    amount: "",
    penalty: "",
    interest: "",
    paymentDate: "",
    challanDate: "",
    paidThrough: "",
    bankName: "",
    remarks: ""
  });

  const [returnData, setReturnData] = useState({
    quarter: "",
    year: "",
    returnType: "",
    filingDate: "",
    acknowledgmentNumber: "",
    status: "draft"
  });

  // Tax Groups for categorizing TDS sections
  const taxGroups = [
    { value: "salary", label: "Salary & Wages" },
    { value: "professional", label: "Professional Services" },
    { value: "contractor", label: "Contractor Payments" },
    { value: "commission", label: "Commission & Brokerage" },
    { value: "rent", label: "Rent & Property" },
    { value: "interest", label: "Interest & Dividends" },
    { value: "winnings", label: "Winnings & Lottery" },
    { value: "non-resident", label: "Non-Resident Payments" },
    { value: "securities", label: "Securities & Investments" },
    { value: "other", label: "Other Payments" }
  ];

  // Enhanced TDS Sections with group categorization
  const tdsOptions = [
    { value: "192", label: "192 - Salary", group: "salary" },
    { value: "192A", label: "192A - Premature withdrawal from EPF", group: "salary" },
    { value: "193", label: "193 - Interest on Securities", group: "interest" },
    { value: "194", label: "194 - Dividends", group: "interest" },
    { value: "194A", label: "194A - Interest other than on Securities", group: "interest" },
    { value: "194B", label: "194B - Winnings from Lottery/Crossword", group: "winnings" },
    { value: "194BB", label: "194BB - Winnings from Horse Race", group: "winnings" },
    { value: "194C", label: "194C - Payment to Contractors", group: "contractor" },
    { value: "194D", label: "194D - Insurance Commission", group: "commission" },
    { value: "194DA", label: "194DA - Life Insurance Policy Payment", group: "securities" },
    { value: "194E", label: "194E - Non-Resident Sports", group: "non-resident" },
    { value: "194EE", label: "194EE - NSS/NSC/SCSS", group: "securities" },
    { value: "194F", label: "194F - Mutual Fund Units", group: "securities" },
    { value: "194G", label: "194G - Commission/Brokerage", group: "commission" },
    { value: "194H", label: "194H - Commission/Brokerage", group: "commission" },
    { value: "194I", label: "194I - Rent", group: "rent" },
    { value: "194IA", label: "194IA - Transfer of Immovable Property", group: "rent" },
    { value: "194IB", label: "194IB - Rent to Resident", group: "rent" },
    { value: "194IC", label: "194IC - Joint Development Agreement", group: "rent" },
    { value: "194J", label: "194J - Professional/Technical Services", group: "professional" },
    { value: "194K", label: "194K - Distribution of Income", group: "securities" },
    { value: "194LA", label: "194LA - Compensation for Land Acquisition", group: "rent" },
    { value: "194LB", label: "194LB - Income from Units", group: "securities" },
    { value: "194LC", label: "194LC - Income from Investment Fund", group: "securities" },
    { value: "194LD", label: "194LD - Interest on Infrastructure Debt Fund", group: "interest" },
    { value: "194M", label: "194M - Contractual Payment", group: "contractor" },
    { value: "194N", label: "194N - Cash Withdrawal", group: "other" },
    { value: "194O", label: "194O - E-commerce Operator", group: "commission" },
    { value: "194P", label: "194P - Winnings from Online Games", group: "winnings" },
    { value: "194Q", label: "194Q - Purchase of Goods", group: "other" },
    { value: "194R", label: "194R - Benefits/Perquisites", group: "salary" },
    { value: "194S", label: "194S - Cryptocurrency Transfer", group: "other" },
    { value: "195", label: "195 - Non-Resident Payments", group: "non-resident" },
    { value: "196A", label: "196A - Income from Units", group: "securities" },
    { value: "196B", label: "196B - Income from Units", group: "securities" },
    { value: "196C", label: "196C - Income from Foreign Currency Bonds", group: "securities" },
    { value: "196D", label: "196D - Income from FII Securities", group: "securities" }
  ];

  // Calculate TDS amount
  const calculateTDSAmount = () => {
    const amount = parseFloat(tdsDeductionData.amount) || 0;
    const rate = parseFloat(tdsDeductionData.tdsRate) || 0;
    const baseTds = (amount * rate) / 100;
    
    setTdsDeductionData(prev => ({
      ...prev, 
      tdsAmount: baseTds.toFixed(2)
    }));
  };

  const handleAddTaxGroup = () => {
    if (taxGroupData.groupName && taxGroupData.groupCode) {
      console.log("Adding tax group:", taxGroupData);
      toast({
        title: "Tax Group Added",
        description: "Tax group has been created successfully.",
      });
      setTaxGroupData({ 
        groupName: "", 
        groupCode: "", 
        description: "", 
        sections: [] 
      });
      setIsTaxGroupDialogOpen(false);
    }
  };

  const handleAddTDSRate = () => {
    if (tdsRateData.section && tdsRateData.rate && tdsRateData.threshold) {
      console.log("Adding TDS rate:", tdsRateData);
      toast({
        title: "TDS Rate Added",
        description: "TDS rate has been added successfully.",
      });
      setTdsRateData({ 
        section: "", 
        description: "", 
        rate: "", 
        threshold: "", 
        applicableOn: "",
        surchargeRate: "",
        educationCessRate: "",
        effectiveDate: "",
        taxGroup: ""
      });
      setIsTDSRateDialogOpen(false);
    }
  };

  const handleTDSDeduction = () => {
    if (tdsDeductionData.section && tdsDeductionData.amount && tdsDeductionData.deductee && tdsDeductionData.panNumber) {
      console.log("Processing TDS deduction:", tdsDeductionData);
      toast({
        title: "TDS Deducted",
        description: "TDS deduction has been processed successfully.",
      });
      // Reset form
      setTdsDeductionData({
        section: "",
        deductee: "",
        amount: "",
        tdsRate: "",
        tdsAmount: "",
        date: "",
        panNumber: "",
        natureOfPayment: ""
      });
      setIsTDSDeductionDialogOpen(false);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleRecordChallan = () => {
    if (challanData.challanNumber && challanData.amount && challanData.paymentDate) {
      console.log("Recording challan:", challanData);
      toast({
        title: "Challan Recorded",
        description: "TDS challan has been recorded successfully.",
      });
      setChallanData({
        challanNumber: "",
        bsrCode: "",
        amount: "",
        penalty: "",
        interest: "",
        paymentDate: "",
        challanDate: "",
        paidThrough: "",
        bankName: "",
        remarks: ""
      });
      setIsChallanDialogOpen(false);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleFileReturn = () => {
    if (returnData.quarter && returnData.year && returnData.returnType) {
      console.log("Filing TDS return:", returnData);
      toast({
        title: "Return Filed",
        description: "TDS return has been filed successfully.",
      });
      setReturnData({
        quarter: "",
        year: "",
        returnType: "",
        filingDate: "",
        acknowledgmentNumber: "",
        status: "draft"
      });
      setIsFileReturnDialogOpen(false);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleViewReturn = (returnId: string) => {
    console.log("Viewing return:", returnId);
    setIsViewReturnDialogOpen(true);
  };

  const handleEditDeduction = (deductionId: string) => {
    console.log("Editing deduction:", deductionId);
    setIsEditDeductionDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          TDS (Tax Deducted at Source) Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rates" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rates">TDS Rates</TabsTrigger>
            <TabsTrigger value="deductions">Deductions</TabsTrigger>
            <TabsTrigger value="challans">Challans</TabsTrigger>
            <TabsTrigger value="returns">Returns & Filing</TabsTrigger>
          </TabsList>

          <TabsContent value="rates" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TDS Rate Configuration</h4>
              <div className="flex gap-2">
                <Dialog open={isTaxGroupDialogOpen} onOpenChange={setIsTaxGroupDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tax Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create Tax Group</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Group Name *</Label>
                          <Input 
                            value={taxGroupData.groupName}
                            onChange={(e) => setTaxGroupData({...taxGroupData, groupName: e.target.value})}
                            placeholder="Enter group name"
                          />
                        </div>
                        <div>
                          <Label>Group Code *</Label>
                          <Input 
                            value={taxGroupData.groupCode}
                            onChange={(e) => setTaxGroupData({...taxGroupData, groupCode: e.target.value.toUpperCase()})}
                            placeholder="Enter group code"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea 
                          value={taxGroupData.description}
                          onChange={(e) => setTaxGroupData({...taxGroupData, description: e.target.value})}
                          placeholder="Enter group description"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>Select TDS Sections</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                          {tdsOptions.map((option) => (
                            <label key={option.value} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                value={option.value}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setTaxGroupData(prev => ({
                                      ...prev,
                                      sections: [...prev.sections, option.value]
                                    }));
                                  } else {
                                    setTaxGroupData(prev => ({
                                      ...prev,
                                      sections: prev.sections.filter(s => s !== option.value)
                                    }));
                                  }
                                }}
                                className="rounded"
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleAddTaxGroup} className="flex-1">
                          Create Group
                        </Button>
                        <Button variant="outline" onClick={() => setIsTaxGroupDialogOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog open={isTDSRateDialogOpen} onOpenChange={setIsTDSRateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add TDS Rate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Add TDS Rate</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Tax Group</Label>
                          <Select value={tdsRateData.taxGroup} onValueChange={(value) => setTdsRateData({...tdsRateData, taxGroup: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tax group" />
                            </SelectTrigger>
                            <SelectContent>
                              {taxGroups.map((group) => (
                                <SelectItem key={group.value} value={group.value}>
                                  {group.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>TDS Section *</Label>
                          <Select value={tdsRateData.section} onValueChange={(value) => setTdsRateData({...tdsRateData, section: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select TDS section" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {tdsOptions
                                .filter(option => !tdsRateData.taxGroup || option.group === tdsRateData.taxGroup)
                                .map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Effective Date *</Label>
                          <Input 
                            type="date"
                            value={tdsRateData.effectiveDate}
                            onChange={(e) => setTdsRateData({...tdsRateData, effectiveDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Applicable On</Label>
                          <Select value={tdsRateData.applicableOn} onValueChange={(value) => setTdsRateData({...tdsRateData, applicableOn: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select applicable on" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="resident">Resident</SelectItem>
                              <SelectItem value="non-resident">Non-Resident</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input 
                          value={tdsRateData.description}
                          onChange={(e) => setTdsRateData({...tdsRateData, description: e.target.value})}
                          placeholder="Enter description"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>TDS Rate (%) *</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={tdsRateData.rate}
                            onChange={(e) => setTdsRateData({...tdsRateData, rate: e.target.value})}
                            placeholder="Enter rate"
                          />
                        </div>
                        <div>
                          <Label>Surcharge Rate (%)</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={tdsRateData.surchargeRate}
                            onChange={(e) => setTdsRateData({...tdsRateData, surchargeRate: e.target.value})}
                            placeholder="Surcharge rate"
                          />
                        </div>
                        <div>
                          <Label>Education Cess Rate (%)</Label>
                          <Input 
                            type="number"
                            step="0.01"
                            value={tdsRateData.educationCessRate}
                            onChange={(e) => setTdsRateData({...tdsRateData, educationCessRate: e.target.value})}
                            placeholder="Cess rate (default 4%)"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Threshold Amount *</Label>
                        <Input 
                          type="number"
                          value={tdsRateData.threshold}
                          onChange={(e) => setTdsRateData({...tdsRateData, threshold: e.target.value})}
                          placeholder="Enter threshold"
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleAddTDSRate} className="flex-1">
                          Add Rate
                        </Button>
                        <Button variant="outline" onClick={() => setIsTDSRateDialogOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Tax Groups Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group Name</TableHead>
                      <TableHead>Group Code</TableHead>
                      <TableHead>Sections Count</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Professional Services</TableCell>
                      <TableCell>PROF</TableCell>
                      <TableCell>5 sections</TableCell>
                      <TableCell>Professional and technical services</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Contractor Payments</TableCell>
                      <TableCell>CONT</TableCell>
                      <TableCell>3 sections</TableCell>
                      <TableCell>Payments to contractors</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* TDS Rates Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Rate (%)</TableHead>
                  <TableHead>Surcharge (%)</TableHead>
                  <TableHead>Cess (%)</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>194J</TableCell>
                  <TableCell>Professional</TableCell>
                  <TableCell>Professional Services</TableCell>
                  <TableCell>10%</TableCell>
                  <TableCell>10%</TableCell>
                  <TableCell>4%</TableCell>
                  <TableCell>₹30,000</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>194C</TableCell>
                  <TableCell>Contractor</TableCell>
                  <TableCell>Contractor Payments</TableCell>
                  <TableCell>1%</TableCell>
                  <TableCell>10%</TableCell>
                  <TableCell>4%</TableCell>
                  <TableCell>₹30,000</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="deductions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TDS Deductions</h4>
              <Dialog open={isTDSDeductionDialogOpen} onOpenChange={setIsTDSDeductionDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Record Deduction
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Record TDS Deduction (Mandatory Fields Only)</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>TDS Section *</Label>
                        <Select value={tdsDeductionData.section} onValueChange={(value) => setTdsDeductionData({...tdsDeductionData, section: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {tdsOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Date of Deduction *</Label>
                        <Input 
                          type="date"
                          value={tdsDeductionData.date}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, date: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Deductee Name *</Label>
                        <Input 
                          value={tdsDeductionData.deductee}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, deductee: e.target.value})}
                          placeholder="Enter deductee name"
                        />
                      </div>
                      <div>
                        <Label>PAN Number *</Label>
                        <Input 
                          value={tdsDeductionData.panNumber}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, panNumber: e.target.value.toUpperCase()})}
                          placeholder="Enter PAN (e.g., ABCDE1234F)"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Nature of Payment *</Label>
                      <Input 
                        value={tdsDeductionData.natureOfPayment}
                        onChange={(e) => setTdsDeductionData({...tdsDeductionData, natureOfPayment: e.target.value})}
                        placeholder="Nature of payment"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Payment Amount *</Label>
                        <Input 
                          type="number"
                          value={tdsDeductionData.amount}
                          onChange={(e) => {
                            setTdsDeductionData({...tdsDeductionData, amount: e.target.value});
                          }}
                          onBlur={calculateTDSAmount}
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <Label>TDS Rate (%) *</Label>
                        <Input 
                          type="number"
                          step="0.01"
                          value={tdsDeductionData.tdsRate}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, tdsRate: e.target.value})}
                          onBlur={calculateTDSAmount}
                          placeholder="TDS rate"
                        />
                      </div>
                      <div>
                        <Label>TDS Amount</Label>
                        <Input 
                          type="number"
                          value={tdsDeductionData.tdsAmount}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, tdsAmount: e.target.value})}
                          placeholder="Calculated TDS amount"
                          className="bg-gray-50"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleTDSDeduction} className="flex-1">
                        Record Deduction
                      </Button>
                      <Button variant="outline" onClick={() => setIsTDSDeductionDialogOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Deductee</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>TDS Amount</TableHead>
                  <TableHead>Certificate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell>ABC Consultants</TableCell>
                  <TableCell>194J</TableCell>
                  <TableCell>₹50,000</TableCell>
                  <TableCell>₹5,000</TableCell>
                  <TableCell>TDS/001/2024</TableCell>
                  <TableCell>
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">Paid</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleEditDeduction("1")}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-01-20</TableCell>
                  <TableCell>XYZ Contractors</TableCell>
                  <TableCell>194C</TableCell>
                  <TableCell>₹1,00,000</TableCell>
                  <TableCell>₹1,000</TableCell>
                  <TableCell>TDS/002/2024</TableCell>
                  <TableCell>
                    <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded text-xs">Pending</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleEditDeduction("2")}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="challans" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TDS Challan Management</h4>
              <Dialog open={isChallanDialogOpen} onOpenChange={setIsChallanDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Receipt className="h-4 w-4 mr-2" />
                    Record Challan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Record TDS Challan</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Challan Number *</Label>
                        <Input 
                          value={challanData.challanNumber}
                          onChange={(e) => setChallanData({...challanData, challanNumber: e.target.value})}
                          placeholder="Enter challan number"
                        />
                      </div>
                      <div>
                        <Label>BSR Code *</Label>
                        <Input 
                          value={challanData.bsrCode}
                          onChange={(e) => setChallanData({...challanData, bsrCode: e.target.value})}
                          placeholder="Enter BSR code"
                        />
                      </div>
                      <div>
                        <Label>Payment Date *</Label>
                        <Input 
                          type="date"
                          value={challanData.paymentDate}
                          onChange={(e) => setChallanData({...challanData, paymentDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Challan Date</Label>
                        <Input 
                          type="date"
                          value={challanData.challanDate}
                          onChange={(e) => setChallanData({...challanData, challanDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Paid Through</Label>
                        <Select value={challanData.paidThrough} onValueChange={(value) => setChallanData({...challanData, paidThrough: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="internet-banking">Internet Banking</SelectItem>
                            <SelectItem value="otc">Over the Counter</SelectItem>
                            <SelectItem value="rtgs">RTGS</SelectItem>
                            <SelectItem value="neft">NEFT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Bank Name</Label>
                        <Input 
                          value={challanData.bankName}
                          onChange={(e) => setChallanData({...challanData, bankName: e.target.value})}
                          placeholder="Enter bank name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Amount *</Label>
                        <Input 
                          type="number"
                          value={challanData.amount}
                          onChange={(e) => setChallanData({...challanData, amount: e.target.value})}
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <Label>Penalty</Label>
                        <Input 
                          type="number"
                          value={challanData.penalty}
                          onChange={(e) => setChallanData({...challanData, penalty: e.target.value})}
                          placeholder="Enter penalty"
                        />
                      </div>
                      <div>
                        <Label>Interest</Label>
                        <Input 
                          type="number"
                          value={challanData.interest}
                          onChange={(e) => setChallanData({...challanData, interest: e.target.value})}
                          placeholder="Enter interest"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Remarks</Label>
                      <Textarea 
                        value={challanData.remarks}
                        onChange={(e) => setChallanData({...challanData, remarks: e.target.value})}
                        placeholder="Enter any remarks"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleRecordChallan} className="flex-1">
                        Record Challan
                      </Button>
                      <Button variant="outline" onClick={() => setIsChallanDialogOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Challan Number</TableHead>
                  <TableHead>BSR Code</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Penalty</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>CHN001/2024</TableCell>
                  <TableCell>0123456</TableCell>
                  <TableCell>2024-01-31</TableCell>
                  <TableCell>₹15,000</TableCell>
                  <TableCell>₹0</TableCell>
                  <TableCell>₹0</TableCell>
                  <TableCell>State Bank of India</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="returns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TDS Returns Filing</h4>
              <div className="flex gap-2">
                <Dialog open={isFileReturnDialogOpen} onOpenChange={setIsFileReturnDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      File New Return
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>File TDS Return</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Return Type *</Label>
                          <Select value={returnData.returnType} onValueChange={(value) => setReturnData({...returnData, returnType: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select return type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="24Q">Form 24Q (Non-Salary)</SelectItem>
                              <SelectItem value="26Q">Form 26Q (Salary)</SelectItem>
                              <SelectItem value="27Q">Form 27Q (Other than Salary)</SelectItem>
                              <SelectItem value="27EQ">Form 27EQ (TCS)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Quarter *</Label>
                          <Select value={returnData.quarter} onValueChange={(value) => setReturnData({...returnData, quarter: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quarter" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Q1">Q1 (Apr-Jun)</SelectItem>
                              <SelectItem value="Q2">Q2 (Jul-Sep)</SelectItem>
                              <SelectItem value="Q3">Q3 (Oct-Dec)</SelectItem>
                              <SelectItem value="Q4">Q4 (Jan-Mar)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Financial Year *</Label>
                          <Select value={returnData.year} onValueChange={(value) => setReturnData({...returnData, year: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2024-25">2024-25</SelectItem>
                              <SelectItem value="2023-24">2023-24</SelectItem>
                              <SelectItem value="2022-23">2022-23</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Filing Date</Label>
                          <Input 
                            type="date"
                            value={returnData.filingDate}
                            onChange={(e) => setReturnData({...returnData, filingDate: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Acknowledgment Number</Label>
                        <Input 
                          value={returnData.acknowledgmentNumber}
                          onChange={(e) => setReturnData({...returnData, acknowledgmentNumber: e.target.value})}
                          placeholder="Enter acknowledgment number (after filing)"
                        />
                      </div>
                      <div className="bg-blue-50 p-4 rounded">
                        <h6 className="font-medium text-blue-800 mb-2">Filing Instructions:</h6>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Ensure all TDS deductions for the quarter are recorded</li>
                          <li>• Verify challan details and payment status</li>
                          <li>• Generate and review the return before filing</li>
                          <li>• Keep acknowledgment receipt for records</li>
                        </ul>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleFileReturn} className="flex-1">
                          File Return
                        </Button>
                        <Button variant="outline" onClick={() => setIsFileReturnDialogOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">₹15,000</div>
                    <div className="text-sm text-gray-600">TDS Collected This Quarter</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₹12,000</div>
                    <div className="text-sm text-gray-600">TDS Deposited</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">₹3,000</div>
                    <div className="text-sm text-gray-600">TDS Pending</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">4</div>
                    <div className="text-sm text-gray-600">Returns Filed</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Returns History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Returns Filing History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return Type</TableHead>
                      <TableHead>Quarter</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Filing Date</TableHead>
                      <TableHead>Acknowledgment No.</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Form 24Q</TableCell>
                      <TableCell>Q3</TableCell>
                      <TableCell>2023-24</TableCell>
                      <TableCell>2024-01-31</TableCell>
                      <TableCell>ACK123456789</TableCell>
                      <TableCell>
                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">Filed</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" onClick={() => handleViewReturn("1")}>
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Form 26Q</TableCell>
                      <TableCell>Q2</TableCell>
                      <TableCell>2023-24</TableCell>
                      <TableCell>2023-10-31</TableCell>
                      <TableCell>ACK987654321</TableCell>
                      <TableCell>
                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">Filed</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" onClick={() => handleViewReturn("2")}>
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Deduction Dialog */}
        <Dialog open={isEditDeductionDialogOpen} onOpenChange={setIsEditDeductionDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit TDS Deduction</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-600">Edit deduction details here...</p>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Update Deduction</Button>
                <Button variant="outline" onClick={() => setIsEditDeductionDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Return Dialog */}
        <Dialog open={isViewReturnDialogOpen} onOpenChange={setIsViewReturnDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>View TDS Return Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-600">Return details and status will be displayed here...</p>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsViewReturnDialogOpen(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TDSManagement;
