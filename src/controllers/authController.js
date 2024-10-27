import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import i18next from '../i18n.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: i18next.t('utilisateur.fetchError') });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: i18next.t('utilisateur.loginError') });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, status: user.status },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: i18next.t('utilisateur.loginSuccess'), token });
  } catch (error) {
    res.status(500).json({ message: i18next.t('utilisateur.fetchError'), error });
  }
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: i18next.t('token.fetchError') });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      status: decoded.status,
    };

    if (req.user.status !== 'active') {
      return res.status(403).json({ message: i18next.t('utilisateur.adminAccess') });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: i18next.t('token.createError') });
  }
};
