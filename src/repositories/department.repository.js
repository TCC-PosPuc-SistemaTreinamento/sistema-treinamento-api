const Department = require('../models/department').Department;

exports.getAll = async () => {
    return await Department.find({});
}

exports.create = async (department) => {
    let newDepartment = new Department(department);
    return await newDepartment.save();
}