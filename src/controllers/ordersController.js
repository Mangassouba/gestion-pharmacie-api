import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
  try {
    const { order_date, clientId, detailsOrder } = req.body;

    // Check if customer exists
    const customerExists = await prisma.customers.findUnique({
      where: { id: clientId },
    });

    if (!customerExists) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Calculate total amount and check products existence
    let totalAmount = 0;
    for (const detail of detailsOrder) {
      const productExists = await prisma.products.findUnique({
        where: { id: detail.productId },
      });

      if (!productExists) {
        return res.status(404).json({
          error: `Product with ID ${detail.productId} not found`,
        });
      }

    //   totalAmount += detail.quantity * detail.price;
    }

    // Create the order
    const newOrder = await prisma.orders.create({
      data: {
        order_date,
        clientId,
        details: {
          create: detailsOrder.map((detail) => ({
            quantity: detail.quantity,
            price: detail.price,
            product: { connect: { id: detail.productId } },
          })),
        },
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json(console.log(error)
    );
  }
};


export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        details: true,
        client: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({
      error: `Error fetching orders: ${error.message}`,
    });
  }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Fetch the order by ID
      const order = await prisma.orders.findUnique({
        where: { id: Number(id) },
        include: {
          details: true,  // Include details of the order
          client: true,   // Include client information
        },
      });
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({
        error: `Error fetching the order: ${error.message}`,
      });
    }
  };

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, order_date, clientId, detailsOrder } = req.body;

  try {
    const orderExists = await prisma.orders.findUnique({
      where: { id: Number(id) },
      include: { details: true },
    });

    if (!orderExists) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if customer exists
    const customerExists = await prisma.customers.findUnique({
      where: { id: clientId },
    });

    if (!customerExists) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Calculate total amount and check products existence
    // let totalAmount = 0;
    for (const detail of detailsOrder) {
      const productExists = await prisma.products.findUnique({
        where: { id: detail.productId },
      });

      if (!productExists) {
        return res.status(404).json({
          error: `Product with ID ${detail.productId} not found`,
        });
      }

    //   totalAmount += detail.quantity * detail.price;
    }

    // Update the order and its details
    const updatedOrder = await prisma.orders.update({
      where: { id: Number(id) },
      data: {
        status,
        order_date,
        clientId,
        details: {
          deleteMany: {},
          create: detailsOrder.map((detail) => ({
            quantity: detail.quantity,
            price: detail.price,
            product: { connect: { id: detail.productId } },
          })),
        },
      },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({
      error: `Error updating the order: ${error.message}`,
    });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const existingOrder = await prisma.orders.findUnique({
      where: { id: Number(id) },
    });

    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await prisma.orders.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Order successfully deleted' });
  } catch (error) {
    res.status(400).json({
      error: `Error deleting the order: ${error.message}`,
    });
  }
};
