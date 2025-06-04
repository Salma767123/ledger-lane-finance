
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Activity, 
  Archive, 
  Book, 
  Building2,
  Calendar, 
  ChartBar, 
  Clipboard, 
  Grid3x3, 
  Inbox, 
  PieChart, 
  Receipt, 
  Settings, 
  Tag, 
  Users, 
  Wallet 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Grid3x3,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Archive,
  },
  {
    title: "Sales",
    icon: ChartBar,
    items: [
      { title: "Customers", url: "/sales/customers" },
      { title: "Estimates", url: "/sales/estimates" },
      { title: "Sales Orders", url: "/sales/orders" },
      { title: "Challans", url: "/sales/challans" },
      { title: "Invoices", url: "/sales/invoices" },
      { title: "Payments", url: "/sales/payments" },
      { title: "Credit Notes", url: "/sales/credit-notes" },
    ],
  },
  {
    title: "Purchase",
    icon: Inbox,
    items: [
      { title: "Vendors", url: "/purchase/vendors" },
      { title: "Purchase Orders", url: "/purchase/orders" },
      { title: "Bills", url: "/purchase/bills" },
      { title: "Transaction History", url: "/purchase/transactions" },
      { title: "Recurring Bills", url: "/purchase/recurring-bills" },
      { title: "Vendor Credits", url: "/purchase/vendor-credits" },
      { title: "Debit Notes", url: "/purchase/debit-notes" },
    ],
  },
  {
    title: "Accounting",
    icon: Book,
    items: [
      { title: "General Ledger", url: "/accounting/general-ledger" },
      { title: "Journal Entries", url: "/accounting/journal-entries" },
    ],
  },
  {
    title: "Banking",
    url: "/banking",
    icon: Building2,
  },
  {
    title: "Tax",
    url: "/tax",
    icon: Receipt,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: PieChart,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r shadow-sm">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-blue-600 px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full hover:bg-blue-50 transition-colors">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link 
                                  to={subItem.url}
                                  className={`transition-colors ${
                                    location.pathname === subItem.url 
                                      ? "bg-blue-100 text-blue-700 font-medium" 
                                      : "hover:bg-gray-50"
                                  }`}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.url!}
                        className={`transition-colors ${
                          location.pathname === item.url 
                            ? "bg-blue-100 text-blue-700 font-medium" 
                            : "hover:bg-blue-50"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
