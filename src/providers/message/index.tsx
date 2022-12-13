import { ToastId, useToast, UseToastOptions } from '@chakra-ui/toast';
import { createContext, ReactNode, useRef } from 'react';

export type MessageServiceProps = {
  close: () => void;
  closeAll: () => void;
  add: (options: UseToastOptions) => void;
  updateLast: (options: UseToastOptions) => void;
};

export const MessageContext = createContext({} as MessageServiceProps);

const { Provider } = MessageContext;

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast({
    position: 'top',
    variant: 'left-accent',
    isClosable: true,
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
