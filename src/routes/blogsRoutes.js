const createCrudController = require('../controllers/genericController');
const createCrudRouter = require('./routeFactory');

const controller = createCrudController(
  'blogs',
  ['title', 'slug', 'cover_image', 'excerpt', 'content', 'published', 'published_at'],
  'created_at DESC'
);

module.exports = createCrudRouter(controller);