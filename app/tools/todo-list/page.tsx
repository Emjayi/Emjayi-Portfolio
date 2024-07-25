'use client'
// pages/todo.tsx
import { useState } from 'react';

interface Task {
    text: string;
    priority: string;
}

const Todo = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<string>('');
    const [priority, setPriority] = useState<string>('Low');
    const [search, setSearch] = useState<string>('');

    const addTask = () => {
        if (task) {
            setTasks([...tasks, { text: task, priority }]);
            setTask('');
        }
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const filteredTasks = tasks.filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <h1>To-Do List</h1>
            <input
                type="text"
                placeholder="Search tasks"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <input
                type="text"
                placeholder="New task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <label>
                Priority:
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </label>
            <button onClick={addTask}>Add Task</button>
            <ul>
                {filteredTasks.map((t, index) => (
                    <li key={index}>
                        {t.text} ({t.priority}) <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todo;
