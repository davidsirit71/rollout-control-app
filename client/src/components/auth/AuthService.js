import axios from 'axios';

class AuthService{
  constructor(){
    this.service = axios.create({
      baseURL: 'http://localhost:3001/auth',
      withCredenteials: true
    });
  }

  signup = (username, password, email, roll)=> {
    return this.service.post('/signup', {username, password, email, roll})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentuser',) //
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }
}

export default AuthService;

