<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Jalankan migration.
     */
    public function up(): void
    {
        Schema::create('order_status_histories', function (Blueprint $table) {
            // id histori pakai bigint auto increment
            $table->bigIncrements('id');

            // order_id harus sama tipe dengan orders.id (bigint unsigned)
            $table->foreignId('order_id')
                ->constrained('orders')
                ->onDelete('cascade');

            // status mengikuti enum di tabel orders
            $table->enum('status', [
                'pending',
                'paid',
                'shipped',
                'completed',
                'cancelled'
            ]);

            // waktu perubahan
            $table->timestamp('changed_at')->useCurrent();
        });
    }

    /**
     * Rollback migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_status_histories');
    }
};
