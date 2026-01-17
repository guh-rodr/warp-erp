import { createContext, useContext, type ReactNode } from 'react';

export interface DialogProps {
  id?: string;
  type: 'modal' | 'drawer' | 'dropdown';
  title?: string;
  content: ReactNode;
}

export interface DialogContextProps {
  openDialog: (d: DialogProps) => void;
  closeDialog: (id?: string) => void;
  isOpen: boolean;
  closeAll: () => void;
}

export const DialogContext = createContext<DialogContextProps>({
  openDialog: () => {},
  closeDialog: () => {},
  isOpen: false,
  closeAll: () => {},
});

export const useDialog = () => useContext(DialogContext);
