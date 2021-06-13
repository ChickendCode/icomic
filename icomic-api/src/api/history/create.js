const HistoryModel = require('../../models/history')

const create = (req, res, next) => {
  const data = req.body

  if (!data.userId) {
    req.err = `Đăng kí thất bại! + ${err}`
    next('last')
  }
  
  const newData = {
    userId: data.userId,
    storyId: data.storyId,
    chapterId: data.chapterId
  }
  const newHistory = HistoryModel(newData)
  
  newHistory.save(err => {
    if (err === null) {
      res.json({
        status: true,
        message: 'Lưu history read chapter thành công!',
        staff: newHistory
      })
    } else {
      req.err = `Đăng kí thất bại! + ${err}`
      next('last')
    }
  })
}

module.exports = create