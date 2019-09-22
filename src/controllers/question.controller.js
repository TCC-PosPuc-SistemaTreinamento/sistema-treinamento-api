exports.getAll = async (req, res) => {
    try{
        res.status(200).send({ message: 'question all' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        res.status(200).send({ message: 'question byId' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        res.status(200).send({ message: 'question create' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.update = async (req, res) => {
    try{
        res.status(200).send({ message: 'question update' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        res.status(200).send({ message: 'question remove' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}