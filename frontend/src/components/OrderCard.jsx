import React from 'react';

export default function OrderCard({ order, onTrack, onGenerateInvoice }) {
  const buyer = order.buyer || {};
  const items = order.items || [];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 text-gray-800 transition-all hover:shadow-lg">
      {/* Top Details Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-5 border-b border-gray-100">
        
        {/* Col 1: Order Date */}
        <div className="min-w-[150px]">
          <h4 className="text-sm font-bold text-gray-900">Order Date</h4>
          <p className="text-xs text-gray-700 mt-0.5">{order.order_date}</p>
        </div>

        {/* Col 2: Order Number + Payment Badge */}
        <div className="flex flex-col items-start lg:items-center min-w-[120px]">
          <span className="text-sm font-bold text-blue-700 hover:underline cursor-pointer">
            {order.order_number}
          </span>
          <span className="mt-1 inline-block bg-[#ea8823] text-white text-[11px] font-semibold px-4 py-0.5 rounded-md shadow-sm">
            {order.payment_mode}
          </span>
        </div>

        {/* Col 3: Buyer Details */}
        <div className="text-xs space-y-0.5 min-w-[180px]">
          <p className="font-bold text-gray-900">Buyer Details:</p>
          <p className="text-gray-700"><span className="font-medium">Name:</span>{buyer.name}</p>
          <p className="text-gray-700"><span className="font-medium">State:</span>{buyer.state}</p>
          <p className="text-gray-700"><span className="font-medium">Email:</span>{buyer.email}</p>
          <p className="text-gray-700"><span className="font-medium">Phone:</span>{buyer.phone}</p>
        </div>

        {/* Col 4: Total */}
        <div className="text-sm font-bold text-gray-900 whitespace-nowrap">
          Total:{order.total_amount}
        </div>

        {/* Col 5: Track Button */}
        <div>
          <button
            onClick={() => onTrack(order)}
            className="bg-[#6c757d] hover:bg-[#5a6268] text-white text-xs font-bold px-4 py-1.5 rounded uppercase tracking-wider transition-colors shadow-sm active:scale-95"
          >
            TRACK
          </button>
        </div>

        {/* Col 6: Generate Invoice Link */}
        <div>
          <button
            onClick={() => onGenerateInvoice(order)}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline transition-colors cursor-pointer"
          >
            Generate Invoice
          </button>
        </div>
      </div>

      {/* Nested Product Items */}
      <div className="mt-4 space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-gray-50/50 transition-colors"
          >
            {/* Left: Image & Product Details */}
            <div className="flex items-center space-x-5">
              <div className="w-16 h-24 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-md p-1 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&auto=format&fit=crop&q=80'}
                  alt={item.product_name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x120?text=Phone';
                  }}
                />
              </div>

              <div className="text-xs space-y-0.5">
                <h5 className="text-sm font-bold text-blue-700 hover:underline cursor-pointer">
                  {item.product_name}
                </h5>
                <p className="text-gray-700"><span className="font-semibold text-gray-800">Model:</span>{item.model}</p>
                <p className="text-gray-700"><span className="font-semibold text-gray-800">Price:</span>{item.price}</p>
                <p className="text-gray-700"><span className="font-semibold text-gray-800">Date:</span>{item.date || order.order_date}</p>
                <p className="text-gray-700"><span className="font-semibold text-gray-800">Discount:</span>{item.discount}</p>
              </div>
            </div>

            {/* Right: Quantity, Delivery Charges, Status */}
            <div className="text-xs space-y-1 min-w-[130px] md:text-left">
              <p className="text-gray-700"><span className="font-semibold text-gray-800">Qty:</span>{item.quantity}</p>
              <p className="text-gray-700"><span className="font-semibold text-gray-800">Delivery Charges:</span>{item.delivery_charges}</p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">Status:</span>
                <span className="text-emerald-700 font-medium ml-1">{item.status}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
