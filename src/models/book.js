const conn = require('../configs/db')
const jwt = require('jsonwebtoken')

module.exports = {
  // Get All Books
  getBooks: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, book.status_borrow, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE pending=0', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  //Pending Book
  pendingBooks: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, book.status_borrow, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE pending=1', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

   // Get All Books Pagination
   getPagination: (limit, page) => {
    let offset = (limit * page) - limit
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, book.status_borrow, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE pending=0 LIMIT ? OFFSET ? ', [limit, offset], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  borrowList: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT status.id, status.tanggal_pinjam, status.tanggal_kembali, status.harus_kembali, status.denda, book.image, book.name, book.writer, user.fullname FROM status INNER JOIN book ON status.bookid=book.bookid INNER JOIN user ON status.user_id=user.user_ktp ', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Get Borrow by id
  getBorrows: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM status WHERE bookid=? ', bookid, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // get borrow by user ktp
  userBorrows: (user_id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.name, book.image, book.writer, status.tanggal_pinjam, status.tanggal_kembali, status.harus_kembali, status.denda FROM book INNER JOIN status ON book.bookid=status.bookid WHERE status.user_id=?', user_id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Get by Name
  nameBook: (name) => {
    const likeName = '%' + name + '%'
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE book.name LIKE ?', likeName, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Get by Id
  bookId: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, book.status_borrow, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE book.bookid = ?', bookid, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Get By Category
  bookCategory: (category) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE cat.category = ?', category, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Get By Location
  bookLocation: (location) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.bookid, book.name, book.writer, book.des, book.image, cat.category, loc.location FROM book INNER JOIN cat ON book.fk_cat=cat.catid INNER JOIN loc ON book.fk_loc=loc.locid WHERE loc.location = ?', location, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Add Book 
  postBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO book SET ? ', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Edit Book
  patchBook: (bookid, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE book SET ? WHERE bookid= ?', [data, bookid], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // Edit Pending
  pendingEdit: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE book SET pending=0 WHERE bookid= ?', bookid, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
 
  // Delete Book
  bookDelete: (bookid) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM book WHERE bookid = ?', bookid, (err) => {
        if (!err) {
          resolve(`Data dengan Id : ${bookid} berhasil di Hapus`)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
}
