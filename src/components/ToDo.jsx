import { useState, useEffect } from "react";

export default function TodoList() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("") 
    useEffect(() => {
        const saved = localStorage.getItem("tasks")
        if (saved) setTasks(JSON.parse(saved))
    }, []) 
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])    
    const addTask = () => {
        if (!newTask.trim()) return
        setTasks([...tasks, { text: newTask, done: false }])
        setNewTask("")
    };  
    const toggleTask = (index) => {
        const updated = [...tasks]
        updated[index].done = !updated[index].done
        setTasks(updated)
    }  
    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index))
    }

    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col h-full">
            <h2 className="text-lg font-semibold mb-3">To-Do List</h2>   
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 border-0 rounded-lg px-3 py-1 focus:bg-gray-100"
                    placeholder="Add new task..."
                />
                <button onClick={addTask} className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-800 cursor-pointer">
                    Add
                </button>
            </div>  
            <ul className="space-y-2 overflow-auto">
                {tasks.map((task, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg">
                    <span className={`flex-1 cursor-pointer select-none ${task.done ? "line-through text-gray-500" : ""}`}
                    onClick={() => toggleTask(index)}>
                    {task.text}
                    </span>
                    <button onClick={() => deleteTask(index)} className="text-gray-800 hover:text-red-700 ml-2 cursor-pointer">
                    X
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}