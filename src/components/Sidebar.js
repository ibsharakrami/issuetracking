"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiX } from 'react-icons/hi';
import { usePathname } from 'next/navigation'; // Import usePathname
import Image from 'next/image';

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname(); // Get the current path

  const links = [
    { path: '/project-board', label: 'Project Board' },
    { path: '/create-project', label: 'Create Project' },
    { path: '/create-issue', label: 'Create Issue' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#053576] text-white md:w-64 w-full p-4 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
      aria-hidden={!isOpen} // Accessibility improvement
    >
      <button
        className="md:hidden text-3xl absolute top-4 right-4"
        onClick={onClose}
        aria-label="Close Sidebar" // Accessibility improvement
      >
        <HiX />
      </button>
      <ul className="space-y-4">
      <Link href="/"><Image
          src={'/images/ISS.png'}

          width={160}
          height={80}
        /></Link>
        {links.map(({ path, label }) => (
          <li key={path}>
            <Link href={path} onClick={onClose}>
              <span
                className={`block p-2 rounded transition-colors ${
                  pathname === path
                    ? 'font-bold bg-white text-blue-500 border-l-8 border-blue-500' // Active link styles
                    : 'text-white hover:bg-blue-500 border-l-8 border-white' // Inactive link styles
                }`}
              >
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
