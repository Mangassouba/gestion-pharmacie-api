import prisma from '../config/prisma.js';


export const createClient = async (req, res) => {
  const { address,firstName, lastName, phone } = req.body;

  try {
    const newClient = await prisma.customers.create({
      data: {
        address,
        firstName,
        lastName,
        phone,
      },
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while creating the client.' });
  }
};


export const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.customers.findMany();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching the clients.' });
  }
};


export const getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await prisma.customers.findUnique({
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


export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { address, firstName, lastName, phone } = req.body;

  try {
    const client = await prisma.customers.update({
      where: { id: parseInt(id) },
      data: {
        address,
        firstName,
        lastName,
        phone,
      },
    });
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while updating the client.' });
  }
};


export const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.customers.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Client successfully deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while deleting the client.' });
  }
};