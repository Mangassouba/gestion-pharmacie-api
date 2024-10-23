import prisma from "../config/prisma.js";
import bcrypt from 'bcryptjs';

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
    res.status(500).json({ error: 'Error while creating the user' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching users' });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching the user' });
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
      return res.status(404).json({ error: 'User not found' });
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
    res.status(500).json({ error: 'Error while updating the user' });
  }
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const deletedUser = await prisma.users.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'User successfully deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while deleting the user.' });
  }
};


