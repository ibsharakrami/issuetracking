
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock data for users (replace with actual API call)
const users = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Bob Johnson' },
]

export default function CreateProjectForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    startDate: '',
    endDate: '',
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
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Project Name is required'
        } else if (value.length > 150) {
          newErrors.name = 'Project Name must not exceed 150 characters'
        } else if (!/^[a-zA-Z0-9\s\-\/|.]+$/.test(value)) {
          newErrors.name = 'Only -, /, |, and . special characters are allowed'
        } else {
          delete newErrors.name
        }
        break
      case 'owner':
        if (!value) {
          newErrors.owner = 'Project Owner is required'
        } else {
          delete newErrors.owner
        }
        break
      case 'startDate':
      case 'endDate':
        if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          newErrors[name] = 'Date must be in ISO format (YYYY-MM-DD)'
        } else {
          delete newErrors[name]
        }
        break
    }
    setErrors(newErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(errors).length === 0) {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Simulate successful submission
        console.log('Form submitted:', formData)
        router.push('/project-board')
      } catch (error) {
        alert('Error creating project: ' + error.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      owner: '',
      startDate: '',
      endDate: '',
    })
    setErrors({})
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold  mb-6 text-black">Create Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-black border-2 text-black h-12  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            maxLength={150}
            required
          />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
            Project Owner
          </label>
          <select
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-black border-2 text-black h-12 bg-blue-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value="">Select Project Owner</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {errors.owner && <p className="mt-2 text-sm text-red-600">{errors.owner}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Project Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-black border-2 text-black h-12 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.startDate && <p className="mt-2 text-sm text-red-600">{errors.startDate}</p>}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              Project End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-black border-2 text-black h-12 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.endDate && <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            {isLoading ? 'Creating...' : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  )
}
