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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_code');
            $table->integer('customer_id');
            $table->integer('sale_id');
            $table->double('total_price');
            $table->double('final_price');
            $table->double('total_paid')->default(0);
            $table->enum('order_status', ['done', 'stake', 'none'])->default('none');
            $table->string('address');
            $table->boolean('export_bill')->default(false);
            $table->boolean('is_vat')->default(true);
            $table->date('date_delivery');
            $table->text('note')->nullable();
            $table->integer('warehouse_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
