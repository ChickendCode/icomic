import { useState, useRef, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { getAllUsersAsync, toggleLoading } from '../../redux/actions'
// import { createUser } from '../../services/global'
import toChar from '../../utils/toChar'
import { createStoryAsync } from '../../redux/actions/stories.action'

const Create = ({ status, setCreateForm }) => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)

  const [file, setFile] = useState(null)
  const [data, getData] = useState({ name: '', path: '/images/product_default_img.png' })
  const [currentCategories, setCurrentCategories] = useState([])

  const input1 = useRef(null)
  const input2 = useRef(null)
  const titleEl = useRef(null)
  const shortDescriptionEl = useRef(null)

  useEffect(() => {
    setCurrentCategories([])
  }, [status])

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = (e) => {
      const url = reader.result
      setFile(url)
      getData({ name: 'manh', path: url })
    }

    if (selectedFile && selectedFile.type.match('image.*')) {
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentCategories.length <= 0) return alert('Chưa chọn chuyện mục!')
    const title = titleEl.current.value.trim()
    const shortDescription = shortDescriptionEl.current.value.trim()
    const text = toChar(title)
    
    const formData = new FormData()
    formData.append('title', title)
    formData.append('shortDescription', shortDescription)
    formData.append('categories', JSON.stringify(currentCategories))
    formData.append('text', text)
    formData.append('image', file)

    dispatch(createStoryAsync(formData, () => {
      setCreateForm(false)
    }))
  }

  const addCate = (category) => {
    setCurrentCategories([
      ...currentCategories,
      category
    ])
  }

  const removeCate = (category) => {
    const newCategories = currentCategories.filter(x => x !== category)
    setCurrentCategories(newCategories)
  }

  return (
    <>
      {
        status &&
        <div id='client-create'>
          <div className='create-container'>
            <input type='file' style={{ position: 'fixed', display: 'none' }} ref={input2} />
            <form onSubmit={handleSubmit} className='create-form'>
              <span onClick={() => { setCreateForm(false) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <h4>Thêm truyện mới</h4>
              <div className='form-container container'>
                <div title='chọn ảnh đại diện' className='file-upload'>
                  <div className='image-container'>
                    <img src={data.path} />
                    <label htmlFor='product_image'>
                      <i className="fas fa-camera"></i>
                      <input ref={input1} onChange={handleChange} hidden type='file' id='product_image' />
                    </label>
                  </div>
                </div>
                <div className='create-name'>
                  <label htmlFor='create_name'>Tên truyện: </label>
                  <input required ref={titleEl} id='create_name' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Mô tả ngắn: </label>
                  <input required ref={shortDescriptionEl} id='create_cate' />
                </div>
                <div className='create-category'>
                  <strong>Chọn chuyên mục:</strong>
                  <div className='row'>
                    {
                      categories.length > 0 &&
                      categories.map(item => {
                        let check = false
                        if (currentCategories) {
                          currentCategories.forEach(item2 => {
                            if (item2 === item._id) {
                              check = true
                            }
                          })
                        }
                        if (check) {
                          return (
                            <span key={item._id} onClick={() => removeCate(item._id)} class='col-6'>
                              <i style={{ color: 'green' }} className={"fas fa-check"}></i>
                              {item.title}
                            </span>
                          )
                        } else {
                          return (
                            <span key={item._id} onClick={() => addCate(item._id)} class='col-6'>
                              <i style={{ color: 'blue' }} className={"fas fa-plus"}></i>
                              {item.title}
                            </span>
                          )
                        }
                      })
                    }
                  </div>
                </div>
                {/* <div className='create-username'>
                  <label htmlFor='create_username'>Tài khoản: </label>
                  <input required ref={usernameEl} id='create_username' />
                </div>
                <div className='create-password'>
                  <label htmlFor='create_password'>Mật khẩu: </label>
                  <input required ref={passwordEl} id='create_password' />
                </div> */}
                <button type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
        ||
        null
      }
    </>
  )
}

export default Create