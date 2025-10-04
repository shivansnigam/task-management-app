const Task = require('../models/Task');
const { canModifyTask } = require('../middleware/roleMiddleware');

exports.createTask = async (req, res, next) => {
  try {
    const data = { ...req.body, createdBy: req.user._id };
    const task = await Task.create(data);
    res.status(201).json(task);
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { role, _id } = req.user;
    let tasks;
    if (role === 'Admin' || role === 'Manager') {
      tasks = await Task.find().populate('assignedTo createdBy', 'name email role');
    } else {
      
      tasks = await Task.find({ $or: [{ assignedTo: _id }, { createdBy: _id }] })
        .populate('assignedTo createdBy', 'name email role');
    }
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo createdBy', 'name email role');
    if (!task) return res.status(404).json({ message: 'Task not found' });
  
    if (req.user.role === 'Employee' && task.assignedTo?.toString() !== req.user._id.toString() && task.createdBy?.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Forbidden' });
    res.json(task);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (!canModifyTask(task, req.user)) return res.status(403).json({ message: 'Forbidden' });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (!canModifyTask(task, req.user)) return res.status(403).json({ message: 'Forbidden' });

    await Task.findByIdAndDelete(req.params.id);  
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

