import {create} from 'zustand';

type ToastState = {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  type: 'info',
  isVisible: false,
  showToast: (message, type = 'info') => set({ message, type, isVisible: true }),
  hideToast: () => set({ isVisible: false, message: '', type: 'info' }),
}));