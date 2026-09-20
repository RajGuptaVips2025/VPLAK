<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Search and list orders based on filter criteria.
     */
    public function index(Request $request): JsonResponse
    {
        $searchBy = $request->query('search_by'); // 'order_id', 'mobile', 'name', 'email'
        $keyword = trim((string) $request->query('keyword', ''));

        $query = Order::with(['buyer', 'items']);

        if (!empty($keyword)) {
            switch ($searchBy) {
                case 'order_id':
                    $query->where('order_number', 'LIKE', "%{$keyword}%");
                    break;

                case 'mobile':
                    $query->whereHas('buyer', function ($q) use ($keyword) {
                        $q->where('phone', 'LIKE', "%{$keyword}%");
                    });
                    break;

                case 'name':
                    $query->whereHas('buyer', function ($q) use ($keyword) {
                        $q->where('name', 'LIKE', "%{$keyword}%");
                    });
                    break;

                case 'email':
                    $query->whereHas('buyer', function ($q) use ($keyword) {
                        $q->where('email', 'LIKE', "%{$keyword}%");
                    });
                    break;

                default:
                    // If no specific radio is provided, search across all relevant fields
                    $query->where(function ($sub) use ($keyword) {
                        $sub->where('order_number', 'LIKE', "%{$keyword}%")
                            ->orWhereHas('buyer', function ($q) use ($keyword) {
                                $q->where('name', 'LIKE', "%{$keyword}%")
                                  ->orWhere('phone', 'LIKE', "%{$keyword}%")
                                  ->orWhere('email', 'LIKE', "%{$keyword}%");
                            });
                    });
                    break;
            }
        }

        $orders = $query->orderBy('order_date', 'desc')->get();

        // Format dates nicely for the UI
        $orders->transform(function ($order) {
            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'order_date' => $order->order_date ? $order->order_date->format('d-m-Y H:i:s') : null,
                'payment_mode' => $order->payment_mode,
                'total_amount' => (float) $order->total_amount,
                'status' => $order->status,
                'buyer' => [
                    'id' => $order->buyer?->id,
                    'name' => $order->buyer?->name,
                    'state' => $order->buyer?->state,
                    'email' => $order->buyer?->email,
                    'phone' => $order->buyer?->phone,
                ],
                'items' => $order->items->map(function ($item) use ($order) {
                    return [
                        'id' => $item->id,
                        'product_name' => $item->product_name,
                        'model' => $item->model,
                        'price' => (float) $item->price,
                        'date' => $order->order_date ? $order->order_date->format('d-m-Y H:i:s') : null,
                        'quantity' => (int) $item->quantity,
                        'delivery_charges' => (float) $item->delivery_charges,
                        'discount' => (float) $item->discount,
                        'status' => $item->status,
                        'image_url' => $item->image_url,
                    ];
                }),
            ];
        });

        return response()->json([
            'success' => true,
            'count' => $orders->count(),
            'data' => $orders,
        ]);
    }

    /**
     * Get tracking status milestones for an order.
     */
    public function track(string $id): JsonResponse
    {
        $order = Order::with('buyer')->where('order_number', $id)->orWhere('id', $id)->firstOrFail();

        $milestones = [
            [
                'step' => 'Order Confirmed',
                'description' => 'Your order has been placed and verified.',
                'date' => $order->order_date->format('d M Y, h:i A'),
                'completed' => true,
            ],
            [
                'step' => 'Order Packed & Quality Checked',
                'description' => 'Items packed securely in warehouse.',
                'date' => $order->order_date->addHours(4)->format('d M Y, h:i A'),
                'completed' => true,
            ],
            [
                'step' => 'Dispatched via Courier',
                'description' => 'Courier partner: BlueDart / Delhivery',
                'date' => $order->order_date->addHours(12)->format('d M Y, h:i A'),
                'completed' => true,
            ],
            [
                'step' => 'Fulfilled / Delivered',
                'description' => 'Package handed over to ' . ($order->buyer?->name ?? 'Customer'),
                'date' => $order->order_date->addDays(2)->format('d M Y, h:i A'),
                'completed' => ($order->status === 'fulfilled'),
            ],
        ];

        return response()->json([
            'success' => true,
            'order_number' => $order->order_number,
            'status' => $order->status,
            'milestones' => $milestones,
        ]);
    }

    /**
     * Get invoice payload for an order.
     */
    public function invoice(string $id): JsonResponse
    {
        $order = Order::with(['buyer', 'items'])->where('order_number', $id)->orWhere('id', $id)->firstOrFail();

        return response()->json([
            'success' => true,
            'invoice' => [
                'invoice_number' => 'INV-' . $order->order_number,
                'invoice_date' => $order->order_date->format('d-m-Y'),
                'order_number' => $order->order_number,
                'payment_mode' => $order->payment_mode,
                'buyer' => $order->buyer,
                'items' => $order->items,
                'total_amount' => $order->total_amount,
            ]
        ]);
    }
}
