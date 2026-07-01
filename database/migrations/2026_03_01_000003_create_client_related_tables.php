<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->string('nombre', 200)->nullable();
            $table->string('profesion', 100)->nullable();
            $table->string('puesto', 100)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('lada', 20)->nullable();
            $table->string('telefono', 100)->nullable();
            $table->string('extension', 10)->nullable();
            $table->timestamps();
        });

        Schema::create('client_social_networks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->enum('platform', ['web', 'facebook', 'twitter', 'linkedin', 'google']);
            $table->string('url', 500);
            $table->timestamps();
        });

        Schema::create('client_credentials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->string('service_key', 50);
            $table->text('value');
            $table->timestamps();
        });

        Schema::create('client_metadata', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->string('key', 50);
            $table->string('value', 250)->nullable();
            $table->timestamps();
        });

        Schema::create('client_service', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->foreignId('service_id')->constrained('servicios')->cascadeOnDelete();
            $table->unique(['client_id', 'service_id']);
            $table->timestamps();
        });

        Schema::create('client_sprints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->foreignId('sprint_id')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_sprints');
        Schema::dropIfExists('client_service');
        Schema::dropIfExists('client_metadata');
        Schema::dropIfExists('client_credentials');
        Schema::dropIfExists('client_social_networks');
        Schema::dropIfExists('client_contacts');
    }
};
