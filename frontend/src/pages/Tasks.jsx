import React, { useState, useEffect } from 'react';
import { getTasksCall, createTaskCall, updateTaskCall, deleteTaskCall, completeTaskCall } from '../services/taskService';
import { Plus, Search, Filter, Edit2, Trash2, CheckCircle, ChevronLeft, ChevronRight, Check, Circle } from 'lucide-react';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination & Filtering state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Confirm Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [page, statusFilter, priorityFilter, searchQuery, sortBy, order]);

  // Use a debounced search or manual form submit. For simplicity, effect triggers on search change 
  // but we can optimize it if needed.

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasksCall({
        page,
        limit: 9,
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
        search: searchQuery || undefined,
        sortBy,
        order
      });
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      setActionLoading(true);
      await createTaskCall(taskData);
      setIsModalOpen(false);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create task');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      setActionLoading(true);
      await updateTaskCall(editingTask._id, taskData);
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update task');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;
    try {
      setActionLoading(true);
      await deleteTaskCall(taskToDelete);
      setIsConfirmOpen(false);
      setTaskToDelete(null);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      await completeTaskCall(id);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to complete task');
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Tasks</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your daily to-dos</p>
        </div>
        <button onClick={openCreateModal} className="btn btn-primary">
          <Plus size={18} /> New Task
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 200px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            id="searchQuery"
            name="searchQuery"
            className="input-field" 
            placeholder="Search tasks..." 
            style={{ paddingLeft: '2.5rem' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select id="statusFilter" name="statusFilter" className="input-field" style={{ width: 'auto' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Overdue">Overdue</option>
          </select>

          <select id="priorityFilter" name="priorityFilter" className="input-field" style={{ width: 'auto' }} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select id="sortFilter" name="sortFilter" className="input-field" style={{ width: 'auto' }} value={`${sortBy}-${order}`} onChange={(e) => {
            const [newSortBy, newOrder] = e.target.value.split('-');
            setSortBy(newSortBy);
            setOrder(newOrder);
          }}>
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="dueDate-asc">Due Date (Earliest)</option>
            <option value="dueDate-desc">Due Date (Latest)</option>
            <option value="priority-desc">Priority (High to Low)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loader-container"><div className="spinner"></div></div>
      ) : error ? (
        <div style={{ color: 'var(--danger-color)', textAlign: 'center', padding: '2rem' }}>{error}</div>
      ) : (
        <>
          {tasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--surface-color)', marginBottom: '1rem' }}>
                <CheckCircle size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No tasks found</h3>
              <p>Get started by creating a new task or adjusting your filters.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
              {tasks.map(task => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const taskDate = task.dueDate ? new Date(task.dueDate) : null;
                if (taskDate) taskDate.setHours(0, 0, 0, 0);
                const isOverdue = task.status !== 'Done' && taskDate && taskDate < today;
                return (
                <div key={task._id} className={`task-card priority-${task.priority} ${task.status === 'Done' ? 'status-done' : ''} ${isOverdue ? 'status-overdue' : ''}`} style={isOverdue ? { borderColor: 'var(--danger-color)', boxShadow: '0 0 10px rgba(239, 68, 68, 0.1)' } : {}}>
                  <div className="task-header">
                    <span className={`badge badge-${task.status.toLowerCase().replace(' ', '')}`}>
                      {task.status}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openEditModal(task)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} title="Edit" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteClick(task._id)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} title="Delete" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger-color)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: task.description ? '0.5rem' : '1.5rem' }}>
                    <button
                      onClick={() => task.status !== 'Done' && handleMarkComplete(task._id)}
                      style={{
                        background: 'none', border: 'none', cursor: task.status === 'Done' ? 'default' : 'pointer',
                        color: task.status === 'Done' ? 'var(--success-color)' : 'var(--text-secondary)',
                        marginTop: '2px', padding: 0
                      }}
                      title={task.status === 'Done' ? 'Completed' : 'Click to Mark as Complete'}
                    >
                      {task.status === 'Done' ? <CheckCircle size={22} /> : <Circle size={22} />}
                    </button>
                    <h3 className="task-title" style={{
                      margin: 0,
                      flex: 1,
                      textDecoration: task.status === 'Done' ? 'line-through' : 'none',
                      color: task.status === 'Done' ? 'var(--text-secondary)' : 'var(--text-primary)'
                    }}>
                      {task.title}
                    </h3>
                  </div>
                  {task.description && <p className="task-desc" style={{ marginLeft: '2.2rem' }}>{task.description}</p>}

                  <div className="task-footer">
                    <span>Priority: <span style={{ fontWeight: '700' }} className={`priority-text-${task.priority}`}>{task.priority}</span></span>
                    {task.dueDate && <span style={{ color: isOverdue ? 'var(--danger-color)' : 'inherit', fontWeight: isOverdue ? '600' : 'normal' }}>{isOverdue ? 'Overdue: ' : 'Due: '}{new Date(task.dueDate).toLocaleDateString()}</span>}
                  </div>
                </div>
              )})}
            </div>
          )}

          {tasks.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
              <button
                className="btn btn-primary"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                <ChevronLeft size={18} /> Prev
              </button>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>Page {page} of {totalPages || 1}</span>
              <button
                className="btn btn-primary"
                onClick={() => setPage(p => Math.min(Math.max(1, totalPages), p + 1))}
                disabled={page >= totalPages || totalPages === 0}
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        loading={actionLoading}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        loading={actionLoading}
      />
    </div>
  );
};

export default Tasks;
