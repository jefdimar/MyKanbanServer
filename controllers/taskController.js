const { Task } = require('../models')

class TaskController {
  static showAll(req, res, next) {
    Task.findAll({
      order: [
        ['id', 'DESC']
      ],
      include: 'User'
    })
      .then(data => {
        const output = []
        data.forEach(element => {
          output.push({
            id: element.id,
            title: element.title,
            category: element.category,
            UserID: element.UserID,
            username: element.User.email
          })
        })
        res.status(200).json(output)
      })
      .catch(err => {
        next(err)
      })
  }

  static createTask(req, res, next) {
    const input = {
      title: req.body.title,
      category: req.body.category,
      UserID: req.user.id
    }

    Task.create(input)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getById(req, res, next) {
    const id = +req.params.id

    Task.findOne({
      where: { id }
    })
      .then(data => {
        if(data) {
          res.status(200).json(data)
        } else {
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static editTask(req, res, next) {
    const id = +req.params.id

    const input = {
      title: req.body.title,
      category: req.body.category.toLowerCase()
    }

    Task.update(input, {
      where: { id },
      returning: true
    })
      .then(data => {
        if (data[0] > 0) {
          res.status(200).json(data[1])
        } else {
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static changeCategory(req, res, next) {
    const id = +req.params.id

    const input = {
      category: req.body.category
    }

    Task.update(input, {
      where: { id },
      returning: true
    })
      .then(data => {
        res.status(200).json(data[1])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTask(req, res, next) {
    const id = +req.params.id;

    Task.destroy({
      where: { id }
    })
      .then(data => {
        if(data) {
          res.status(200).json({
            message: 'Task deleted successfully'
          })
        } else {
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TaskController;