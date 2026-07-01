<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('regimenes_fiscales', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('persona_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('uso_cfdi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('persona_tipo_id')->constrained('persona_tipos')->cascadeOnDelete();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('subtipos_cliente', function (Blueprint $table) {
            $table->id();
            $table->foreignId('uso_cfdi_id')->constrained('uso_cfdi')->cascadeOnDelete();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('formas_juridicas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('ambitos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('tamanios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('sectores', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('clasificaciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('ramas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('paises', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('estados', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pais_id')->constrained('paises')->cascadeOnDelete();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('ciudades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('estado_id')->constrained('estados')->cascadeOnDelete();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('servicios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ciudades');
        Schema::dropIfExists('estados');
        Schema::dropIfExists('paises');
        Schema::dropIfExists('ramas');
        Schema::dropIfExists('clasificaciones');
        Schema::dropIfExists('sectores');
        Schema::dropIfExists('tamanios');
        Schema::dropIfExists('ambitos');
        Schema::dropIfExists('formas_juridicas');
        Schema::dropIfExists('subtipos_cliente');
        Schema::dropIfExists('uso_cfdi');
        Schema::dropIfExists('persona_tipos');
        Schema::dropIfExists('regimenes_fiscales');
        Schema::dropIfExists('servicios');
    }
};
