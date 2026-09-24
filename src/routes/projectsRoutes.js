const createCrudController = require('../controllers/genericController');
const createCrudRouter = require('./routeFactory');

const controller = createCrudController('projects', [
  'title', 'slug', 'description', 'tech_stack', 'image',
  'live_url', 'repo_url', 'featured', 'sort_order',
]);

module.exports = createCrudRouter(controller);