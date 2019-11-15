const Repository = require('../repositories/enrollment.repository');

exports.getEnrolledByCourse = async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id)
        const enrolled = await Repository.getEnrolledByCourse(id);
        res.status(200).json(enrolled);
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'error' })
    }
}

exports.getCourseByUser = async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id)
        const courses = await Repository.getCourseByUser(id);
        console.log(courses)
        res.status(200).json(courses);
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'error' })
    }

}

exports.getCertificates = async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id)
        const certificates = await Repository.getCertificates(id);
        console.log(certificates)
        res.status(200).json(certificates);
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'error' })
    }

}

exports.completeCourse = async (req, res) => {
    try{
        const course = req.params.id;
        console.log(course)
        const { user } = req.body;
        console.log(user)
        const enrolled = await Repository.getEnrolled(course, user);
        if(!enrolled)
            return res.status(400).json({ message: 'Falha ao concluir o curso' })

        enrolled.completed = true;
        enrolled.completedDate = new Date();

        await Repository.completeCourse(enrolled);
        res.status(200).json(enrolled);
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'error' })
    }

}

exports.create = async (req, res) => {
    try{
        const { course, user } = req.body;
        const existsEnrolled = await Repository.getEnrolled(course, user);
        if(existsEnrolled)
            return res.status(400).json('Usuário já está cadastrado no curso')

        let response = await Repository.create(course, user);
        res.status(200).json(response);
    }catch(err){
        console.log(err)
        res.status(400),send({ message: 'Não foi possível fazer a inscrição no curso' });
    }
}

// exports.create = async (req, res) => {
//     try{
//         let department = {
//             name: req.body.name
//         };
//         const newDepartment = await Repository.create(department);
//         res.status(200).json(newDepartment)
//     } catch (err) {
//         console.log(err)
//         res.status(400).send({ message: 'error' });
//     }
// }

// exports.update = async (req, res) => {
//     try{
//         const id = req.params.id;
//         const department = await Repository.getById(id);
//         const newDepartment = req.body;

//         Object.assign(department, newDepartment);
        
//         await Repository.update(department);
//         res.status(200).json( department )
//     } catch (err) {
//         res.status(400).json({ message: 'error' })
//     }
// }

// exports.remove = async (req, res) => {
//     try{
//         const id = req.params.id;
//         await Repository.remove(id);
//         res.status(200).json({ success: true });
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ message: 'error' })
//     }
// }