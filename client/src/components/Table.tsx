import React, {useEffect, useState} from 'react';
import {deleteTransportFetch, getTransportsFetch} from '../redux-data/transport';
import {useSelector, useDispatch} from 'react-redux'
import {Button, Table, Tag} from 'antd';
import ModalSolve from './ModalSolve';

const DeleteRender = ({raw}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(open => !open);
  };

  const dispatch = useDispatch();

  return (
    <div>
      {isOpen && <ModalSolve id={raw.id} onClose={toggle} isOpen={isOpen}/>}
      <Button onClick={() => dispatch(deleteTransportFetch(raw.id))}>Delete</Button>
      {
        raw.collisionId !== null && (
          <Button onClick={toggle}>Conflict</Button>
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
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
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
              return <p>{item.number} {item.damaged ? <Tag color="red">-</Tag> : <Tag color="green">+</Tag> }</p>
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
    render: (raw: any, item: any) => <DeleteRender raw={item} />
  }
];

const TransportTable = () => {
  const data: any = useSelector((state: any) => state.transport.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransportsFetch());
  }, []);

  return (
    <Table size={'small'} tableLayout={'fixed'} indentSize={10} dataSource={data} columns={columns} scroll={{
      y: 800
    }} />
  )
};

export default TransportTable;
