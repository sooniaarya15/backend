const createCrudController = require('../controllers/genericController');
const createCrudRouter = require('./routeFactory');

const controller = createCrudController('services', [
  'title', 'description', 'icon', 'price', 'sort_order',
]);

module.exports = createCrudRouter(controller);