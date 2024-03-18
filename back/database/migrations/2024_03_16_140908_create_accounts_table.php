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
        //外部キー制約を一旦無効化
        Schema::disableForeignKeyConstraints();
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('icon');
            $table->string('mainstage_image');
            $table->text('profile');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
        //外部キー制約を有効化
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
