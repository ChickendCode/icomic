import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const fullName = useSelector(state => state.users.user.fullName)
  const image = useSelector(state => state.users.user.userImage)
  const role = useSelector(state => state.users.user.role)
  const title = useSelector(state => state.web.adminTitle)
  const login = useSelector(state => state.users.login)

  return (
    <div id='header'>
      <div className='header-container'>
        <h1>{title}</h1>
        <div className='sign'>
          {
            login &&
            <>
              <div className='avt-wrapper'>
                <img src={image && image.url || '/images/user_default_img.png'} />
              </div>
              <span>Admin</span>
              <button style={{ zIndex: 10 }}>
                <Link to='/login'>
                  Đăng xuất
            </Link>
              </button>
            </>
            ||
            <Link to='/login'><i style={{ marginRight: 12 }} className="fas fa-sign-in-alt"></i><strong>Đăng nhập</strong></Link>
          }
        </div>
      </div>
    </div>
  )
}

export default Header