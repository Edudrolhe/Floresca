import Header from "./_components/header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 px-4 py-2">
        <h2 className="text-2xl font-bold">Olá, mundo!</h2>
        <p>Domingo, 07 de setembro de 2026</p>

        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Pesquisar..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className=" relative mt-6">
          <Image src="/Banner.png" alt="Banner"
           width={800} height={400} 
           className=" rounded-2xl object-cover" />
        </div>
      </div>
    </div>
  );
}
