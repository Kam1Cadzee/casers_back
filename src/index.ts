import "reflect-metadata";
import express from 'express';
import {createConnection} from 'typeorm';
import config from './config';

const app = express();
const PORT = process.env.PORT || 5000;

let connect = '';

app.get('/', (req, res) => {
  res.send(process.env.RESPONSE || connect);
});

createConnection(config.DATABASE_URL)
  .then(() => {
    console.log('Connect to DB');
    connect = 'connect';

    app.listen(PORT, () => {
      console.log('Start server, listing: localhost:', PORT)
    });
  })
  .catch((e) => {
    console.log(e);
    console.log('Error. Connect to DB')
  });
