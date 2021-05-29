const books = require('./books');
const { nanoid } = require('nanoid');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    readPage,
    pageCount } = request.payload;
    
    const id = nanoid(16);
    const insertedAt = new Date().toISOstring();
    const updatedAt = insertedAt;
    const finished = false;
    const reading = false;
    
    const newBook = {
      name,
      year,
      author,
      summary,
      publisher,
      readPage,
      pageCount,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };
    
    books.push(newBook);
    
    const isSuccess = books.filter((book) => book.id = id).length > 0;
    if (readPage <= pageCount) {
      if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });
        response.code(201);
        return response;
        
      } else {
      
      const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan'
      });
      response.code(500);
      return response;
        
      }
      
    }
    
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
};

const getAllBookHandler = () => ({
  status: 'success',
  data: {
    books,
  },
});

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((n) => n.id === id)[0];
  
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, readPage, pageCount, reading } = request.payload;
  const finished = readPage === pageCount;
  const updatedAt = new Date().toISOstring();
  
  const index = books.findIndex((book) => book.id === id);
  
  if (name !== undefined){
    if (readPage < pageCount){
      if (index !== -1) {
        books[index] = {
          ...books[index],
          name,
          year,
          author,
          summary,
          publisher,
          updatedAt,
          readPage,
          pageCount,
      
        };
    
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
      }
      
      const response = h.response({
        status: 'fail',
        message: 'Buku gagal diperbaharui',
      });
      response.code(404);
      return response;
      
    }
    
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
  }
  
  const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
    const response = h.response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        response.code(404);
        return response;
      };
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
};