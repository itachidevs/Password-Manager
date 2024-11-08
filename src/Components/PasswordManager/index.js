import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import './colors.css'

import Form from '../Form'

import PasswordCard from '../password'

// import PasswordContainer from '../PasswordCard'

class PasswordManager extends Component {
  state = {passwords: [], searchInput: ''}

  DeletePassword = id => {
    console.log('deleted')
    const {passwords} = this.state
    const filtered = passwords.filter(each => each.id !== id)
    this.setState({passwords: filtered})
    console.log(filtered)
  }

  AddPassword = props => {
    const passwordDetails = props
    // console.log(passwordDetails)
    const {website, password, username} = passwordDetails

    const nwePassword = {
      id: uuidv4(),
      website,
      password,
      username,
    }

    this.setState(previous => ({
      passwords: [...previous.passwords, nwePassword],
    }))
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
    const {passwords, searchInput} = this.state
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
              onDelete={this.DeletePassword}
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
          <input type="checkbox" className="checkbox" id="checkbox" />
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
          <Form onAdding={this.AddPassword} />
          {this.renderPasswordContainer()}
        </div>
      </main>
    )
  }
}
export default PasswordManager
