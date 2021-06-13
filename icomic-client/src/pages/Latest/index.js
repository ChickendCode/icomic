import { useDispatch, useSelector } from "react-redux"
import StoriesList from "../../global/List"
import { useEffect } from "react"
import { getAllStoriesAsync } from "../../redux/actions/stories.action"
import Breadcrumb from "../../global/Breadcrumb"

const LatestStories = () => {
  const { stories } = useSelector(state => state.stories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllStoriesAsync({ sort: '-updatedChap' }, true))
  }, [dispatch])

  return (
    <div id='latest'>
      <div className="container">
        <Breadcrumb category="Mới cập nhật" />
        <div className='latest-container'>
          <StoriesList stories={stories.slice(0, 18)} />
        </div>
      </div>
    </div>
  )
}

export default LatestStories