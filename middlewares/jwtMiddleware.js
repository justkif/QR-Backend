const jwt = require('jsonwebtoken');

module.exports = jwtMiddleware = {
    verifyRunner: async(req, res, next) => {
        const token = req.headers.token;
        if (token) {
            jwt.verify(token, process.env.JWT_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json('Token invalid.');
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json('Unauthenticate.')
        }
    },
    verifyScanner: async(req, res, next) => {
        jwtMiddleware.verifyRunner(req, res, () => {
            if (req.user && ['scanner', 'manager', 'admin'].includes(req.user.role)) {
                next();
            } else {
                res.status(403).json('No scanner permission.');
            }
        });
    },
    verifyManager: async(req, res, next) => {
        jwtMiddleware.verifyRunner(req, res, () => {
            if (req.user && ['manager', 'admin'].includes(req.user.role)) {
                next();
            } else {
                res.status(403).json('No manager permission.');
            }
        });
    },
    verifyAdmin: async(req, res, next) => {
        jwtMiddleware.verifyRunner(req, res, () => {
            if (req.user && ['admin'].includes(req.user.role)) {
                next();
            } else {
                res.status(403).json('No admin permission.');
            }
        });
    }
}