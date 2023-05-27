"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Praia",
    icon: TbBeach,
    description: "Essa propriedade fica perto da praia!",
  },
  {
    label: "Moinhos",
    icon: GiWindmill,
    description: "Essa propriedade tem moinho de vento!",
  },
  {
    label: "Moderna",
    icon: MdOutlineVilla,
    description: "Essa propriedade é moderna!",
  },
  {
    label: "Interior",
    icon: TbMountain,
    description: "Essa propriedade é no interior!",
  },
  {
    label: "Piscina",
    icon: TbPool,
    description: "Essa propriedade tem uma linda piscina!",
  },
  {
    label: "Ilhas",
    icon: GiIsland,
    description: "Essa propriedade fica em uma ilha!",
  },
  {
    label: "Lago",
    icon: GiBoatFishing,
    description: "Essa propriedade fica perto de um lago!",
  },
  {
    label: "Esquiar",
    icon: FaSkiing,
    description: "Essa propriedade tem atividade de esqui!",
  },
  {
    label: "Castelo",
    icon: GiCastle,
    description: "Essa propriedade é um castelo antigo!",
  },
  {
    label: "Caverna",
    icon: GiCaveEntrance,
    description: "Essa propriedade fica em uma caverna assustadora!",
  },
  {
    label: "Acampamento",
    icon: GiForestCamp,
    description: "Essa propriedade oferece acampamento!",
  },
  {
    label: "Ártico",
    icon: BsSnow,
    description: "Essa propriedade está no ambiente ártico!",
  },
  {
    label: "Deserto",
    icon: GiCactus,
    description: "Essa propriedade fica no deserto!",
  },
  {
    label: "Celeiros",
    icon: GiBarn,
    description: "Essa propriedade tem um celeiro!",
  },
  {
    label: "Luxo",
    icon: IoDiamond,
    description: "Essa propriedade é nova e luxuosa!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
