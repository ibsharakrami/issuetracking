"use client";
import { cloneElement, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ProjectBoard from '@/app/project-board/page';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false); // Close sidebar when close button is clicked
  };
  const handleSearchChange = (query) => {
    console.log(query ,"jjj")
    setSearchQuery(query); // Update the search query
  };
  const enhancedChildren = cloneElement(children, { searchQuery });
  return (
    <div className="flex bg-[#053576]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

      {/* Main content area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
      <Header onMenuClick={handleMenuClick} onSearchChange={handleSearchChange} />
        <main className="p-4 bg-white flex-1 ">{enhancedChildren}
        {/* <ProjectBoard searchQuery={searchQuery} /> */}
        </main> {/* Ensure children are rendered */}
      </div>
    </div>
  );
}
