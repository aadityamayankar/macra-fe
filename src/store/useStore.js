import { create } from 'zustand';
import zukeeper from 'zukeeper';

const useStore = create(zukeeper((set) => ({
  cities: [],
  setCities: (cities) => set({ cities }),
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
})));

window.store = useStore;

export default useStore;