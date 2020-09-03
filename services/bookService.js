const Book = require('../model/Book');

exports.addBook = async (bookObj) => {
    const ins = await Book.create(bookObj);
    return ins.toJSON();
}

exports.deleteBook = async (id) => {
    await Book.destroy({
        where:{id}
    });
}

exports.updateBook = async (id ,bookObj) => {
    await Book.update(bookObj,{
        where:{id}
    });
}