import jsonwebtoken from 'jsonwebtoken';
import Student from '../models/Student.js';

const { verify } = jsonwebtoken;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    // Support mock mentor demo tokens
    if (token.startsWith('mock_jwt_')) {
      const isSuperAdmin = token.includes('admin') || token.includes('1933');
      const isMentor = token.includes('mentor');
      const isOrganizer = token.includes('organizer');
      req.user = {
        _id: 'usr_demo_' + Date.now(),
        email: isSuperAdmin ? 'parthpanchal1933@gmail.com' : isMentor ? 'dr.sharma@mits.ac.in' : isOrganizer ? 'parthpanchal1933@gmail.com' : 'parthpanchal1932@gmail.com',
        name: isSuperAdmin ? 'Parth Panchal (Admin)' : isMentor ? 'Dr. S. K. Sharma (Mentor)' : isOrganizer ? 'Parth Panchal (Organizer)' : 'Parth Panchal (Student)',
        role: isSuperAdmin ? 'admin' : isMentor ? 'mentor' : isOrganizer ? 'organizer' : 'student',
        enrollmentId: isSuperAdmin ? 'ADMIN-SUPER' : isMentor ? 'MTR-TECH-04' : isOrganizer ? 'ORG-INST-2026' : 'BTCS24O1089',
        isDemoUser: true,
      };
      return next();
    }

    const decoded = verify(token, process.env.JWT_SECRET);

    if (decoded.isDemoToken) {
      req.user = {
        _id: decoded.id || 'usr_demo',
        email: decoded.email,
        name: decoded.name || 'Demo User',
        role: decoded.role || (decoded.email === 'parthpanchal1933@gmail.com' ? 'admin' : 'student'),
        enrollmentId: decoded.enrollmentId || 'DEMO2026',
        isDemoUser: true,
      };
      return next();
    }

    const student = await Student.findById(decoded.id);
    if (!student) {
      return res.status(401).json({ error: 'Invalid token. Student not found.' });
    }

    // Role assignment guarantee
    if (student.email === 'parthpanchal1933@gmail.com') {
      student.role = 'admin';
    } else if (student.email === 'parthpanchal1932@gmail.com') {
      student.role = 'student';
    }

    req.user = student;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired.' });
    }
    return res.status(500).json({ error: 'Authentication error.' });
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const userRole = req.user.role || (req.user.email === 'parthpanchal1933@gmail.com' ? 'admin' : 'student');
    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: `Access denied. Requires one of roles: ${roles.join(', ')}` });
    }
    next();
  };
};

export const requireAdmin = requireRole('admin');

export default authMiddleware;
