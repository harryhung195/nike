// src/app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToMongoDB } from '@/lib/mongodb';
import Order from '@/models/Order';

// Helper to get userId from Bearer token in Authorization header
async function getUserIdFromToken(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid token provided');
  }

  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string };
  return decoded.userId;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectToMongoDB();

    const userId = await getUserIdFromToken(request);

    // Find the order by id and userId to ensure user owns this order
    const order = await Order.findOne({ _id: id, userId });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });

  } catch (error: unknown) {
    const err = error as Error & { message?: string };
    console.error('Error fetching order:', err);

    if (err.message === 'No valid token provided') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
