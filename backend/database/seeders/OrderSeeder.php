<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Buyer;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. First Order (From exact screenshot)
        $buyer1 = Buyer::create([
            'name' => 'dummy',
            'state' => 'Delhi',
            'email' => 'dummy@test.com',
            'phone' => '9876543210',
        ]);

        $order1 = Order::create([
            'order_number' => '78369274',
            'buyer_id' => $buyer1->id,
            'order_date' => Carbon::createFromFormat('d-m-Y H:i:s', '30-08-2017 03:29:17'),
            'payment_mode' => 'cod',
            'total_amount' => 799.00,
            'status' => 'fulfilled',
        ]);

        OrderItem::create([
            'order_id' => $order1->id,
            'product_name' => 'Blue Vivo Mobile Phone',
            'model' => 'Y11',
            'price' => 799.00,
            'quantity' => 1,
            'delivery_charges' => 0.00,
            'discount' => 0.00,
            'status' => 'fulfilled',
            'image_url' => 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&auto=format&fit=crop&q=80',
        ]);

        // 2. Second Order (From exact screenshot)
        $buyer2 = Buyer::create([
            'name' => 'jainendra',
            'state' => 'M.P',
            'email' => 'jainendra@123.com',
            'phone' => '9811223344',
        ]);

        $order2 = Order::create([
            'order_number' => '88451236',
            'buyer_id' => $buyer2->id,
            'order_date' => Carbon::createFromFormat('d-m-Y H:i:s', '15-01-2024 11:45:32'),
            'payment_mode' => 'Credit Card',
            'total_amount' => 2568.00,
            'status' => 'fulfilled',
        ]);

        OrderItem::create([
            'order_id' => $order2->id,
            'product_name' => 'Wireless Bluetooth Soundbar',
            'model' => 'SB-200X',
            'price' => 2568.00,
            'quantity' => 1,
            'delivery_charges' => 0.00,
            'discount' => 0.00,
            'status' => 'fulfilled',
            'image_url' => 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200&auto=format&fit=crop&q=80',
        ]);

        // 3. Additional Sample Order (Rahul Sharma)
        $buyer3 = Buyer::create([
            'name' => 'Rahul Sharma',
            'state' => 'Maharashtra',
            'email' => 'rahul.sharma@example.com',
            'phone' => '9988776655',
        ]);

        $order3 = Order::create([
            'order_number' => '99341209',
            'buyer_id' => $buyer3->id,
            'order_date' => Carbon::createFromFormat('d-m-Y H:i:s', '02-02-2024 14:15:00'),
            'payment_mode' => 'UPI',
            'total_amount' => 1499.00,
            'status' => 'in_transit',
        ]);

        OrderItem::create([
            'order_id' => $order3->id,
            'product_name' => 'Smart Fitness Watch Series 5',
            'model' => 'SW-500',
            'price' => 1499.00,
            'quantity' => 1,
            'delivery_charges' => 0.00,
            'discount' => 0.00,
            'status' => 'in_transit',
            'image_url' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
        ]);
    }
}

