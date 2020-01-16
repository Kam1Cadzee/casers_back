import {combineReducers} from 'redux';
import transport from './transport';
import {ITransportState} from '../typing/transport';

export interface RootState {
  transport: ITransportState;
}


export default combineReducers({
  transport
});
