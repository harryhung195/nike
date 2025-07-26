import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(req: NextRequest) {
  try {
    await connectToMongoDB();
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }
    // Find order by Stripe sessionId
    const order = await Order.findOne({ stripeSessionId: sessionId });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    // Format for frontend
    return NextResponse.json({
      order: {
        id: order._id,
        date: order.createdAt,
        status: order.status,
        items: order.items,
        total: order.total,
      },
    });
  } catch (error) {
    console.error('Error fetching order by session:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
