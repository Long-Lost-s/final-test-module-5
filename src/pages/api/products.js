import { PrismaClient } from '@prisma/client';
import { validateProductName, validateQuantity, validateCategory } from '../../utils/helpers';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, category, entryDate, quantity } = req.body;

      // Validate input
      if (!validateProductName(name)) {
        return res.status(400).json({ error: 'Tên sản phẩm phải từ 3-100 ký tự' });
      }
      if (!validateQuantity(quantity)) {
        return res.status(400).json({ error: 'Số lượng phải là số dương' });
      }
      if (!validateCategory(category)) {
        return res.status(400).json({ error: 'Tên danh mục phải từ 2-50 ký tự' });
      }
      if (!entryDate) {
        return res.status(400).json({ error: 'Ngày nhập không được để trống' });
      }

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
          quantity: parseInt(quantity),
        },
        include: {
          category: true,
        },
      });

      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Không thể tạo sản phẩm mới: ' + error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
        },
      });
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Không thể lấy danh sách sản phẩm' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 