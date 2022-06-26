export interface userProfileInterface {
  name: string;
  id: number;
}

export interface movie {
  id: number;
  title: string;
  userId: number;
}

export interface storeProps {
  children: JSX.Element;
}

export interface ModalProps {
  open: boolean;
  setOpen: (param: boolean) => void;
}

export interface loginObject {
  email: string;
  password: string;
}
