export interface AppContextState {
  setWarning: React.Dispatch<React.SetStateAction<string>>;
}

export interface ModalState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface WarningState extends ModalState {
  warning: string; 
  setWarning: React.Dispatch<React.SetStateAction<string>>;
}

export interface FormButton {
  func: (...args: any[]) => void;
}
