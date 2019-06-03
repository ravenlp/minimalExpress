"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stats = exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectDb = () => {
  return _mongoose.default.connect(process.env.DATABASE_URL);
};

exports.connectDb = connectDb;
const statsSchema = new _mongoose.default.Schema({
  domain: {
    type: String
  },
  count: {
    type: Number
  }
});
/**
 * Increment the existing count for a domain or starts a new count
 */

statsSchema.statics.addOneOrCreate = async function addOneOrCreate(hostname) {
  let domain = await Stats.findOneAndUpdate({
    domain: hostname
  }, {
    $inc: {
      count: 1
    }
  }, {
    new: true,
    useFindAndModify: false
  });

  if (!domain) {
    domain = await this.create({
      domain: hostname,
      count: 1
    });
  }

  return domain;
};

const Stats = _mongoose.default.model('Stats', statsSchema);

exports.Stats = Stats;
//# sourceMappingURL=db.js.map