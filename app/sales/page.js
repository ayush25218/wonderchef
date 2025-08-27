import Header from "../../components/Header";
import Link from "next/link";
import { PlusCircle, List, FileText, BarChart2 } from "lucide-react";

const ActionCard = ({ href, icon: Icon, title, description }) => {
  return (
      <Link href={href} className="card p-6 bg-white shadow-xl rounded-2xl transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 w-fit">
          <Icon size={24} />
        </div>
        <h3 className="mt-4 font-bold text-lg text-gray-800">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </Link>
  );
};

export default function Page() {
  return (
      <div>
        <Header title="Sales Management" />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard
              href="/sales/add-new"
              icon={PlusCircle}
              title="Add New Sale"
              description="Record a new sale transaction with customer and product details."
          />
          <ActionCard
              href="/sales/list"
              icon={List}
              title="Sales History"
              description="View and manage all past sales transactions and customer history."
          />
          <ActionCard
              href="/sales/invoices"
              icon={FileText}
              title="Invoices & Receipts"
              description="Generate, print, and share invoices for your sales."
          />
          <ActionCard
              href="/sales/report"
              icon={BarChart2}
              title="Sales Reports"
              description="Analyze sales data with modern graphs and detailed insights."
          />
        </div>
      </div>
  );
}