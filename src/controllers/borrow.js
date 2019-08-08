const borrowModels = require('../models/borrow')
const BookHelper = require('../helpers/helpers')

module.exports = {
 
  postBorrow: (req, res) => {
    let date = new Date();
    date.setDate(date.getDate() + 3);
    const data = {
      bookid: req.body.bookid,
      user_id: req.body.user_id,
      tanggal_pinjam: new Date(),
      harus_kembali: date,
      denda: null,
    }

    borrowModels.postBorrow(data)
      .then((resultBook) => {
        const result = resultBook[0]
        BookHelper.response(res, data, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  patchBorrow: (req, res) => {
    const bookid = req.params.bookid;
    let denda = 0;
    if (req.body.denda > 0) {
      denda = req.body.denda
    }
    const data = {
      denda: denda,
      tanggal_kembali: new Date()
    }

    borrowModels.patchBorrow(bookid, data)
      .then((resultBook) => {
        const result = resultBook[0]
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}