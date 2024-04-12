import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const MapAPIContext = createContext();

export const MapAPIProvider = ({ children }) => {
  const [api, setAPI] = useState();

  const callAPIMethod = (method, payload) => {
    if (!api) {
      throw new Error("API is not set");
    }
    if (!api[method]) {
      throw new Error(`${method} is not a valid API method`);
    }
    return api[method](payload);
  };

  return (
    <MapAPIContext.Provider value={{ api, setAPI, callAPIMethod }}>
      {children}
    </MapAPIContext.Provider>
  );
};

export const useMapAPI = () => {
  const context = useContext(MapAPIContext);
  if (!context) {
    throw new Error("useMapAPI must be used within a MapAPIProvider");
  }

  return context;
};

export const useMapAPIEvent = (event, callback) => {
  const { api } = useContext(MapAPIContext);
  const functionRef = useCallback(callback, [api]);

  const clearListeners = () => {
    if (api) {
      return () => api.clearListeners(event, functionRef);
    }
  };

  useEffect(() => {
    if (api) {
      api.register(event, functionRef);
    }
    return clearListeners;
  }, [api]);

  return () => {
    throw new Error("API is not set");
  };
};
