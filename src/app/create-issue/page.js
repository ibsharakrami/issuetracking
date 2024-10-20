'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock data for dropdowns
const issueTypes = ['Bug', 'Feature', 'Task']
const projects = [
  { id: '1', name: 'Project A' },
  { id: '2', name: 'Project B' },
  { id: '3', name: 'Project C' },
]
const priorities = ['Low', 'Medium', 'High']
const users = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Bob Johnson' },
]

export default function CreateIssueForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    summary: '',
    type: '',
    project: '',
    description: '',
    priority: '',
    assignee: '',
    tags: '',
    storyPoint: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const validateField = (name, value) => {
    let newErrors = { ...errors }
    switch (name) {
      case 'summary':
        if (!value.trim()) {
          newErrors.summary = 'Summary is required'
        } else if (value.length > 150) {
          newErrors.summary = 'Summary must not exceed 150 characters'
        } else if (!/^[a-zA-Z0-9\s\-\/|.]+$/.test(value)) {
          newErrors.summary = 'Only -, /, |, and . special characters are allowed'
        } else {
          delete newErrors.summary
        }
        break
      case 'type':
      case 'project':
      case 'priority':
      case 'assignee':
        if (!value) {
          newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
        } else {
          delete newErrors[name]
        }
        break
      case 'description':
        if (value.length > 500) {
          newErrors.description = 'Description must not exceed 500 characters'
        } else {
          delete newErrors.description
        }
        break
      case 'tags':
        if (value.length > 100) {
          newErrors.tags = 'Tags must not exceed 100 characters'
        } else {
          delete newErrors.tags
        }
        break
      case 'storyPoint':
        const num = parseInt(value)
        if (isNaN(num) || num <= 1 || !isPrime(num)) {
          newErrors.storyPoint = 'Story Point must be a prime number'
        } else {
          delete newErrors.storyPoint
        }
        break
    }
    setErrors(newErrors)
  }

  const isPrime = (num) => {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
      if (num % i === 0) return false
    return num > 1
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(errors).length === 0) {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Simulate successful submission
        console.log('Form submitted:', formData)
        router.push('/project-board')
      } catch (error) {
        alert('Error creating issue: ' + error.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      summary: '',
      type: '',
      project: '',
      description: '',
      priority: '',
      assignee: '',
      tags: '',
      storyPoint: '',
    })
    setErrors({})
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-left text-black mb-6">Create Issue</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-black border-2 text-black h-8 bg-blue-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Type</option>
                {issueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && <p className="mt-2 text-sm text-red-600">{errors.type}</p>}
            </div>
            <div>
              <label htmlFor="project" className="block text-sm font-medium text-gray-700">Project</label>
              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-black border-2 text-black h-8 shadow-sm bg-yellow-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
              {errors.project && <p className="mt-2 text-sm text-red-600">{errors.project}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-black border-2 text-black h-8 bg-red-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Priority</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
              {errors.priority && <p className="mt-2 text-sm text-red-600">{errors.priority}</p>}
            </div>
            <div>
              <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
              <select
                id="assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-black border-2 text-black h-8  bg-green-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Assignee</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              {errors.assignee && <p className="mt-2 text-sm text-red-600">{errors.assignee}</p>}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-black">
              Summary (Max:150 Letter):
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={3}
              className="mt-1 block w-full rounded-md border-black border-2 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.summary}
              onChange={handleChange}
              maxLength={150}
              required
            />
            {errors.summary && <p className="mt-2 text-sm text-red-600">{errors.summary}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-black">
              Description (max length: 500)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 block w-full rounded-md border-black border-2 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.description}
              onChange={handleChange}
              maxLength={500}
            />
            {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-black border-2 text-black h-8 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              maxLength={100}
            />
            {errors.tags && <p className="mt-2 text-sm text-red-600">{errors.tags}</p>}
          </div>
          <div>
            <label htmlFor="storyPoint" className="block text-sm font-medium text-gray-700">Story Point</label>
            <input
              type="number"
              id="storyPoint"
              name="storyPoint"
              value={formData.storyPoint}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-black border-2 text-black h-8 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.storyPoint && <p className="mt-2 text-sm text-red-600">{errors.storyPoint}</p>}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            {isLoading ? 'Creating...' : 'Create Issue'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  )
}
