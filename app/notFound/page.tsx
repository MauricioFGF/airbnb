"use client";

import { useRouter } from "next/navigation";
import { TbBrandAirbnb } from "react-icons/tb";

import Button from "../components/Button";
import ClientOnly from "../components/ClientOnly";

const NotFound = () => {
  const router = useRouter();
  return (
    <ClientOnly>
      <div className="h-[75vh] flex flex-col items-center justify-center w-[250px] m-auto">
        <TbBrandAirbnb size={60} />
        <span className="mb-2 mt-4">Página não encontrada</span>
        <Button small label="Home" onClick={() => router.push("/")} />
      </div>
    </ClientOnly>
  );
};

export default NotFound;
