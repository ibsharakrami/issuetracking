"use client";
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false); // Close sidebar when close button is clicked
  };

  return (
    <div className="flex bg-[#053576]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

      {/* Main content area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
        <Header onMenuClick={handleMenuClick} />
        <main className="p-4 bg-white flex-1 h-screen">{children}</main> {/* Ensure children are rendered */}
      </div>
    </div>
  );
}
