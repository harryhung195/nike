
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Order } from '@/models/Order';

export default function OrderSummaryPage() {
  const params = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get session_id from Stripe redirect
    const sessionId = params.get('session_id');
    if (!sessionId) {
      setLoading(false);
      setOrder(null);
      return;
    }
    // Fetch order details from backend using session_id
    fetch(`/api/orders/by-session?session_id=${sessionId}`)
      .then(res => res.ok ? res.json() : Promise.reject('Order not found'))
      .then(data => {
        setOrder(data.order || null);
        setLoading(false);
      })
      .catch(() => {
        setOrder(null);
        setLoading(false);
      });
  }, [params]);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
      {loading ? (
        <p>Loading order details...</p>
      ) : order ? (
        <div className="bg-white rounded shadow p-6">
          <div className="mb-4">
            <span className="font-semibold">Order ID:</span> {order.id}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Date:</span> {order.date}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Status:</span> <span className="text-green-600 font-bold">{order.status}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Items:</span>
            <ul className="ml-4 list-disc">
              {order.items.map((item, idx: number) => (
                <li key={idx}>
                  {item.name} x{item.quantity} {item.size ? `(Size: ${item.size})` : ""} - {item.price}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4 text-xl font-bold">
            Total: ${order.total.toFixed(2)}
          </div>
        </div>
      ) : (
        <p>No order found.</p>
      )}
    </div>
  );
}
