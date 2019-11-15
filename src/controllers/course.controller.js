const Repository = require('../repositories/course.repository');
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
        console.log(id)
        const course = await Repository.getById(id);
        console.log(course)
        const newCourse = req.body;
        
        Object.assign(course, newCourse);

        await Repository.update(course);
        res.status(200).json(course);
    } catch (error) {
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