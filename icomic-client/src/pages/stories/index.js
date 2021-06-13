import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Breadcrumb from "../../global/Breadcrumb"
import StoriesList from "../../global/List"
import Pagination from "../../global/Pagination"
import { getAllStoriesAsync } from "../../redux/actions/stories.action"
import Filter from "./Filter"

const Stories = () => {
  const dispatch = useDispatch()
  const { stories, storyPage } = useSelector(state => state.stories)
  const [filters, setFilters] = useState({
    currentCategories: [],
    date: {}
  })

  useEffect(() => {
    dispatch(getAllStoriesAsync({}, true))
  }, [dispatch])

  const changePage = (page) => {
    const { date, currentCategories } = filters

    const categoriesTypes = currentCategories.map(item => item._id)
    const categoriesString = categoriesTypes.join(' ')

    dispatch(getAllStoriesAsync({ page: page, categories: categoriesString, sort: date.type }, true))
  }

  return (
    <div id='stories'>
      <div className='container'>
        <Breadcrumb category="Tất cả truyện" />
        <div className='stories-container'>
          <Filter setFilters={setFilters} />
          <div style={{ marginTop: 32 }} className='stories-list-wrapper'>
            <StoriesList stories={stories} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px' }}>
          <Pagination totalPage={storyPage.totalPage} currentPage={storyPage.currentPage} changePage={changePage} />
        </div>
      </div>
    </div>
  )
}

export default Stories