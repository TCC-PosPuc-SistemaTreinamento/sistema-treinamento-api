const User = require('../models/user').User;

exports.getById = async (id) => {
    return await User.findById(id)
        .populate('role')
        .populate('department');
}

exports.getAll = async () => {
    return await User.find({}, { password: 0 })
        .populate('role')
        .populate('department');
}

exports.create = async (user) => {
    let newUser = new User(user);
    return await newUser.save();
}

exports.getQtd = async() => {
    return await User.count({});
}

exports.getUserByCPF = async(cpf) => {
    return await User.findOne({ 'cpf': cpf });
}

exports.getUserByUsename = async(username) => {
    return await User.findOne({ 'username': username });
}

exports.update = async (user) => {
    let newUser = new User(user);
    return await newUser.save();
}

exports.remove = async (id) => {
    await User.remove({ _id: id });
    return { success: true };
}

exports.updatePassword = async (id) => {
    return await User.findById({ _id:id}, {
        password: 1
    })
}

exports.authenticate = async (user) => {
    const res = await User.findOne({
        username: user.username,
        password: user.password
    });
    return res;
}