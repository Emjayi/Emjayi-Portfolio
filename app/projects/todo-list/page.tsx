"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Check, Plus, Trash2 } from "lucide-react"
import Cookies from "js-cookie"

interface Task {
    id: string
    text: string
    completed: boolean
}

const COOKIE_NAME = "neumorphic-tasks"

export default function NeumorphicTodo() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskText, setNewTaskText] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)

    // Load tasks from cookies on initial render
    useEffect(() => {
        const savedTasks = Cookies.get(COOKIE_NAME)
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks))
            } catch (error) {
                console.error("Failed to parse tasks from cookie:", error)
            }
        } else {
            // Set default tasks if no cookie exists
            setTasks([
            ])
        }
        setIsLoaded(true)
    }, [])

    // Save tasks to cookies whenever they change
    useEffect(() => {
        if (isLoaded) {
            Cookies.set(COOKIE_NAME, JSON.stringify(tasks), { expires: 30 }) // Expires in 30 days
        }
    }, [tasks, isLoaded])

    const addTask = () => {
        if (newTaskText.trim() === "") return
        const newTask: Task = {
            id: Date.now().toString(),
            text: newTaskText,
            completed: false,
        }
        setTasks([...tasks, newTask])
        setNewTaskText("")
    }

    const toggleTask = (id: string) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f0f3] p-4">
            <div className="w-full max-w-md">
                <div
                    className="p-8 rounded-3xl bg-[#f0f0f3]"
                    style={{
                        boxShadow: "10px 10px 20px #d1d1d4, -10px -10px 20px #ffffff",
                    }}
                >
                    <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Simple Todo List</h1>

                    {/* Input area */}
                    <div
                        className="flex items-center mb-8 p-4 rounded-2xl bg-[#f0f0f3]"
                        style={{
                            boxShadow: "inset 5px 5px 10px #d1d1d4, inset -5px -5px 10px #ffffff",
                        }}
                    >
                        <input
                            type="text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add a new task..."
                            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                        />
                        <button
                            onClick={addTask}
                            className="ml-2 p-2 rounded-full bg-[#f0f0f3] text-gray-600 hover:text-gray-800 transition-colors duration-200"
                            style={{
                                boxShadow: "3px 3px 6px #d1d1d4, -3px -3px 6px #ffffff",
                            }}
                        >
                            <Plus size={18} />
                            <span className="sr-only">Add task</span>
                        </button>
                    </div>

                    {/* Tasks list */}
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center justify-between p-4 rounded-full bg-[#f0f0f3] transition-all duration-300"
                                style={{
                                    boxShadow: "5px 5px 10px #d1d1d4, -5px -5px 10px #ffffff",
                                }}
                            >
                                <div className="flex items-center">
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center transition-all duration-300 ${task.completed ? "bg-[#e6e7ec] text-green-500" : "bg-[#f0f0f3]"
                                            }`}
                                        style={{
                                            boxShadow: task.completed
                                                ? "inset 2px 2px 5px #d1d1d4, inset -2px -2px 5px #ffffff"
                                                : "3px 3px 6px #d1d1d4, -3px -3px 6px #ffffff",
                                        }}
                                        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                                    >
                                        {task.completed && <Check size={14} />}
                                    </button>
                                    <span
                                        className={`text-gray-700 transition-all duration-300 ${task.completed ? "line-through text-gray-400" : ""
                                            }`}
                                    >
                                        {task.text}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors duration-200"
                                    aria-label="Delete task"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Task count */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        {tasks.filter((task) => !task.completed).length} tasks remaining
                    </div>
                </div>
            </div>
        </div>
    )
}
