const conn = require('../configs/db')
const jwt = require('jsonwebtoken')

module.exports = {
    member: () => {
        return new Promise((resolve, reject) => {
          conn.query(`SELECT fullname, userid, user_ktp, email FROM user WHERE status=1 `, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },

      userid: (userid) => {
        return new Promise((resolve, reject) => {
          conn.query('SELECT userid, email, status, user_ktp, fullname, token FROM user WHERE userid = ?', userid, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },

      deleteMember: (userid) => {
        return new Promise((resolve, reject) => {
          conn.query('DELETE FROM user WHERE userid = ?', userid, (err) => {
            if (!err) {
              resolve(`User dengan Id : ${userid} berhasil di Hapus`)
            } else {
              reject(new Error(err))
            }
          })
        })
      },
    
      register: (data) => {
        return new Promise((resolve, reject) => {
          conn.query('INSERT INTO user SET ?', data, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },
    
      getByEmail: (email) => {
        return new Promise((resolve, reject) => {
          conn.query('SELECT userid, email, status, user_ktp, fullname, created_at, updated_at, salt, password FROM user WHERE email = ?', email, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
      },

      updateToken: (email, token) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE user SET token = ? WHERE email =?`, [token, email], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    destroyToken: (userid) => {
      const test = 'test';
      return new Promise((resolve, reject) => {
          conn.query(`UPDATE user SET token = ? WHERE userid =?`, [test, userid], (err, result) => {
              if (!err) {
                  resolve(result)
              } else {
                  reject(new Error(err))
              }
          })
      })
  },
}