const conn = require('../configs/db');

module.exports = {
  // Get Borrow by id
  
  postBorrow: (newBorrow, result) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO status SET ? ', newBorrow, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
      conn.query(`UPDATE book SET status_borrow = 1 WHERE bookid =?`, [newBorrow.bookid])
    })
  },

  patchBorrow: (bookid, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE status SET ? WHERE bookid= ?', [data, bookid], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
      conn.query(`UPDATE book SET status_borrow = 0 WHERE bookid =?`, [bookid])
    })
  },

}