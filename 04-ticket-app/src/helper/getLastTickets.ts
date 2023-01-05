import { BACKEND_SERVER_URL } from '../context/SocketProvider';
import { TicketInterface } from '../interfaces/ticket';

export const getLastTickets = async () => {
  const resp = await fetch(`${BACKEND_SERVER_URL}/tickets`);
  const data = (await resp.json()) as TicketInterface[];
  return data;
};
