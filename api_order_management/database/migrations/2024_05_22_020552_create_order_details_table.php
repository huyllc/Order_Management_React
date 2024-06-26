<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->integer('order_id');
            $table->integer('product_id');
            $table->double('product_price');
            $table->integer('quantity');
            $table->integer('quantity_can_return')->default(0);
            $table->integer('quantity_return')->default(0);
            $table->enum('status', ['none', 'return']);
            $table->double('total_price');
            $table->double('final_price')->default(0);
            $table->double('discount')->default(0);
            $table->timestamps();
        });

        Schema::table('order_details', function (Blueprint $table) {
            $table->integer('quantity_can_return')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_details');
    }
}
