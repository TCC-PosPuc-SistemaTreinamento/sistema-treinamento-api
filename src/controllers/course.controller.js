const Repository = require('../repositories/course.repository');
const wachedRepository = require('../repositories/watched.repository');
const gradeRepository = require('../repositories/grade.repository');
const enrollRepository = require('../repositories/enrollment.repository');
const config = require('../../config/config');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose')
const conn = mongoose.createConnection(config.mongodb.url) 
let gfs;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  })

exports.getAll = async (req, res) => {
    try{
        const courses = await Repository.getAll();
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id;
        const course = await Repository.getById(id);
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getByIdFull = async (req, res) => {
    try{
        const id = req.params.id;
        const course = await Repository.getByIdFull(id);
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        const course = req.body;
        console.log('curso do body')
        const newCourse = await Repository.create(course);
        res.status(200).json(newCourse)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'error' })
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id;
        const course = await Repository.getByIdFull(id);
        const newCourse = req.body;
        Object.assign(course, newCourse);

        await Repository.update(course);
        res.status(200).json(course);
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        res.status(200).json({ message: 'course remove' })
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getCoursesByCategoryId = async (req, res) => {
    try{
        const id = req.params.id;
        const courses = await Repository.getCoursesByCategoryId(id);
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.verifyConclusion = async (req, res) => {
    try{
        const courseId = req.params.id;
        const userId = req.body.user;

        let courseComplete = await enrollRepository.getEnrolled(courseId, userId);
        if(courseComplete && courseComplete.completed)
            return res.status(204)
        
        const course = await Repository.getByIdFull(courseId);
        let qtdVideos = 0;
        for(let unit of course.units){
            if(unit.videos && unit.videos.length > 0){
                qtdVideos += unit.videos.length;
            }
        }        
        
        const watchedCourseUser = await wachedRepository.getByCourseAndUser(courseId, userId);
        let qtdVideoUser = 0;
        for(let watchUser of watchedCourseUser){
            if(watchUser.watchedVideos && watchUser.watchedVideos.length > 0){
                qtdVideoUser += watchUser.watchedVideos.length;
            }
        }
        
        let qtdActivities = 0;
        for(let unit of course.units){
            if(unit.activity && unit.activity != undefined){
                qtdActivities += 1;
            }
        }        
        
        const gradeCourseUser = await gradeRepository.getByCourseAndUser(courseId, userId);
        let qtdGradeUser = 0, sumGrade = 0, finalGrade = 0;
        if(gradeCourseUser && gradeCourseUser.length > 0){
            for(let gradeUser of gradeCourseUser){
                qtdGradeUser++;
                sumGrade += gradeUser.grade;
            }
            finalGrade = sumGrade / qtdGradeUser;
        }

        if(qtdVideos == qtdVideoUser && qtdActivities == qtdGradeUser && finalGrade > 70){
            
            if(!courseComplete)
                return res.status(400).json({ message: 'Falha ao concluir o curso' })
    
            courseComplete.completed = true;
            courseComplete.completedDate = new Date();
    
            
            await enrollRepository.completeCourse(courseComplete);
            return res.status(200).json(courseComplete);
        } else {
            return res.status(200).json({ message: 'Usuário não concluiu o curso' });
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'error' })
    }
}

exports.uploadFile = async (req, res) => {
    res.status(200).json({ message: 'Arquivo gravado com sucesso' });
}

exports.getFiles = async (req, res) => {
    const id = req.params.id;
    const regex = [new RegExp(id, "i")]
    console.log(id)
    gfs.files.find({ "filename": { $in: regex } }).toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(200).json({ err: 'Não há arquivos' });
        } else {
            files.map(file => {
                if( file.contentType === 'image/jpeg' || file.contentType === 'image/png' )
                    file.isImage = true;
                else
                    file.isImage = false;
            })
            res.status(200).send(files)
        }
    })
}

exports.getFile = async (req, res) => {
    const filename = req.params.filename;
    console.log('222222222222222')
    console.log(filename)
    gfs.files.findOne({ filename: filename }, (err, file) => {
        if(!file || file.length === 0)
            return res.status(400).json({ err: "Não há arquivos" });
        const readstream = gfs.createReadStream(file.filename);
        return readstream.pipe(res);
    });
}

// exports.getCapa = async (req, res) => {
//     const id = req.parmas.id;
//     const filename = id + '_capa';
//     console.log('log da capa', filename)
//     const regex = [new RegExp(filename, "i")]
//     gfs.files.find({ "filename": { $in: regex } }).toArray((err, files) => {
//         if (!files || files.length === 0) {
//             return res.status(200).json({ err: 'Não há arquivos' });
//         } else {
//             files.map(file => {
//                 if( file.contentType === 'image/jpeg' || file.contentType === 'image/png' )
//                     file.isImage = true;
//                 else
//                     file.isImage = false;
//             })
//             res.status(200).send(files)
//         }
//     })
// }

exports.createEvaluate = async (req, res) => {
    try {
        const { evaluate } = req.body;
        const { id } = req.params;

        const courseExist = await Repository.getById(id);

        if( !courseExist ) {
           return res.status(400).json({ message: 'Este curso não existe'});
        }

        if (courseExist.evaluates && courseExist.evaluates.length > 0) {
            let userEvaluated = courseExist.evaluates.find(e => e.userId === evaluate.userId);
            
            if ( userEvaluated ) {
                return res.status(204).json({ });
            }   
        }

        courseExist.evaluates.push(evaluate);
        await Repository.update(courseExist)
        
        return res.status(200).json({ message: 'Avaliação cadastrada!'});

    } catch(error) {

        console.log(error);
        return res.status(400).json({ message: 'error'});
    }
    
}
