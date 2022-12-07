import { ToastId, useToast, UseToastOptions } from '@chakra-ui/toast';
import { createContext, ReactNode, useRef } from 'react';

export const MessageContext = createContext({
  close: () => {
    return;
  },
  closeAll: () => {
    return;
  },
  add: (options: UseToastOptions) => {
    options;
  },
  updateLast: (options: UseToastOptions) => {
    options;
  },
});

const { Provider } = MessageContext;

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast({
    position: 'top',
    variant: 'left-accent',
  });
  const toastIdRef = useRef<ToastId>();
  const close = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };
  const closeAll = () => {
    // you may optionally pass an object of positions to exclusively close
    // keeping other positions opened
    // e.g. `{ positions: ['bottom'] }`
    toast.closeAll();
  };
  const add = (options: UseToastOptions) => {
    toastIdRef.current = toast(options);
  };
  const updateLast = (options: UseToastOptions) => {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, options);
    }
  };
  const contextValue = {
    close,
    closeAll,
    add,
    updateLast,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};

export default MessageProvider;
