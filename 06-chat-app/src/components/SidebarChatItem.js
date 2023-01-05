import React, { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { scrollControl } from '../helpers/scrollControl';
import { types } from '../types/types';

export const SidebarChatItem = ({ user }) => {
  const { dispatch, chatState } = useContext(ChatContext);

  const onClick = async () => {
    dispatch({
      type: types.CHAT_ACTIVO,
      payload: user.uid,
    });

    // cargar los mensajes del chat
    const url = `message/${user.uid}`;
    try {
      const resp = await fetchConToken(url);
      dispatch({
        type: types.CHAT_MESSAGES,
        payload: resp.messages,
      });
      scrollControl('messages');
    } catch (error) {
      console.log(error);
    }

  };
  const { chatActivo } = chatState;

  return (
    <div className='chat_list' onClick={onClick}>
      <div
        className={`chat_people ${chatActivo === user.uid && 'active_chat'}`}>
        <div className='chat_img'>
          <img
            src='https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png'
            alt='sunil'
          />
        </div>
        <div className='chat_ib'>
          <h5>{user.name}</h5>
          {user.online ? (
            <span className='text-success'>Online</span>
          ) : (
            <span className='text-danger'>Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
