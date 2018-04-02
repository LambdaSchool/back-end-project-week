const userRouter = require('../controllers/userRouter');
const postRouter = require('../controllers/postRouter');

module.exports = (server) => {
server.route('/create-post').post(postRouter.createPost)
server.route('/posts').get(postRouter.getPosts)
server.route('/posts/:id').post(postRouter.getPostById)
server.route('/posts/:id').put(postRouter.updatePostById)
server.route('/new-user').post(userRouter.newUser)
server.route('/login').post(userRouter.newLogin)
};