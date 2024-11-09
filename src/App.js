// import PasswordManager from './Components/PasswordManager'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

// import Form from './Components/Form'

import PasswordCard from './Components/password/index'

import './App.css'

class App extends Component {
  state = {
    passwords: [],
    searchInput: '',
    website: '',
    username: '',
    password: '',
    isChecked: false,
  }

  updateInputWebsite = event => {
    this.setState({website: event.target.value})
  }

  updateInputUsername = event => {
    this.setState({username: event.target.value})
  }

  updateInputPassword = event => {
    this.setState({password: event.target.value})
  }

  addPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website !== '' || username !== '' || password !== '') {
      const nwePassword = {
        id: uuidv4(),
        website,
        password,
        username,
      }

      this.setState(previous => ({
        passwords: [...previous.passwords, nwePassword],
      }))
      this.setState({website: '', password: '', username: ''})
    }
  }

  isCheckboxChecked = () => {
    this.setState(prev => ({isChecked: !prev.isChecked}))
  }

  renderForm = () => {
    console.log('form rendered')
    const {website, username, password} = this.state
    return (
      <div className="top-container">
        <img
          className="form-image-sm"
          alt="password manager"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
        />
        <img
          className="form-image-lg"
          alt="password manager"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
        />
        <div className="form-container">
          <h1 className="form-heading">Add New Password</h1>
          <form className="form" onClick={this.preventing}>
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
                min="1"
                max="10"
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
                min="1"
                max="10"
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
                min="1"
                max="16"
              />
            </div>

            <button type="submit" className="btn" onClick={this.addPassword}>
              Add
            </button>
          </form>
        </div>
      </div>
    )
  }

  onInputChange = evenrt => {
    this.setState({searchInput: evenrt.target.value})
  }

  deletePassword = id => {
    console.log('deleted')
    const {passwords} = this.state
    const filtered = passwords.filter(each => each.id !== id)
    this.setState({passwords: filtered})
    console.log(filtered)
  }

  renderNoPasswordsContainer = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        className="no-paswords-image"
        alt="no passwords"
      />
      <p className="no-passwords-text">No Passwords</p>
    </div>
  )

  renderPasswordContainer = () => {
    console.log('passwords-container rendered')
    const {passwords, searchInput, isChecked} = this.state
    const filtered = passwords.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const passwordCount = filtered.length
    const passwordResult =
      passwordCount > 0 ? (
        <ul className="passwords-cards-container">
          {filtered.map(each => (
            <PasswordCard
              key={each.id}
              details={each}
              onDelete={this.deletePassword}
              isChecked={isChecked}
            />
          ))}
        </ul>
      ) : (
        this.renderNoPasswordsContainer()
      )

    return (
      <div className="bottom-container">
        <div className="header">
          <div className="header-left">
            <h1 className="header-left-heading">Your Passwords</h1>
            <p className="password-count">{passwordCount}</p>
          </div>
          <div className="header-right">
            <div className="search-icon-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                className="search-icon"
                alt="search"
              />
            </div>
            <input
              type="search"
              className="search-input"
              placeholder="search"
              value={searchInput}
              onChange={this.onInputChange}
            />
          </div>
        </div>
        <hr className="divider" />
        <div className="starred-container">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={this.isCheckboxChecked}
          />
          <label className="checkbox-label" htmlFor="checkbox">
            Show Passwords
          </label>
        </div>

        <div className="password-cards-container">{passwordResult}</div>
      </div>
    )
  }

  render() {
    const {passwords} = this.state
    return (
      <main className="main-container">
        <header className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
        </header>
        <div className="cards-container">
          {this.renderForm()}
          {this.renderPasswordContainer()}
        </div>
      </main>
    )
  }
}

export default App
