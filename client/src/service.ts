import axios from 'axios';
import {config} from './config';
import {Status} from './status';

const instance = axios.create({
  baseURL: config.API
});

const getTransports = async (status: Status[] = []) => {
  try {
    const res = await instance.get('/transports');
    if(res.status === 200) {
      return  res.data;
    }
  }
  catch (e) {
    throw e;
  }
};

const getTransportDublicate = async (id: string) => {
  try {
    const res = await instance.get('/transports/dublicate/' + id);
    console.log(res);
    if(res.status === 200) {
      return  res.data;
    }
  }
  catch (e) {
    throw e;
  }
};

const addTransport = async (data: any) => {
  try {
    const res = await instance.post('/transports', data);
    return res.data;
  }
  catch (e) {
    throw e;
  }
};

const deleteTransport = async (id: string) => {
  try {
    const res = await instance.delete('/transports/' + id);

  }
  catch (e) {
    throw e;
  }
};

export default {
  getTransports,
  addTransport,
  deleteTransport,
  getTransportDublicate
}


