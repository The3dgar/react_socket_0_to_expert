import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';


export interface Band {
  id: string;
  name: string;
  votes: number;
}

export const BandList = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    socket.on('current-bands', setBands);
    return () => socket.off('current-bands');
  }, [socket]);

  const vote = (id: string) => {
    socket.emit('vote-band', id);
  };

  const deleteBand = (id: string) => {
    socket.emit('delete-band', id);
  };

  const onBlur = (id: string, name: string) => {
    socket.emit('rename-band', {
      id,
      name,
    });
  };

  const nameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const nuevoNombre = event.target.value;

    setBands((arr) =>
      arr.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const createRows = () => {
    return bands.map((band) => {
      const { id, name, votes } = band;
      return (
        <tr key={id}>
          <td>
            <button className='btn btn-primary' onClick={() => vote(id)}>
              {' '}
              +1{' '}
            </button>
          </td>
          <td>
            <input
              className='form-control'
              value={name}
              onChange={(e) => nameChange(e, id)}
              onBlur={() => onBlur(id, name)}
            />
          </td>

          <td>
            <h3> {votes}</h3>
          </td>

          <td>
            <button className='btn btn-danger' onClick={() => deleteBand(id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <table className='table table-stripped'>
        <thead>
          <tr>
            <th></th>
            <th>Names</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
