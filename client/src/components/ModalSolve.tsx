import React, {useEffect, useReducer, useState} from 'react';
import {Button, Card, Icon, Input, Modal, Switch, Typography} from 'antd';
import {useSelector} from 'react-redux';
import {getTransportById} from '../redux-data/transport';
import service from '../service';
import css from './ModalSolve.module.css';
import {IAction, ICompareDataProps, IDevice, ITransport} from '../typing/transport';
import {Status} from '../status';

const {Text} = Typography;

const types = {
  number_transport: 'number_transport',
  number_trailer: 'number_trailer',
  driver: 'driver',
  devices: 'devices',
  createdDate: 'createdDate',
  delete_device: 'delete_device',
  change_device: 'change_device'
};
const icons = {
  safety : 'safety-certificate',
  database: 'database',
};

const reducer = (state: ITransport, {type, payload}: IAction) => {
  if (type === types.delete_device) {
    const arr = state.devices.filter((device, index) => index !== payload);
    return {...state, devices: arr};
  } else if (type === types.change_device) {
    state.devices[payload].damaged = !state.devices[payload].damaged;
    return {...state, devices: [...state.devices]};
  }
  if (!type) return state;

  const obj = {
    [type]: payload
  };

  return {...state, ...obj};
};

const init = (db: ITransport) => {
  return {
    devices: [],
    number_transport: '',
    driver: '',
    number_trailer: '',
    createdDate: '',
    collisionId: db.collisionId,
    status: Status.ARRIVED,
    id: db.id
  }
};

const CompareData = ({leftData, rightData, title, type, dispatch}: ICompareDataProps) => {
  const equal = leftData === rightData;
  const [value, setValue] = useState(equal ? leftData : '');

  useEffect(() => {
    dispatch({type, payload: value});
  }, [value]);

  if (equal) {
    return (
      <>
        <p className={css.col1}>{title}</p>
        <Input disabled value={value} className={css.col3}/>
      </>
    )
  }
  return (
    <>
      <p className={css.col1}>{title}</p>
      <div className={css.raw} style={{justifySelf: 'end'}}>
        <Text code>{leftData}</Text>
        <Button shape="circle" icon="right" size={'small'} onClick={() => setValue(leftData)} className={css.btn}/>
      </div>
      <Input onChange={e => setValue(e.target.value)} value={value} required/>
      <div className={css.raw}>
        <Button shape="circle" icon="left" size={'small'} onClick={() => setValue(rightData)} className={css.btn}/>
        <Text code>{rightData}</Text>
      </div>
    </>
  )
};

const ModalSolve = ({id, isOpen, onCancel, onOk}: any) => {
  const db = useSelector(getTransportById(id));
  const [data, setData] = useState(null as ITransport | null);
  const [state, dispatch] = useReducer(reducer, db, init);

  const handleOk = async () => {
    if(state.number_trailer === '') {
      return;
    }
    else if(state.number_transport === '') {
      return;
    }
    state.devices = state.devices.map(({icons, ...rest}) => rest);

    await service.solveTransports(state);
    onOk();
  };

  useEffect(() => {
    const getTransport = async () => {
      const res: ITransport = await service.getTransport(db.collisionId!);
      const arr: IDevice[] = res.devices.map(device => ({...device, icons: new Set([icons.safety])}));

      db.devices.forEach(device => {
        const index = arr.findIndex(item => item.number === device.number);
        if (index !== -1) {
          arr[index].icons!.add(icons.database)
        } else {
          arr.push({...device, icons: new Set<string>([icons.database])})
        }
      });

      dispatch({type: types.createdDate, payload: res.createdDate});
      dispatch({type: types.devices, payload: arr});

      setData(res);
    };

    getTransport();
  }, []);

  if (!data) return null;
  return (
    <Modal
      width={660}
      title="Конфлiкт данних"
      visible={isOpen}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <div className={css.con}>
        <p className={css.col2}>Данi з бази даних <Icon type={icons.database}/></p>
        <p className={css.col4}>Данi охоронця <Icon type={icons.safety}/></p>
        <CompareData title={'Номер машини'} leftData={db.number_transport} rightData={data.number_transport}
                     type={types.number_transport} dispatch={dispatch}/>

        <CompareData title={'Номер прицепа'} leftData={db.number_trailer} rightData={data.number_trailer}
                     type={types.number_trailer} dispatch={dispatch}/>

        <CompareData title={'Водiй'} leftData={db.driver} rightData={data.driver}
                     type={types.driver} dispatch={dispatch}/>

        <Card title="Запірно-пломбувальнi пристрої" className={css.card} size={'small'}>
          <div className={css.device}>
            {
              state.devices.map((device, index) => {
                return (
                  <>
                    <Text code>{device.number}</Text>
                    {
                      Array.from(device.icons!.values()).map(icon => {
                        return <Icon type={icon} className={icon === icons.safety ? css.col2 : css.col3}/>
                      })
                    }
                    <Switch className={css.col4} checked={!device.damaged} size={'small'}
                            onChange={() => dispatch({type: types.change_device, payload: index})}/>
                            <Icon type={'delete'} theme={'twoTone'} onClick={() => dispatch({type: types.delete_device, payload: index})}/>
                  </>
                )
              })
            }
          </div>
        </Card>
      </div>
    </Modal>
  )
};

export default ModalSolve;

