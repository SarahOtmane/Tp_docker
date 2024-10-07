module.exports = (server) => {
    const userController = require('../controllers/userController');

    server.post('/users/register', userController.registerAUser);
}