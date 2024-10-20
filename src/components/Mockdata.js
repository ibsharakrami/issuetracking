// mockData.js
export const projects = [
  {
    id: 1,
    name: 'Project A',
    owner: 'John Doe',
    startDate: '01-09-2023',
    endDate: '01-12-2023',
  },
  {
    id: 2,
    name: 'Project B',
    owner: 'Jane Smith',
    startDate: '05-08-2023',
    endDate: '10-10-2023',
  },
];

export const issues = [
  {
    id: 1,
    title: 'Implement Authentication',
    description: 'Build the login system',
    assignee: 'Alice',
    priority: 'High',
    category: 'To-do',
    updatedAt: '2023-10-18',
  },
  {
    id: 2,
    title: 'Fix UI Bugs',
    description: 'Resolve padding and margin issues',
    assignee: 'Bob',
    priority: 'Medium',
    category: 'Development',
    updatedAt: '2023-10-16',
  },
  // Add more mock issues here
];
