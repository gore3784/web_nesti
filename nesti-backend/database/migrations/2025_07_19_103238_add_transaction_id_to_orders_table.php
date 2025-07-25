<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // cek dulu kalau kolom belum ada
            if (!Schema::hasColumn('orders', 'transaction_id')) {
                $table->string('transaction_id')->nullable()->after('order_number');
            }
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('transaction_id');
        });
    }
};
