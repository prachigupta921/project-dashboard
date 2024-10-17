import { useState } from 'react';
import { Task } from '../types';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface TaskModalProps {
  task: Task | null;
  closeModal: () => void;
  updateTaskList: (task: Task) => void;
}

const TaskModal = ({ task, closeModal, updateTaskList }: TaskModalProps) => {
  const isEditing = Boolean(task);
  const formik = useFormik({
    initialValues: {
      title: task?.title || '',
      description: task?.description || '',
      assignee: task?.assignee || '',
      priority: task?.priority || 'Low',
      dueDate: task?.dueDate || '',
      status: task?.status || 'To Do',
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      dueDate: yup.string().required('Due Date is required'),
    }),
    onSubmit: (values) => {
      const updatedTask: Task = {
        ...task,
        ...values,
        id: task?.id || new Date().toISOString(),
      };
      updateTaskList(updatedTask);
      closeModal();
    },
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEditing ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Title</label>
            <input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.title && formik.touched.title && (
              <div className="error">{formik.errors.title}</div>
            )}
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label>Assignee</label>
            <input
              name="assignee"
              value={formik.values.assignee}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label>Priority</label>
            <select
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
            />
            {formik.errors.dueDate && formik.touched.dueDate && (
              <div className="error">{formik.errors.dueDate}</div>
            )}
          </div>
          <div>
            <label>Status</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit">{isEditing ? 'Update Task' : 'Create Task'}</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
