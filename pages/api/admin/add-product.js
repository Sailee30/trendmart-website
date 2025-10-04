import formidable from 'formidable';
import fs from 'fs';
import { uploadToCloudinary } from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check authentication
  let currentUser;
  try {
    currentUser = await getCurrentUser(req);
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized - Admin access required' });
    }
  } catch (authError) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ error: 'Error parsing form' });
    }

    const { name, price, description } = fields;
    if (!name || !price || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let imageUrl = null;
    let imagePublicId = null;
    const imageFile = files.image;
    
    if (imageFile) {
      try {
        const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;
        const fileBuffer = fs.readFileSync(file.filepath);
        const uploadResult = await uploadToCloudinary(fileBuffer, 'trendmart/products');
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: 'Error uploading image' });
      }
    }

    try {
      const product = await prisma.product.create({
        data: {
          name: Array.isArray(name) ? name[0] : name,
          price: parseFloat(Array.isArray(price) ? price[0] : price),
          description: Array.isArray(description) ? description[0] : description,
          image: imageUrl,
          imagePublicId,
          createdById: currentUser.id,
        },
      });

      return res.status(201).json({
        success: true,
        product,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Error creating product' });
    }
  });
}