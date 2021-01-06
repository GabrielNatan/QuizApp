const express = require("express");
const multer = require('multer')
const router = express.Router();
const PerguntasController = require('./controller/PerguntasController')
const UsersController = require('./controller/UsersController')
const Middleware = require('./middleware/index')
const uploadConfig = require('./config/upload')

const upload = multer(uploadConfig)

router.get('/', PerguntasController.showAll)
router.post('/',upload.single('cover'), PerguntasController.newQuestion)
router.put('/:id',upload.single('cover'), PerguntasController.editQuestion)
router.delete('/:id', PerguntasController.deleteQuestion)

router.get('/User', UsersController.showAll)
router.post('/User/auth',Middleware.authenticate, UsersController.login)
router.post('/User', UsersController.newUser)
router.put('/User/:id', UsersController.editUser)
router.delete('/User/:id', UsersController.deleteUser)

module.exports = router