import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '../../global/Pagination'
import Warning from '../../global/Warning'
import { removeCategoryAsync } from '../../redux/actions/categories.actions'
import DeletePopup from '../../global/DeletePopup'

const CategoriesList = ({ setUpdateForm, setCategoryInfo }) => {
  const categories = useSelector(state => state.categories.categories)
  const categoryPage = {}
  const dispatch = useDispatch()

  const [popup, setPopup] = useState({
    status: false,
    title: null,
    id: null
  })


  const deleteCategory = (_id) => {
    setPopup({
      status: false,
      title: null,
      id: null
    })
    dispatch(removeCategoryAsync(_id))
  }

  const changePage = (page) => {
    // dispatch(getAllProductsAsync({ page }))
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
    <div id='product-list'>
      <DeletePopup closePopup={closePopup} action={deleteCategory} status={popup.status} title={popup.title} id={popup.id} />
      <div className='product-list-container'>
        {
          categories && categories.length > 0 &&
          <ul>
            <li className='title-row'>
              <div className='count'>
                <span>STT</span>
              </div>
              <div className='info'>
                <span>Tên</span>
              </div>
              <div className='tools'>
                <span>Sửa</span>
                <span>Xóa</span>
              </div>
            </li>
            {
              categories.map((item, index) => {
                if (index < 10) return (
                  <li key={item._id}>
                    <div className='count'>
                      <span>{index + 1}</span>
                    </div>
                    <div className='info'>
                      <span className='name' onClick={() => setCategoryInfo({ status: true, info: item })}>
                        {item.title}
                      </span>
                    </div>
                    <div className='tools'>
                      <button className='edit' onClick={() => setUpdateForm({ status: true, info: item, index })}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => openPopup(item._id, `Xác nhận xóa chuyên mục "${item.title}"`)} className='remove'>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          ||
          <Warning alert='Chưa có chuyên mục!' />
        }
      </div>
      <div className='client-pagination'>
        <Pagination totalPage={categoryPage.totalPage} currentPage={categoryPage.currentPage} changePage={changePage} />
      </div>
    </div>
  )
}

export default CategoriesList