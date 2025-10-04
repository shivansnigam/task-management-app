exports.allowRoles = (...roles) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden: insufficient role' });
    next();
  };
  
  exports.canModifyTask = (task, user) => {
    if (!task) return false;
    if (user.role === 'Admin' || user.role === 'Manager') return true;
    
    return (
      task.createdBy.toString() === user._id.toString() ||
      (task.assignedTo && task.assignedTo.toString() === user._id.toString())
    );
  };
  
  