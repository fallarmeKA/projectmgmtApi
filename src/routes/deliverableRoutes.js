import express from 'express';
import {
  createDeliverableController,
  getDeliverablesController,
  updateDeliverableController,
  deleteDeliverableController,
} from '../controllers/deliverableController.js';

const router = express.Router();

router.post('/deliverables', createDeliverableController);
router.get('/deliverables', getDeliverablesController);
router.put('/deliverables/:id', updateDeliverableController);
router.delete('/deliverables/:id', deleteDeliverableController);

export default router;
