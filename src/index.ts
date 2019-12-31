import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send(process.env.RESPONSE || 'NoName');
});

app.listen(PORT, () => {
  console.log('Start server, listing: localhost:', PORT)
})
