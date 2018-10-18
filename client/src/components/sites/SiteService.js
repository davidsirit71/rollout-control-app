import axios from 'axios';

class SiteService {
  constructor(){
    this.service = axios.create({
      baseURL: 'http://localhost:3001/sites',
      withCredentials: true
    });    
  }

  getAllSites = ()=>{
    return this.service.get(`/all`, )
    .then(response => response.data)
  };

  getAllSitesInProject = (projectId)=>{
    return this.service.get(`/all/${projectId}`, )
    .then(response => response.data)
  };

  getOneSite = (siteId)=>{
    return this.service.get(`/${siteId}`, )
    .then(response => response.data)

  };

  createOneSite =(sitename, project, phEnAc, phInAc)=>{
    return this.service.post(`/new`, {sitename, project, phEnAc, phInAc})
    .then(response => response.data)
  };

  updateOneSite = (siteId, {newData})=>{
    return this.service.put(`/${siteId}`, {newData})
    .then(response => response.data)
  };

  deleteOneSite = (siteId)=>{
    return this.service.delete(`/${siteId}`, )
    .then(response => response.data)
  };

}

export default SiteService;