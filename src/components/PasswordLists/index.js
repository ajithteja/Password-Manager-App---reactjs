import './index.css'

const PasswordLists = props => {
  const {eachItem, isShow, onDeleteFunc} = props
  const {id, url, username, password, colour} = eachItem

  const onDeleteBtn = () => {
    onDeleteFunc(id)
  }
  return (
    <li className="li-container">
      <div className={`profile ${colour}`}>
        <h1 className="first-letter">{username[0]}</h1>
      </div>
      <div className="details-container">
        <p className="url">{url}</p>
        <p className="url username">{username}</p>
        {!isShow && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="start"
          />
        )}
        {isShow && <p className="url password">{password}</p>}
      </div>
      <button
        data-testid="delete"
        onClick={onDeleteBtn}
        type="button"
        className="delete-btn"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordLists
