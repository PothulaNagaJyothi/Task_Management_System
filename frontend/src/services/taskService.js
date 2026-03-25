import api from '../api/axios';

export const getTasksCall = async (params) => {
  const res = await api.get('/tasks', { params });
  return res.data;
};

export const getAnalyticsCall = async () => {
  const res = await api.get('/tasks/analytics');
  return res.data;
};

export const createTaskCall = async (taskData) => {
  const res = await api.post('/tasks', taskData);
  return res.data;
};

export const updateTaskCall = async (id, taskData) => {
  const res = await api.patch(`/tasks/${id}`, taskData);
  return res.data;
};

export const deleteTaskCall = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

export const completeTaskCall = async (id) => {
  const res = await api.patch(`/tasks/${id}/complete`);
  return res.data;
};
