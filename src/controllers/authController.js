import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js'; 
import i18next from '../i18n.js';

const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};


export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const validRoles = ['ADMIN', 'CAISSIER'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: i18next.t('auth.accessForbidden') });
    }

    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: i18next.t('auth.userNotFound') });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: { name, email, password: hashedPassword, role }
    });

    res.status(201).json({
      message: i18next.t('auth.loginSuccess'),
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: i18next.t('auth.loginError'), error });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: i18next.t('auth.userNotFound') });
    }

    if (user.status !== 'ACTIVE') {
      return res.status(403).json({ message: i18next.t('auth.userInactive') });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: i18next.t('auth.incorrectPassword') });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user); 
console.log(accessToken);

    res.json({
      message: i18next.t('auth.loginSuccess'),
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: i18next.t('auth.loginError'), error });
  }
};

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: i18next.t('auth.accessForbidden') });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: i18next.t('auth.invalidToken') });
    }
    req.user = user;
    next();
  });
};

