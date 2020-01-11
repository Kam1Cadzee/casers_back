import React, {useEffect, useState} from 'react';
import {Modal, Tag} from 'antd';
import {useSelector} from 'react-redux';
import {getTransportById} from '../redux-data/transport';
import service from '../service';
import css from './ModalSolve.module.css';

interface IDevice {
  number: string;
  damaged: boolean;
}
interface ITransport {
  createdDate: Date;
  number_transport: string;
  number_trailer: string;
  driver: string;
  devices: IDevice[];
}
const ViewData = (data: ITransport) => {
    return (
      <div>
        <p><b>Date: </b>{new Date(data.createdDate).toLocaleString()}</p>
        <p><b>Number transport: </b>{data.number_transport}</p>
        <p><b>Number trailer: </b>{data.number_trailer}</p>
        <p><b>Driver: </b>{data.driver}</p>
        <b>Devices: </b>
        <div>
          {
            data.devices.map(item => {
              return (
                <p>{item.number} {item.damaged ? <Tag color="red">-</Tag> : <Tag color="green">+</Tag> }</p>
              )
            })
          }
        </div>
      </div>
    )
};

const ModalSolve = ({id, isOpen, onClose}: any) => {
  const db = useSelector(getTransportById(id));
  const [data, setData] = useState();

  const handleOk = () => {

  };

  useEffect(() => {
    const getTransport = async () => {
      const res = await service.getTransport(db.collisionId);
      setData(res);
    };

    getTransport();
  }, []);

  if (!data) return null;
  return (
    <Modal
      title="Basic Modal"
      visible={isOpen}
      onOk={handleOk}
      onCancel={onClose}
    >
     <div className={css.con}>
       <ViewData {...db}/>
       <ViewData {...data}/>
     </div>
    </Modal>
  )
};

export default ModalSolve;

