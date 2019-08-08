const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/book')
const BorrowController = require('../controllers/borrow');
const UserController = require('../controllers/user');

const Auth = require('../helpers/auth')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })

Route
  .get('/cek', Auth.authInfo, Auth.accesstoken, BookController.getIndex)
  .get('/user/', Auth.authInfo, Auth.accesstoken, UserController.member)
  .get('/user/:userid',  Auth.authInfo, Auth.accesstoken, UserController.userid)
  .get('/', BookController.getBooks)
  .get('/get/pending/', BookController.pendingBooks)
  .get('/cek/get/', BookController.getPagination)
  .get('/lah/:bookid', Auth.authInfo, Auth.accesstoken, BookController.getBorrows)
  .get('/lah/user/:user_id', Auth.authInfo, Auth.accesstoken, BookController.userBorrows)
  .get('/name', BookController.nameBook)
  .get('/:bookid', BookController.bookId)
  .get('/borrow/lah/', BookController.borrowList)
  .get('/category/:category', BookController.bookCategory)
  .get('/location/:location', BookController.bookLocation)

  .post('/', upload.single('image'), BookController.postBook)
  .patch('/:bookid', BookController.patchBook)
  .patch('/get/pending/:bookid', BookController.pendingEdit)
  .delete('/:bookid', BookController.bookDelete)

  .delete('/member/:userid', UserController.deleteMember)

  .post('/borrow/', BorrowController.postBorrow)
  .patch('/borrow/:bookid', BorrowController.patchBorrow)

  .post('/register/', UserController.register)
  .post('/login/', Auth.authInfo, UserController.login)
  .patch('/token/:userid', UserController.destroyToken)

module.exports = Route
