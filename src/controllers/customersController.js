import prisma from '../config/prisma.js';
import i18next from '../i18n.js';

export const createClient = async (req, res) => {
  const { address, firstName, lastName, phone } = req.body;
  const userId = req.user.id;

  try {
    const newClient = await prisma.customers.create({
      data: {
        address,
        firstName,
        lastName,
        phone,
        userId,
      },
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: i18next.t('customer.creationError') });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.customers.findMany({
      orderBy: { id: 'desc' }
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: i18next.t('customer.fetchAllError') });
  }
};

export const getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await prisma.customers.findUnique({
      where: { id: parseInt(id) },
    });

    if (!client) {
      return res.status(404).json({ message: i18next.t('customer.notFound') });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: i18next.t('customer.fetchError') });
  }
};

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { address, firstName, lastName, phone } = req.body;

  try {
    const client = await prisma.customers.update({
      where: { id: parseInt(id) },
      data: { address, firstName, lastName, phone },
    });
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: i18next.t('customer.updateError') });
  }
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    // Vérifiez si le client a des commandes liées
    const linkedOrders = await prisma.orders.findMany({
      where: { customerId: parseInt(id) },
    });

    if (linkedOrders.length > 0) {
      return res.status(400).json({
        message: i18next.t('customer.hasOrders'),
      });
    }

    // Vérifiez si le client a des ventes liées
    const linkedSales = await prisma.sales.findMany({
      where: { customerId: parseInt(id) },
    });

    if (linkedSales.length > 0) {
      return res.status(400).json({
        message: i18next.t('customer.hasSales'),
      });
    }

    // Si aucune relation n'est trouvée, supprimez le client
    await prisma.customers.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: i18next.t('customer.deletionSuccess') });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: i18next.t('customer.deletionError') });
  }
};
