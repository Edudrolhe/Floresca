import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const Header = () => {
    return (
        <header className="flex items-center justify-between px-4 py-2">
            <Image src="/Logo.png" alt="Floresca Floricultura" width={160} height={40} priority />
            <Button variant="ghost" size="icon">
                <MenuIcon className="size-5" />
            </Button>
        </header>
    );
}

export default Header;