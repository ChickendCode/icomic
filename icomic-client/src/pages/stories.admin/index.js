import StoryMenu from "./Menu"
import Create from './Create'
import { useState, useEffect } from "react"
import ChapterCreate from "./ChapterCreate"
import Update from "./Update"
import { useDispatch } from "react-redux"
import ChapterUpdate from "./ChapterUpdate"
import { getAllStoriesAsync } from "../../redux/actions/stories.action"
import StoryDetail from "./StoryDetail"
import StoriesList from "./List"

const Story = () => {
  const dispatch = useDispatch()

  const [createForm, setCreateForm] = useState(false)
  const [chapterCreateForm, setChapterCreateForm] = useState({ status: false, info: {} })
  const [chapterUpdateForm, setChapterUpdateForm] = useState({ status: false, info: {} })
  const [storyInfo, setStoryInfo] = useState({ status: false, info: {} })
  const [updateForm, setUpdateForm] = useState({ status: false, info: {}, index: 0 })
  const [product, setProduct] = useState({ status: false, user: null })
  const [query, setQuery] = useState({})

  useEffect(() => {
    dispatch({
      type: 'SET_ADMIN_TITLE',
      payload: 'Truyện'
    })

    dispatch(getAllStoriesAsync({}, true))
  }, [])

  return (
    <div id='client-tab'>
      {/* <Product product={product} setProduct={setProduct} /> */}
      <Create setProduct={setProduct} status={createForm} setCreateForm={setCreateForm} />
      <ChapterCreate setProduct={setProduct} chapterCreateForm={chapterCreateForm} setChapterCreateForm={setChapterCreateForm} />
      <ChapterUpdate setStoryInfo={setStoryInfo} chapterUpdateForm={chapterUpdateForm} setChapterUpdateForm={setChapterUpdateForm} />
      <Update updateForm={updateForm} setUpdateForm={setUpdateForm} />
      <StoryDetail storyInfo={storyInfo} setStoryInfo={setStoryInfo} setChapterUpdateForm={setChapterUpdateForm} />
      <div className='client-container'>
        <StoryMenu query={query} setQuery={setQuery} setCreateForm={setCreateForm} />
        <StoriesList query={query} setChapterCreateForm={setChapterCreateForm} setProduct={setProduct} setStoryInfo={setStoryInfo} setUpdateForm={setUpdateForm} />
      </div>
    </div>
  )
}

export default Story