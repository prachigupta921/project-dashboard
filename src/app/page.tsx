'use client'; // Marks this component as a Client Component

import { useState, useEffect } from 'react';
import TaskModal from './components/TaskModal';
import { Task, Status } from './types';

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Status | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    // Simulate fetching tasks
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks'); // Adjust this to your API
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) => filter === 'All' || task.status === filter
  );

  const openModal = (task?: Task) => {
    setEditingTask(task || null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const updateTaskList = (updatedTask: Task) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((t) => t.id === updatedTask.id);
      if (taskIndex === -1) {
        return [...prevTasks, updatedTask];
      } else {
        const updatedTasks = [...prevTasks];
        updatedTasks[taskIndex] = updatedTask;
        return updatedTasks;
      }
    });
  };

  return (
    <div className="dashboard">
      <h1>Project Tasks</h1>
      <div className="filter">
        <label>Filter by Status: </label>
        <select onChange={(e) => setFilter(e.target.value as Status)}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={() => openModal()}>Add Task</button>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-card">
            <h2>{task.title}</h2>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Assignee: {task.assignee}</p>
            <p>Due Date: {task.dueDate}</p>
            <button onClick={() => openModal(task)}>Edit</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          closeModal={closeModal}
          updateTaskList={updateTaskList}
        />
      )}
    </div>
  );
};

export default Dashboard;
