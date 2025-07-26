import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const { items, email, userId } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Create line items for Stripe Checkout
    const line_items = items.map((item: any) => {
      // Parse price safely, support string or number
      let priceNumber = 0;
      if (typeof item.price === 'string') {
        priceNumber = parseFloat(item.price.replace('$', ''));
      } else if (typeof item.price === 'number') {
        priceNumber = item.price;
      }

      if (isNaN(priceNumber)) {
        throw new Error('Invalid price format');
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
            description: `Size: ${item.size || ''}`,
          },
          unit_amount: Math.round(priceNumber * 100), // convert dollars to cents
        },
        quantity: item.quantity,
      };
    });

    // Create a Checkout Session
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
