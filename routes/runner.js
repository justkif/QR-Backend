const router = require('express').Router();
const runnerController = require('../controllers/runnerController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/runner', jwtMiddleware.verifyManager, runnerController.getAll);
router.get('/runner/:runnerId', jwtMiddleware.verifyScanner, runnerController.getOne);
router.get('/runner/QR/generate', jwtMiddleware.verifyRunner, runnerController.generateQR);
router.get('/runner/export/excel', jwtMiddleware.verifyManager, runnerController.exportExcel);
router.post('/runner', jwtMiddleware.verifyManager, runnerController.createOne);
router.post('/runner/QR/scan', jwtMiddleware.verifyScanner, runnerController.scanQR);
router.put('/runner/reset', jwtMiddleware.verifyAdmin, runnerController.reset);

module.exports = router;