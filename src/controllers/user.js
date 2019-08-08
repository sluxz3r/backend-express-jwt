const userModels = require('../models/user')
const BookHelper = require('../helpers/helpers')
const jwt = require('jsonwebtoken')

module.exports = {
     
member: (req, res) => {
    userModels.member()
    .then((resultBook) => {
      const result = resultBook
      BookHelper.response(res, result, 200)
    })
    .catch((error) => {
      console.log(error)
    })
  },

  //get user by token
  userid: (req, res) => {
    const userid = req.params.userid
    userModels.userid(userid)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  listMember: (req, res) => {
    userModels.member()
    .then((resultBook) => {
      const result = resultBook
      BookHelper.response(res, result, 200)
    })
    .catch((error) => {
      console.log(error)
    })
  },
  
  deleteMember: (req, res) => {
    const userid = req.params.userid

    userModels.deleteMember(userid)
      .then((resultBook) => {
        const result = resultBook
        BookHelper.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  //Register
    register: (req, res) => {
      const salt = BookHelper.generateSalt(18)
      const passwordHash = BookHelper.setPassword(req.body.password, salt)
  
      const data = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: passwordHash.passwordHash,
        user_ktp: req.body.user_ktp,
        salt: passwordHash.salt,
        token: 'Test',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
  
      userModels.register(data)
        .then((resultRegister) => {
          BookHelper.response(res, resultRegister, 200)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  
    login: (req, res) => {
      const email = req.body.email
      const password = req.body.password
  
      userModels.getByEmail(email)
        .then((result) => {
          const dataUser = result[0]
          const usePassword = BookHelper.setPassword(password, dataUser.salt).passwordHash
  
          if (usePassword === dataUser.password) {
            dataUser.token = jwt.sign({
              userid: dataUser.userid
            }, process.env.SECRET_KEY || "ARI", { expiresIn: '12h' })
  
            delete dataUser.salt
            delete dataUser.password
            userModels.updateToken(email, dataUser.token)
                        .then((result) => {
                          
                        })
                        .catch((err) => {
                            console.log(err)
                        })
  
            return BookHelper.response(res, dataUser, 200)
          } else {
            return BookHelper.response(res, null, 403, 'Wrong password!')
          }
  
        })
        .catch((error) => {
          console.log(error)
        })
  
    },

    destroyToken:(req, res) => {
      const userid = req.params.userid;
  
      userModels.destroyToken(userid)
        .then((resultUser) => {
          const result = resultUser[0]
          BookHelper.response(res, result, 200)
        })
        .catch((error) => {
          console.log(error)
        })
    },
}