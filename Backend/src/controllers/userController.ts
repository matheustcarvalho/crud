
import { Request, Response } from 'express';
import { PrismaClient } from '../../prisma/generated/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    console.log('teste'+req.body) 
    const user = await prisma.user.create({
      data: {
        name,
        email
      },
    });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    await prisma.user.delete({
      where: { id: userId },
    });
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
