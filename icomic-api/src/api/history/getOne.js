const HistoryModel = require('../../models/history')

const getOne = (req, res, next) => {
  const { userId } = req;
  const storyId = req.params._id;

  HistoryModel.findOne({ userId, storyId })
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          staffData: resData
        })
      } else {
        req.err = 'Không tìm thấy history!';
        res.json({
          userId: userId
        })
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi lấy thông tin history! ' + err
      next('last')
    })
}

module.exports = getOne