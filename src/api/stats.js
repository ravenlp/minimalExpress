import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
import { Stats } from '../db';

const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json()

async function handleTracking (fullUrl) {
  const parsedUrl = url.parse(fullUrl);
  if(parsedUrl.hostname) {
    const results = await Stats.addOneOrCreate(parsedUrl.hostname);
  }
} 

/* GET healthcheck */
router.get('/healthcheck',  function(req, res, next) {
  res.json({
    status : "success"
  })
});

/* GET Top referrers */
router.get('/', async function(req, res, next) {
  const rows = await Stats.find({}).sort({count: -1}).limit(5).exec();
  res.json(rows)
});

/* POST new url to track */
router.post('/track', jsonParser,  function(req, res, next) {
  let body = req.body;
  if(!body || !body.url) {
    res.status(400);
    res.json({status: 'error', message: 'Invalid payload'})
    return;
  }
  handleTracking(body.url);
  res.json({
    status : "success",
    data : {
       url: body.url
     }
  })
});

export default router;
