import {IBaseActions, IBaseState} from './base/baseTypes';
import {CreatorReducer} from './base/base';
import service from '../service';
import {Status} from '../status';

interface ITransportActions extends IBaseActions{
  addTransport: any;
  deleteTransport: any;
}

const creator = new CreatorReducer<ITransportActions, IBaseState>('transport');
creator.addAction('ADD_TRANSPORT',
  ((state, action) => {
    const data = [...state.data, action.payload];
    return {...state, data}
  }));
creator.addAction('DELETE_TRANSPORT',
  (state, action) => {
    const data = state.data.filter((item: any) => item.id !== action.payload);
    return {...state, data};
  });

const {setLoading, setError, setData, addTransport, deleteTransport} = creator.createActions();

const getTransportsFetch = (status: Status[]) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const res = await service.getTransports(status);
    dispatch(setData(res));
    return res;
  } catch (e) {
    dispatch(setError(new Error('Error')));
  } finally {
    dispatch(setLoading(false));
  }
};

const addTransportFetch = (data: any) => async (dispatch: any) => {
  await service.addTransport(data);
};

const deleteTransportFetch = (id: string) => async (dispatch: any) => {
  await service.deleteTransport(id);
  dispatch(deleteTransport(id));
};

const getTransportById = (id: string) => (state: any) =>
  state.transport.data.find((item: any) => item.id === id)!;
export {addTransportFetch, deleteTransportFetch, getTransportsFetch, getTransportById};

export default creator.createReducerFetch({
  data: [],
  isLoading: false,
  error: false
});
