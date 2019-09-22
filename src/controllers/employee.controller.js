exports.getAll = async (req, res) => {
    try{
        res.status(200).send({ message: 'employee all' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        res.status(200).send({ message: 'employee byId' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        res.status(200).send({ message: 'employee create' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.update = async (req, res) => {
    try{
        res.status(200).send({ message: 'employee update' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        res.status(200).send({ message: 'employee remove' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}