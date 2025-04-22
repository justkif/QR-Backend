const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Scan = require('../models/Scan');
const Scanned = require('../models/Scanned');
const Runner = require('../models/Runner');
const sortData = require('../utils/sortData');
const decodeToken = require('../utils/decodeToken');

module.exports = {
    getOne: async (username) => {
        return await User.findOne({ username: username }); 
    },
    hashPassword: async (password) => {
        return await bcrypt.hash(password, await bcrypt.genSalt(10));
    },
    createOneByDefaultPassword: async function (username) {
        const user = new User({
            username: username,
            password: await this.hashPassword(process.env.USER_PASSWORD)
        });
        await user.save();
    },
    getScan: async () => {
        const scan = await Scan.findOne();
        return scan.isScan;
    },
    getAll: async () => {
        const users = await User.find().select('-_id -password -__v');
        return sortData(users, 'username');
    },
    getScanned: async (token) => {
        const decoded = decodeToken(token);
        const scanned = await Scanned.findById(decoded.id);
        if (!scanned) return null;
        return scanned.scanned;
    },
    createAll: async function () {
        const runners = await Runner.find();
        const hashed = await this.hashPassword(process.env.USER_PASSWORD);
        const promises = runners.map(async (runner) => {
            if (await this.getOne(runner.ordinalNumber)) return;
            const user = new User({
                username: runner.ordinalNumber,
                password: hashed
            });
            await user.save();   
        });
        await Promise.all(promises);
    },
    createOne: async function (username, password, role) {
        const user = new User({
            username: username,
            password: await this.hashPassword(password),
            role: role
        });
        await user.save();
        return user.username;
    },
    comparePassword: async (password1, password2) => {
        return await bcrypt.compare(password1, password2);
    },
    loginUser: async function (username, password) {
        const user = await this.getOne(username);
        if (!user || !await this.comparePassword(password, user.password)) return null;
        return user;
    },
    generateToken: async (user) => {
        const runner = await Runner.findOne({ ordinalNumber: user.username });
        const tokenPayload = {
            id: user.id,
            username: user.username,
            role: user.role
        }
        if (runner) {
            tokenPayload.area = runner.area;
            tokenPayload.fullName = runner.fullName;
        }
        return jwt.sign(tokenPayload, process.env.JWT_KEY, { expiresIn: '15m' });
    },
    updatePassword: async function (user, newPassword) {
        user.password = await this.hashPassword(newPassword);
        await user.save();
        return user.username;
    },
    getOneByToken: async (token) => {
        const decoded = decodeToken(token);
        return await User.findById(decoded.id); 
    },
    updateRole: async (user, role) => {
        user.role = role;
        await user.save();
        const { password, _id, __v, ...data } = user.toObject();
        return data;
    },
    updateScan: async function () {
        const scan = await this.getScan();
        await Scan.findOneAndUpdate(
            {},
            { isScan: !scan } 
        );
    }
}