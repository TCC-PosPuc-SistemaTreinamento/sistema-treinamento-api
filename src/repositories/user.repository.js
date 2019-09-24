const Model = require('../models/user');
const User = Model.User;

exports.getById = async (id) => {
    return await User.findById(id);
}

exports.getAll = async () => {
    return await User.find({});
}

exports.create = async (user) => {
    console.log('eeeee')
    let newUser = new User(user);
    let tt = await newUser.save();
    console.log(tt)
    return tt
}

exports.update = async (user) => {
    let newUser = new User(user);
    return await newUser.save();
}

exports.remove = async (id) => {
    await User.remove({ _id: id });
    return { success: true };
}