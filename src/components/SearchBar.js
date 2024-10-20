"use client"
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search issues..."
      className="bg-white text-black p-2 rounded w-96"
    />
  );
}
