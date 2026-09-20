import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBox from './components/SearchBox';
import OrderCard from './components/OrderCard';
import TrackModal from './components/TrackModal';
import InvoiceModal from './components/InvoiceModal';

export default function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBy, setSearchBy] = useState('order_id');
  const [keyword, setKeyword] = useState('');
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch orders from Laravel API
  const fetchOrders = async (currentSearchBy = searchBy, currentKeyword = keyword) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const params = new URLSearchParams();
      if (currentSearchBy) params.append('search_by', currentSearchBy);
      if (currentKeyword) params.append('keyword', currentKeyword);

      const res = await fetch(`/api/orders?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Failed to load orders from API, using fallback data:', err);
      // Fallback mock data matching screenshot in case backend is spinning up
      const mockOrders = [
        {
          id: 1,
          order_number: '78369274',
          order_date: '30-08-2017 03:29:17',
          payment_mode: 'cod',
          total_amount: 799,
          status: 'fulfilled',
          buyer: {
            name: 'dummy',
            state: 'Delhi',
            email: 'dummy@test.com',
            phone: '9876543210',
          },
          items: [
            {
              id: 101,
              product_name: 'Blue Vivo Mobile Phone',
              model: 'Y11',
              price: 799,
              date: '30-08-2017 03:29:17',
              quantity: 1,
              delivery_charges: 0,
              discount: 0,
              status: 'fulfilled',
              image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&auto=format&fit=crop&q=80',
            },
          ],
        },
        {
          id: 2,
          order_number: '88451236',
          order_date: '15-01-2024 11:45:32',
          payment_mode: 'Credit Card',
          total_amount: 2568,
          status: 'fulfilled',
          buyer: {
            name: 'jainendra',
            state: 'M.P',
            email: 'jainendra@123.com',
            phone: '9811223344',
          },
          items: [
            {
              id: 102,
              product_name: 'Wireless Bluetooth Soundbar',
              model: 'SB-200X',
              price: 2568,
              date: '15-01-2024 11:45:32',
              quantity: 1,
              delivery_charges: 0,
              discount: 0,
              status: 'fulfilled',
              image_url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200&auto=format&fit=crop&q=80',
            },
          ],
        },
      ];

      // Local filter on fallback data if API is unreachable
      if (currentKeyword) {
        const lower = currentKeyword.toLowerCase();
        setOrders(
          mockOrders.filter((o) => {
            if (currentSearchBy === 'order_id') return o.order_number.includes(lower);
            if (currentSearchBy === 'mobile') return o.buyer.phone.includes(lower);
            if (currentSearchBy === 'name') return o.buyer.name.toLowerCase().includes(lower);
            if (currentSearchBy === 'email') return o.buyer.email.toLowerCase().includes(lower);
            return true;
          })
        );
      } else {
        setOrders(mockOrders);
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b5e58] flex flex-col font-sans pb-16">
      {/* Top Black Navigation Bar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 mt-6">
        {/* Title */}
        <h1 className="text-center text-xl md:text-2xl font-black text-black tracking-wider uppercase mb-2">
          SEARCH ORDER
        </h1>

        {/* Search Fieldset */}
        <SearchBox
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={() => fetchOrders(searchBy, keyword)}
          loading={loading}
        />

        {/* Order Cards List */}
        <div className="mt-4">
          {loading ? (
            <div className="bg-white/80 backdrop-blur rounded-2xl p-12 text-center shadow-lg">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#0b5e58] border-t-transparent mb-3"></div>
              <p className="text-gray-700 font-bold text-sm">Searching orders...</p>
            </div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onTrack={(ord) => setTrackingOrder(ord)}
                onGenerateInvoice={(ord) => setInvoiceOrder(ord)}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center shadow-md">
              <p className="text-gray-600 font-bold text-base">No orders found.</p>
              <p className="text-gray-400 text-xs mt-1">
                Try searching with a different {searchBy} keyword or click SEARCH with an empty field to show all orders.
              </p>
              <button
                onClick={() => {
                  setKeyword('');
                  fetchOrders(searchBy, '');
                }}
                className="mt-4 bg-[#0b5e58] hover:bg-[#084843] text-white text-xs font-bold px-5 py-2 rounded-full transition-colors"
              >
                Reset & View All
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Track Shipment Modal */}
      {trackingOrder && (
        <TrackModal
          order={trackingOrder}
          onClose={() => setTrackingOrder(null)}
        />
      )}

      {/* Tax Invoice Modal */}
      {invoiceOrder && (
        <InvoiceModal
          order={invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}
    </div>
  );
}

