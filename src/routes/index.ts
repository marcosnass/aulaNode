import { Router } from 'express';
import * as todoController from '../controllers/todoController';

import multer from 'multer';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './temp');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+'.jpg');
    }
});

const upload = multer({
    storage: storageConfig
});

const router = Router();

router.get('/todo', todoController.all);
router.post('/todo', todoController.add);
router.put('/todo/:id', todoController.update);
router.delete('/todo/:id', todoController.remove);
router.post('/upload', upload.single('avatar'), todoController.uploadFile);

export default router;