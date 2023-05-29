import express from 'express'
import projectsRouter from './projects'
import teamsRouter from './teams'
import securityRouter from './security'
const router = express.Router();

router.use('/projects', projectsRouter)
router.use('/security', securityRouter)
router.use('/teams', teamsRouter)


export default router;