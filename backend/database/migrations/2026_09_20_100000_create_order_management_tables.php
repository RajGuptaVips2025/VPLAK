<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('buyers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('state')->nullable();
            $table->string('email')->index();
            $table->string('phone')->index();
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->index();
            $table->foreignId('buyer_id')->constrained('buyers')->cascadeOnDelete();
            $table->dateTime('order_date');
            $table->string('payment_mode')->default('cod'); // cod, Credit Card, Debit Card, UPI
            $table->decimal('total_amount', 10, 2);
            $table->string('status')->default('fulfilled'); // placed, processing, shipped, fulfilled, cancelled
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->string('product_name');
            $table->string('model')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('quantity')->default(1);
            $table->decimal('delivery_charges', 10, 2)->default(0.00);
            $table->decimal('discount', 10, 2)->default(0.00);
            $table->string('status')->default('fulfilled');
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('buyers');
    }
};

