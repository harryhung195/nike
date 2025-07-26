import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToMongoDB } from '@/lib/mongodb';
import Order from '@/models/Order';

async function getUserIdFromToken(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid token provided');
  }
  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string };
  return decoded.userId;
}

export async function GET(request: NextRequest) {
  try {
    await connectToMongoDB();

    const userId = await getUserIdFromToken(request);

    // Fetch all orders for this user
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (error: unknown) {
    const err = error as Error & { message?: string };
    console.error('Error fetching orders:', err);

    if (err.message === 'No valid token provided') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
