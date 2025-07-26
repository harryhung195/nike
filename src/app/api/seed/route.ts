import { NextRequest, NextResponse } from 'next/server';
import { seedProducts } from '../../../../scripts/seedProducts';

export async function POST(req: NextRequest) {
  try {
    // Only allow seeding in development environment
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Seeding not allowed in production' }, { status: 403 });
    }

    const products = await seedProducts();
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${products.length} products`,
      data: products
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
