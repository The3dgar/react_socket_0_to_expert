import React, { createContext, useReducer } from 'react';
import { chatReducer } from './chatReducer';

export const ChatContext = createContext();

export const initialChatState = {
  uid: '',
  chatActivo: null, //uid del usuario destino
  usuarios: [],
  mensajes: [],
};

export const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialChatState);

  

  return (
    <ChatContext.Provider
      value={{
        chatState,
        dispatch,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
