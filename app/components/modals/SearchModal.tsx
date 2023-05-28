"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO, differenceInDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from "../Heading";
import Button from "../Button";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const removeGuestFilter = () => {
    setGuestCount(0);
    setRoomCount(0);
    setBathroomCount(0);
  };

  const removeDateFilter = () => {
    setDateRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };

  const calcDiff = useCallback(() => {
    const getStart = new Date(formatISO(dateRange.startDate as Date));
    const getEnd = new Date(formatISO(dateRange.endDate as Date));
    const diff = differenceInDays(getEnd, getStart);

    return diff;
  }, [dateRange.endDate, dateRange.startDate]);

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const step = useMemo(() => {
    return searchModal.isStep;
  }, [searchModal.isStep]);
  console.log(step);

  const onClose = () => {
    searchModal.onStep(STEPS.LOCATION);
    searchModal.onClose();
  };

  const onSubmit = useCallback(async () => {
    let currentQuery: any = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
      if (currentQuery.startDate) {
        delete currentQuery.startDate;
      }
      if (currentQuery.endDate) {
        delete currentQuery.endDate;
      }
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      bathroomCount: bathroomCount || undefined,
      roomCount: roomCount || undefined,
      guestCount: guestCount || undefined,
    };

    const diff = calcDiff();

    if (diff > 0) {
      updatedQuery.startDate = formatISO(dateRange.startDate as Date);
      updatedQuery.endDate = formatISO(dateRange.endDate as Date);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    searchModal.onStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    params,
    location?.value,
    bathroomCount,
    roomCount,
    guestCount,
    calcDiff,
    searchModal,
    router,
    dateRange.startDate,
    dateRange.endDate,
  ]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Onde você quer ir?"
        subtitle="Encontre o local perfeito!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Quando você planeja ir?"
          subtitle="Certifique-se de que todos estão livres!"
        >
          {calcDiff() > 0 ? (
            <div>
              <Button
                small
                outline
                label="Remover filtros"
                onClick={removeDateFilter}
              />
            </div>
          ) : (
            <></>
          )}
        </Heading>
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Mais informações"
          subtitle="Encontre o seu lugar perfeito!"
        >
          {guestCount || roomCount || bathroomCount ? (
            <div>
              <Button
                small
                outline
                label="Remover filtros"
                onClick={removeGuestFilter}
              />
            </div>
          ) : (
            <></>
          )}
        </Heading>
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          minValue={0}
          title="Hóspedes"
          subtitle="Quantos hóspedes estão vindo?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          minValue={0}
          title="Quartos"
          subtitle="Quantos quartos você precisa?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          minValue={0}
          title="Banheiros"
          subtitle="De quantos banheiros você precisa?"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filtros"
      actionLabel="Procurar"
      onSubmit={onSubmit}
      onClose={onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
