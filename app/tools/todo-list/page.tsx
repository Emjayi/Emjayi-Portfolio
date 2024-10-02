'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { cn } from '@/util/cn';

interface Task {
    text: string;
    priority: string;
    date: Date;
}

const Todo = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<string>('');
    const [priority, setPriority] = useState<string>('Low');
    const [search, setSearch] = useState<string>('');

    const addTask = () => {
        if (task) {
            setTasks([...tasks, { text: task, priority, date: new Date() }]);
            setTask('');
        }
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const filteredTasks = tasks.filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-4">

            <Input
                type="text"
                placeholder="New task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full"
            />

            <div className="flex items-center space-x-2">
                <span>Priority:</span>
                <Select value={priority} onValueChange={(value) => setPriority(value)}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={addTask} className="">
                Add Task
            </Button>

            {tasks.length > 0 && (
                <Input
                    type="text"
                    placeholder="Search tasks"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                />
            )}
            <ul className="list-disc pl-5 flex flex-col gap-2">
                {filteredTasks.map((t, index) => (
                    <li key={index} className="flex items-center justify-between gap-2">
                        <div className='flex items-center justify-between w-full gap-2'>
                            <p><span className={cn("text-sm text-red-400")}>({t.priority}) </span>{t.text}</p>
                            <p className="text-sm text-gray-400">
                                {t.date.toLocaleTimeString()}
                            </p>
                        </div>
                        <Button variant="destructive" onClick={() => deleteTask(index)}>
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </div >
    );
}

export default Todo;
