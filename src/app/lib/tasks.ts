import { Task } from '../types';

export const getTasks = async (): Promise<Task[]> => {
  // Simulate fetching from database
  return [
    {
      id: '1',
      title: 'Design new logo',
      description: 'Design a new logo for the client',
      assignee: 'John Doe',
      priority: 'High',
      dueDate: '2024-10-20',
      status: 'In Progress',
    },
    {
      id: '2',
      title: 'Update landing page',
      assignee: 'Jane Smith',
      priority: 'Medium',
      dueDate: '2024-10-25',
      status: 'To Do',
    },
  ];
};
