import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [api, setApi] = useState({});
  const [highlighted, setHighlighted] = useState(false);
  const [selectedNode, setSelectedNode] = useState();

  const registerApi = (newApi) => {
    setApi(newApi);
  };

  return (
    <EditorContext.Provider
      value={{
        api,
        registerApi,
        highlighted,
        setHighlighted,
        selectedNode,
        setSelectedNode,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
