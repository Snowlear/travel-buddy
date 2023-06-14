import React, { useContext } from 'react';
import { City } from '../types/City';
import { searchCities, calculateDistances } from '../api/fakeApi';

interface CitiesContextType {
  cities: City[];
  searchCities: (keyword: string) => Promise<City[]>;
  calculateDistances: (cities: City[]) => Promise<number[]>;
}

interface CitiesProviderProps {
  children: React.ReactNode;
}

const CitiesProvider: React.FC<CitiesProviderProps> = ({ children }) => {
  const contextValues: CitiesContextType = {
    cities: [],
    searchCities,
    calculateDistances
  };

  return (
    <CitiesContext.Provider value={contextValues}>
      {children}
    </CitiesContext.Provider>
  );
};

const CitiesContext = React.createContext<CitiesContextType>({
  cities: [],
  searchCities: async () => [],
  calculateDistances: async () => [],
});

const useCitiesContext = (): CitiesContextType =>
  useContext(CitiesContext) as CitiesContextType;


export { CitiesProvider, useCitiesContext };