import {Component} from 'react'

// import PasswordCard from '../Password'

import './index.css'

class Form extends Component {
  state = {website: '', username: '', password: ''}

  updateInputWebsite = event => {
    this.setState({website: event.target.value})
  }

  updateInputUsername = event => {
    this.setState({username: event.target.value})
  }

  updateInputPassword = event => {
    this.setState({password: event.target.value})
  }

  onPasswordAdd = () => {
    const {website, password, username} = this.state
    // console.log(website, password, username)
    const {onAdding} = this.props
    onAdding({website, password, username})
    this.setState({website: '', username: '', password: ''})
    console.log('passed')
  }

  render() {
    const {website, password, username} = this.state
    // console.log(website, password, username)
    return (
      <div className="top-container">
        <img
          className="form-image"
          alt="password manager"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
        />
        <div className="form-container">
          <h1 className="form-heading">Add New Password</h1>
          <form className="form">
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-icon"
                />
              </div>
              <input
                className="input"
                type="text"
                placeholder="Enter Website"
                onChange={this.updateInputWebsite}
                value={website}
                required
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-icon"
                />
              </div>
              <input
                className="input"
                type="text"
                placeholder="Enter username"
                onChange={this.updateInputUsername}
                value={username}
                required
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-icon"
                />
              </div>
              <input
                className="input"
                type="password"
                placeholder="Enter password"
                onChange={this.updateInputPassword}
                value={password}
                required
              />
            </div>

            <button type="submit" className="btn" onClick={this.onPasswordAdd}>
              Add
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Form
