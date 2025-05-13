const router = require('express').Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/user', jwtMiddleware.verifyAdmin, userController.getAll);
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Users fetched
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 */
router.get('/user/scan', jwtMiddleware.verifyAdmin, userController.getScan);
/**
 * @swagger
 * /user/scan:
 *   get:
 *     summary: Get scan status
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Scan status fetched
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 */
router.get('/user/scanned', jwtMiddleware.verifyScanner, userController.getScanned);
/**
 * @swagger
 * /user/scanned:
 *   get:
 *     summary: Get scanned data from a user
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Scanned data fetched
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 */
router.post('/user', jwtMiddleware.verifyAdmin, userController.createAll);
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create users from runners
 *     tags:
 *       - User
 *     responses:
 *       201:
 *         description: Users created from runners
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 */
router.post('/user/create', jwtMiddleware.verifyAdmin, userController.createOne);
/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create an user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username of the user
 *               password:
 *                 type: string
 *                 description: password of the user
 *               role:
 *                 type: string
 *                 description: role of the user (runner or scanner or manager) 
 *     responses:
 *       201:
 *         description: User created
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 *       409:
 *         $ref: '#/components/responses/status409Error'
 */
router.post('/user/login', userController.loginUser);
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username of the user
 *               password:
 *                 type: string
 *                 description: password of the user 
 *     responses:
 *       200:
 *         description: Login success
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 */
router.put('/user/password/admin', jwtMiddleware.verifyAdmin, userController.updatePasswordAdmin);
/**
 * @swagger
 * /user/password/admin:
 *   put:
 *     summary: Update password with admin privilege
 *     tags:
 *       - User
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username of the user
 *               newPassword:
 *                 type: string
 *                 description: newPassword of the user 
 *     responses:
 *       200:
 *         description: Update password success
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 *       404:
 *         $ref: '#/components/responses/status404Error'  
 */
router.put('/user/password', jwtMiddleware.verifyRunner, userController.updatePassword);
/**
 * @swagger
 * /user/password:
 *   put:
 *     summary: Update password
 *     tags:
 *       - User
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: password of the user
 *               newPassword:
 *                 type: string
 *                 description: newPassword of the user 
 *     responses:
 *       200:
 *         description: Update password success
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 *       404:
 *         $ref: '#/components/responses/status404Error'  
 */
router.put('/user/role', jwtMiddleware.verifyAdmin, userController.updateRole);
/**
 * @swagger
 * /user/role:
 *   put:
 *     summary: Update role
 *     tags:
 *       - User
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username of the user
 *               role:
 *                 type: string
 *                 description: role of the user (runner or scanner or manager)
 *     responses:
 *       200:
 *         description: Update role success
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error' 
 *       404:
 *         $ref: '#/components/responses/status404Error'  
 */
router.put('/user/scan', jwtMiddleware.verifyAdmin, userController.updateScan);
/**
 * @swagger
 * /user/scan:
 *   put:
 *     summary: Toogle scan status
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Update role success
 *       401:
 *         $ref: '#/components/responses/status401Error'
 *       403:
 *         $ref: '#/components/responses/status403Error'  
 */
module.exports = router;