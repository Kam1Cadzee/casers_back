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
        raw.status === 'collision' && (
          <Button onClick={toggle}>Conflict</Button>
        )
      }
    </div>
  )
};

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: 'number_transport',
    dataIndex: 'number_transport',
    key: 'number_transport',
  },
  {
    title: 'number_trailer',
    dataIndex: 'number_trailer',
    key: 'number_trailer',
  },
  {
    title: 'Driver',
    dataIndex: 'driver',
    key: 'driver',
  },
  {
    title: 'Devices',
    dataIndex: 'devices',
    key: 'devices',
    render: (raw: any) => {
      return (
        <div>
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
    <Table dataSource={data} columns={columns} />
  )
};

export default TransportTable;
