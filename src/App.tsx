import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Dashboard
import Dashboard from "@/pages/Dashboard";
import Index from "@/pages/Index";

// Sales
import Customers from "@/pages/sales/Customers";
import CustomerDetail from "@/pages/sales/CustomerDetail";
import Invoices from "@/pages/sales/Invoices";
import Payments from "@/pages/sales/Payments";
import SalesOrders from "@/pages/sales/SalesOrders";
import Challans from "@/pages/sales/Challans";
import CreditNotes from "@/pages/sales/CreditNotes";
import Estimates from "@/pages/sales/Estimates";

// Purchase
import Vendors from "@/pages/purchase/Vendors";
import VendorDetail from "@/pages/purchase/VendorDetail";
import PurchaseOrders from "@/pages/purchase/PurchaseOrders";
import CreatePurchaseOrder from "@/pages/purchase/CreatePurchaseOrder";
import ConvertToBill from "@/pages/purchase/ConvertToBill";
import Bills from "@/pages/purchase/Bills";
import CreateBill from "@/pages/purchase/CreateBill";
import RecordPayment from "@/pages/purchase/RecordPayment";
import DebitNotes from "@/pages/purchase/DebitNotes";
import VendorCredits from "@/pages/purchase/VendorCredits";
import RecurringBills from "@/pages/purchase/RecurringBills";
import TransactionHistory from "@/pages/purchase/TransactionHistory";

// Accounting
import JournalEntries from "@/pages/accounting/JournalEntries";
import GeneralLedger from "@/pages/accounting/GeneralLedger";

// Other
import Inventory from "@/pages/Inventory";
import Banking from "@/pages/Banking";
import Reports from "@/pages/Reports";
import Tax from "@/pages/Tax";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <QueryClient>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Sales Routes */}
          <Route path="/sales/customers" element={<Customers />} />
          <Route path="/sales/customers/:id" element={<CustomerDetail />} />
          <Route path="/sales/invoices" element={<Invoices />} />
          <Route path="/sales/payments" element={<Payments />} />
          <Route path="/sales/sales-orders" element={<SalesOrders />} />
          <Route path="/sales/challans" element={<Challans />} />
          <Route path="/sales/credit-notes" element={<CreditNotes />} />
          <Route path="/sales/estimates" element={<Estimates />} />
          
          {/* Purchase Routes */}
          <Route path="/purchase/vendors" element={<Vendors />} />
          <Route path="/purchase/vendors/:id" element={<VendorDetail />} />
          <Route path="/purchase/orders" element={<PurchaseOrders />} />
          <Route path="/purchase/orders/create" element={<CreatePurchaseOrder />} />
          <Route path="/purchase/convert-to-bill/:orderId" element={<ConvertToBill />} />
          <Route path="/purchase/bills" element={<Bills />} />
          <Route path="/purchase/bills/create" element={<CreateBill />} />
          <Route path="/purchase/record-payment/:billId" element={<RecordPayment />} />
          <Route path="/purchase/debit-notes" element={<DebitNotes />} />
          <Route path="/purchase/vendor-credits" element={<VendorCredits />} />
          <Route path="/purchase/recurring-bills" element={<RecurringBills />} />
          <Route path="/purchase/transaction-history" element={<TransactionHistory />} />
          
          {/* Accounting Routes */}
          <Route path="/accounting/journal-entries" element={<JournalEntries />} />
          <Route path="/accounting/general-ledger" element={<GeneralLedger />} />
          
          {/* Other Routes */}
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/tax" element={<Tax />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClient>
  );
}

export default App;
