import { createContext, ReactNode, useState } from 'react';

export interface UiContextProps {
  showMenu: boolean;
  hideSidebar: () => void;
  showSidebar: () => void;
}
export const UiContext = createContext<UiContextProps>({} as UiContextProps);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const UiContextProvider = ({ children }: Props) => {
  const [showMenu, setShowMenu] = useState(true);

  const showSidebar = () => {
    setShowMenu(true);
  };

  const hideSidebar = () => {
    setShowMenu(false);
  };
  return (
    <UiContext.Provider value={{ showMenu, showSidebar, hideSidebar }}>
      {children}
    </UiContext.Provider>
  );
};
