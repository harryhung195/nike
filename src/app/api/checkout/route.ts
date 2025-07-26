import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

type CartItem = {
  name: string;
  image?: string;
  price: string | number;
  size?: string;
  quantity: number;
};

export async function POST(request: NextRequest) {
  try {
    const { items, email, userId } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Map your cart items to Stripe line items
    const line_items = items.map((item: CartItem) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
            description: `Size: ${item.size || ''}`,
          },
          unit_amount: Math.round(
            typeof item.price === 'string'
              ? parseFloat(item.price.replace('$', '')) * 100
              : item.price * 100
          ),
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      customer_email: email,
      metadata: {
        userId: userId || '',
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Checkout error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
