import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Connect to MongoDB
    await connectToMongoDB();

    // Parse URL to get product ID
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];

    // Validate ID
    if (!id || id === '[id]') {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }

    // Fetch product by ID
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Error in GET /api/products/[id]:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
