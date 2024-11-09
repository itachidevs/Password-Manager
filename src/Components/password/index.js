import './index.css'

const classNames = [
  'cementblue',
  'yelloworange',
  'darkorange',
  'pale',
  'skypales',
  'brown',
  'white',
  'darkblue',
  'darkcement',
]

const PasswordCard = props => {
  const classname = classNames[Math.floor(Math.random() * 10)]
  console.log(classname)
  console.log('rendereds')
  const {details, isChecked} = props

  const onDeletePassword = id => {
    const {onDelete} = props

    // console.log('calling passwordcard')
    // console.log(id)

    onDelete(id)
  }

  const {website, username, password, id} = details

  return (
    <li className="password-card">
      <div className="prifile">
        <p>{website[0]}</p>
      </div>
      <div className="description">
        <p>{website}</p>
        <p>{username}</p>
        {isChecked ? (
          <p>{password}</p>
        ) : (
          <img
            className="stars"
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          />
        )}
      </div>
      <button
        className="delete-icon-container"
        type="button"
        onClick={() => onDeletePassword(id)}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordCard
