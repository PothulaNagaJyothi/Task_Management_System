import React, { useState, useEffect } from 'react';
import { getAnalyticsCall } from '../services/taskService';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { CheckCircle2, CircleDashed, ListTodo, Activity, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0, completionPercentage: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAnalyticsCall();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;
  if (error) return <div style={{ color: 'var(--danger-color)' }}>{error}</div>;

  const chartData = [
    { name: 'Completed', value: stats.completed, color: '#10b981' },
    { name: 'Pending', value: stats.pending, color: '#3b82f6' },
    { name: 'Overdue', value: stats.overdue, color: '#ef4444' }
  ].filter(item => item.value > 0);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Hello, {user?.username || user?.email.split('@')[0]} 👋</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Here's an overview of your tasks today.</p>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>
            <ListTodo size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Tasks</h3>
            <p>{stats.total}</p>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p>{stats.completed}</p>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)' }}>
            <CircleDashed size={24} />
          </div>
          <div className="stat-content">
            <h3>Pending</h3>
            <p>{stats.pending}</p>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--secondary-color)' }}>
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>Completion</h3>
            <p>{stats.completionPercentage}%</p>
          </div>
        </div>
        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>Overdue</h3>
            <p>{stats.overdue}</p>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: '600' }}>Task Distribution</h2>
        {stats.total === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>No tasks to analyze. Create some tasks to see insights!</p>
        ) : (
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: 'var(--radius-md)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
