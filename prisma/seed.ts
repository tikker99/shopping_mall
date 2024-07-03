import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const electronicsCategory = await prisma.category.create({
    data: {
      title: 'Electronics',
      description: 'Electronics products'
    }
  });

  const clothingCategory = await prisma.category.create({
    data: {
      title: 'Clothing',
      description: 'Apparel and accessories for men, women, and children.'
    }
  });

  await prisma.product.createMany({
    data: [
      {
        title: 'Men’s T-Shirt',
        description: 'Comfortable cotton t-shirt',
        sku: 'TSHIRT01',
        price: 19.99,
        categoryId: clothingCategory.id
      },
      {
        title: 'Women’s Jeans',
        description: 'Stylish denim jeans',
        sku: 'JEANS011',
        price: 49.99,
        categoryId: clothingCategory.id
      },
      {
        title: 'Smartphone',
        description: 'Latest model with advanced features',
        sku: 'PHONE012',
        price: 699.99,
        categoryId: electronicsCategory.id
      },
      {

        title: 'Bluetooth Speaker',
        description: 'Portable speaker with excellent sound quality',
        sku: 'SPEAKER0',
        price: 89.99,
        categoryId: electronicsCategory.id
      }
    ]
  });
}

// {
//   title: 'Electronics',
//     description: 'Electronics products',
// },
// {
//   title: 'Clothing',
//     description: 'Apparel and accessories for men, women, and children.'
// }


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
