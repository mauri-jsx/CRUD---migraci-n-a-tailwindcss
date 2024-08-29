import { Router } from 'express';

const router = Router();

import {
    createTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    updateTask
} from '../controllers/task.controllers.js';

router.get('/tasks',getAllTasks);
router.get('/task/:id',getTaskById);
router.post('/tasks',createTask);
router.put('/task/:id',updateTask);
router.delete('/task/:id',deleteTask);


export { router };