import "reflect-metadata";
import express from 'express';
import {createConnection} from 'typeorm';
import config from './config';
import transport from './controller/transport';
import {Transport} from './entity/Transport';

const app = express();

const PORT = process.env.PORT || 5000;

let connect = '';

app.use(express.json());
app.get('/', (req, res) => {
  res.send(connect);
});
app.use('/transports', transport);

let connection: any = undefined;
if(config.DATABASE_URL) {
  connection = {
    type: 'postgres',
    url: config.DATABASE_URL,
    entities: [Transport]
  }
}
createConnection(connection)
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
