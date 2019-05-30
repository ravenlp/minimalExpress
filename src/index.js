import express from 'express';

// API endpoints
import { stats } from './api';
let  app = express();

app.get('/', (req, res) => res.send("HELLO FROM EXPRESS"));
app.use('/stats', stats)

app.use(express.static('public'))

app.listen(process.env.PORT || '3000',  () => console.log(`Listening on port ${process.env.PORT || '3000'}!`));