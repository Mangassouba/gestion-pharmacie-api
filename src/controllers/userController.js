import prisma from "../config/prisma.js";
import bcrypt from 'bcryptjs';
import i18next from '../i18n.js';
import { resetPassword, sendPasswordResetEmail } from "../services/userService.js";

export const createUser = async (req, res) => {
  const { name, email, password, role, status } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        status,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: i18next.t('user.creationError') });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: { id: 'desc' }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: i18next.t('user.fetchAllError') });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: i18next.t('user.notFound') });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: i18next.t('user.fetchError') });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, status } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: i18next.t('user.notFound') });
    }

    let updatedData = { name, email, role, status };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const user = await prisma.users.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: i18next.t('user.updateError') });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ error: i18next.t('user.notFound') });
    }

    await prisma.users.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: i18next.t('user.deletionSuccess') });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: i18next.t('user.deletionError') });
  }
};


export const  requestPasswordReset = async(req, res) => {
  const { email } = req.body;
  try {
    const response = await sendPasswordResetEmail(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const handleResetPassword = async(req, res) =>{
  const { token, newPassword } = req.body;
  try {
    const response = await resetPassword(token, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updatePassword = async (req, res) => {
  const { id } = req.params; // ID de l'utilisateur
  const { oldPassword, newPassword } = req.body;

  try {
    // Trouver l'utilisateur dans la base de données
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: i18next.t('user.notFound') });
    }

    // Vérifier si l'ancien mot de passe est correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: i18next.t('user.incorrectOldPassword') });
    }

    // Hacher le nouveau mot de passe
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe dans la base de données
    await prisma.users.update({
      where: { id: parseInt(id) },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({ message: i18next.t('user.passwordUpdateSuccess') });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: i18next.t('user.passwordUpdateError') });
  }
};
