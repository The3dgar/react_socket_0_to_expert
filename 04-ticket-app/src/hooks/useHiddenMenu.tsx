import { useContext, useEffect } from 'react';
import { UiContext } from '../context/UiContext';

export const useHiddenMenu = (hide: boolean) => {
  const { showSidebar, hideSidebar } = useContext(UiContext);

  useEffect(() => {
    hide ? hideSidebar() : showSidebar();
  }, [hide]);
};
