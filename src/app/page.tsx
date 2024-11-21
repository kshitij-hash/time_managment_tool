'use client'

import { useState } from 'react'
import { CreateTaskForm } from './components/CreateTask'
interface Task {
  id: number
  name: string
  urgent: boolean
  important: boolean
  timeUnder5Min: boolean
}
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  const handleTaskCreated = (newTask: Task) => {
    setTasks([...tasks, newTask])
    console.log("New task created:", newTask)
    // Here you would typically send the new task to your backend API
  }
  return (
    <main className="container flex justify-center items-center flex-col min-h-[90vh] mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Time Management App</h1>
      <CreateTaskForm onTaskCreated={handleTaskCreated} />
    </main>
  )
}
