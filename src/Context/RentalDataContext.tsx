import React, { createContext, useContext, useState } from 'react';
import { RentalDataInterface } from '../Types/Homepage';

interface CardsContainerStateInterface {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface CardsContainerInterface {
  rentalData: Array<RentalDataInterface>;
  setRentalData: (rentalData: Array<RentalDataInterface>) => void;
  cardsContainerStates: CardsContainerStateInterface;
  setCardContainerStates: (cardsContainerStates: CardsContainerStateInterface) => void;
}

const defaultCardsContainerStates = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const RentalCardsContext = createContext<CardsContainerInterface>({
  rentalData: [],
  setRentalData: () => {},
  cardsContainerStates: defaultCardsContainerStates,
  setCardContainerStates: () => {},
});

const RentalCardsContextProvider: React.FC = ({ children }) => {
  const [rentalData, setRentalData] = useState<RentalDataInterface[]>([]);
  const [cardsContainerStates, setCardContainerStates] = useState(defaultCardsContainerStates);

  return (
    <RentalCardsContext.Provider value={{ rentalData, setRentalData, cardsContainerStates, setCardContainerStates }}>
      {children}
    </RentalCardsContext.Provider>
  );
};

export const useRentalCardsContext = () => {
  return useContext(RentalCardsContext);
};

export { RentalCardsContextProvider };
