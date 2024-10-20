"use client";
import Image from 'next/image';
import Link from 'next/link';
import { HiMenuAlt3 } from 'react-icons/hi'; // Import menu icon
import { useState } from 'react';

export default function Header({ onMenuClick, onSearchChange }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
    onSearchChange(e.target.value); // Pass search value to Layout
    console.log('Search Input Changed:', e.target.value);
  };

  return (
    <header className="flex justify-between items-center bg-[#053576] text-white p-4">
      <div className="text-lg font-bold ">
        <Link href="/"><Image
          src={'/images/ISS.png'}
          width={100}
          height={40}
          className='md:hidden'
        /></Link>
      </div>
      {/* Search bar (optional) */}
      <div className="hidden md:block w-1/3">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchInputChange}
          className="w-full p-2 rounded-xl  border border-gray-600 bg-slate-50"
        />
      </div>
      <div className="flex items-center space-x-4">
        {/* Profile icon */}
        <div className="hidden md:block">
          <Link href="/profile">
          <Image
          src={'/images/pro.png'}
          width={50}
          height={50}

        />
          </Link>
        </div>
        {/* Menu button */}
        <button
          className="block md:hidden text-3xl"
          onClick={onMenuClick}
        >
          <HiMenuAlt3 /> {/* Hamburger menu icon */}
        </button>
      </div>
    </header>
  );
}

