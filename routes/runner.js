const router = require('express').Router();
const runnerController = require('../controllers/runnerController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/runner', jwtMiddleware.verifyManager, runnerController.getAll);
/**
 * @swagger
 * /runner:
 *   get:
 *     summary: Get all runners
 *     tags:
 *       - Runner
 *     responses:
 *       200:
 *         description: Runners fetched
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 */
router.get('/runner/:runnerId', jwtMiddleware.verifyScanner, runnerController.getOne);
/**
 * @swagger
 * /runner/{runnerId}:
 *   get:
 *     summary: Get a runner
 *     tags:
 *       - Runner
 *     parameters:
 *       - in: path
 *         name: runnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the runner 
 *     responses:
 *       200:
 *         description: Runner fetched
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 *       404:
 *         $ref: '#/components/responses/status404Error' 
 */
router.get('/runner/QR/generate', jwtMiddleware.verifyRunner, runnerController.generateQR);
/**
 * @swagger
 * /runner/QR/generate:
 *   get:
 *     summary: Generate QR
 *     tags:
 *       - Runner
 *     responses:
 *       200:
 *         description: QR generated
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 *       404:
 *         $ref: '#/components/responses/status404Error' 
 */
router.get('/runner/export/excel', jwtMiddleware.verifyManager, runnerController.exportExcel);
/**
 * @swagger
 * /runner/export/excel:
 *   get:
 *     summary: Export Excel
 *     tags:
 *       - Runner
 *     responses:
 *       200:
 *         description: Generate an Excel file
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 */
router.post('/runner', jwtMiddleware.verifyManager, runnerController.createOne);
/**
 * @swagger
 * /runner:
 *   post:
 *     summary: Create a runner
 *     tags:
 *       - Runner
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ordinalNumber:
 *                 type: string
 *                 description: ordinalNumber of the runner
 *               fullName:
 *                 type: string
 *                 description: fullName of the runner
 *               gender:
 *                 type: string
 *                 description: gender of the runner (male or female)
 *               area:
 *                 type: string
 *                 description: area of the runner (ARHN or ARSG)
 *     responses:
 *       201:
 *         description: Runner created
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error'
 *       409:
 *         $ref: '#/components/responses/status409Error'
 */
router.post('/runner/QR/scan', jwtMiddleware.verifyScanner, runnerController.scanQR);
/**
 * @swagger
 * /runner/QR/scan:
 *   post:
 *     summary: Scan QR
 *     tags:
 *       - Runner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               runnerId:
 *                 type: string
 *                 description: Id of the runner
 *     responses:
 *       200:
 *         description: Runner scanned
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error'
 *       404:
 *         $ref: '#/components/responses/status404Error' 
 *       409:
 *         $ref: '#/components/responses/status409Error'
 */
router.put('/runner/reset', jwtMiddleware.verifyAdmin, runnerController.reset);
/**
 * @swagger
 * /runner/reset:
 *   put:
 *     summary: Reset all scanned data
 *     tags:
 *       - Runner
 *     responses:
 *       200:
 *         description: Scanned data have been reseted
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error'
 */
module.exports = router;