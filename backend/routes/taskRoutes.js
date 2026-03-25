const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all task routes
router.use(auth);

// 1. Create a task
router.post('/', async (req, res, next) => {
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
});

// 2. Get all basic analytics insights
router.get('/analytics', async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user });
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Done').length;
    const pending = total - completed;
    const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    res.json({
      total,
      completed,
      pending,
      completionPercentage
    });
  } catch (err) {
    next(err);
  }
});

// 3. Get all tasks with filtering, searching, sorting, pagination
router.get('/', async (req, res, next) => {
  try {
    const { status, priority, search, sortBy, order, page = 1, limit = 10 } = req.query;

    let query = { user: new mongoose.Types.ObjectId(req.user) };

    if (status) query.status = status;
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
});

// 4. Update a task
router.patch('/:id', async (req, res, next) => {
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
});

// 5. Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized.' });
    }

    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    next(err);
  }
});

// 6. Mark as completed (Patch shortcut)
router.patch('/:id/complete', async (req, res, next) => {
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
});

module.exports = router;
