// Builds a standard REST router for a simple content type:
//   GET    /            -> public   (frontend reads content)
//   GET    /:id         -> public
//   POST   /            -> admin only (CMS creates content)
//   PUT    /:id         -> admin only
//   DELETE /:id         -> admin only
const express = require('express');
const { protect } = require('../middleware/authMiddleware');

function createCrudRouter(controller) {
  const router = express.Router();

  router.get('/', controller.getAll);
  router.get('/:id', controller.getOne);
  router.post('/', protect, controller.create);
  router.put('/:id', protect, controller.update);
  router.delete('/:id', protect, controller.remove);

  return router;
}

module.exports = createCrudRouter;