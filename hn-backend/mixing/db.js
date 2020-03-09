const MongoClient = require('mongodb').MongoClient;
const cron = require('node-schedule');
const axios = require('axios')
const moment = require('moment')

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
    MONGO_COLLECTION
} = process.env

const options = {
    useUnifiedTopology: true,
};

const mongo_url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongo = {}

mongo.setJob = async () => {
    cron.scheduleJob('0 */1 * * *', () => {
        mongo.updatedB()
    })
}

mongo.updatedB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = process.env.NEWS_URL
            const response = await axios.get(url)
            if (response.data.hits) {
                console.log(`reading ${response.data.hits.length} news`)
                MongoClient.connect(mongo_url, options, async (err, client) => {
                    if (err) {
                        console.log('ERROR CONNECTING TO MONGO DB...')
                        return reject(err)
                    }
                    console.log('CONNECTED TO MONGO DB!')
                    db = client.db(MONGO_DB)
                    const promises = response.data.hits.map(item =>
                        db.collection(MONGO_COLLECTION)
                            .updateOne(item,
                                { '$set': { "deleted": false } },
                                { upsert: true, many: true })
                    )
                    const results = await Promise.all(promises)
                    console.log('\n\nUPDATED RESULTS:', results.length, ' items\n\n')
                    await mongo.getAllNews()
                    return resolve(results)
                })
            }
        }
        catch (error) {
            if (error.response) {
                console.log('data:', error.response.data);
                console.log('status:', error.response.status);
                console.log('headers:', error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message ? error.message : error);
            }
            return reject(error)
        }
    })
}

format_time = (dateTime) => {
    const currentDate = moment(new Date()).tz('America/Santiago').format('YYYY-MM-DD')
    const refDate = moment(dateTime).tz('America/Santiago').format('YYYY-MM-DD')
    if (moment(currentDate).isSame(moment(refDate))) {
        return moment(dateTime).format('h:mm a')
    } else {
        const oneDay = 1000 * 60 * 60 * 24;
        const dt1 = new Date(currentDate).getTime();
        const dt2 = new Date(refDate).getTime();
        const diff = Math.abs(dt1 - dt2);
        const days = Math.round(diff / oneDay)
        if (days == 1) return 'Yesterday'
        else return moment(dateTime).format('MMMM DD')
    }
}

mongo.getAllNews = () =>
    new Promise(async (resolve, reject) => {
        try {
            MongoClient.connect(mongo_url, (err, client) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                db = client.db(MONGO_DB);
                db.collection(MONGO_COLLECTION)
                    .find()
                    .sort({ created_at: -1 })
                    .toArray((err, items) => {
                        if (err) throw err;
                        const normalized = items.map(item => {
                            const value = item
                            value.formated_time = format_time(item.created_at)
                            return value
                        })
                        return resolve(normalized)
                    });
            });
        } catch (error) {
            console.log(error)
            return reject(error)
        }
    })

mongo.deleteNews = (news) =>
    new Promise(async (resolve, reject) => {
        try {
            MongoClient.connect(mongo_url, async (err, client) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                db = client.db(MONGO_DB);
                await db.collection(MONGO_COLLECTION)
                    .updateMany({ story_id: news.story_id },
                        { $set: { 'deleted': true } })
                return resolve('UPDATED!')
            })

        } catch (error) {
            console.log(error)
            return reject(error)
        }
    })


module.exports = mongo