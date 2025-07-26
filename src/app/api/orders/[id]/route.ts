import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';

// Get specific order by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
    const order = await Order.findOne({ _id: params.id, userId: decoded.userId })
      .populate('items.productId');
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

// Update order status (for admin or order management)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const body = await req.json();
    
    const { status } = body;
    
    const order = await Order.findOneAndUpdate(
      { _id: params.id, userId: decoded.userId },
      { status, updatedAt: new Date() },
      { new: true }
    ).populate('items.productId');
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
