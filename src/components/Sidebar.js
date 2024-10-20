"use client";
import Link from 'next/link';
import { HiX } from 'react-icons/hi'; // Import close icon

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white md:w-64 w-full p-4 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`} // Hide/show sidebar based on isOpen
    >
      <button
        className="md:hidden text-3xl absolute top-4 right-4"
        onClick={onClose}
      >
        <HiX /> {/* Close icon for mobile */}
      </button>
      <ul className="space-y-4">
        <li>
          <Link href="/project-board" className="hover:underline">
            Project Board
          </Link>
        </li>
        <li>
          <Link href="/create-project" className="hover:underline">
            Create Project
          </Link>
        </li>
        <li>
          <Link href="/create-issue" className="hover:underline">
            Create Issue
          </Link>
        </li>
      </ul>
    </div>
  );
}
