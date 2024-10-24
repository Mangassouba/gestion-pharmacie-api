import prisma from '../config/prisma.js';

// Create a client
export const createClient = async (req, res) => {
  const { firstName, lastName, address, phone } = req.body;

  try {
    const newClient = await prisma.clients.create({
      data: {
        firstName,
        lastName,
        address,
        phone,
      },
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while creating the client.' });
  }
};

// Get all clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.clients.findMany();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching the clients.' });
  }
};

// Get a client by ID
export const getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await prisma.clients.findUnique({
      where: { id: parseInt(id) },
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found.' });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching the client.' });
  }
};

// Update a client
export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, address, phone } = req.body;

  try {
    const client = await prisma.clients.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        address,
        phone,
      },
    });
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while updating the client.' });
  }
};

// Delete a client
export const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.clients.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Client successfully deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while deleting the client.' });
  }
};
