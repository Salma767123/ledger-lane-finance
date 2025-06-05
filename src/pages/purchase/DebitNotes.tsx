
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DebitNotes = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  
  const [debitNotes, setDebitNotes] = useState([
    { id: 1, noteNo: "DN-001", vendor: "Tech Supplies Ltd", date: "2024-01-15", amount: 5000, reason: "Defective goods returned", status: "Pending" },
    { id: 2, noteNo: "DN-002", vendor: "Office Equipment Co", date: "2024-01-16", amount: 3200, reason: "Price adjustment", status: "Approved" },
    { id: 3, noteNo: "DN-003", vendor: "Software Solutions", date: "2024-01-17", amount: 2500, reason: "Late delivery penalty", status: "Processed" },
    { id: 4, noteNo: "DN-004", vendor: "Furniture World", date: "2024-01-18", amount: 4500, reason: "Damaged items", status: "Pending" }
  ]);

  const [newNote, setNewNote] = useState({
    vendor: "",
    reason: "",
    amount: "",
    description: ""
  });

  const handleCreateNote = () => {
    if (newNote.vendor && newNote.reason && newNote.amount) {
      const note = {
        id: debitNotes.length + 1,
        noteNo: `DN-${String(debitNotes.length + 1).padStart(3, '0')}`,
        vendor: newNote.vendor,
        date: new Date().toISOString().split('T')[0],
        amount: parseFloat(newNote.amount),
        reason: newNote.reason,
        status: "Pending"
      };
      setDebitNotes([...debitNotes, note]);
      setNewNote({ vendor: "", reason: "", amount: "", description: "" });
      setIsCreateDialogOpen(false);
      toast({
        title: "Debit Note Created",
        description: `Debit note ${note.noteNo} has been created successfully.`
      });
    }
  };

  const handleViewNote = (note) => {
    setSelectedNote(note);
    setIsViewDialogOpen(true);
  };

  const handleDeleteNote = (noteId) => {
    setDebitNotes(debitNotes.filter(note => note.id !== noteId));
    toast({
      title: "Debit Note Deleted",
      description: "Debit note has been deleted successfully."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Processed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Debit Notes
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Debit Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Debit Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Vendor *</label>
                <Select value={newNote.vendor} onValueChange={(value) => setNewNote({...newNote, vendor: value})}>
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
                <label className="text-sm font-medium">Reason *</label>
                <Select value={newNote.reason} onValueChange={(value) => setNewNote({...newNote, reason: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Defective goods returned">Defective goods returned</SelectItem>
                    <SelectItem value="Price adjustment">Price adjustment</SelectItem>
                    <SelectItem value="Late delivery penalty">Late delivery penalty</SelectItem>
                    <SelectItem value="Damaged items">Damaged items</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Amount *</label>
                <Input 
                  type="number"
                  value={newNote.amount}
                  onChange={(e) => setNewNote({...newNote, amount: e.target.value})}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input 
                  value={newNote.description}
                  onChange={(e) => setNewNote({...newNote, description: e.target.value})}
                  placeholder="Enter description"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateNote} className="flex-1">
                  Create Debit Note
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
            <CardTitle>Debit Notes List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search debit notes..." className="pl-10 w-64" />
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
                <TableHead>Note No</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {debitNotes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell className="font-medium">{note.noteNo}</TableCell>
                  <TableCell>{note.vendor}</TableCell>
                  <TableCell>{note.date}</TableCell>
                  <TableCell>{note.reason}</TableCell>
                  <TableCell>₹{note.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(note.status)}`}>
                      {note.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewNote(note)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteNote(note.id)}>
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
            <DialogTitle>Debit Note Details</DialogTitle>
          </DialogHeader>
          {selectedNote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Note Number</label>
                  <p className="text-lg font-semibold">{selectedNote.noteNo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedNote.status)}`}>
                    {selectedNote.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Vendor</label>
                  <p>{selectedNote.vendor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Date</label>
                  <p>{selectedNote.date}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-600">Reason</label>
                  <p>{selectedNote.reason}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-600">Amount</label>
                  <p className="text-2xl font-bold text-red-600">₹{selectedNote.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button>Approve Note</Button>
                <Button variant="outline">Edit Note</Button>
                <Button variant="outline">Print Note</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DebitNotes;
