import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { usernameValidate } from '../../utils/validate'
import { useDispatch } from 'react-redux'
import { loginAuth, loginSocialNetwork } from '../../services/authen.services'
import { toggleLoading } from '../../redux/actions/web.actions'
import { getUserData } from '../../redux/actions/users.actions'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const Login = (props) => {
  const dispatch = useDispatch()

  const [usernameErr, logUsernameErr] = useState(false)
  const [userData, setUserData] = useState({})
  const [passCheck, setPassCheck] = useState(false)
  const [login, setLogin] = useState(false)
  const history = useHistory()

  useEffect(() => {
    localStorage.clear()
    dispatch({
      type: 'CLEAR_DATA'
    })
  }, [])

  const usernameValidation = (e) => {
    let value = e.target.value
    value = value.trim()
    setUserData({
      ...userData,
      username: value
    })

    if (value !== '') {
      logUsernameErr(!usernameValidate(value))
      if (checkValidate(!usernameValidate(value), passCheck) && value?.length > 0 && userData.password?.length >= 6) {
        setLogin(true)
      } else {
        setLogin(false)
      }
    } else {
      logUsernameErr(false)
    }
  }

  const passValidation = (e) => {
    let value = e.target.value
    value = value.trim()

    setUserData({
      ...userData,
      password: value
    })

    if (value.length < 5) {
      setPassCheck(true)
    } else {
      setPassCheck(false)
    }

    if (checkValidate(usernameErr, passCheck) && userData.username?.length > 0 && value?.length >= 6) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }


  const checkValidate = (usernameErr, passCheck) => {
    if (!usernameErr && !passCheck) {
      return true
    } else return false
  }

  const submitHandle = (e) => {
    if (checkValidate(usernameErr, passCheck)) {
      dispatch(toggleLoading(true))
      loginAuth(userData)
        .then(res => {
          if (res.data && res.data.status) {
            dispatch(getUserData({
              ...res.data.user,
              token: res.data.token,
              login: true
            }))
            history.replace('/')
          } else {
            alert('Sai t??i kho???n ho???c m???t kh???u')
          }
        })
        .catch(err => console.log(err))
        .then(() => {
          dispatch(toggleLoading(false))
        })
    } else {
      alert('Th??ng tin kh??ng h???p l???!')
    }
    e.preventDefault()
  }

  const responseFacebook = (res) => {
    if (res.error) {
      return;
    }
    loginSocial(res);
  }

  const responseGoogle = (res) => {
    if (res.error) {
      return;
    }
    
    let profileObj = res.profileObj;
    let data = {
      id: profileObj.googleId,
      email: profileObj.email,
      name: profileObj.name
    }
    loginSocial(data);
  }

  const loginSocial = (data) => {
    loginSocialNetwork(data)
    .then(res => {
      if (res.data && res.data.status) {
        dispatch(getUserData({
          ...res.data.user,
          token: res.data.token,
          login: true
        }))
        history.replace('/')
      } else {
        alert('Sai t??i kho???n ho???c m???t kh???u')
      }
    })
    .catch(err => console.log(err))
    .then(() => {
      dispatch(toggleLoading(false))
    })
  }

  return (
    <>
      <div className='sign-in-container'>
        <div className='sign-in-header'>
          <div className='sign-in-logo-wrapper'>
            <Link to='/'>
              <img src='/images/logo.png' />
            </Link>
          </div>
          <h1 className='sign-in-title'>Welcome!</h1>
        </div>
        <form onSubmit={(e) => submitHandle(e)} id='sign-up-form'>
          <label htmlFor='username'>T??n ??ang nh???p: </label>
          <input onChange={(e) => usernameValidation(e)} className={usernameErr ? 'validate-error' : ''} required id='username' placeholder='T??n ????ng nh???p c???a b???n' name='username' />
          <label htmlFor='password'>M???t kh???u: </label>
          <input onChange={(e) => passValidation(e)} required type='password' placeholder='******' id='password' name='password' />
          <Link className='link-to-sign-in' to='/forget'>
            Qu??n m???t kh???u?
                    </Link>
          <div className='form-btn'>
            <button disabled={!login} type='submit' className={login ? 'sign-btn active' : 'sign-btn'}>
              ????ng nh???p
            </button>
          </div>
          <div className='form-auths'>
            <FacebookLogin
                appId="396398278357475"
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="fb"
                icon="fa-facebook"
                textButton="Facebook"
              />
            <GoogleLogin
                clientId="309860477197-sbm8hsuv96e3bp5av584fuojoj242sbb.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                className="gg-btn"
              />
          </div>
        </form>
        <Link to='/register' className='link-to-sign-in'>
          B???n ch??a c?? t??i kho???n? ????ng k?? ngay!
                </Link>
      </div>
    </>
  )
}

export default Login