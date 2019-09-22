exports.getAll = async (req, res) => {
    try{
        res.status(200).send({ message: 'grade all' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        res.status(200).send({ message: 'grade byId' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        res.status(200).send({ message: 'grade create' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.update = async (req, res) => {
    try{
        res.status(200).send({ message: 'grade update' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        res.status(200).send({ message: 'grade remove' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}