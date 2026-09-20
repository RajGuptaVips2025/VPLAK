import React, { useEffect, useState } from 'react';

export default function TrackModal({ order, onClose }) {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!order) return;

    fetch(`/api/orders/${order.order_number}/track`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTrackingData(data);
        }
      })
      .catch((err) => console.error('Error fetching tracking info:', err))
      .finally(() => setLoading(false));
  }, [order]);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold tracking-wide">
              TRACK ORDER #{order.order_number}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Buyer: {order.buyer?.name} | {order.payment_mode}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl font-bold p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="py-12 text-center text-sm text-gray-500">
              Fetching live tracking details...
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Status: {trackingData?.status || order.status}
                </span>
                <span className="text-xs font-bold text-emerald-700">
                  Total: ₹{order.total_amount}
                </span>
              </div>

              {/* Timeline */}
              <div className="relative border-l-2 border-emerald-500 ml-4 pl-6 space-y-6">
                {(trackingData?.milestones || []).map((m, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                        m.completed
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {m.completed && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-gray-900">{m.step}</p>
                      <p className="text-gray-600 mt-0.5">{m.description}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{m.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 text-right">
            <button
              onClick={onClose}
              className="bg-gray-800 hover:bg-black text-white text-xs font-bold px-5 py-2 rounded-lg transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

