import express from 'express';
const router  = express.Router();
import { createTeam, getTeams, getTeamsId, updateTeam, deleteTeam }from '@libs/teams/teams';

router.get('/', (_req, res) => {
    res.json({version:1, scope: 'teams'});
})

router.get('/all', async (_req, res) => {
    try{
        const projects = await getTeams();
        return res.json(projects);
    }
    catch (ex: any) {
        return res.status(500).json({error: ex?.message});
    }
});

router.get('/byid/:id', async (req, res) => {
    try{
        const {id=''} = req.params;
        const projects = await getTeamsId(id);
        return res.json(projects);
    }
    catch (ex: any) {
        return res.status(404).json({error: ex?.message});
    }
});

router.post('/new', async (req, res) => {
    try {
        const { name = '', description = '', members = [], owner = '', status = '' } = req.body;
        const newTeam = { name, description, members, owner, status };
        const createdTeams = await createTeam(newTeam);
        return res.json(createdTeams);
    } catch (ex: any) {
        return res.status(500).json({ error: ex?.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try{
        const { id='' } = req.params;
        const { name='', description='',  members = [], owner = '', status = ''  } = req.body;
        const updatedTeam = await updateTeam(id, { name, description, members, owner, status });
        return res.json(updatedTeam);
    }
    catch (ex: any) {
        return res.status(500).json({error: ex?.message});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try{
        const { id='' } = req.params;
        const deletedTeam = await deleteTeam(id);
        return res.json({deleted: deletedTeam, id});
    }
    catch (ex: any) {
        return res.status(500).json({error: ex?.message});
    }
});
export default router;