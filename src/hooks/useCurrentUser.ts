import { create } from 'zustand';
import { type SafeUser } from '../types';

interface useCurrentUserProps {
  currentUser: SafeUser | null;
  setUser: (user: SafeUser | null) => void;
}

const useCurrentUser = create<useCurrentUserProps>((set) => ({
  currentUser: null,
  setUser: (user) => {
    set({ currentUser: user });
  }
}));

export default useCurrentUser;
