exports.get = async() => {
    console.log('log do controller course');
    return 99;
}

exports.getById = async (id) => {
    return id;
}