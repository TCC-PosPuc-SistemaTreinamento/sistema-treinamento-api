const Role = require('../models/role').Role;

exports.getAll = async () => {
    return await Role.find({});
}

exports.create = async (role) => {
    let newRole = new Role(role);
    return await newRole.save();
}