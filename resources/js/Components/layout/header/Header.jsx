import Logo from "@/Components/ui/Logo";
import UserCapsule from "@/Components/ui/UserCapsule";

export default function Header({ user }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
            <Logo />
            <UserCapsule user={user} />
        </header>
    );
}
