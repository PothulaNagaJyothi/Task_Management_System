const mongoose = require('mongoose');
const Task = require('../models/Task');

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required for a task.' });
    }

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    next(err);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user });
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Done').length;
    const pending = total - completed;
    
    // Add overdue logic
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdue = tasks.filter(t => t.status !== 'Done' && t.dueDate && new Date(t.dueDate) < today).length;

    const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    res.json({
      total,
      completed,
      pending,
      overdue,
      completionPercentage
    });
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sortBy, order, page = 1, limit = 10 } = req.query;

    let query = { user: new mongoose.Types.ObjectId(req.user._id || req.user) };

    if (status === 'Overdue') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query.status = { $ne: 'Done' };
      query.dueDate = { $lt: today };
    } else if (status) {
      query.status = status;
    }
    if (priority) query.priority = priority;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Handle default sort
    let sortOptions = { createdAt: -1 }; 
    if (sortBy && sortBy !== 'priority') {
      sortOptions = { [sortBy]: order === 'asc' ? 1 : -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let aggregationPipeline = [
      { $match: query }
    ];

    // If sorting by priority, we need to map the strings to numbers first
    if (sortBy === 'priority') {
      aggregationPipeline.push({
        $addFields: {
          priorityWeight: {
            $switch: {
              branches: [
                { case: { $eq: ['$priority', 'High'] }, then: 3 },
                { case: { $eq: ['$priority', 'Medium'] }, then: 2 },
                { case: { $eq: ['$priority', 'Low'] }, then: 1 }
              ],
              default: 0
            }
          }
        }
      });
      sortOptions = { priorityWeight: order === 'desc' ? -1 : 1, createdAt: -1 };
    }

    // Apply sorting, skipping, and limiting
    aggregationPipeline.push({ $sort: sortOptions });
    aggregationPipeline.push({ $skip: skip });
    aggregationPipeline.push({ $limit: parseInt(limit) });

    const tasks = await Task.aggregate(aggregationPipeline);

    const totalTasks = await Task.countDocuments(query);

    res.json({
      tasks,
      totalPages: Math.ceil(totalTasks / parseInt(limit)),
      currentPage: parseInt(page),
      totalTasks
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized.' });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized.' });
    }

    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

const completeTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { status: 'Done' },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized.' });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTask,
  getAnalytics,
  getTasks,
  updateTask,
  deleteTask,
  completeTask
};
