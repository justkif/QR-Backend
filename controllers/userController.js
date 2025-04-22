const userService = require('../services/userService');

module.exports = userController = {
    getAll: async(req, res) => {
        try {
            res.status(200).json(await userService.getAll());
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getScan: async(req, res) => {
        try {
            res.status(200).json(await userService.getScan()); 
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getScanned: async(req, res) => {
        try {
            res.status(200).json(await userService.getScanned(req.headers.token));
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createAll: async(req, res) => {
        try {
            await userService.createAll();
            res.status(201).json('Users created from runners.');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createOne: async(req, res) => {
        try {
            if (await userService.getOne(req.body.username)) {
                return res.status(409).json('Username existed.'); 
            }
            res.status(201).json(await userService.createOne(
                req.body.username,
                req.body.password,
                req.body.role
            ));
        } catch (err) {
            res.status(500).json(err);
        }
    },
    loginUser: async(req, res) => {
        try {
            const user = await userService.loginUser(req.body.username, req.body.password);
            if (!user) {
                return res.status(401).json('Wrong password or username.');
            }
            res.status(200).json(await userService.generateToken(user));
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updatePasswordAdmin: async(req, res) => {
        try {
            const user = await userService.getOne(req.body.username);
            if (!user) {
                return res.status(404).json('User not found.');
            }
            if (user.role === 'admin') {
                return res.status(403).json('Cannot update password of an admin.');
            }
            res.status(200).json(await userService.updatePassword(user, req.body.newPassword));
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updatePassword: async(req, res) => {
        try {
            const user = await userService.getOneByToken(req.headers.token);
            if (!user) {
                return res.status(404).json('User not found.');
            }
            if (!await userService.comparePassword(req.body.password, user.password)) {
                return res.status(401).json('Wrong password.');
            }
            await userService.updatePassword(user, req.body.newPassword);
            res.status(200).json('Password changed.');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateRole: async(req, res) => {
        try {
            if (req.body.role === 'admin') {
                return res.status(403).json('Cannot appoint an admin.');
            }
            const user = await userService.getOne(req.body.username);
            if (!user) {
                return res.status(404).json('User not found.');
            }
            if (user.role === 'admin') {
                return res.status(403).json('Cannot update role of an admin.');
            }
            res.status(200).json(await userService.updateRole(user, req.body.role));
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateScan: async(req, res) => {
        try {
            await userService.updateScan();
            res.status(200).json('Scan updated.');
        } catch (err) {
            res.status(500).json(err);
        }
    }
}