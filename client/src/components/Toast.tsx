import { useEffect } from 'react';
import { useToastStore } from '../store/toastStore';
import { X } from 'lucide-react';

const Toast = () => {
  const { isVisible, message, type, hideToast } = useToastStore();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  if (!isVisible) {
    return null;
  }

  const baseClasses = 'fixed top-5 right-5 p-4 rounded-lg shadow-lg flex items-center text-white z-50';
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <span>{message}</span>
      <button onClick={hideToast} className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors">
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;