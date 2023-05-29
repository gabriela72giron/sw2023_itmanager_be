import express from 'express';
import { createProject, getProjects, updateProject, deleteProject, getProjectsId } from '@libs/projects/projects';
const router  = express.Router();

router.get('/', (_req, res) => {
    res.json({version:1, scope: 'projects'});
})

// /api/projects/echo/hola?variable1=a&variable2=b
//echo es una ruta dinamica
//pero hola puede tener otro valor este puede ser params

//url todo lo que esta despues del signo de interrogacion que son querys

//msg es el path
//luego lo que se puede hacer es que lo que se envie este valdiado con try catch etc
/* Este código define una ruta para una solicitud GET al punto final `/echo/:msg`. Cuando se realiza
una solicitud GET a este punto final, el servidor extrae el valor de `msg` de los parámetros de
solicitud y los valores de `variable1` y `variable2` de los parámetros de consulta de solicitud (si
existen). Luego, el servidor envía una respuesta JSON que contiene los valores de `msg`, `variable1`
y `variable2`. */
router.get('/echo/:msg', (req, res)=>{
    const { msg } = req.params;
    const { variable1='Hola', variable2='Mundo' } = req.query;
    res.json({msg, variable1, variable2});
});

//body solo permite dos peticiones post y put
/* Este código define una ruta para una solicitud POST al punto final `/echo2`. Cuando se realiza una
solicitud POST a este punto final, el servidor extraerá los valores de `variable1` y `variable2` del
cuerpo de la solicitud (si existen) y luego enviará una respuesta JSON que contenga esos valores. */
router.post('/echo2', (req, res)=>{
    const { variable1='Hola', variable2='Mundo' } = req.body;
    res.json({variable1, variable2});
});

router.get('/all', async (_req, res) => {
    try{
        const projects = await getProjects();
        return res.json(projects);
    }
    catch (ex: any) {
        return res.status(500).json({error: ex?.message});
    }
});

router.get('/byid/:id', async (req, res) => {
    try{
        const {id=''} = req.params;
        const projects = await getProjectsId(id);
        return res.json(projects);
    }
    catch (ex: any) {
        return res.status(404).json({error: ex?.message});
    }
});

/*router.get('/all', async (_req, res) => {
    getProjects()
        .then((projects => res.json(projects)) 
        .catch (err => res.status(500).json({error: err?.message})) 
});*/

router.post('/new', async (req, res) => {
    try {
        const { name = '', description = '', isActive = false } = req.body;
        const newProject = { name, description, isActive: (isActive && true) };
        const createdProject = await createProject(newProject);
        return res.json(createdProject);
    } catch (ex: any) {
        return res.status(500).json({ error: ex?.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try{
        const { id='' } = req.params;
        const { name='', description='', isActive=false } = req.body;
        const updatedProject = await updateProject(id, { name, description, isActive: (isActive && true) });
        return res.json(updatedProject);
    }
    catch (ex: any) {
        return res.status(500).json({error: ex?.message});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try{
        const { id='' } = req.params;
        const deleteProjecto = await deleteProject(id);
        return res.json({deleted: deleteProjecto, id});
    }
    catch (ex: any) {
        return res.status(500).json({error: ex?.message});
    }
});
export default router;