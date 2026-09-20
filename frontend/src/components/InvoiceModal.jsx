import React from 'react';

export default function InvoiceModal({ order, onClose }) {
  if (!order) return null;

  const buyer = order.buyer || {};
  const items = order.items || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-gray-100 print:shadow-none print:m-0 print:p-0 print:border-none">
        {/* Actions (Hidden during print) */}
        <div className="flex justify-between items-center mb-6 print:hidden">
          <span className="text-xs uppercase font-extrabold tracking-wider text-gray-500">
            Invoice Preview
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <span>🖨️ Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-800 text-2xl font-bold p-1"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="border border-gray-200 rounded-xl p-6 bg-white text-gray-800">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-5">
            <div>
              <h1 className="text-2xl font-extrabold text-black tracking-wider">VPLAK</h1>
              <p className="text-xs text-gray-500 mt-1">VPLAK Online Retail Solutions</p>
              <p className="text-xs text-gray-500">New Delhi, India</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-bold text-gray-900">TAX INVOICE</h2>
              <p className="text-xs font-semibold text-gray-700 mt-1">
                Invoice No: INV-{order.order_number}
              </p>
              <p className="text-xs text-gray-500">Date: {order.order_date}</p>
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-2 gap-4 py-5 border-b border-gray-200 text-xs">
            <div>
              <p className="font-bold text-gray-900 mb-1">Billed & Shipped To:</p>
              <p className="font-semibold text-gray-800">{buyer.name}</p>
              <p className="text-gray-600">{buyer.state}, India</p>
              <p className="text-gray-600">Email: {buyer.email}</p>
              <p className="text-gray-600">Phone: {buyer.phone}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900 mb-1">Order Details:</p>
              <p className="text-gray-700"><span className="font-semibold">Order ID:</span> {order.order_number}</p>
              <p className="text-gray-700"><span className="font-semibold">Payment Mode:</span> {order.payment_mode}</p>
              <p className="text-gray-700"><span className="font-semibold">Status:</span> {order.status}</p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left text-xs my-5">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600 font-bold uppercase">
                <th className="py-2">Item</th>
                <th className="py-2">Model</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Unit Price</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item, idx) => (
                <tr key={idx} className="text-gray-800">
                  <td className="py-2 font-medium">{item.product_name}</td>
                  <td className="py-2 text-gray-500">{item.model || '-'}</td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">₹{item.price}</td>
                  <td className="py-2 text-right font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Breakdown */}
          <div className="border-t-2 border-gray-200 pt-4 flex justify-end">
            <div className="w-56 text-xs space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{order.total_amount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery:</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 border-t border-gray-200 pt-2">
                <span>Total Paid:</span>
                <span className="text-emerald-700">₹{order.total_amount}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-[11px] text-gray-400">
            Thank you for shopping with VPLAK. For queries, contact support@vplak.com.
          </div>
        </div>
      </div>
    </div>
  );
}
