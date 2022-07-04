/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, FC, ReactNode, useState } from "react";

interface IABVContext {
  abv: number;
  setAbv: React.Dispatch<React.SetStateAction<number>>;
}

export const BeerABVContext = createContext<IABVContext>({
  abv: 1,
  setAbv: () => {},
});

interface IBeerABVContextProviderProps {
  children: ReactNode;
}

export const BeerABVContextProvider: FC<IBeerABVContextProviderProps> = ({
  children,
}) => {
  const [abv, setAbv] = useState<number>(1);

  return (
    <BeerABVContext.Provider
      value={{
        abv,
        setAbv,
      }}
    >
      {children}
    </BeerABVContext.Provider>
  );
};
