const { Task } = require('../models')

function authorize(req, res, next) {
  const id = +req.params.id

  Task.findOne({
    where: { id }
  })
    .then(data => {
      if (!data) {
        next({
          name: 'Data not found'
        })
      } else if (data.UserID !== req.user.id) {
        next({
          name: 'Not authorized'
        })
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorize