import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation, useHistory } from 'react-router-dom'
import { specialCharsValidate } from "../../utils/validate"

const Header = () => {
  const location = useLocation()
  const history = useHistory()
  const menu = useSelector(state => state.web.menu)
  const login = useSelector(state => state.users.login)
  const user = useSelector(state => state.users.user)
  const { categories } = useSelector(state => state.categories)
  const [categoryMenu, setCategoryMenu] = useState(false)

  const param = useRef(null)
  const param2 = useRef(null)

  const asPath = location.pathname || '/'

  const [mbMenu, setMbMenu] = useState(false)
  const [check, setCheck] = useState(false)

  const formEl = useRef(null)

  const checkQuery = (e) => {
    let value = e.target.value.trim()
    if (value.length > 0) {
      setCheck(true)
    } else {
      setCheck(false)
    }
  }

  const submitHandle = (e) => {
    e.preventDefault()
    if (check) {
      history.push(`/search?q=${param.current.value}`)
    }
  }

  const submitHandle2 = (e) => {
    e.preventDefault()
    if (check) {
      history.push(`/search?q=${param2.current.value}`)
    }
  }

  return (
    <>
      <div id='main-header'>
        <div className='container'>
          <div className='header-container'>
            <div className='logo'>
              <div className='avt-wrapper'>
                <a href='/'>
                  <img src='/images/logo.png' />
                </a>
              </div>
            </div>
            <div className='search-form'>
              <form action='/search' ref={formEl}>
                <div className='search-container'>
                  <input ref={param} name='q' onChange={checkQuery} required placeholder='Tìm kiếm truyện...' />
                  <button onClick={submitHandle}>
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
            {
              !login &&
              <div className='sign'>
                <Link to='/login'>Đăng nhập</Link>
                <Link to='/register'>Đăng ký</Link>
              </div>
              ||
              <div className='user'>
                {
                  login && user.role === 'admin' &&
                  <Link title='Thêm truyện mới' target="_blank" to='/admin/overall' className='add'>
                    <span></span>
                    <i class="fas fa-user-cog"></i>
                  </Link>
                }
                <div className='avt-wrapper'>
                  <Link>
                    <img style={{ display: 'inline-block' }} src='/images/user_default_img.png' />
                  </Link>
                  <Link to='/login' className='out'>
                    Đăng xuất
                </Link>
                </div>
                <span style={{ marginLeft: 8, fontWeight: 'bold' }}>{user.fullName}</span>
              </div>
            }
          </div>
        </div>
        <div className='header-menu'>
          <div className='container'>
            <ul>
              {
                menu.map((item, index) => {
                  return (
                    <li className={asPath === item.path ? 'active' : ''} key={index}>
                      <Link to={item.path}>
                        {item.title}
                      </Link>
                      {
                        item.path === '/categories' &&
                        <div className='categories'>
                          <ul>
                            {
                              categories && categories.length > 0 &&
                              categories.map(item => {
                                return (
                                  <li>
                                    <Link to={`/categories/${item._id}`}>
                                      {item.title}
                                    </Link>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      }
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>

      <div id='main-mb-header'>
        {
          mbMenu &&
          <>
            <div className='menu-overlay'></div>
            <div className='fixed-menu'>
              <button className='switch' onClick={() => setMbMenu(false)}>
                <i className="fas fa-times-circle"></i>
              </button>
              <form>
                <div className='search-mb'>
                  <input onChange={checkQuery} ref={param2} required placeholder='Tìm kiếm truyện' />
                  <button onClick={submitHandle2}>
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
              <ul>
                {
                  menu.map((item, index) => (
                    <li className={item.path === asPath ? 'active' : ''} key={index}>
                      <Link to={item.path}>
                        {item.title}
                      </Link>
                    </li>

                  ))
                }
              </ul>
              {
                login &&
                <div className='user'>
                  <Link>{user.fullName}</Link>
                  <Link to='/login'>Đăng xuất</Link>
                </div>
                ||
                <div className='sign'>
                  <Link to='/login'>Đăng nhập</Link>
                  <Link to='/register'>Đăng ký</Link>
                </div>
              }
            </div>
          </>
        }
        <div className='container'>
          <div className='header-container'>
            <div className='logo'>
              <div className='avt-wrapper'>
                <a href='/'>
                  <img src='/images/logo.png' />
                </a>
              </div>
            </div>
            <div className='bars-btn'>
              <Link to='/admin/overall' title='Quản lý' className='add'>
                <span></span>
                <i className="fas fa-pen-nib"></i>
              </Link>
              <button onClick={() => setMbMenu(true)}>
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header