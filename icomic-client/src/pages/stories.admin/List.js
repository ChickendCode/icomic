import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DeletePopup from '../../global/DeletePopup'
import Pagination from '../../global/Pagination'
import Warning from '../../global/Warning'
import { getAllStoriesAsync, removeStoryAsync, updateStoryAsync } from '../../redux/actions/stories.action'

const StoriesList = ({ query, setStoryInfo, setUpdateForm, setChapterCreateForm }) => {
  const { stories, storyPage } = useSelector(state => state.stories)
  const [popup, setPopup] = useState({
    status: false,
    title: null,
    id: null
  })

  const dispatch = useDispatch()

  const deleteStory = (_id) => {
    setPopup({
      status: false,
      title: null,
      id: null
    })
    dispatch(removeStoryAsync(_id))
  }

  const completeStory = (_id, item, index) => {
    dispatch(updateStoryAsync(_id, { ...item, isCompleted: true }, index, null, true))
  }

  const uncompleteStory = (_id, item, index) => {
    dispatch(updateStoryAsync(_id, { ...item, isCompleted: false }, index, null, true))
  }

  const changePage = (page) => {
    dispatch(getAllStoriesAsync({ ...query, page }))
  }

  const openPopup = (id, title) => {
    setPopup({
      status: true,
      id,
      title
    })
  }

  const closePopup = () => {
    setPopup({
      status: false,
      title: null,
      id: null
    })
  }

  return (
    <div id='client-list'>
      <DeletePopup closePopup={closePopup} action={deleteStory} status={popup.status} title={popup.title} id={popup.id} />
      <div className='client-list-container'>
        {
          stories && stories.length > 0 &&
          <ul>
            <li className='title-row'>
              <div className='info'>
                <span style={{ width: '60%', textAlign: 'center' }}>Tên</span>
                <span style={{ width: '40%', textAlign: 'center' }}>Số tập</span>
                <span style={{ width: '40%', textAlign: 'center' }}>Theo dõi</span>
                <span style={{ width: '40%', textAlign: 'center' }}>Hoàn thành</span>
              </div>
              <div className='tools'>
                <span>Thêm chap</span>
                <span>Sửa</span>
                <span>Xóa</span>
              </div>
            </li>
            {
              stories.map((item, index) => {
                return (
                  <li key={item._id}>
                    <div className='info'>
                      <span className='name' onClick={() => setStoryInfo({ status: true, info: item })}>
                        {item.title || 'Thám tử Conan'}
                      </span>
                      <span className='school'><strong style={{ color: 'red' }}>{item.chapters && item.chapters.length || 0}</strong></span>
                      <span className='school'><strong style={{ color: 'red' }}>{item.follows && item.follows.length || 0}</strong></span>
                      <span className='school' style={{ cursor: 'pointer' }}>{!item.isCompleted && <i onClick={() => completeStory(item._id, item, index)} style={{ color: 'rgb(86, 163, 71)', fontSize: '1.2rem' }} className="fas fa-toggle-off"></i> || <i onClick={() => uncompleteStory(item._id, item, index)} style={{ color: 'rgb(86, 163, 71)', fontSize: '1.2rem' }} className="fas fa-toggle-on"></i>}</span>
                    </div>
                    {
                      !item.isCompleted &&
                      <div className='tools'>
                        <button className='edit' onClick={() => setChapterCreateForm({ status: true, info: item })}>
                          <i className="fas fa-pen-nib"></i>
                        </button>
                        <button className='edit' onClick={() => setUpdateForm({ status: true, info: item, index: index })}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={() => openPopup(item._id, `Xác nhận xóa truyện "${item.title}"`)} className='remove'>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                      ||
                      <div className='tools completed'>
                        <button className='edit'>
                          <i className="fas fa-pen-nib"></i>
                        </button>
                        <button className='edit'>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className='remove'>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    }
                  </li>
                )
              })
            }
          </ul>
          ||
          <Warning alert='Chưa có truyện nào!' />
        }
      </div>
      {
        storyPage.totalPage > 1 &&
        <div className='client-pagination'>
          <Pagination totalPage={storyPage.totalPage} currentPage={storyPage.currentPage} changePage={changePage} />
        </div>
      }
    </div>
  )
}

export default StoriesList