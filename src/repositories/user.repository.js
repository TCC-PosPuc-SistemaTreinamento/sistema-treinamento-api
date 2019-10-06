const User = require('../models/user').User;

exports.getById = async (id) => {
    return await User.findById(id);
}

exports.getAll = async () => {
    return await User.find({});
}

exports.create = async (user) => {
    let newUser = new User(user);
    return await newUser.save();
}

exports.update = async (user) => {
    let newUser = new User(user);
    return await newUser.save();
}

exports.remove = async (id) => {
    await User.remove({ _id: id });
    return { success: true };
}

exports.authenticate = async (user) => {
    const res = await User.findOne({
        username: user.username,
        password: user.password
    });
    return res;
}