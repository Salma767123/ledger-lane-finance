import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Page imports
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Customers from "./pages/sales/Customers";
import CustomerDetail from "./pages/sales/CustomerDetail";
import Estimates from "./pages/sales/Estimates";
import SalesOrders from "./pages/sales/SalesOrders";
import Challans from "./pages/sales/Challans";
import Invoices from "./pages/sales/Invoices";
import Payments from "./pages/sales/Payments";
import CreditNotes from "./pages/sales/CreditNotes";
import Vendors from "./pages/purchase/Vendors";
import VendorDetail from "./pages/purchase/VendorDetail";
import PurchaseOrders from "./pages/purchase/PurchaseOrders";
import CreatePurchaseOrder from "./pages/purchase/CreatePurchaseOrder";
import ConvertToBill from "./pages/purchase/ConvertToBill";
import Bills from "./pages/purchase/Bills";
import TransactionHistory from "./pages/purchase/TransactionHistory";
import RecurringBills from "./pages/purchase/RecurringBills";
import VendorCredits from "./pages/purchase/VendorCredits";
import DebitNotes from "./pages/purchase/DebitNotes";
import GeneralLedger from "./pages/accounting/GeneralLedger";
import JournalEntries from "./pages/accounting/JournalEntries";
import Tax from "./pages/Tax";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Banking from "./pages/Banking";
import InventorySettings from "./pages/settings/InventorySettings";
import AccountSettings from "./pages/settings/AccountSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gray-50">
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <header className="border-b bg-white px-6 py-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <h1 className="text-xl font-semibold text-gray-900">Accounting Software</h1>
                </div>
              </header>
              <div className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/sales/customers" element={<Customers />} />
                  <Route path="/sales/customers/:customerId" element={<CustomerDetail />} />
                  <Route path="/sales/estimates" element={<Estimates />} />
                  <Route path="/sales/orders" element={<SalesOrders />} />
                  <Route path="/sales/challans" element={<Challans />} />
                  <Route path="/sales/invoices" element={<Invoices />} />
                  <Route path="/sales/payments" element={<Payments />} />
                  <Route path="/sales/credit-notes" element={<CreditNotes />} />
                  <Route path="/purchase/vendors" element={<Vendors />} />
                  <Route path="/purchase/vendors/:vendorId" element={<VendorDetail />} />
                  <Route path="/purchase/orders" element={<PurchaseOrders />} />
                  <Route path="/purchase/orders/create" element={<CreatePurchaseOrder />} />
                  <Route path="/purchase/orders/edit/:orderId" element={<CreatePurchaseOrder />} />
                  <Route path="/purchase/convert-to-bill/:orderId" element={<ConvertToBill />} />
                  <Route path="/purchase/bills" element={<Bills />} />
                  <Route path="/purchase/transactions" element={<TransactionHistory />} />
                  <Route path="/purchase/recurring-bills" element={<RecurringBills />} />
                  <Route path="/purchase/vendor-credits" element={<VendorCredits />} />
                  <Route path="/purchase/debit-notes" element={<DebitNotes />} />
                  <Route path="/accounting/general-ledger" element={<GeneralLedger />} />
                  <Route path="/accounting/journal-entries" element={<JournalEntries />} />
                  <Route path="/banking" element={<Banking />} />
                  <Route path="/tax" element={<Tax />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/settings/inventory" element={<InventorySettings />} />
                  <Route path="/settings/accounts" element={<AccountSettings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
