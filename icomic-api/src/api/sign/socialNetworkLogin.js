const jwt = require('jsonwebtoken')
const AccountModel = require('../../models/account')

const login = (req, res, next) => {
  const data = req.body
  const username = data.id;

  AccountModel.findOne({
    username: username
  })
    .then(resData => {
      if (!resData) {
        let newData = {
          username: username,
          password: username,
          fullName: data.name,
          email: '',
          phone: ''
        };

        resData = AccountModel(newData)
        resData.save(err => {
          if (err === null) {
            getResult(resData, res);
          } else {
            req.err = `Đăng kí thất bại! + ${err}`
            next('last')
          }
        })
      } else {
        getResult(resData, res);
      }
    })
}

const getResult = (resData, res) => {
  const { _id, username, password, role } = resData
  const token = jwt.sign({ _id, username, password, role }, 'mb1o4er')
  const userData = resData

  res.json({
    status: true,
    message: 'Đăng nhập thành công!',
    user: userData,
    token: token
  })
}

module.exports = login
