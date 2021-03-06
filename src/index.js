import express from 'express';
import cors from 'cors';

// API endpoints
import { stats } from './api';

// DB connection and model
import { connectDb } from './db';
let  app = express();

app.use(cors());

app.get('/', (req, res) => res.redirect("index.html"));

app.use('/stats', stats)

app.use(express.static('src/public'))
connectDb().then(async () => {
    app.listen(process.env.PORT || 3000,  () => console.log(`Listening on port ${process.env.PORT || '3000'}!`));
})
