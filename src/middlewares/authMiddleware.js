import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization'); 

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};


export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      const message = i18next.t('auth.accessDenied');
      return res.status(403).json({ message });
    }
    next();
  };
};
