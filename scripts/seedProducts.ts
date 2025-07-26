import { connectToMongoDB } from '../src/lib/mongodb';
import Product from '../src/models/Product';

const sampleProducts = [
  {
    name: "Nike Air Max 90",
    description: "The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU accents.",
    price: 120,
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-low-by-you-shoes.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/custom-nike-dunk-low-by-you-shoes.png"
    ],
    category: "Men",
    subcategory: "Shoes",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: ["White/Black", "Black/White", "University Red"],
    stock: 50,
    features: [
      "Air-Sole units in the heel for lightweight cushioning",
      "Padded collar for a premium feel",
      "Rubber Waffle outsole for traction and durability"
    ],
    isNew: false,
    isFeatured: true
  },
  {
    name: "Nike Air Force 1 '07",
    description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best.",
    price: 90,
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/00375837-849f-4f17-ba24-d201d27be0ba/air-force-1-07-shoes-WrLlWX.png"
    ],
    category: "Men",
    subcategory: "Shoes",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: ["White", "Black", "Triple White"],
    stock: 75,
    features: [
      "Leather upper for durability and classic style",
      "Air-Sole unit for lightweight cushioning",
      "Perforations on toe for airflow"
    ],
    isNew: false,
    isFeatured: true
  },
  {
    name: "Nike Dri-FIT Academy",
    description: "The Nike Dri-FIT Academy Top helps keep you dry and comfortable during training.",
    price: 35,
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/61b4738b-e1e2-4786-8f6c-dcf2d8772b8e/dri-fit-academy-football-top-6RQFXz.png"
    ],
    category: "Men",
    subcategory: "Clothing",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Red", "White"],
    stock: 100,
    features: [
      "Dri-FIT technology moves sweat away from your skin",
      "Lightweight, breathable fabric",
      "Standard fit for easy movement"
    ],
    isNew: true,
    isFeatured: false
  },
  {
    name: "Nike Air Max 270",
    description: "Nike's largest heel Air unit yet delivers unrivaled, all-day comfort.",
    price: 150,
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/zwxes8uud05rkuei8z6u/air-max-270-shoes-EOz0we.png"
    ],
    category: "Women",
    subcategory: "Shoes",
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
    colors: ["White/Black", "Black/White", "Pink Foam"],
    stock: 40,
    features: [
      "Large Air unit in the heel for maximum cushioning",
      "Engineered mesh upper for breathability",
      "Rubber outsole for traction"
    ],
    isNew: false,
    isFeatured: true
  },
  {
    name: "Nike Sportswear Essential",
    description: "The Nike Sportswear Essential Fleece Hoodie is a wardrobe staple made with unbrushed fleece.",
    price: 60,
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/05849122-a1d2-4330-af71-203b7d319e8e/sportswear-essential-fleece-pullover-hoodie-EXhbwX.png"
    ],
    category: "Women",
    subcategory: "Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Grey", "Navy", "Pink"],
    stock: 60,
    features: [
      "Soft fleece fabric for warmth",
      "Kangaroo pocket for storage",
      "Ribbed cuffs and hem"
    ],
    isNew: true,
    isFeatured: false
  },
  {
    name: "Nike Air Max SC",
    description: "The Nike Air Max SC brings easy-going style to the next generation.",
    price: 65,
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7ac2337d-662e-44c4-9c9b-b3507e88ff75/air-max-sc-shoes-1fd1ZZ.png"
    ],
    category: "Kids",
    subcategory: "Shoes",
    sizes: ["10.5C", "11C", "11.5C", "12C", "12.5C", "13C", "13.5C", "1Y", "1.5Y", "2Y", "2.5Y", "3Y"],
    colors: ["White/Blue", "Black/White", "Pink/White"],
    stock: 30,
    features: [
      "Leather and synthetic upper for durability",
      "Foam midsole for lightweight cushioning",
      "Rubber outsole for traction"
    ],
    isNew: false,
    isFeatured: true
  }
];

export async function seedProducts() {
  try {
    await connectToMongoDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    
    console.log(`✅ Successfully seeded ${createdProducts.length} products`);
    return createdProducts;
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedProducts()
    .then(() => {
      console.log('✅ Database seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database seeding failed:', error);
      process.exit(1);
    });
}
