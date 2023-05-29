export interface ITeam{
    _id?: string;
    name: string;
    description: string;
    members?: string[];
    owner?: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const newTeam: ITeam = {
    name: '',
    description: '',
    members: [],
    owner: '',
    status: '',
};

const memoryTeam: ITeam[] = [];
let createdTeams: number = 0;


export const getTeams = async () => {
    return memoryTeam;
};

export const getTeamsId = async (id: string) => {
    const team = memoryTeam.find(p => p._id === id);
    if(!team) throw new Error('Team not found');
    return team;
};

export const createTeam = async (team: ITeam) => {
    const newTeam = { ...team };
    newTeam._id = (++createdTeams).toString();
    newTeam.createdAt = new Date();
    newTeam.updatedAt = newTeam.createdAt;
    memoryTeam.push(newTeam);
    return newTeam;
}


export const updateTeam = ( id:string, team:Partial<ITeam>) => {
    const index = memoryTeam.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Team not found');
    memoryTeam[index] = { ...memoryTeam[index], ...team, updatedAt: new Date() };
    return memoryTeam[index];
}

export const deleteTeam = (id:string) => {
    const index = memoryTeam.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Team not found');
    memoryTeam.splice(index, 1);
    return true;
}

