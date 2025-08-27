import "./globals.css";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "WonderChef Admin",
  description: "Product Selling & Management System Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="ml-[var(--sidebar-width)] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
