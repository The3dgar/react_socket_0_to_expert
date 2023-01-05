import { types } from '../../types/types';
import { initialChatState } from './ChatContext';

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.SESSION_CLOSE:
      return initialChatState;
    case types.USERS_LIST:
      return {
        ...state,
        usuarios: action.payload,
      };
    case types.CHAT_MESSAGES:
      return {
        ...state,
        mensajes: action.payload,
      };
    case types.CHAT_ACTIVO:
      if (state.chatActivo === action.payload) return state;

      return {
        ...state,
        chatActivo: action.payload,
        mensajes: [],
      };
    case types.CHAT_NEW_MESSAGE:
      if (
        state.chatActivo === action.payload.to ||
        state.chatActivo === action.payload.from
      ) {
        return {
          ...state,
          mensajes: [...state.mensajes, action.payload],
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};
