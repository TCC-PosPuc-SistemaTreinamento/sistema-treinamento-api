exports.getAll = async (req, res) => {
    try{
        res.status(200).send({ message: 'user all' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        res.status(200).send({ message: 'user byId' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        res.status(200).send({ message: 'user create' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.update = async (req, res) => {
    try{
        res.status(200).send({ message: 'user update' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        res.status(200).send({ message: 'user remove' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}