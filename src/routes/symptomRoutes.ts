import { Router } from 'express';
import { checkSymptoms } from '../controllers/symptomController';

const router = Router();

router.post('/check-symptoms', checkSymptoms);

export default router;