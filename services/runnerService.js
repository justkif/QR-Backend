const qrCode = require('qrcode');
const excel =  require('exceljs');
const Runner = require('../models/Runner');
const Scanned = require('../models/Scanned');
const sortData = require('../utils/sortData');
const decodeToken = require('../utils/decodeToken');

module.exports = {
    getAll: async () => {
        const runners = await Runner.find().select('-_id -__v');
        return sortData(runners, 'ordinalNumber');
    },
    getOneById: async (runnerId) => {
        return await Runner.findById(runnerId).select('-_id -__v');
    },
    getOneByToken: async (token) => {
        const decoded = decodeToken(token);
        return await Runner.findOne({ ordinalNumber: decoded.username }); 
    },
    generateQR: async (runner) => {
        return await qrCode.toDataURL(runner._id.toString());
    },
    exportExcel: async () => {
        const runners = await Runner.find();
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Runner');
        worksheet.columns = [
            { header: 'ordinalNumber', key: 'ordinalNumber', width: 15 },
            { header: 'fullName', key: 'fullName', width: 25 },
            { header: 'gender', key: 'gender', width: 10 },
            { header: 'area', key: 'area', width: 10 },
            { header: 'isPresent', key: 'isPresent', width: 10},
            { header: 'timePresent', key: 'timePresent', width: 20},
            { header: 'whoScan', key: 'whoScan', width: 15},
            { header: 'imageLink', key: 'imageLink', width: 30}
        ];
        runners.forEach(runner => {
            worksheet.addRow(runner.toObject());
        });
        return workbook;
    },
    createOne: async (ordinalNumber, fullName, gender, area) => {
        const runner = new Runner({
            ordinalNumber: ordinalNumber,
            fullName: fullName,
            gender: gender,
            area: area
        });
        await runner.save();
        const { isPresent, timePresent, whoScan, imageLink, _id, __v, ...data } = runner.toObject();
        return data;
    },
    scanQR: async (runnerId, token) => {
        const decoded = decodeToken(token);
        const scannedRunner = await Runner.findByIdAndUpdate(
            runnerId,
            {
                isPresent: true,
                timePresent: new Date(),
                whoScan: decoded.username
            },
            { new: true }
        );
        await Scanned.findByIdAndUpdate(
            decoded.id,
            { $push: { scanned: runnerId } },
            {
                upsert: true,
                setDefaultsOnInsert: true
            }
        );
        return scannedRunner.fullName;
    },
    reset: async () => {
        await Runner.updateMany(
            {}, 
            { 
                isPresent: false,
                timePresent: null,
                whoScan: null
            }
        );
        await Scanned.deleteMany({});
    }
}