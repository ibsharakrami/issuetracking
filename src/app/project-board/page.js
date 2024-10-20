"use client";
import { useState, useEffect } from 'react';
import { projects, issues } from '../../components/Mockdata.js'; // Import mock data

export default function ProjectBoard() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]); // Select first project by default
    }
  }, []);

  // Filter issues based on assignee, priority, and search term
  useEffect(() => {
    let filtered = issues;

    // Filter by assignee
    if (assigneeFilter) {
      filtered = filtered.filter(issue => issue.assignee === assigneeFilter);
    }

    // Filter by priority
    if (priorityFilter.length > 0) {
      filtered = filtered.filter(issue => priorityFilter.includes(issue.priority));
    }

    // Filter by search term
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regex
      filtered = filtered.filter(issue =>
        regex.test(issue.title) || regex.test(issue.description)
      );
    }

    setFilteredIssues(filtered);
  }, [assigneeFilter, priorityFilter, searchTerm]); // Add searchTerm to dependency array

  return (
    <div className="bg-white">
      {/* Project Details */}
      <div className="mb-4">
        <h2 className="text-2xl mb-2">Project Details</h2>
        <div className="flex gap-4">
          <div>
            <label className="block">Project Name:</label>
            <select
              className="border p-2"
              value={selectedProject?.id}
              onChange={(e) =>
                setSelectedProject(projects.find(p => p.id === Number(e.target.value)))
              }
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Owner:</label>
            <input
              type="text"
              className="border p-2"
              value={selectedProject?.owner}
              disabled
            />
          </div>
          <div>
            <label className="block">Start Date:</label>
            <input
              type="text"
              className="border p-2"
              value={selectedProject?.startDate}
              disabled
            />
          </div>
          <div>
            <label className="block">End Date:</label>
            <input
              type="text"
              className="border p-2"
              value={selectedProject?.endDate}
              disabled
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <h2 className="text-2xl mb-2">Search Issues</h2>
        <input
          type="text"
          placeholder="Search by summary or description..."
          className="border p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      {/* Filters */}
      <div className="mb-4">
        <h2 className="text-2xl mb-2">Filters</h2>
        <div className="flex gap-4">
          {/* Filter by Assignee Dropdown */}
          <div>
            <label className="block">Filter by Assignee:</label>
            <select
              className="border p-2"
              onChange={(e) => setAssigneeFilter(e.target.value)}
            >
              <option value="">Select Assignee</option>
              {/* Dynamically populate assignee options */}
              {[...new Set(issues.map(issue => issue.assignee))].map(assignee => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Priority Dropdown */}
          <div>
            <label className="block">Filter by Priority:</label>
            <select
              className="border p-2"
              multiple // Enable multi-select
              onChange={(e) => setPriorityFilter(
                Array.from(e.target.selectedOptions, option => option.value)
              )}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issue Board */}
      <div className="mb-4">
  <h2 className="text-2xl mb-2 text-black">All Issues</h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {['To-do', 'Development', 'Testing', 'Completed'].map(category => (
      <div key={category}>
        <h3 className="text-xl mb-2 text-black">{category}</h3>
        <div className="space-y-2">
          {filteredIssues
            .filter(issue => issue.category === category)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map(issue => (
              <div
                key={issue.id}
                className={`border p-4 rounded shadow
                  ${category === 'To-do' ? 'bg-blue-100' : ''}
                  ${category === 'Development' ? 'bg-green-100' : ''}
                  ${category === 'Testing' ? 'bg-yellow-100' : ''}
                  ${category === 'Completed' ? 'bg-gray-100' : ''}`}
              >
                <h4 className="font-bold truncate text-black">{issue.title}</h4>
                <p className="truncate text-black">{issue.description}</p>
                <p className='text-black'>Assignee: {issue.assignee}</p>
                <p
                  className={`inline-block px-2 py-1 rounded text-white font-semibold
                    ${issue.priority === 'High' ? 'bg-red-500' : ''}
                    ${issue.priority === 'Medium' ? 'bg-yellow-500' : ''}
                    ${issue.priority === 'Low' ? 'bg-green-500' : ''}`}
                >
                  {issue.priority}
                </p>
              </div>
            ))}
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
  );
}
