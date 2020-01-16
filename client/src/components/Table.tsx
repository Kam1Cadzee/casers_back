import React, {useEffect, useState} from 'react';
import {deleteTransportFetch, getTransportsFetch} from '../redux-data/transport';
import {useDispatch, useSelector} from 'react-redux'
import {Button, Table, Tag} from 'antd';
import ModalSolve from './ModalSolve';
import {Status} from '../status';

const DeleteRender = ({raw}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(open => !open);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onOk = () => {
    setIsOpen(false);
    dispatch(getTransportsFetch([Status.ARRIVED, Status.WAY]));
  };

  return (
    <div>
      {isOpen && <ModalSolve id={raw.id} onCancel={onCancel} onOk={onOk} isOpen={isOpen}/>}
      {(raw.status !== Status.ARRIVED && raw.collisionId === null) && <Button onClick={() => dispatch(deleteTransportFetch(raw.id))}>Удалить</Button>}
      {
        raw.collisionId !== null && (
          <Button onClick={toggle}>Кофлiкт</Button>
        )
      }
    </div>
  )
};

const columns = [
  {
    title: 'Iд',
    dataIndex: 'id',
    key: 'id',
    width: 50
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (raw: Status) => {
      if(raw === Status.WAY) {
        return <Tag color="lime">В дорозi</Tag>
      }
      return <Tag color="gold">Прибув</Tag>
    }
  },
  {
    title: 'Дата',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: (raw: string) => new Date(raw).toLocaleString()
  },
  {
    title: 'Номер машини',
    dataIndex: 'number_transport',
    key: 'number_transport',
  },
  {
    title: 'Номер прицепа',
    dataIndex: 'number_trailer',
    key: 'number_trailer',
  },
  {
    title: 'Водiй',
    dataIndex: 'driver',
    key: 'driver',
  },
  {
    title: 'ЗПУ',
    dataIndex: 'devices',
    key: 'devices',
    render: (raw: any) => {
      return (
        <div className='column_devices'>
          {
            raw && raw.map((item: any) => {
              return <p>{item.number} {item.damaged ? <Tag color="red">-</Tag> : <Tag color="#52c41a" >+</Tag> }</p>
            })
          }
        </div>
      )
    }
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
    width: 100,
    render: (raw: any, item: any) => <DeleteRender raw={item} />
  }
];

const TransportTable = () => {
  const data: any = useSelector((state: any) => state.transport.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransportsFetch([Status.WAY, Status.ARRIVED]));
  }, []);

  return (
    <Table size={'small'} tableLayout={'fixed'} indentSize={10} dataSource={data} columns={columns} scroll={{
      y: 800
    }} />
  )
};

export default TransportTable;
