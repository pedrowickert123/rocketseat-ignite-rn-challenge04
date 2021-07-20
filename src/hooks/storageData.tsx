import React, { createContext, ReactNode, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StorageDataProps {
  children: ReactNode;
}

interface StorageDataContextProps {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, data: string) => Promise<void>;
}

const StorageDataContext = createContext({} as StorageDataContextProps);

function StorageDataProvider({ children }: StorageDataProps) {
  async function getItem(key: string) {
    return await AsyncStorage.getItem(key);
  }

  async function setItem(key: string, data: string) {
    return await AsyncStorage.setItem(key, data);
  }

  return (
    <StorageDataContext.Provider value={{ getItem, setItem }}>
      {children}
    </StorageDataContext.Provider>
  );
}

const useStorageData = () => {
  const context = useContext(StorageDataContext);

  return context;
};

export { StorageDataProvider, useStorageData };
