"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _url = _interopRequireDefault(require("url"));

var _db = require("../db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // create application/json parser


const jsonParser = _bodyParser.default.json();

async function handleTracking(fullUrl) {
  const parsedUrl = _url.default.parse(fullUrl);

  if (parsedUrl.hostname) {
    const results = await _db.Stats.addOneOrCreate(parsedUrl.hostname);
  }
}
/* GET healthcheck */


router.get('/healthcheck', function (req, res, next) {
  res.json({
    status: "success"
  });
});
/* GET Top referrers */

router.get('/', async function (req, res, next) {
  const rows = await _db.Stats.find({}).sort({
    count: -1
  }).limit(5).exec();
  res.json(rows);
});
/* POST new url to track */

router.post('/track', jsonParser, function (req, res, next) {
  let body = req.body;

  if (!body || !body.url) {
    res.status(400);
    res.json({
      status: 'error',
      message: 'Invalid payload'
    });
    return;
  }

  handleTracking(body.url);
  res.json({
    status: "success",
    data: {
      url: body.url
    }
  });
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=stats.js.map