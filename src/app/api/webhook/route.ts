import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToMongoDB } from '@/lib/mongodb';
import Order from '@/models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  let event;
  try {
    // Get raw body for Stripe signature verification
    const rawBody = await req.arrayBuffer();
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('Stripe webhook event received:', event.type);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('Checkout session completed:', {
      userId: session.metadata?.userId,
      items: session.metadata?.items,
      total: session.amount_total,
      sessionId: session.id,
    });
    try {
      await connectToMongoDB();
      const order = new Order({
        userId: session.metadata?.userId,
        items: JSON.parse(session.metadata?.items || '[]'),
        total: session.amount_total ? session.amount_total / 100 : 0,
        status: 'paid',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await order.save();
      console.log('Order saved:', order);
    } catch (err) {
      console.error('Error saving order from webhook:', err);
      return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
