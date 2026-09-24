const createCrudController = require('../controllers/genericController');
const createCrudRouter = require('./routeFactory');

const controller = createCrudController('skills', [
  'name', 'category', 'proficiency', 'icon', 'sort_order',
]);

module.exports = createCrudRouter(controller);