<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('folio', 30)->unique();
            $table->enum('type', ['prospect', 'active', 'inactive'])->default('active');

            // Datos generales
            $table->string('nombre_comercial', 500);
            $table->string('razon_social', 500)->nullable();
            $table->string('rfc', 50)->nullable();
            $table->string('curp', 50)->nullable();
            $table->string('representante_legal', 500)->nullable();
            $table->foreignId('responsable_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('sucursal', 20)->nullable();

            // Catálogos
            $table->foreignId('persona_tipo_id')->nullable()->constrained('persona_tipos')->nullOnDelete();
            $table->foreignId('uso_cfdi_id')->nullable()->constrained('uso_cfdi')->nullOnDelete();
            $table->foreignId('subtipo_cliente_id')->nullable()->constrained('subtipos_cliente')->nullOnDelete();
            $table->foreignId('regimen_fiscal_id')->nullable()->constrained('regimenes_fiscales')->nullOnDelete();
            $table->foreignId('forma_juridica_id')->nullable()->constrained('formas_juridicas')->nullOnDelete();
            $table->foreignId('ambito_id')->nullable()->constrained('ambitos')->nullOnDelete();
            $table->foreignId('tamanio_id')->nullable()->constrained('tamanios')->nullOnDelete();
            $table->foreignId('sector_id')->nullable()->constrained('sectores')->nullOnDelete();
            $table->foreignId('clasificacion_id')->nullable()->constrained('clasificaciones')->nullOnDelete();
            $table->foreignId('rama_id')->nullable()->constrained('ramas')->nullOnDelete();

            // Dirección
            $table->string('domicilio_calle', 500)->nullable();
            $table->string('domicilio_numero', 30)->nullable();
            $table->string('domicilio_colonia', 500)->nullable();
            $table->string('domicilio_cp', 10)->nullable();
            $table->foreignId('pais_id')->nullable()->constrained('paises')->nullOnDelete();
            $table->foreignId('estado_id')->nullable()->constrained('estados')->nullOnDelete();
            $table->foreignId('ciudad_id')->nullable()->constrained('ciudades')->nullOnDelete();

            // Contacto principal (legacy fields, también se maneja en client_contacts)
            $table->string('contacto_nombre', 200)->nullable();
            $table->string('contacto_profesion', 100)->nullable();
            $table->string('contacto_puesto', 100)->nullable();
            $table->string('contacto_email', 100)->nullable();
            $table->string('contacto_lada', 20)->nullable();
            $table->string('contacto_telefono', 100)->nullable();
            $table->string('contacto_extension', 10)->nullable();

            // Teléfono y lada principales
            $table->string('lada', 5)->nullable();
            $table->string('telefono', 20)->nullable();

            // Prospect-only
            $table->string('fuente', 250)->nullable();

            // Fechas
            $table->date('fecha_registro')->nullable();

            // Otros
            $table->text('observaciones')->nullable();
            $table->boolean('unsubscribe')->default(false);
            $table->integer('antiguedad')->nullable();
            $table->integer('pago_periodo')->nullable();
            $table->decimal('pago_despacho', 10, 2)->nullable();
            $table->date('actualizada')->nullable();
            $table->boolean('activo')->default(true);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
