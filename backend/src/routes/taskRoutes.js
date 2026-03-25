const express = require('express');
const {
  createTask,
  getAnalytics,
  getTasks,
  updateTask,
  deleteTask,
  completeTask
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.post('/', createTask);
router.get('/analytics', getAnalytics);
router.get('/', getTasks);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', completeTask);

module.exports = router;
