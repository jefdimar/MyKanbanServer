const router = require('express').Router();
const UserController = require('../controllers/userController')
const TaskController = require('../controllers/taskController')
const authentication = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')

// User routing
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

router.use(authentication)

// Task routing
router.get('/tasks', TaskController.showAll)
router.post('/tasks', TaskController.createTask)
router.get('/tasks/:id', authorize, TaskController.getById)
router.put('/tasks/:id', authorize, TaskController.editTask)
router.patch('/tasks/:id', authorize, TaskController.changeCategory)
router.delete('/tasks/:id', authorize, TaskController.deleteTask)

module.exports = router