"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import React, { useCallback, useState } from "react";

import MenuItem from "./MenuItem";

import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";

//images
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const logOut = async () => {
    await signOut();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Anuncie seu espaço no Airbnb
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <div className="hidden lg:block">
            <AiOutlineMenu />
          </div>
          <div>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounde-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="Favoritos"
                />
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="Minhas viagens"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="Minhas reservas"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="Minhas propriedades"
                />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label="Anuncie seu espaço no Airbnb"
                />
                <hr />
                <MenuItem onClick={logOut} label="Sair da conta" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Entrar" />
                <MenuItem onClick={registerModal.onOpen} label="Cadastrar" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
