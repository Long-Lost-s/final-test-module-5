import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, category, entryDate, quantity } = req.body;

      // Tạo category mới nếu chưa tồn tại
      const categoryObj = await prisma.category.upsert({
        where: { name: category },
        update: {},
        create: { name: category },
      });

      // Tạo sản phẩm mới
      const product = await prisma.product.create({
        data: {
          name,
          categoryId: categoryObj.id,
          entryDate: new Date(entryDate),
          quantity,
        },
      });

      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Không thể tạo sản phẩm mới' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 