exports.getAll = async (req, res) => {
    try{
        res.status(200).send({ message: 'certificate all' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        res.status(200).send({ message: 'certificate byId' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        res.status(200).send({ message: 'certificate create' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.update = async (req, res) => {
    try{
        res.status(200).send({ message: 'certificate update' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        res.status(200).send({ message: 'certificate remove' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}