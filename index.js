const moment = require('moment')
const sdf = require('../models/hardware')
const db = require('mongoose').connection
module.exports.tcArchivalData = async function tcArchivalData(res, req) {

    try {
        const fdate = moment().startOf('day').utc().subtract('44', 'days').toDate();
        fdate.setUTCHours(00, 00, 00);
        const preDate = fdate
        const sdfdf = await sdf.find().count();
        const date = new Date().toISOString()
        const op = await db.collection('tc_positions').aggregate([
            { $match: { serverTime: { $lte: new Date(preDate) } } },
            { $out: `${date}_tc_positions` }
        ]).toArray()
        const toDb = await db.collection(`${date}_tc_positions`).find().count()
        if (toDb > 0) {
            await db.collection('tc_positions').deleteMany({ serverTime: { $lte: new Date(preDate) } }, )
        }
        return res.send({ status: 'success', message: 'Data Archival process finished' })
    } catch (error) {
        console.log(error);
    }

}
