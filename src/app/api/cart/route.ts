import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Define CartItem interface for typing cart items
interface CartItem {
  productId: string | mongoose.Types.ObjectId;
  size?: string;
  color?: string;
  quantity: number;
  price?: number;
}

// Helper function to get user from token
async function getUserFromToken(request: NextRequest): Promise<string> {
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

    const userId = await getUserFromToken(request);

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return NextResponse.json({
        success: true,
        data: {
          items: [],
          totalAmount: 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: cart,
    });

  } catch (error: unknown) {
    const err = error as Error & { message?: string };
    console.error('Error fetching cart:', err);
    if (err.message === 'No valid token provided') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToMongoDB();

    const userId = await getUserFromToken(request);
    const { productId, size, color, quantity } = await request.json();

    // Validate required fields
    if (!productId || !size || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Product ID, size, and quantity are required' },
        { status: 400 }
      );
    }

    // Get product to validate and get price
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if product has the requested size
    if (!product.sizes.includes(size)) {
      return NextResponse.json(
        { success: false, error: 'Size not available for this product' },
        { status: 400 }
      );
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item: CartItem) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        size,
        color,
        quantity,
        price: product.price,
      });
    }

    await cart.save();

    // Populate cart items for response
    await cart.populate('items.productId');

    return NextResponse.json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart,
    });

  } catch (error: unknown) {
    const err = error as Error & { message?: string };
    console.error('Error adding to cart:', err);
    if (err.message === 'No valid token provided') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to add item to cart' },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToMongoDB();

    const userId = await getUserFromToken(request);
    const { productId, size, color, quantity } = await request.json();

    if (quantity < 0) {
      return NextResponse.json(
        { success: false, error: 'Quantity cannot be negative' },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      );
    }

    const itemIndex = cart.items.findIndex(
      (item: CartItem) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Item not found in cart' },
        { status: 404 }
      );
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.productId');

    return NextResponse.json({
      success: true,
      message: 'Cart updated successfully',
      data: cart,
    });

  } catch (error: unknown) {
    const err = error as Error & { message?: string };
    console.error('Error updating cart:', err);
    if (err.message === 'No valid token provided') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectToMongoDB();

    const userId = await getUserFromToken(request);

    await Cart.findOneAndDelete({ userId });

    return NextResponse.json({
      success: true,
      message: 'Cart cleared successfully',
    });

  } catch (error: unknown) {
    const err = error as Error & { message?: string };
    console.error('Error clearing cart:', err);
    if (err.message === 'No valid token provided') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}
