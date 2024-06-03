import express from 'express';
import {
  createDeliverableController,
  getDeliverablesController,
  updateDeliverableController,
  deleteDeliverableController,
} from '../controllers/deliverableController.js';

const router = express.Router();

// Create a new deliverable
router.post('/', createDeliverableController);

// Get all deliverables
router.get('/', getDeliverablesController);

// Update a deliverable by ID
router.put('/:id', updateDeliverableController);

// Delete a deliverable by ID
router.delete('/:id', deleteDeliverableController);

export default router;
