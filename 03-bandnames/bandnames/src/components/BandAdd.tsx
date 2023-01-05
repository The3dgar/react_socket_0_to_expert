import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {
  const [name, setName] = useState('');
  const { socket } = useContext(SocketContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim().length) return;
    socket.emit('create-band', { name });
    setName('');
  };

  return (
    <>
      <h1>Add Band</h1>

      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </>
  );
};
