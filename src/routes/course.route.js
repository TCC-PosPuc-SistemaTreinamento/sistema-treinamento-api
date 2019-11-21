let course = require('../controllers/course.controller');
let enroll = require('../controllers/enrollment.controller');
const config = require('../../config/config');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
let gfs;

const storage = new GridFsStorage({
    url: config.mongodb.url,
    file: (req, file) => {
        console.log('blabla')
        console.log(file)
        return new Promise((resolve, reject) => {
            // const filename = file.originalname;
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});
const upload = multer({ storage });

module.exports = (app) => {
    app.route('/api/courses')
        .get(course.getAll)
        .post(course.create);

    app.route('/api/courses/files/:filename')
        .get(course.getFile);

    app.route('/api/courses/:id/full')
        .get(course.getByIdFull);

    app.route('/api/courses/:id')
        .get(course.getById)
        .put(course.update)
        .delete(course.remove);

    app.route('/api/courses/:id/conclusion')
        .post(course.verifyConclusion);
        
    app.route('/api/courses/:id/upload')
        .get(course.getFiles)
        .post(upload.single('file'), course.uploadFile);

    app.route('/api/courses/:id/file/delete')
        .post(course.removeFile);

    // app.route('/api/courses/:id/capa')
    //     .get(course.getCapa);
    
    app.route('/api/courses/:id/evaluate')
        .post(course.createEvaluate)
}