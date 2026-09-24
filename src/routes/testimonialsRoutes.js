const createCrudController = require('../controllers/genericController');
const createCrudRouter = require('./routeFactory');

const controller = createCrudController(
  'testimonials',
  ['author_name', 'author_role', 'author_image', 'message', 'rating'],
  'created_at DESC'
);

module.exports = createCrudRouter(controller);