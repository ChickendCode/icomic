import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Breadcrumb from "../../global/Breadcrumb"
import { toggleLoading } from "../../redux/actions/web.actions"
import { getOneStory } from "../../services/stories.services"
import ChaptersList from "./ChaptersList"
import Comment from "./Comment"
import MainInfo from "./MainInfo"
import { getAllChaptersAsync } from "../../redux/actions/chapters.actions"

const DetailStory = () => {
  const { _id } = useParams()
  const [story, setStory] = useState({})
  const dispatch = useDispatch()
  const { chapters } = useSelector(state => state.chapters)

  useEffect(() => {
    dispatch(toggleLoading(true))
    getOneStory(_id)
      .then(res => {
        if (res.data && res.data.status) {
          setStory(res.data.story)
          dispatch(toggleLoading(false))
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('ERROR: ' + err))
      .then(() => dispatch(toggleLoading(false)))
    
  }, [])

    useEffect(() => {
    dispatch(getAllChaptersAsync({ story: _id }, true))
  }, [dispatch, _id])

  return (
    <div id='detail-story'>
      <div className='container'>
        <Breadcrumb story={{ name: story && story.title, url: story && story._id }} />
        <div className='detail-container'>
          <MainInfo storyInfo={story} chapters={chapters}/>
          <ChaptersList storyId={_id} chapters={chapters} />
          <Comment storyId={_id} commentList={story && story.comments || []} />
        </div>
      </div>
    </div >
  )
}

export default DetailStory