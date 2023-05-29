import express from 'express';
const router  = express.Router();
import apiRoutes from  './api';

router.get('/', (_req, res) => {
    res.json({msg:'Hello World!'});
});

router.get('/test', (_req, res) => {
    res.json({msg:'Estoy en la ruta test!'});
});

router.use('/api', apiRoutes)

export default router;