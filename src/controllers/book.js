const bookModels = require('../models/book')
const BookHelper = require('../helpers/helpers')
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary')

module.exports = {
  getIndex: (req, res) => {
    return res.json({ message: 'Hello!!! Welcome to Arkademy' })
  },

  // Get ALl Books
  getBooks: (req, res) => {
    bookModels.getBooks()
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  pendingBooks: (req, res) => {
    bookModels.pendingBooks()
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },


  // Get ALl Books
  getPagination: (req, res) => {
    let limit = parseInt(req.query.limit) || 4
    let page = parseInt(req.query.page) || 1
    bookModels.getPagination(limit, page)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // user get by id
  borrowList: (req, res) => {
    bookModels.borrowList()
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // user get by id
  getBorrows: (req, res) => {
    const bookid = req.params.bookid
    bookModels.getBorrows(bookid)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  // user get borrow by ktp
  userBorrows: (req, res) => {
    const user_id = req.params.user_id
    bookModels.userBorrows(user_id)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },


  // Get Books By Name
  nameBook: (req, res) => {
    const name = req.query.name
    bookModels.nameBook(name)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Get Book By Id
  bookId: (req, res) => {
    const bookid = req.params.bookid
    bookModels.bookId(bookid)
      .then((resultBook) => {
        const result = resultBook[0]
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Get By Category
  bookCategory: (req, res) => {
    const category = req.params.category

    bookModels.bookCategory(category)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Get By Location
  bookLocation: (req, res) => {
    const location = req.params.location

    bookModels.bookLocation(location)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // POST User
  postBook: async (req, res) => {
    let path = req.file.path
    let geturl = async (req) => {
      cloudinary.config({
        cloud_name: 'dbhwvh1mf',
        api_key: '718924645383124',
        api_secret: 'yhTauEiKkLgr62XpgGTvsALrwUU'
      })

      let data
      await cloudinary.uploader.upload(path, (result) => {
        const fs = require('fs')
        fs.unlinkSync(path)
        data = result.url
      })

      return data
    }
    const data = {
      name: req.body.name,
      writer: req.body.writer,
      des: req.body.des,
      fk_loc: req.body.fk_loc,
      fk_cat: req.body.fk_cat,
      image: await geturl(),
      created_at: new Date(),
      status_borrow: 0,
      pending:1,

    }

    bookModels.postBook(data)
      .then((resultBook) => {
        const result = resultBook[0]
        BookHelper.response(res, data, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Update Book
  patchBook: (req, res) => {
    const data = {
      name: req.body.name,
      writer: req.body.writer,
      fk_loc: req.body.fk_loc,
      fk_cat: req.body.fk_cat,
      image: req.body.image,
      updated_at: new Date(),
    }
    const bookid = req.params.bookid

    bookModels.patchBook(bookid, data)
      .then((resultBook) => {
        const result = resultBook[0]
        BookHelper.response(res, data, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Update Pending
  pendingEdit: (req, res) => {
    const bookid = req.params.bookid
    bookModels.pendingEdit(bookid)
      .then((resultBook) => {
        const result = resultBook[0]
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Delete User By Id
  bookDelete: (req, res) => {
    const bookid = req.params.bookid

    bookModels.bookDelete(bookid)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
