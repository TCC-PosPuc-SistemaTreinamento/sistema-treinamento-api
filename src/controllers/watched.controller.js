const Repository = require('../repositories/watched.repository');

exports.create = async (req, res) => {
    try{
        const newWatched = req.body;
        let watched = await Repository.getByCourseUserUnit(newWatched.course, newWatched.user, newWatched.unit);

        if(!watched){
            let response = await Repository.create(newWatched);
            res.status(200).json(response);
        } else {
            Object.assign(watched, newWatched);
            let response = await Repository.create(watched);
            res.status(200).json(response);
        }

    }catch(err){
        console.log(err)
        res.status(400),json({ message: 'Não foi possível gravar a operação de video assistido' });
    }
}

exports.getWatchedByUser = async (req, res) => {
    try{
        const watched = await Repository.getWatchedByUser(req.params.id);
        res.status(200).json(watched);
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'error' })
    }
}

exports.getWatchedByCourseAndUser = async (req, res) => {
    try{
        const { course, user } = req.body;
        const watched = await Repository.getByCourseAndUser(course, user);
        res.status(200).json(watched)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getWatchedByCourseUserUnit = async (req, res) => {
    try{
        const { course, user, unit } = req.body;
        const watched = await Repository.getByCourseUserUnit(course, user, unit);
        res.status(200).json(watched)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}