const runnerService = require('../services/runnerService');
const userService = require('../services/userService');

module.exports = {
    getAll: async(req, res) => {
        try {
            res.status(200).json(await runnerService.getAll());
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async(req, res) => {
        try {
            const runner = await runnerService.getOneById(req.params.runnerId);
            if (!runner) {
                return res.status(404).json('Runner not found.');
            }
            res.status(200).json(runner);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    generateQR: async(req, res) => {
        try {
            const runner = await runnerService.getOneByToken(req.headers.token);
            if (!runner) {
                return res.status(404).json('Runner not found.');
            }
            res.status(200).json(await runnerService.generateQR(runner));
        } catch (err) {
            res.status(500).json(err);
        }
    },
    exportExcel: async(req, res) => {
        try {
            const workbook = await runnerService.exportExcel();
            res.setHeader(
                'Content-Type', 
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader(
                'Content-Disposition', 
                'attachment; filename=Runner.xlsx'
            );
            await workbook.xlsx.write(res);
            res.end();
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createOne: async(req, res) => {
        try {
            if (await userService.getOne(req.body.ordinalNumber)) {
                return res.status(409).json('Username existed.');
            }
            const response = await runnerService.createOne(
                req.body.ordinalNumber,
                req.body.fullName,
                req.body.gender,
                req.body.area
            );
            await userService.createOneByDefaultPassword(req.body.ordinalNumber);
            res.status(201).json(response);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    scanQR: async(req, res) => {
        try {
            if (!await userService.getScan()) {
                return res.status(403).json('Scanning is temporary turned off by the admin.');
            }
            const runner = await runnerService.getOneById(req.body.runnerId);
            if (!runner) {
                return res.status(404).json('Runner not found.');
            }
            if (runner.isPresent) {
                return res.status(403).json('Runner is already scanned.');
            }
            res.status(200).json(await runnerService.scanQR(req.body.runnerId, req.headers.token));
        } catch (err) {
            res.status(500).json(err);
        }
    },
    reset: async(req, res) => {
        try {
            await runnerService.reset();
            res.status(200).json('Scanned data have beed reseted.');
        } catch (err) {
            res.status(500).json(err);
        }
    }
}