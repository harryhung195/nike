import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h1>
        <p className="mb-6">Thank you for your purchase. Your order has been received and is being processed.</p>
        <Link href="/">
          <span className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
