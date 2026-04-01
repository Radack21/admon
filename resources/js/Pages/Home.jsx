import { usePage } from "@inertiajs/react";
import MenuBackGround from "@/Components/backgrounds/MenuBackGround";
import MenuItem from "@/Components/menu/MenuItem";
import Header from "@/Components/layout/header/Header";

//Importar iconos
import {
    IconUsuarios,
    IconClientes,
    IconEgresos,
    IconIngresos,
    IconProveedores,
    IconRequerimientos,
    IconResultados,
    IconSprints,
} from "@/Components/Icons";
import Footer from "../Components/ui/Footer";

export default function Home() {
    const { auth } = usePage().props;
    return (
        <div>
            <MenuBackGround />
            <Header user={auth.user} />

            <main className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-28 gap-y-16">
                    <MenuItem
                        label="Clientes"
                        icon={IconClientes}
                        accentColor="#4ECDC4"
                    />
                    <MenuItem
                        label="Ingresos"
                        icon={IconIngresos}
                        accentColor="#B5F542"
                    />
                    <MenuItem
                        label="Egresos"
                        icon={IconEgresos}
                        accentColor="#FF6B4A"
                    />
                    <MenuItem
                        label="Proveedores"
                        icon={IconProveedores}
                        accentColor="#90E0EF"
                    />
                    <MenuItem
                        label="Usuarios"
                        icon={IconUsuarios}
                        accentColor="#FF8FA3"
                    />
                    <MenuItem
                        label="Resultados"
                        icon={IconResultados}
                        accentColor="#FFB347"
                    />
                    <MenuItem
                        label="Requerimientos"
                        icon={IconRequerimientos}
                        accentColor="#FFF176"
                    />
                    <MenuItem
                        label="Sprints"
                        icon={IconSprints}
                        accentColor="#FFE566"
                    />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
