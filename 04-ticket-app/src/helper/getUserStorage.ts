import { Agent } from '../routes/Agent';
interface UserStorage {
  agent: string | null;
  desk: string | null;
}

export const getUserStorage = (): UserStorage => {
  return {
    agent: localStorage.getItem('agent') || null,
    desk: localStorage.getItem('desk') || null,
  }
}