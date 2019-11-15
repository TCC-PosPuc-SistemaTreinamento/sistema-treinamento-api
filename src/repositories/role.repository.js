const Role = require('../models/role').Role;

exports.getAll = async () => {
    return await Role.find({
        isDeleted: false
    });
}

exports.getById = async (id) => {
    return await Role.findById(id)
}

exports.create = async (role) => {
    let newRole = new Role(role);
    return await newRole.save();
}

exports.update = async (role) => {
    let newRole = new Role(role)
    return await newRole.save();
}

exports.remove = async (id) => {
    await Role.update({_id: id}, { isDeleted: true });
}