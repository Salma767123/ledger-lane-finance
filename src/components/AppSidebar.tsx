
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
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full">
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
                                  className={location.pathname === subItem.url ? "bg-accent" : ""}
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
                        className={location.pathname === item.url ? "bg-accent" : ""}
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
