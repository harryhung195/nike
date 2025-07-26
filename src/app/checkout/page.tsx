
"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const { state, getTotalPrice } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.firstName + " " + user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const subtotal = getTotalPrice();
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.address &&
    form.city &&
    form.postcode &&
    form.country;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!stripe || !elements) {
      setError("Stripe is not loaded.");
      setLoading(false);
      return;
    }

    // Create payment method
    const cardElement = elements.getElement(CardElement);
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
      billing_details: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: {
          line1: form.address,
          city: form.city,
          postal_code: form.postcode,
          country: form.country,
        },
      },
    });

    if (stripeError) {
      setError(stripeError.message || "Payment error");
      setLoading(false);
      return;
    }

    // TODO: Send paymentMethod.id and order info to backend for payment intent and order creation

    setSuccess(true);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-all duration-300"
    >
      {/* Left: Customer Info & Payment */}
      <div className="flex-1 space-y-6">
        <h2 className="text-xl font-bold mb-2">Billing & Shipping</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="input" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input" />
          <input name="postcode" value={form.postcode} onChange={handleChange} placeholder="Postcode" className="input" />
          <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="input" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Payment</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="flex-1 space-y-6">
        <h2 className="text-xl font-bold mb-2">Order Summary</h2>
        <ul className="divide-y">
          {state.items.map((item) => (
            <li key={item.id} className="py-4 flex justify-between items-center">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">Qty: {item.quantity} {item.size && `| Size: ${item.size}`}</div>
              </div>
              <div className="font-semibold">{item.price}</div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-6">
          <span className="font-bold">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-3 rounded font-bold text-lg transition ${
            isFormValid && !loading
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">Payment successful! Thank you for your order.</p>}
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 font-sans transition-all duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}

// Tailwind CSS styles for input fields
// Add to your global CSS or component styles
/*
.input {
  @apply border rounded p-2 bg-white dark:bg-gray-800 text-black dark:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white;
}
*/
