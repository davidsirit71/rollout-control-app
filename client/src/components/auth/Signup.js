import React, { Component } from "react";
import AuthService from "./AuthService";


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      roll: "",
    };
    this.service = new AuthService()
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;
    const roll = this.state.roll;

    this.service
      .signup(username, password, email, roll)
      .then(res => {
        this.setState({
          username: "",
          password: "",
          email: "",
          roll: "",
        });
        this.props.getUser(res.user);
      })
      .catch(err => console.log(err));
  };

  handleChange = event => {
    console.log('evento', event.target);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h3>Create your account:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label for="username">User Name:</label>
            <input
              id='username'
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <fieldset>
            <label for="password">Password:</label>
            <input
              id='password'
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <fieldset>
            <label for="email">email:</label>
            <input
              id='email'
              type='email'
              name='email'
              value={this.state.email}
              onChange={e => this.handleChange(e)}
              />
          </fieldset>
          <fieldset>
            <label for="roll">Roll:</label>
            <select 
              id='roll' 
              name='roll'
              rollSel={this.state.roll}
              onChange={e => this.handleChange(e)}
              >
              <option value='PManager'>PManager</option>
              <option value='PController'>PController</option>
              <option value='Subcontractor'>Subcontractor</option>          
            </select>

            {/* <input
              type='text'
              name='roll'
              value={this.state.roll}
              onChange={e => this.handleChange(e)}
              /> */}
          </fieldset>

          <input type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
}
export default Signup;
