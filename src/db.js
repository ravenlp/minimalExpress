import mongoose from 'mongoose';

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL);
};

const statsSchema = new mongoose.Schema({
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
    let domain = await Stats.findOneAndUpdate({domain: hostname}, { $inc: { count: 1 } }, {new: true, useFindAndModify: false });
    if (!domain) {
        domain = await this.create({domain: hostname, count: 1});
    }
    return domain;
  };

const Stats = mongoose.model('Stats', statsSchema)

export { connectDb, Stats };