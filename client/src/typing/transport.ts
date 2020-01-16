import {Status} from '../status';

export interface IDevice {
  number: string;
  damaged: boolean;
  icons?: Set<string> | null;
}

export interface ITransport {
  createdDate: string;
  number_transport: string;
  number_trailer: string;
  driver: string;
  devices: IDevice[];
  collisionId: string | null;
  status: Status;
  id: string;
}

export interface ITransportState {
  data: ITransport[];
  isLoading: boolean;
  error: any;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface ICompareDataProps {
  title: string;
  leftData: any;
  rightData: any;
  type: string;
  dispatch: any;
}
