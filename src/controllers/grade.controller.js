const Repository = require('../repositories/grade.repository');

exports.create = async (req, res) => {
    try{
        const newGrade = req.body;
        let grade = await Repository.getByCourseUserUnit(newGrade.course, newGrade.user, newGrade.unit);
        
        if(!grade){
            let response = await Repository.create(newGrade);
            res.status(200).json(response);
        } else {
            Object.assign(grade, newGrade);
            let response = await Repository.create(grade);
            res.status(200).json(response);
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'error' })
    }
}

// exports.update = async (req, res) => {
//     try{
//         const newGrade = req.body;
//         const grade = await Repository.getByCourseUserUnit(newGrade.course, newGrade.user, newGrade.unit);

//         if(grade){
//             await Repository.update(grade);
//         } else {
//             await Repository
//         }
//         Object.assign(grade, newGrade);

//         res.status(200).json(grade);
//     } catch (error) {
//         res.status(400).json({ message: 'error' })
//     }
// }

exports.getGradeByUser = async (req, res) => {
    try{
        const grades = await Repository.getByUser(req.params.id);
        res.status(200).json(grades)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getGradeByCourseAndUser = async (req, res) => {
    try{
        const { course, user } = req.body;
        const grades = await Repository.getByCourseAndUser(course, user);
        res.status(200).json(grades)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getByGradeCourseUserUnit = async (req, res) => {
    try{
        const { course, user, unit } = req.body;
        const grade = await Repository.getByCourseUserUnit(course, user, unit);
        res.status(200).json(grade)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        const { course, unit } = req.body;
        await Repository.removeGrades(course, unit);
        res.status(200).json({ message: 'Removido com sucesso' })
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}