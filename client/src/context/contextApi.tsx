import { createContext, useContext, useState } from "react";

type ContextType = {
  forum: string;
  setForum: React.Dispatch<React.SetStateAction<string>>;
};

const MyContext = createContext<ContextType | undefined>(undefined);

function MyProvider({ children }: { children: React.ReactNode }) {
  const [forum, setForum] = useState<string>("");

  return (
    <MyContext.Provider value={{ forum, setForum }}>
      {children}
    </MyContext.Provider>
  );
}

function useMyContext() {
  const context = useContext(MyContext);
  if (!context) throw new Error("useMyContext must be used within a MyProvider");
  return context;
}

export { MyProvider, useMyContext };
