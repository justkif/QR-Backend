const router = require('express').Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/user', jwtMiddleware.verifyAdmin, userController.getAll);
router.get('/user/scan', jwtMiddleware.verifyAdmin, userController.getScan);
router.get('/user/scanned', jwtMiddleware.verifyScanner, userController.getScanned);
router.post('/user', jwtMiddleware.verifyAdmin, userController.createAll);
router.post('/user/create', jwtMiddleware.verifyAdmin, userController.createOne);
router.post('/user/login', userController.loginUser);
router.put('/user/password/admin', jwtMiddleware.verifyAdmin, userController.updatePasswordAdmin);
router.put('/user/password', jwtMiddleware.verifyRunner, userController.updatePassword);
router.put('/user/role', jwtMiddleware.verifyAdmin, userController.updateRole);
router.put('/user/scan', jwtMiddleware.verifyAdmin, userController.updateScan);

module.exports = router;