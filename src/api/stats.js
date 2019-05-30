import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();


// create application/json parser
const jsonParser = bodyParser.json()


function handleTracking (url) {
  console.log(url)
} 

/* GET Top referrers */
router.get('/', function(req, res, next) {
  res.json({a:2});
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
