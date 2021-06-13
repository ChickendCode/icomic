const HistoryModel = require('../../models/history')

const update = (req, res, next) => {
  const _id = req.params._id
  const data = req.body

  HistoryModel.findOneAndUpdate({
    _id
  }, data, { new: true })
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Cập nhật thành công!',
          newStaff: resData
        })
      } else {
        req.err = 'Lỗi cập nhật!'
        return next('last')
      }
    })
    .catch(err => {
      next('last')
    })
}

module.exports = update