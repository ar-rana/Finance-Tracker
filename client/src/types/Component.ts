export interface ModalState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormButton {
  func: (...args: any[]) => void;
}