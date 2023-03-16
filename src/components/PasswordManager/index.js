import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordLists from '../PasswordLists'
import './index.css'

const colourList = [
  'colour1',
  'colour2',
  'colour3',
  'colour4',
  'colour5',
  'colour6',
  'colour7',
  'colour8',
  'colour9',
  'colour10',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    filteredList: [],
    isShow: false,
    url: '',
    username: '',
    password: '',
  }

  onChecked = () => {
    this.setState(prevState => ({
      isShow: !prevState.isShow,
    }))
  }

  onUrlChange = event => {
    this.setState({
      url: event.target.value,
    })
  }

  onUserNameChange = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onPasswordChange = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSearch = event => {
    const userSearch = event.target.value.toLowerCase()

    const {passwordList} = this.state
    const searchedList = passwordList.filter(eachItem =>
      eachItem.url.toLowerCase().includes(userSearch),
    )

    this.setState({
      filteredList: searchedList,
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const {url, username, password} = this.state

    if (url.length !== 0 && username.length !== 0 && password.length !== 0) {
      const newUser = {
        id: uuidv4(),
        url,
        username,
        password,
        colour: colourList[Math.floor(Math.random() * 10)],
      }

      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newUser],
        filteredList: [...prevState.passwordList, newUser],
        url: '',
        username: '',
        password: '',
      }))
    }
  }

  onDeleteFunc = id => {
    const {passwordList, filteredList} = this.state
    const passwordDeletedList = passwordList.filter(
      eachItem => eachItem.id !== id,
    )
    const filteredDeletedList = filteredList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({
      passwordList: passwordDeletedList,
      filteredList: filteredDeletedList,
    })
  }

  render() {
    const {filteredList, isShow, url, username, password} = this.state

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="main-logo"
        />
        <div className="first-container">
          <form onSubmit={this.onSubmit} className="input-container">
            <h1 className="sub-head">Add New Password</h1>
            <div className="input-logo">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="logo"
                />
              </div>
              <input
                placeholder="Enter Website"
                type="text"
                className="user-input"
                onChange={this.onUrlChange}
                value={url}
              />
            </div>
            <div className="input-logo">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="logo"
                />
              </div>
              <input
                placeholder="Enter Username"
                type="text"
                className="user-input"
                onChange={this.onUserNameChange}
                value={username}
              />
            </div>
            <div className="input-logo">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="logo"
                />
              </div>
              <input
                placeholder="Enter Password"
                type="password"
                className="user-input"
                onChange={this.onPasswordChange}
                value={password}
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="theme-img"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="theme-sm-img"
          />
        </div>
        <div className="second-container">
          <div className="password-search">
            <div className="password-search your-password">
              <h1 className="count-text">Your Passwords</h1>
              <p className="count">{filteredList.length}</p>
            </div>
            <div className="password-search search-container">
              <div className="search-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img"
                />
              </div>
              <input
                placeholder="search"
                type="search"
                className="search-input"
                onChange={this.onSearch}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="show-password-container">
            <input
              onChange={this.onChecked}
              id="password"
              type="checkbox"
              className="checkbox"
            />
            <label htmlFor="password" className="checked-text">
              Show passwords
            </label>
          </div>
          {filteredList.length !== 0 && (
            <ul className="ul-list-container">
              {filteredList.map(eachItem => (
                <PasswordLists
                  eachItem={eachItem}
                  key={eachItem.id}
                  isShow={isShow}
                  onDeleteFunc={this.onDeleteFunc}
                />
              ))}
            </ul>
          )}
          {filteredList.length === 0 && (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords"
              />
              <p className="no-password-text">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
