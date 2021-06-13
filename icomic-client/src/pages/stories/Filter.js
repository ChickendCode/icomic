import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStoriesAsync } from '../../redux/actions/stories.action'

const Filter = ({ setFilters }) => {
  const { categories } = useSelector(state => state.categories)
  const dispatch = useDispatch()

  const [currentFilter, setCurrentFilter] = useState({
    currentCategories: [],
    date: {}
  })

  const filterByCategories = (category) => {
    if (!category || (category && !category._id)) return

    const { currentCategories } = currentFilter
    const check = currentCategories.findIndex(x => x._id === category._id)

    if (check !== -1) return

    const newCategories = [
      ...currentCategories,
      category
    ]
    const categoriesTypes = newCategories.map(item => item._id)
    const categoriesString = categoriesTypes.join(' ')

    dispatch(getAllStoriesAsync({
      sort: currentFilter.date?.type || 'createdAt',
      categories: categoriesString || null
    }, true))

    setCurrentFilter({
      ...currentFilter,
      currentCategories: newCategories
    })
    setFilters({
      ...currentFilter,
      currentCategories: newCategories
    })
  }

  const removeFilterCategories = (categoryId) => {
    const { currentCategories } = currentFilter
    const newCategories = currentCategories.filter(x => x._id !== categoryId)

    const categoriesTypes = newCategories.map(item => item._id)
    const categoriesString = categoriesTypes.join(' ')

    dispatch(getAllStoriesAsync({
      sort: currentFilter.date?.type || 'createdAt',
      categories: categoriesString || null
    }, true))

    setCurrentFilter({
      ...currentFilter,
      currentCategories: newCategories
    })
    setFilters({
      ...currentFilter,
      currentCategories: newCategories
    })
  }

  const filterByDate = (sort) => {
    const { date, currentCategories } = currentFilter

    if (sort.type === date.type) return

    const newDateSort = {
      type: sort.type,
      name: sort.name
    }

    const categoriesTypes = currentCategories.map(item => item._id)
    const categoriesString = categoriesTypes.join(' ')

    dispatch(getAllStoriesAsync({
      sort: newDateSort.type || 'createdAt',
      categories: categoriesString || null
    }, true))

    setCurrentFilter({
      ...currentFilter,
      date: newDateSort
    })
    setFilters({
      ...currentFilter,
      date: newDateSort
    })

  }

  const removeFilterByDate = () => {
    const { currentCategories } = currentFilter

    const categoriesTypes = currentCategories.map(item => item._id)
    const categoriesString = categoriesTypes.join(' ')

    dispatch(getAllStoriesAsync({
      sort: null,
      categories: categoriesString || null
    }, true))

    setCurrentFilter({
      ...currentFilter,
      date: {}
    })
  }

  const removeAllFilter = () => {
    setCurrentFilter({
      currentCategories: [],
      date: {}
    })
    setFilters({
      currentCategories: [],
      date: {}
    })

    dispatch(getAllStoriesAsync({}, true))
  }

  return (
    <>
      <div id='filter'>
        <div className='filter-container'>
          <i className="fas fa-filter"></i>
          <ul className='filter-list'>
            <li onClick={removeAllFilter} className={!(currentFilter.currentCategories.length > 0 || currentFilter.date.type) && 'filter-item active' || 'filter-item'}>Tất cả</li>
            <li className={!currentFilter.currentCategories.length > 0 && 'filter-item' || 'filter-item active'}>
              Chuyên mục
              {
                <ul className='filter-menu'>
                  {
                    categories && categories.length > 0 && categories.map(item => (
                      <li key={item._id} onClick={() => filterByCategories(item)}>{item.title}</li>
                    ))
                  }
                </ul>
              }
            </li>
            <li className={currentFilter.date.type && 'filter-item active' || 'filter-item'}>Sắp xếp
              <ul className='filter-menu'>
                <li onClick={() => filterByDate({ name: 'Mới nhất', type: '-createdAt' })}>Mới nhất</li>
                <li onClick={() => filterByDate({ name: 'Cũ nhất', type: 'createdAt' })}>Cũ nhất</li>
              </ul>
            </li>
          </ul>
        </div>
        {
          (currentFilter.currentCategories.length > 0 || currentFilter.date.type) &&
          <div className='filter-tag-container'>
            <span>Lọc theo: </span>
            <div className='filter-tags'>
              {
                currentFilter.currentCategories.length > 0
                && currentFilter.currentCategories.map(item => (
                  <div key={item._id} style={{ cursor: 'pointer' }} onClick={() => removeFilterCategories(item._id)} className='tag'>
                    <span>
                      {item.title}
                    </span>
                    <i className="far fa-times-circle"></i>
                  </div>
                ))
              }
              {
                currentFilter.date && currentFilter.date.type &&
                <div style={{ cursor: 'pointer' }} onClick={removeFilterByDate} className='tag'>
                  <span>
                    {currentFilter.date.name}
                  </span>
                  <i className="far fa-times-circle"></i>
                </div>
              }
              <div style={{ cursor: 'pointer' }} onClick={removeAllFilter} className='tag'>
                <span style={{ color: 'rgb(238, 63, 63)', fontWeight: 'bold', cursor: 'pointer' }}>
                  Xóa tất cả
                </span>
                <i className="far fa-times-circle"></i>
              </div>
            </div>
          </div>
        }
      </div>
      {/* <div id='mb-filter'>
        <button>
          <span>Filter</span>
          <i className="fas fa-filter"></i>
        </button>
      </div> */}
    </>
  )

}

export default Filter