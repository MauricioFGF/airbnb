"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";

import useSearchModal from "@/app/hooks/useSearchModal";
import useCountries from "@/app/hooks/useCountries";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Qualquer lugar";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff}  ${diff > 1 ? "Dias" : "Dia"}`;
    }

    return "Qualquer semana";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} ${+guestCount > 1 ? "Hóspedes" : "Hóspede"}`;
    }

    return "Hóspedes?";
  }, [guestCount]);

  return (
    <div
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
        ml-2
      "
    >
      <div
        className="
          flex 
          flex-row 
          justify-between
          h-full
        "
      >
        <div
          onClick={() => searchModal.onStep(0)}
          className="
            flex
            items-center 
            text-sm 
            font-semibold 
            px-6
            py-1
          "
        >
          {locationLabel}
        </div>
        <div
          onClick={() => searchModal.onStep(1)}
          className="
            hidden 
            sm:flex 
            items-center
            justify-center
            text-sm 
            font-semibold 
            px-6 
            py-1
            border-x-[1px] 
            flex-1 
          "
        >
          {durationLabel}
        </div>
        <div
          onClick={() => searchModal.onStep(2)}
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
            py-1
          "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
