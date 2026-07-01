<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mailings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->nullable()->constrained('clients')->nullOnDelete();
            $table->string('asunto', 250);
            $table->text('mensaje');
            $table->text('destinatarios')->nullable();
            $table->string('remitente', 250)->nullable();
            $table->boolean('afiliados')->default(false);
            $table->boolean('prospectos')->default(false);
            $table->timestamp('enviado_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mailings');
    }
};
