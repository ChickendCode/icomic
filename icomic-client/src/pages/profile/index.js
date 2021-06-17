import { useHistory } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { nameValidate, emailValidate, phoneValidate } from '../../utils/validate'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLoading } from '../../redux/actions/web.actions'
import { getUser, updateUser } from '../../services/users.services'
import './index.scss';

const Profile = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.users.login)
  const [emailErr, logEmailErr] = useState(false)
  const [usernameErr] = useState(false)
  const [firstNameErr, logFirstNameErr] = useState(false)
  const [phoneNumberErr, logPhoneNumberErr] = useState(false)
  const [prePass, setPrePass] = useState('')
  const [passCheck, setPassCheck] = useState(false)
  const [userData, setUserData] = useState({})

  const history = useHistory()
  // Lấy thông tin user id
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getUser(userId).then(res => {
        if (res.data && res.data.status) {
            let userData = res.data.staffData;
            setUserData(userData);
        }
    })
    .catch(err => alert('ERROR: ' + err))
    .then(() => dispatch(toggleLoading(false)))
  }, [])
  
  const emailValidation = (e) => {
    let value = e.target.value || ''
    value = value.trim()
    setUserData({
        ...userData,
        email: value
    })

    if (value !== '') {
        logEmailErr(!emailValidate(value))
    } else {
        logEmailErr(false)
    }
  }

  const phoneNumberValidate = (e) => {
      let value = e.target.value || ''
      value = value.trim()
      setUserData({
          ...userData,
          phone: value
      })

      if (value !== '') {
          logPhoneNumberErr(!phoneValidate(value))
      } else {
          logPhoneNumberErr(false)
      }
  }

  const firstNameValidation = (e) => {
      let value = e.target.value || ''
      value = value.trim()
      setUserData({
          ...userData,
          fullName: value
      })

      if (value !== '') {
          logFirstNameErr(!nameValidate(value))
      } else {
          logFirstNameErr(false)
      }
  }

  const getPrePass = (e) => {
      let value = e.target.value || ''
      value = value.trim()
      setPrePass(value)
  }

  const confirmPass = (e) => {
      let value = e.target.value || ''
      value = value.trim()
      setUserData({
          ...userData,
          password: value
      })

      if (value === '') {
          setPassCheck(false)
      }
      else if (value === prePass && value.length >= 6) {
          setPassCheck(false)
      } else {
          setPassCheck(true)
      }
  }

  const checkValidate = () => {
      if (!emailErr && !usernameErr && !firstNameErr && !passCheck) {
          return true
      } else return false
  }

  const submitHandle = (e) => {
      if (checkValidate()) {
          const data = {
              ...userData,
          }

          dispatch(toggleLoading(true))
          updateUser(userId, data).then(res => {
                alert(res.data.message);
                window.location.reload();
            })
            .catch(err => alert('ERROR: ' + err))
            .then(() => dispatch(toggleLoading(false)))

      } else {
          alert('Thông tin không hợp lệ!')
      }

      e.preventDefault()
  }

  const profilePic = useRef();
  const fileInput = useRef();

  const readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                profilePic.current.src = e.target.result
                setUserData({
                    ...userData,
                    image: e.target.result
                })
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    const fileUploadChange = (e) => {
        readURL(e.target);
    }

    const uploadButton = () => {
        fileInput.current.click()
    }

  return (
    login &&
    <>
      <div className='sign-in-container'>
            <div className='sign-in-header'>
                <h1 className='sign-in-title'>Thông tin tài khoản</h1>
            </div>
            <form onSubmit={(e) => submitHandle(e)} id='sign-in-form'>
                <label htmlFor='username'>Avatar: </label>
                <div class="avatar-wrapper">
                    <img ref={profilePic} class="profile-pic" src={userData.image} />
                    <div class="upload-button" onClick={(e) => uploadButton(e)}>
                        <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
                    </div>
                    <input onChange={(e) => fileUploadChange(e)} ref={fileInput} class="file-upload" type="file" accept="image/*"/>
                </div>
                <label htmlFor='username'>Tên đăng nhập: </label>
                <input id='username' placeholder='ex: username123' name='username' value={userData.username} disabled/>
                <span style={{ fontFamily: 'mainFont' }}>Họ Tên:</span>
                <input onChange={(e) => firstNameValidation(e)} className={firstNameErr ? 'validate-error' : ''} required name='fullname' placeholder='Họ và Tên' value={userData.fullName}/>
                <label htmlFor='email'>Email: </label>
                <input onChange={(e) => emailValidation(e)} className={emailErr ? 'validate-error' : ''} id='email' placeholder='example@email.com' name='email' value={userData.email}/>
                <label htmlFor='phone'>Số điện thoại: </label>
                <input onChange={phoneNumberValidate} className={phoneNumberErr ? 'validate-error' : ''} required id='phone' placeholder='+84...' name='phone' value={userData.phone}/>
                <label htmlFor='password'>Mật khẩu: </label>
                <input onChange={(e) => getPrePass(e)} type='password' placeholder='a-z, 0-9, ít nhất 6 kí tự.' id='password' name='password' />
                <label htmlFor='re-password'>Xác nhận mật khẩu: </label>
                <input onChange={(e) => confirmPass(e)} className={passCheck ? 'validate-error' : ''} type='password' id='re-password' placeholder='******' name='rePassword' />
                <div className='form-btn'>
                    <button className='sign-btn active'>
                        Cập nhật
                    </button>
                </div>

            </form>

          </div>
        </>
  )
}

export default Profile