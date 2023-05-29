export interface IProject{
    _id?: string, //para decirle que ese atributo es opcional hay que ponerle signo de interrogacion
    name: string, //si no tiene signo de interrogacion quiere decir que es requerida
    description: string,
    isActive: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

const newProject: IProject = {
    name: '',
    description: '',
    isActive: false,
};

//const newPrject: Required<IProject>= {}; //este es un ejemplo generico
/* Este código define una interfaz `IProject` que describe la estructura de un objeto de proyecto.
También define una matriz `memoryProjects` para almacenar objetos de proyectos y una variable
`createdProjects` para realizar un seguimiento de la cantidad de proyectos creados. */
const memoryProjects: IProject[] = [];
let createdProjects: number = 0;


export const getProjects = async () => {
    return memoryProjects;
};

export const getProjectsId = async (id: string) => {
    const project = memoryProjects.find(p => p._id === id);
    if(!project) throw new Error('Project not found');
    return project;
};

//mecanimo de manejo de memoria
/**
 * Esta función crea un nuevo proyecto y lo agrega a una serie de proyectos almacenados en la memoria.
 * @param {IProject} project - El parámetro `proyecto` es un objeto de tipo `IProject` que contiene
 * información sobre un proyecto.
 * @returns La función `createProject` devuelve una promesa que se resuelve en un nuevo objeto de
 * proyecto que se ha creado y agregado a una matriz llamada `memoryProjects`. El nuevo objeto de
 * proyecto tiene una propiedad `_id` que es una representación de cadena de un número, una propiedad
 * `createdAt` que es un objeto de fecha que representa la hora en que se creó el proyecto y una
 * propiedad `updatedAt` que también es un objeto de fecha
 */
export const createProject = async (project: IProject) => {
    const newProject = { ...project };
    newProject._id = (++createdProjects).toString();
    newProject.createdAt = new Date();
    newProject.updatedAt = newProject.createdAt;
    memoryProjects.push(newProject);
    return newProject;
}

export const updateProject = ( id:string, project:Partial<IProject>) => {
    const index = memoryProjects.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Project not found');
    memoryProjects[index] = { ...memoryProjects[index], ...project, updatedAt: new Date() };
    return memoryProjects[index];
}

export const deleteProject = (id:string) => {
    const index = memoryProjects.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Project not found');
    memoryProjects.splice(index, 1);
    return true;
}

