import { useRef, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { getAllProductsAsync, toggleLoading } from '../../redux/actions'
// import { createProduct } from '../../services/global'
import toChar from '../../utils/toChar'
import Editor from '../../global/CkEditor'
import { createChapterAsync } from '../../redux/actions/chapters.actions'

const ChapterCreate = ({ chapterCreateForm, setChapterCreateForm }) => {
  const { info } = chapterCreateForm

  const dispatch = useDispatch()

  const [content, setContent] = useState('Đang cập nhật')
  const nameEl = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = nameEl.current.value.trim()
    const text = toChar(name)
    const story = info._id
    const data = {
      name, content, text, story
    }

    dispatch(createChapterAsync(data, setChapterCreateForm({status: false, info: {}})))
  }

  return (
    <>
      {
        chapterCreateForm.status &&
        <div id='client-create-chapter'>
          <div className='create-container'>
            <form onSubmit={handleSubmit} className='create-form'>
              <span onClick={() => { setChapterCreateForm(false) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <div className='form-container'>
                <h4>Thêm Chapter</h4>
                <div className='create-name'>
                  <label htmlFor='create_name' style={{fontWeight: 'bold'}}>Tên chapter: </label>
                  <input placeholder='VD: Chiếc nhẫn tình cờ' required ref={nameEl} id='create_name' name='major_name' />
                </div>
                <div className='create-desc'>
                  <Editor setContent={setContent} />
                </div>
                <button className='sm-btn' type='submit'>Thêm</button>
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

export default ChapterCreate