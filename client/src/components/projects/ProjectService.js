import axios from 'axios';

class ProjectService {
  constructor(){
    this.service = axios.create({
      baseURL: 'http://localhost:3001/projects',
      withCredentials: true
    });
  }

getAllProjects = ()=>{
  return this.service.get('/all', )
  .then(response => response.data)
};

getOneProject = (projectId)=>{
  return this.service.get(`/${projectId}`, )
  .then(reponse => reponse.data)
};

createNewProject = (projectname, customer)=>{
  return this.service.post('/new', {projectname, customer}) 
  .then(reponse => reponse.data)
};

updateOneProject = (projectId, {newData})=>{
  return this.service.put(`/${projectId}`, {newData})
  .then(reponse => reponse.data)
};

deleteOneProject = (projectId)=>{
  return this.service.delete(`/${projectId}`, )
  .then(reponse => reponse.data)
};
}

export default ProjectService;