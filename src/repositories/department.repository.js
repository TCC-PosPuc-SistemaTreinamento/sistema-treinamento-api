const Department = require('../models/department').Department;

exports.getAll = async () => {
    return await Department.find({
        isDeleted: false
    });
}

exports.getById = async (id) => {
    return await Department.findById(id)
}

exports.create = async (department) => {
    let newDepartment = new Department(department);
    return await newDepartment.save();
}

exports.update = async (department) => {
    let newDepartment = new Department(department)
    return await newDepartment.save();
}

exports.remove = async (id) => {
    await Department.update({_id: id}, { isDeleted: true });
}