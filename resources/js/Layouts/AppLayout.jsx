import AnimatedHeader from "@/Components/header/AnimatedHeader";
import RightSidebar from "@/Components/sidebar/RightSidebar";
import StatusBar from "@/Components/status/StatusBar";
import PageTransition from "@/Components/ui/PageTransition";

export default function AppLayout({ breadcrumb, children }) {
    return (
        <div className="flex flex-col min-h-dvh overflow-x-hidden">
            {/* Fondo compartido */}
            <div className="bg-canvas" />
            <div className="grain" />

            <AnimatedHeader breadcrumb={breadcrumb} />
            <RightSidebar />

            <main className="relative z-10 flex-1 flex flex-col overflow-hidden mt-14 mr-14">
                <PageTransition className="animate-page-enter-module flex-1 flex flex-col">
                    {children}
                </PageTransition>
            </main>

            <StatusBar />
        </div>
    );
}
