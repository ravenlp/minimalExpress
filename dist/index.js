"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _api = require("./api");

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API endpoints
// DB connection and model
let app = (0, _express.default)();
app.use((0, _cors.default)());
app.get('/', (req, res) => res.redirect("index.html"));
app.use('/stats', _api.stats);
app.use(_express.default.static('src/public'));
(0, _db.connectDb)().then(async () => {
  app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || '3000'}!`));
});
//# sourceMappingURL=index.js.map