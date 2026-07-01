<?php

namespace App\Http\Controllers\Clients;

use App\Http\Controllers\Controller;
use App\Http\Requests\Clients\StoreClientRequest;
use App\Models\Client;
use App\Models\ClientSocialNetwork;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ClientController extends Controller
{
    private array $allowedSorts = ['nombre_comercial', 'folio', 'rfc', 'type', 'fecha_registro', 'contacto_nombre'];

    public function index(Request $request)
    {
        $tab = $request->get('tab', 'directorio');
        $search = $request->get('search', '');
        $sort = $request->get('sort', 'nombre_comercial');
        $direction = $request->get('direction', 'asc');

        $query = match ($tab) {
            'potenciales' => Client::where('type', 'prospect'),
            default => Client::whereIn('type', ['active', 'inactive']),
        };

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nombre_comercial', 'like', "%{$search}%")
                    ->orWhere('folio', 'like', "%{$search}%")
                    ->orWhere('rfc', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%")
                    ->orWhere('fecha_registro', 'like', "%{$search}%")
                    ->orWhere('contacto_nombre', 'like', "%{$search}%");
            });
        }

        if (in_array($sort, $this->allowedSorts)) {
            $query->orderBy($sort, $direction === 'desc' ? 'desc' : 'asc');
        }

        $clientes = $query->paginate(10)->withQueryString();

        return Inertia::render('Clientes/Index', [
            'clientes' => $clientes,
            'filters' => [
                'tab' => $tab,
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function store(StoreClientRequest $request)
    {
        $validated = $request->validated();

        $clientData = collect($validated)
            ->except(['social_networks', 'services'])
            ->toArray();

        $clientData['folio'] = 'CLI-' . strtoupper(Str::random(8));
        $clientData['fecha_registro'] = now()->toDateString();

        $client = Client::create($clientData);

        if ($request->has('social_networks')) {
            $platforms = ['web', 'facebook', 'twitter', 'linkedin', 'google'];
            foreach ($platforms as $platform) {
                $url = $request->input("social_networks.{$platform}");
                if (! empty($url)) {
                    $client->socialNetworks()->create([
                        'platform' => $platform,
                        'url' => $url,
                    ]);
                }
            }
        }

        if ($request->has('services')) {
            $client->services()->sync($request->input('services'));
        }

        $tab = $validated['type'] === 'prospect' ? 'potenciales' : 'directorio';

        return redirect()->route('clientes.index', ['tab' => $tab])
            ->with('success', 'Cliente creado exitosamente');
    }
}
