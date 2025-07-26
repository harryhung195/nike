"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { IOrder } from '@/models/Order';
import { getAuthToken } from "@/lib/api";

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const token = getAuthToken();
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const res = await fetch("/api/orders", { headers });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.orders || data);
      } catch (err: unknown) {
        const error = err as Error;
        setError(error.message || "Error fetching orders");
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated]);  // <-- removed getAuthToken here

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        <p>Please sign in to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={String(order._id)} className="border rounded p-4 bg-white shadow">
              <div className="mb-2">
                <span className="font-semibold">Order ID:</span> {String(order._id)}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Total:</span> ${order.total?.toFixed(2) || "-"}
              </div>
              <div>
                <span className="font-semibold">Items:</span>
                <ul className="ml-4 list-disc">
                  {order.items?.map((item, idx: number) => (
                    <li key={idx}>
                      {item.name} x{item.quantity} {item.size ? `(Size: ${item.size})` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
