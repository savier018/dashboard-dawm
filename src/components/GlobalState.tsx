import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalStateContextProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState<string>('humidity'); // Default to 'humidity'

  return (
    <GlobalStateContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextProps => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
