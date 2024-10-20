"use client";
import { useState, useEffect } from 'react';
import { projects, issues } from '../../components/Mockdata.js'; // Import mock data

export default function ProjectBoard() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState([]);

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]); // Select first project by default
    }
  }, []);

  // Filter issues based on assignee and priority
  useEffect(() => {
    let filtered = issues;

    if (assigneeFilter) {
      filtered = filtered.filter(issue => issue.assignee === assigneeFilter);
    }

    if (priorityFilter.length > 0) {
      filtered = filtered.filter(issue => priorityFilter.includes(issue.priority));
    }

    setFilteredIssues(filtered);
  }, [assigneeFilter, priorityFilter]);

  return (
    <div className=" bg-white">
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

      {/* Filters */}
      <div className="mb-4">
        <h2 className="text-2xl mb-2">Filters</h2>
        <div className="flex gap-4">
          <div>
            <label className="block">Filter by Assignee:</label>
            <select
              className="border p-2"
              onChange={(e) => setAssigneeFilter(e.target.value)}
            >
              <option value="">Select Assignee</option>
              {[...new Set(issues.map(issue => issue.assignee))].map(assignee => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Filter by Priority:</label>
            <select
              className="border p-2"
              multiple
              onChange={(e) => setPriorityFilter(
                Array.from(e.target.selectedOptions, option => option.value)
              )}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issue Board */}
      <div className="mb-4">
        <h2 className="text-2xl mb-2">All Issues</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['To-do', 'Development', 'Testing', 'Completed'].map(category => (
            <div key={category}>
              <h3 className="text-xl mb-2">{category}</h3>
              <div className="space-y-2">
                {filteredIssues
                  .filter(issue => issue.category === category)
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  .map(issue => (
                    <div key={issue.id} className="border p-4 bg-white rounded shadow">
                      <h4 className="font-bold truncate">{issue.title}</h4>
                      <p className="truncate">{issue.description}</p>
                      <p>Assignee: {issue.assignee}</p>
                      <p className={`text-${issue.priority === 'High' ? 'red' : issue.priority === 'Medium' ? 'yellow' : 'green'}-500`}>
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

