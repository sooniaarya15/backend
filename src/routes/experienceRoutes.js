const createCrudController = require('../controllers/genericController');
const createCrudRouter = require('./routeFactory');

const controller = createCrudController('experience', [
  'company', 'role', 'start_date', 'end_date', 'is_current', 'description', 'sort_order',
]);

module.exports = createCrudRouter(controller);