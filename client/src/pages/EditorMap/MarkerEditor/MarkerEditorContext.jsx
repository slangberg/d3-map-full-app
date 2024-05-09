import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [api, setApi] = useState({});

  const registerApi = (newApi) => {
    setApi(newApi);
  };

  return (
    <EditorContext.Provider value={{ api, registerApi }}>
      {children}
    </EditorContext.Provider>
  );
};
