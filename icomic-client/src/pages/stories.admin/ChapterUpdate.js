import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import toChar from '../../utils/toChar'
import Editor from '../../global/CkEditor'
import { toggleLoading } from '../../redux/actions/web.actions'
import { updateChapter } from '../../services/chapters.services'
import { getAllStoriesAsync } from '../../redux/actions/stories.action'
import { getOneChapter } from "../../services/chapters.services"

const ChapterUpdate = ({ chapterUpdateForm, setChapterUpdateForm, setStoryInfo }) => {
  const { chapterId } = chapterUpdateForm
  const dispatch = useDispatch()

  const nameEl = useRef(null)

  const [chapter, setChapter] = useState({})
  const [content, setContent] = useState(chapter && chapter.content || 'Đang cập nhật')

  useEffect(() => {
    if (chapterId) {
      dispatch(toggleLoading(true))
      getOneChapter(chapterId)
        .then(res => {
          if (res.data && res.data.status) {
            setChapter(res.data.chapter)
            dispatch(toggleLoading(false))
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => alert('ERROR: ' + err))
        .then(() => dispatch(toggleLoading(false)))
    }
  }, [chapterId])

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = nameEl.current.value.trim()
    const text = toChar(name)

    const data = {
      name, content, text
    }

    dispatch(toggleLoading(true))
    updateChapter(chapterId, data)
      .then(res => {
        if (res.data && res.data.status) {
          setChapterUpdateForm({ status: false, chapterId: null })
          setStoryInfo({ status: false, info: {} })
          dispatch(getAllStoriesAsync({}, true))
          dispatch(toggleLoading(false))
        } else {
          alert("Lỗi! " + res.data.message)
        }
      })
      .catch(err => {
        alert('Lỗi: ' + err)
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }

  return (
    <>
      {
        chapterUpdateForm.status &&
        <div style={{ zIndex: 2 }} id='client-create-chapter'>
          <div className='create-container'>
            <form onSubmit={handleSubmit} className='create-form'>
              <span onClick={() => { setChapterUpdateForm(false) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <div className='form-container'>
                <h4>Cập nhật Chapter</h4>
                <div className='create-name'>
                  <label htmlFor='create_name' style={{ fontWeight: 'bold' }}>Tên chapter: </label>
                  <input defaultValue={chapter && chapter.name} placeholder='VD: Chiếc nhẫn tình cờ' required ref={nameEl} id='create_name' name='major_name' />
                </div>
                <div className='create-desc'>
                  <Editor setContent={setContent} defaultContent={chapter && chapter.content} />
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

export default ChapterUpdate