import express from 'express';
import {getRepository} from 'typeorm';
import {ServiceTransport} from '../service/serviceTransport';
const router = express.Router();

const service = new ServiceTransport();

router.post('/', (async (req, res) => {
    try {
      const data = req.body;
      const id = await service.createTransport(data);
      return res.send({
        id
      });
    }
    catch (e) {
      return res.send(e)
    }
}));

router.put('/:id', async (req, res) => {
  const id = req.params['id'];

  try {
    const data = req.body;
    await service.updateTransport(id, data);
    return res.sendStatus(200);
  }
  catch (e) {
    return res.send(e)
  }
});

router.get('/', async (req, res) => {
  let collision = req.query.collision;

  const result = await service.getTransports(!collision);
  return res.send(result);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    res.send(await service.getTransport(id));
  }
  catch (e) {
    res.send(e);
  }
});

router.get('/dublicate/:id', async (req, res) => {
  const id = req.params.id;
  try {
    res.send(await service.getTransportDublicate(id));
  }
  catch (e) {
    res.send(e);
  }
});

router.delete('/', (async (req, res) => {
  await service.deleteAll();
  return res.sendStatus(202);
}));

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    res.send(await service.delete(id))
  }
  catch (e) {
    res.send(e);
  }
});
export default router;
